/* ==========================================================================
   FreshVault NER - 3D Mini Cold Storage Interactive Viewer (Three.js)
   Solar-Powered Smart Mini Cold Storage for North Eastern Region
   ========================================================================== */

class ColdStorage3DViewer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      allowControls: true,
      autoRotate: true,
      initialView: 'front',
      showAirflow: false,
      isCutaway: false
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.modelGroup = new THREE.Group();
    this.components = {};
    this.particlesCold = null;
    this.particlesHot = null;
    this.animatingFans = [];
    this.currentView = this.options.initialView;
    this.explodedFactor = 0;
    this.targetExplodedFactor = 0;
    this.doorAngle = 0;
    this.targetDoorAngle = 0;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 450;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = null; // transparent or set by CSS

    // Camera
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(3.2, 2.2, 4.2);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Controls
    if (this.options.allowControls && typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.1;
      this.controls.minDistance = 2.0;
      this.controls.maxDistance = 8.0;
      this.controls.autoRotate = this.options.autoRotate;
      this.controls.autoRotateSpeed = 1.0;
    }

    this.setupLighting();
    this.buildStorageModel();
    this.buildAirflowParticles();
    this.setupEvents();
    this.animate();

    if (this.options.initialView) {
      this.setView(this.options.initialView);
    }
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    // Key directional light (Sunlight)
    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    sunLight.position.set(5, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 15;
    this.scene.add(sunLight);

    // Soft fill light
    const fillLight = new THREE.DirectionalLight(0x1F4E79, 0.45);
    fillLight.position.set(-5, 3, -4);
    this.scene.add(fillLight);

    // Subtle bottom bounce light
    const bounceLight = new THREE.DirectionalLight(0xE2EFDA, 0.35);
    bounceLight.position.set(0, -4, 0);
    this.scene.add(bounceLight);
  }

  buildStorageModel() {
    // Main materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC,
      roughness: 0.3,
      metalness: 0.15
    });

    const navyFrameMat = new THREE.MeshStandardMaterial({
      color: 0x1F4E79,
      roughness: 0.4,
      metalness: 0.2
    });

    const insulationMat = new THREE.MeshStandardMaterial({
      color: 0xE2EFDA,
      roughness: 0.8,
      metalness: 0.05
    });

    const solarCellMat = new THREE.MeshStandardMaterial({
      color: 0x112233,
      roughness: 0.2,
      metalness: 0.8
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.45
    });

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xCBD5E1,
      metalness: 0.8,
      roughness: 0.25
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xB45309,
      metalness: 0.7,
      roughness: 0.3
    });

    // 1. Base / Battery Platform (Bottom)
    const baseGeo = new THREE.BoxGeometry(1.6, 0.25, 1.3);
    const baseMesh = new THREE.Mesh(baseGeo, navyFrameMat);
    baseMesh.position.y = 0.125;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    this.modelGroup.add(baseMesh);
    this.components.base = baseMesh;

    // Battery Pack inside base
    const batteryGeo = new THREE.BoxGeometry(0.8, 0.18, 0.9);
    const batteryMat = new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: 0.4 });
    const batteryMesh = new THREE.Mesh(batteryGeo, batteryMat);
    batteryMesh.position.set(-0.2, 0.125, 0);
    this.modelGroup.add(batteryMesh);
    this.components.battery = batteryMesh;

    // MPPT Solar Charge Controller box
    const mpptGeo = new THREE.BoxGeometry(0.35, 0.16, 0.5);
    const mpptMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.3 });
    const mpptMesh = new THREE.Mesh(mpptGeo, mpptMat);
    mpptMesh.position.set(0.5, 0.125, 0.2);
    this.modelGroup.add(mpptMesh);
    this.components.mppt = mpptMesh;

    // 2. Insulated Chamber Walls
    const chamberGroup = new THREE.Group();
    chamberGroup.position.y = 1.15; // center of chamber

    // Outer Back wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.6, 0.08), bodyMat);
    backWall.position.z = -0.56;
    chamberGroup.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.6, 1.12), bodyMat);
    leftWall.position.x = -0.71;
    chamberGroup.add(leftWall);
    this.components.leftWall = leftWall;

    // Right Wall
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.6, 1.12), bodyMat);
    rightWall.position.x = 0.71;
    chamberGroup.add(rightWall);
    this.components.rightWall = rightWall;

    // Top Roof
    const roofMesh = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 1.2), bodyMat);
    roofMesh.position.y = 0.84;
    chamberGroup.add(roofMesh);
    this.components.roof = roofMesh;

    // PUF Insulation layer lining
    const innerInsulation = new THREE.Mesh(new THREE.BoxGeometry(1.36, 1.48, 0.04), insulationMat);
    innerInsulation.position.z = -0.5;
    chamberGroup.add(innerInsulation);

    this.modelGroup.add(chamberGroup);
    this.components.chamber = chamberGroup;

    // 3. Shelves inside
    const shelfGroup = new THREE.Group();
    const shelfGeo = new THREE.BoxGeometry(1.3, 0.03, 0.95);
    
    const shelf1 = new THREE.Mesh(shelfGeo, steelMat);
    shelf1.position.set(0, 0.8, -0.05);
    shelfGroup.add(shelf1);

    const shelf2 = new THREE.Mesh(shelfGeo, steelMat);
    shelf2.position.set(0, 1.35, -0.05);
    shelfGroup.add(shelf2);

    this.modelGroup.add(shelfGroup);
    this.components.shelves = shelfGroup;

    // 4. Stored Vegetables (Tomatoes, Cabbage, Greens, Carrots)
    const vegGroup = new THREE.Group();

    // Red Tomatoes on lower shelf
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.3 });
    const tomatoGeo = new THREE.SphereGeometry(0.07, 8, 8);
    for (let i = -2; i <= 2; i++) {
      for (let j = -1; j <= 1; j++) {
        const tomato = new THREE.Mesh(tomatoGeo, tomatoMat);
        tomato.position.set(i * 0.18 - 0.2, 0.88, j * 0.18 - 0.1);
        vegGroup.add(tomato);
      }
    }

    // Green Cabbages & Capsicums on top shelf
    const cabbageMat = new THREE.MeshStandardMaterial({ color: 0x16A34A, roughness: 0.6 });
    const cabbageGeo = new THREE.SphereGeometry(0.12, 10, 10);
    for (let k = -1; k <= 1; k++) {
      const cabbage = new THREE.Mesh(cabbageGeo, cabbageMat);
      cabbage.position.set(k * 0.35 + 0.1, 1.48, -0.15);
      vegGroup.add(cabbage);
    }

    // Carrots / Leafy bundle on top shelf
    const carrotMat = new THREE.MeshStandardMaterial({ color: 0xEA580C, roughness: 0.4 });
    const carrotGeo = new THREE.CylinderGeometry(0.02, 0.04, 0.25, 8);
    for (let m = 0; m < 4; m++) {
      const carrot = new THREE.Mesh(carrotGeo, carrotMat);
      carrot.rotation.z = Math.PI / 2.5;
      carrot.position.set(-0.45 + m * 0.08, 1.4, 0.15);
      vegGroup.add(carrot);
    }

    this.modelGroup.add(vegGroup);
    this.components.produce = vegGroup;

    // 5. Front Transparent Door with Navy Frame and Handle
    const doorGroup = new THREE.Group();
    doorGroup.position.set(-0.75, 1.15, 0.58); // hinge on the left

    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.6, 0.04), navyFrameMat);
    doorFrame.position.set(0.75, 0, 0);

    const doorGlass = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.4, 0.02), glassMat);
    doorGlass.position.set(0.75, 0, 0);

    const doorHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8), steelMat);
    doorHandle.position.set(1.4, 0, 0.06);

    doorGroup.add(doorFrame);
    doorGroup.add(doorGlass);
    doorGroup.add(doorHandle);

    this.modelGroup.add(doorGroup);
    this.components.door = doorGroup;
    this.components.doorGlass = doorGlass;

    // 6. Rooftop Solar Array
    const solarGroup = new THREE.Group();
    solarGroup.position.set(0, 2.12, 0);

    // Tilted frame
    const solarFrame = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.04, 1.35), navyFrameMat);
    solarFrame.rotation.x = -0.12; // tilt towards sun
    solarGroup.add(solarFrame);

    // Solar PV Photovoltaic panel surface
    const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.02, 1.25), solarCellMat);
    solarPanel.position.y = 0.03;
    solarPanel.rotation.x = -0.12;
    solarGroup.add(solarPanel);

    // Solar cell grid lines (aesthetic detail)
    const gridMat = new THREE.MeshBasicMaterial({ color: 0x475569, wireframe: true });
    const solarGrid = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.2, 6, 4), gridMat);
    solarGrid.rotation.x = -Math.PI / 2 - 0.12;
    solarGrid.position.set(0, 0.045, 0);
    solarGroup.add(solarGrid);

    this.modelGroup.add(solarGroup);
    this.components.solar = solarGroup;

    // 7. Side DC Cooling Unit (Heat sink + Heat Exhaust Fan + Internal Evaporator)
    const coolingGroup = new THREE.Group();
    coolingGroup.position.set(0.76, 1.15, -0.1);

    // Heat sink fins
    const heatsink = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.4, 0.4), copperMat);
    coolingGroup.add(heatsink);

    // External exhaust fan guard
    const fanGuard = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16), steelMat);
    fanGuard.rotation.z = Math.PI / 2;
    fanGuard.position.x = 0.1;
    coolingGroup.add(fanGuard);

    // Fan blades (animated)
    const bladesGeo = new THREE.BoxGeometry(0.02, 0.26, 0.06);
    const bladesMat = new THREE.MeshStandardMaterial({ color: 0x1E293B });
    const extFan = new THREE.Mesh(bladesGeo, bladesMat);
    extFan.position.x = 0.09;
    coolingGroup.add(extFan);
    this.animatingFans.push(extFan);

    // Internal circulation fan
    const intFan = new THREE.Mesh(bladesGeo, bladesMat);
    intFan.position.set(-0.15, 0, 0);
    coolingGroup.add(intFan);
    this.animatingFans.push(intFan);

    this.modelGroup.add(coolingGroup);
    this.components.cooling = coolingGroup;

    // 8. IoT Sensor & Edge Gateway Enclosure (ESP32, Antenna, DHT22)
    const electronicsGroup = new THREE.Group();
    electronicsGroup.position.set(-0.77, 1.4, 0.2);

    const espBox = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.3, 0.25), navyFrameMat);
    electronicsGroup.add(espBox);

    // GSM / LoRa Antenna
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.015, 0.35, 8), steelMat);
    antenna.position.set(0, 0.25, 0);
    electronicsGroup.add(antenna);

    // Status LED (green pulse)
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x10B981 });
    const ledMesh = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), ledMat);
    ledMesh.position.set(-0.045, 0.05, 0.05);
    electronicsGroup.add(ledMesh);

    // Internal DHT22 Sensor probe inside chamber
    const dhtMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8 });
    const dhtProbe = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.04), dhtMat);
    dhtProbe.position.set(0.1, 0, 0);
    electronicsGroup.add(dhtProbe);

    this.modelGroup.add(electronicsGroup);
    this.components.electronics = electronicsGroup;

    // Center entire model group
    this.modelGroup.position.y = -0.9;
    this.scene.add(this.modelGroup);
  }

  buildAirflowParticles() {
    // Blue particles for Cold Air circulation inside
    const coldCount = 120;
    const coldGeo = new THREE.BufferGeometry();
    const coldPos = new Float32Array(coldCount * 3);

    for (let i = 0; i < coldCount; i++) {
      coldPos[i * 3] = (Math.random() - 0.5) * 1.0;
      coldPos[i * 3 + 1] = 0.2 + Math.random() * 1.4;
      coldPos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    coldGeo.setAttribute('position', new THREE.BufferAttribute(coldPos, 3));

    const coldMat = new THREE.PointsMaterial({
      color: 0x38BDF8,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particlesCold = new THREE.Points(coldGeo, coldMat);
    this.particlesCold.visible = this.options.showAirflow;
    this.modelGroup.add(this.particlesCold);

    // Red particles for Heat Rejection exhausting out side
    const hotCount = 80;
    const hotGeo = new THREE.BufferGeometry();
    const hotPos = new Float32Array(hotCount * 3);

    for (let j = 0; j < hotCount; j++) {
      hotPos[j * 3] = 0.8 + Math.random() * 0.6;
      hotPos[j * 3 + 1] = 0.9 + (Math.random() - 0.5) * 0.3;
      hotPos[j * 3 + 2] = -0.1 + (Math.random() - 0.5) * 0.4;
    }
    hotGeo.setAttribute('position', new THREE.BufferAttribute(hotPos, 3));

    const hotMat = new THREE.PointsMaterial({
      color: 0xEF4444,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particlesHot = new THREE.Points(hotGeo, hotMat);
    this.particlesHot.visible = this.options.showAirflow;
    this.modelGroup.add(this.particlesHot);
  }

  setView(viewName) {
    this.currentView = viewName;

    // Reset exploded factor
    this.targetExplodedFactor = 0;

    switch (viewName) {
      case 'front':
        this.targetDoorAngle = 0;
        this.setDoorTransparency(0.4);
        this.setCutawayWallVisibility(true);
        this.setAirflowVisibility(false);
        this.tweenCamera(2.8, 1.8, 3.8);
        break;

      case 'cutaway':
        this.targetDoorAngle = 1.3; // open door
        this.setDoorTransparency(0.15);
        this.setCutawayWallVisibility(false);
        this.setAirflowVisibility(false);
        this.tweenCamera(2.2, 1.4, 3.0);
        break;

      case 'electronics':
        this.targetDoorAngle = 0;
        this.setDoorTransparency(0.4);
        this.setCutawayWallVisibility(true);
        this.setAirflowVisibility(false);
        this.tweenCamera(-2.5, 1.6, 1.8);
        break;

      case 'power':
        this.targetDoorAngle = 0;
        this.setDoorTransparency(0.4);
        this.setCutawayWallVisibility(true);
        this.setAirflowVisibility(false);
        this.tweenCamera(0.5, 3.8, 2.6);
        break;

      case 'exploded':
        this.targetExplodedFactor = 1.0;
        this.targetDoorAngle = 0.4;
        this.setDoorTransparency(0.3);
        this.setCutawayWallVisibility(true);
        this.setAirflowVisibility(false);
        this.tweenCamera(3.6, 2.6, 4.4);
        break;

      case 'airflow':
        this.targetDoorAngle = 0;
        this.setDoorTransparency(0.15);
        this.setCutawayWallVisibility(false);
        this.setAirflowVisibility(true);
        this.tweenCamera(2.5, 1.5, 3.2);
        break;
    }
  }

  setAirflowVisibility(visible) {
    if (this.particlesCold) this.particlesCold.visible = visible;
    if (this.particlesHot) this.particlesHot.visible = visible;
  }

  setDoorTransparency(opacity) {
    if (this.components.doorGlass) {
      this.components.doorGlass.material.opacity = opacity;
    }
  }

  setCutawayWallVisibility(visible) {
    if (this.components.rightWall) {
      this.components.rightWall.material.wireframe = !visible;
      this.components.rightWall.material.opacity = visible ? 1.0 : 0.2;
      this.components.rightWall.material.transparent = !visible;
    }
  }

  tweenCamera(targetX, targetY, targetZ) {
    if (!this.camera) return;
    const startPos = this.camera.position.clone();
    const endPos = new THREE.Vector3(targetX, targetY, targetZ);
    let progress = 0;

    const animateCam = () => {
      progress += 0.05;
      this.camera.position.lerpVectors(startPos, endPos, progress);
      if (this.controls) this.controls.target.set(0, 0.2, 0);
      if (progress < 1) {
        requestAnimationFrame(animateCam);
      }
    };
    animateCam();
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Update orbit controls
    if (this.controls) {
      this.controls.update();
    }

    // Rotate fans
    this.animatingFans.forEach(fan => {
      fan.rotation.x += 0.25;
    });

    // Smooth door opening interpolation
    this.doorAngle += (this.targetDoorAngle - this.doorAngle) * 0.08;
    if (this.components.door) {
      this.components.door.rotation.y = -this.doorAngle;
    }

    // Smooth exploded view interpolation
    this.explodedFactor += (this.targetExplodedFactor - this.explodedFactor) * 0.06;
    if (this.components.solar) {
      this.components.solar.position.y = 2.12 + this.explodedFactor * 0.6;
    }
    if (this.components.cooling) {
      this.components.cooling.position.x = 0.76 + this.explodedFactor * 0.5;
    }
    if (this.components.electronics) {
      this.components.electronics.position.x = -0.77 - this.explodedFactor * 0.5;
    }
    if (this.components.shelves) {
      this.components.shelves.position.z = -this.explodedFactor * 0.4;
    }

    // Animate airflow particles
    if (this.particlesCold && this.particlesCold.visible) {
      const positions = this.particlesCold.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.008; // move downwards (cold air drops)
        if (positions[i] < 0.2) {
          positions[i] = 1.6;
        }
      }
      this.particlesCold.geometry.attributes.position.needsUpdate = true;
    }

    if (this.particlesHot && this.particlesHot.visible) {
      const hotPos = this.particlesHot.geometry.attributes.position.array;
      for (let j = 0; j < hotPos.length; j += 3) {
        hotPos[j] += 0.012; // push hot exhaust outward to the right
        if (hotPos[j] > 1.8) {
          hotPos[j] = 0.8;
        }
      }
      this.particlesHot.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global initialization helper
window.FreshVault3D = {
  createViewer: (elementId, options) => new ColdStorage3DViewer(elementId, options)
};
