/* ==========================================================================
   FreshVault NER - Live IoT Monitoring Telemetry Engine (Chart.js)
   Smart Mini Cold Storage for North Eastern Region
   ========================================================================== */

const DASHBOARD_CROPS_REGISTRY = {
  tomato: {
    id: 'tomato',
    name: 'Tomato',
    icon: '🍅',
    scientific: 'Solanum lycopersicum',
    tempMin: 10.0,
    tempMax: 14.0,
    tempSetpoint: 12.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    durationDays: [14, 21],
    powerDutyEst: '38W – 45W (DC 12V)',
    notes: 'Optimal moderate chill to prevent lycopene degradation and chilling injury.'
  },
  cabbage: {
    id: 'cabbage',
    name: 'Cabbage',
    icon: '🥬',
    scientific: 'Brassica oleracea',
    tempMin: 0.0,
    tempMax: 4.0,
    tempSetpoint: 2.0,
    humMin: 90,
    humMax: 95,
    humSetpoint: 94,
    durationDays: [30, 45],
    powerDutyEst: '48W – 56W (DC 12V)',
    notes: 'Near-zero temperature with near-saturation humidity preserves wrapper integrity.'
  },
  cauliflower: {
    id: 'cauliflower',
    name: 'Cauliflower',
    icon: '🥦',
    scientific: 'Brassica oleracea botrytis',
    tempMin: 0.0,
    tempMax: 4.0,
    tempSetpoint: 1.5,
    humMin: 90,
    humMax: 95,
    humSetpoint: 93,
    durationDays: [14, 21],
    powerDutyEst: '46W – 55W (DC 12V)',
    notes: 'Preserves compact white curd and prevents browning or riceyness.'
  },
  king_chilli: {
    id: 'king_chilli',
    name: 'King Chilli / Bhut Jolokia',
    icon: '🔥',
    scientific: 'Capsicum chinense Jacq.',
    tempMin: 7.5,
    tempMax: 10.5,
    tempSetpoint: 9.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    durationDays: [20, 30],
    powerDutyEst: '35W – 42W (DC 12V)',
    notes: 'Preserves extreme SHU pungency and delicate aromatic cuticle without surface pitting.'
  },
  ginger: {
    id: 'ginger',
    name: 'Fresh Ginger (Nadia)',
    icon: '🫚',
    scientific: 'Zingiber officinale',
    tempMin: 12.0,
    tempMax: 14.0,
    tempSetpoint: 13.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    durationDays: [60, 120],
    powerDutyEst: '22W – 28W (DC 12V)',
    notes: 'Extremely chilling sensitive below 12°C. Maintains firm fibrous rhizome structure.'
  },
  khasi_mandarin: {
    id: 'khasi_mandarin',
    name: 'Khasi Mandarin (Orange)',
    icon: '🍊',
    scientific: 'Citrus reticulata',
    tempMin: 5.0,
    tempMax: 8.0,
    tempSetpoint: 6.5,
    humMin: 88,
    humMax: 92,
    humSetpoint: 90,
    durationDays: [28, 45],
    powerDutyEst: '34W – 42W (DC 12V)',
    notes: 'Maintains sugar-acid balance, high juice content, and prevents peel oleocellosis.'
  },
  pineapple: {
    id: 'pineapple',
    name: 'Kew Pineapple / Queen',
    icon: '🍍',
    scientific: 'Ananas comosus',
    tempMin: 8.0,
    tempMax: 12.0,
    tempSetpoint: 10.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    durationDays: [18, 28],
    powerDutyEst: '38W – 46W (DC 12V)',
    notes: 'Prevents black heart internal breakdown by preventing chilling below 7°C.'
  },
  potato: {
    id: 'potato',
    name: 'Potato',
    icon: '🥔',
    scientific: 'Solanum tuberosum',
    tempMin: 8.0,
    tempMax: 12.0,
    tempSetpoint: 10.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    durationDays: [60, 90],
    powerDutyEst: '25W – 32W (DC 12V)',
    notes: 'Prevents cold-induced sweetening and eye sprouting in high-altitude storage.'
  },
  carrot: {
    id: 'carrot',
    name: 'Carrot',
    icon: '🥕',
    scientific: 'Daucus carota',
    tempMin: 0.0,
    tempMax: 4.0,
    tempSetpoint: 1.0,
    humMin: 95,
    humMax: 98,
    humSetpoint: 96,
    durationDays: [30, 45],
    powerDutyEst: '42W – 50W (DC 12V)',
    notes: 'High humidity preserves root turgidity, sweet carotene core, and snap crunch.'
  },
  green_beans: {
    id: 'green_beans',
    name: 'Green Beans',
    icon: '🫘',
    scientific: 'Phaseolus vulgaris',
    tempMin: 5.0,
    tempMax: 8.0,
    tempSetpoint: 6.5,
    humMin: 90,
    humMax: 95,
    humSetpoint: 92,
    durationDays: [8, 14],
    powerDutyEst: '35W – 44W (DC 12V)',
    notes: 'Prevents russeting and fibrous toughening by avoiding sub-5°C exposure.'
  },
  leafy_greens: {
    id: 'leafy_greens',
    name: 'Leafy Greens (Lai Xaak)',
    icon: '🥗',
    scientific: 'Brassica juncea',
    tempMin: 0.0,
    tempMax: 2.0,
    tempSetpoint: 1.0,
    humMin: 95,
    humMax: 98,
    humSetpoint: 97,
    durationDays: [5, 8],
    powerDutyEst: '50W – 58W (DC 12V)',
    notes: 'Maximum humidity and low chill avoid rapid wilting and chlorophyll yellowing.'
  },
  cucumber: {
    id: 'cucumber',
    name: 'Cucumber',
    icon: '🥒',
    scientific: 'Cucumis sativus',
    tempMin: 10.0,
    tempMax: 13.0,
    tempSetpoint: 11.5,
    humMin: 90,
    humMax: 95,
    humSetpoint: 92,
    durationDays: [10, 14],
    powerDutyEst: '32W – 40W (DC 12V)',
    notes: 'Chilling sensitive below 10°C; prevents water-soaked lesion collapse.'
  },
  capsicum: {
    id: 'capsicum',
    name: 'Capsicum / Bell Pepper',
    icon: '🫑',
    scientific: 'Capsicum annuum',
    tempMin: 7.0,
    tempMax: 10.0,
    tempSetpoint: 8.5,
    humMin: 90,
    humMax: 95,
    humSetpoint: 92,
    durationDays: [14, 18],
    powerDutyEst: '36W – 42W (DC 12V)',
    notes: 'Maintains glossy rigid walls and calyx hydration without mold.'
  },
  chilli: {
    id: 'chilli',
    name: 'Green Chilli',
    icon: '🌶️',
    scientific: 'Capsicum frutescens',
    tempMin: 8.0,
    tempMax: 12.0,
    tempSetpoint: 9.5,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    durationDays: [14, 21],
    powerDutyEst: '34W – 40W (DC 12V)',
    notes: 'Maintains pod glossiness and heat retention in mountain air.'
  },
  mixed_cabbage_tomato: {
    id: 'mixed_cabbage_tomato',
    name: 'Mixed Load: Cabbage + Tomato',
    icon: '🥗',
    scientific: 'Brassica oleracea + Solanum lycopersicum',
    tempMin: 10.0,
    tempMax: 14.0,
    tempSetpoint: 10.0,
    humMin: 88,
    humMax: 93,
    humSetpoint: 90,
    durationDays: [14, 21],
    powerDutyEst: '44W – 52W (DC 12V)',
    notes: 'Compromise setpoint: 10°C protects Tomato chilling floor while safely holding Cabbage.'
  },
  mixed_cole_roots: {
    id: 'mixed_cole_roots',
    name: 'Mixed Load: Cole & Roots',
    icon: '🥦',
    scientific: 'Cabbage + Cauliflower + Carrot',
    tempMin: 0.0,
    tempMax: 4.0,
    tempSetpoint: 1.5,
    humMin: 92,
    humMax: 98,
    humSetpoint: 95,
    durationDays: [14, 21],
    powerDutyEst: '48W – 56W (DC 12V)',
    notes: 'Full direct thermal overlap (0°–4°C). Limiting bottleneck: Cauliflower (14–21d).'
  },
  mixed_ner_spices: {
    id: 'mixed_ner_spices',
    name: 'Mixed Load: NER Spices & Citrus',
    icon: '🔥',
    scientific: 'King Chilli + Fresh Ginger + Mandarin',
    tempMin: 12.0,
    tempMax: 14.0,
    tempSetpoint: 12.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    durationDays: [20, 30],
    powerDutyEst: '36W – 45W (DC 12V)',
    notes: 'Guards Ginger chilling floor (12°C). High value export spice preservation mode.'
  }
};

class FreshVaultDashboard {
  constructor() {
    this.selectedCropId = 'tomato';
    this.telemetry = {
      selectedCrop: 'Tomato',
      selectedCropIcon: '🍅',
      temperature: 12.2,
      tempMin: 10.0,
      tempMax: 14.0,
      tempSetpoint: 12.0,
      humidity: 88,
      humMin: 85,
      humMax: 90,
      humSetpoint: 88,
      durationDays: [14, 21],
      coolingPowerDuty: '38W – 45W (DC 12V)',
      battery: 78,
      solarInputWatts: 142,
      coolingState: true,
      doorState: 'CLOSED',
      connectivity: 'GSM / LoRa',
      storageStatus: 'OPTIMAL',
      freshnessInsight: 'OPTIMAL',
      timeHistory: ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00'],
      tempHistory: [12.8, 12.5, 12.3, 12.1, 11.9, 12.0, 12.2, 12.3, 12.2],
      humHistory: [86, 87, 87, 88, 89, 88, 88, 87, 88],
      battHistory: [72, 73, 74, 75, 76, 77, 78, 78, 78],
      coolingDutyHistory: [70, 65, 55, 45, 40, 35, 40, 45, 42]
    };

    this.charts = {};
    this.updateInterval = null;
    this.init();
  }

  init() {
    this.renderMetricCards();
    this.initCharts();
    this.bindEvents();
    this.startLiveSimulation();
  }

  changeCropById(cropId) {
    const crop = DASHBOARD_CROPS_REGISTRY[cropId];
    if (!crop) return;

    this.selectedCropId = cropId;
    this.setCrop(crop);

    // Sync dropdown value
    const cropSelect = document.getElementById('dash-crop-select');
    if (cropSelect) {
      cropSelect.value = cropId;
    }

    // Sync active class on quick chips
    const chips = document.querySelectorAll('.dash-crop-chip');
    chips.forEach(chip => {
      if (chip.getAttribute('data-crop') === cropId) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    this.showToast(`🌾 Live Chamber Protocol Switched to: ${crop.name} ${crop.icon} (Target: ${crop.tempSetpoint}°C | ${crop.humSetpoint}% RH)`);
  }

  setCrop(crop) {
    if (!crop) return;

    this.telemetry.selectedCrop = crop.name;
    this.telemetry.selectedCropIcon = crop.icon || '🌱';
    this.telemetry.tempMin = crop.tempMin;
    this.telemetry.tempMax = crop.tempMax;
    this.telemetry.tempSetpoint = crop.tempSetpoint;
    this.telemetry.humMin = crop.humMin;
    this.telemetry.humMax = crop.humMax;
    this.telemetry.humSetpoint = crop.humSetpoint;
    this.telemetry.durationDays = crop.durationDays || [14, 21];
    this.telemetry.coolingPowerDuty = crop.powerDutyEst || '40W DC Load';

    // Set immediate realistic temperature and humidity around setpoint
    this.telemetry.temperature = parseFloat((crop.tempSetpoint + (Math.random() * 0.4 - 0.2)).toFixed(1));
    this.telemetry.humidity = Math.round(crop.humSetpoint + (Math.random() * 2 - 1));

    // Recalculate recent chart history for temperature & humidity
    const pointsCount = this.telemetry.timeHistory.length;
    this.telemetry.tempHistory = Array.from({ length: pointsCount }, (_, i) => {
      const progress = i / (pointsCount - 1);
      const startTemp = crop.tempSetpoint + 1.2 - (progress * 1.2);
      const jitter = (Math.sin(i * 1.2) * 0.25);
      return parseFloat((startTemp + jitter).toFixed(1));
    });

    this.telemetry.humHistory = Array.from({ length: pointsCount }, (_, i) => {
      const jitter = Math.round(Math.sin(i * 0.9) * 1.5);
      return Math.min(99, Math.max(50, crop.humSetpoint + jitter));
    });

    // Update charts dynamically with new Y scales and datasets
    this.updateChartsScale();

    // Re-render UI
    this.renderMetricCards();

    // Trigger visual pulse animation on cards
    this.pulseCards();
  }

  pulseCards() {
    const cards = document.querySelectorAll('.telemetry-card');
    cards.forEach(card => {
      card.classList.remove('pulse-updated');
      void card.offsetWidth;
      card.classList.add('pulse-updated');
    });
  }

  renderMetricCards() {
    // 1. Topbar Crop Pill
    const cropPill = document.getElementById('dash-crop-pill');
    if (cropPill) {
      cropPill.textContent = `CROP: ${this.telemetry.selectedCrop} ${this.telemetry.selectedCropIcon}`;
    }

    // 2. Metric Values
    const tempEl = document.getElementById('dash-temp-val');
    const tempTargetEl = document.getElementById('dash-temp-target');
    const humEl = document.getElementById('dash-hum-val');
    const humTargetEl = document.getElementById('dash-hum-target');
    const battEl = document.getElementById('dash-batt-val');
    const solarEl = document.getElementById('dash-solar-val');
    const coolingEl = document.getElementById('dash-cooling-val');
    const doorEl = document.getElementById('dash-door-val');
    const connEl = document.getElementById('dash-conn-val');
    const insightEl = document.getElementById('dash-insight-val');
    const insightSubtext = document.getElementById('dash-insight-subtext');

    if (tempEl) tempEl.textContent = `${this.telemetry.temperature.toFixed(1)}°C`;
    if (tempTargetEl) {
      tempTargetEl.textContent = `Target: ${this.telemetry.tempMin.toFixed(1)}°C – ${this.telemetry.tempMax.toFixed(1)}°C (Setpoint: ${this.telemetry.tempSetpoint.toFixed(1)}°C)`;
    }

    if (humEl) humEl.textContent = `${Math.round(this.telemetry.humidity)}%`;
    if (humTargetEl) {
      humTargetEl.textContent = `Target: ${this.telemetry.humMin}% – ${this.telemetry.humMax}% RH (Setpoint: ${this.telemetry.humSetpoint}%)`;
    }

    if (battEl) battEl.textContent = `${Math.round(this.telemetry.battery)}%`;
    if (solarEl) solarEl.textContent = `${this.telemetry.solarInputWatts}W (Available)`;
    if (coolingEl) coolingEl.textContent = this.telemetry.coolingState ? `ON (${this.telemetry.coolingPowerDuty})` : 'IDLE / OFF';
    if (doorEl) doorEl.textContent = this.telemetry.doorState;
    if (connEl) connEl.textContent = this.telemetry.connectivity;

    if (insightEl) insightEl.textContent = 'OPTIMAL';
    if (insightSubtext) {
      insightSubtext.textContent = `Est. Safe Window: ~${this.telemetry.durationDays[0]}–${this.telemetry.durationDays[1]} Days`;
    }
  }

  initCharts() {
    if (typeof Chart === 'undefined') return;

    // Common Chart Defaults
    Chart.defaults.color = '#94A3B8';
    Chart.defaults.borderColor = '#334155';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // 1. Temperature vs Time Chart
    const tempCtx = document.getElementById('chart-temp');
    if (tempCtx) {
      const yMin = Math.max(-2, Math.floor(this.telemetry.tempMin - 3));
      const yMax = Math.ceil(this.telemetry.tempMax + 4);

      this.charts.temp = new Chart(tempCtx, {
        type: 'line',
        data: {
          labels: this.telemetry.timeHistory,
          datasets: [{
            label: 'Chamber Temp (°C)',
            data: this.telemetry.tempHistory,
            borderColor: '#38BDF8',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 3,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: yMin,
              max: yMax,
              grid: { color: '#1E293B' },
              ticks: { callback: v => v + '°C' }
            },
            x: { grid: { display: false } }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // 2. Humidity vs Time Chart
    const humCtx = document.getElementById('chart-humidity');
    if (humCtx) {
      const humYMin = Math.max(50, Math.floor(this.telemetry.humMin - 10));

      this.charts.humidity = new Chart(humCtx, {
        type: 'line',
        data: {
          labels: this.telemetry.timeHistory,
          datasets: [{
            label: 'Humidity (%)',
            data: this.telemetry.humHistory,
            borderColor: '#34D399',
            backgroundColor: 'rgba(52, 211, 153, 0.12)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: humYMin,
              max: 100,
              grid: { color: '#1E293B' },
              ticks: { callback: v => v + '%' }
            },
            x: { grid: { display: false } }
          },
          plugins: { legend: { display: false } }
        }
      });
    }

    // 3. Battery & Solar Input Chart
    const battCtx = document.getElementById('chart-battery');
    if (battCtx) {
      this.charts.battery = new Chart(battCtx, {
        type: 'line',
        data: {
          labels: this.telemetry.timeHistory,
          datasets: [{
            label: 'Battery SoC (%)',
            data: this.telemetry.battHistory,
            borderColor: '#FBBF24',
            backgroundColor: 'rgba(251, 191, 36, 0.08)',
            fill: true,
            tension: 0.3,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { min: 50, max: 100, grid: { color: '#1E293B' }, ticks: { callback: v => v + '%' } },
            x: { grid: { display: false } }
          },
          plugins: { legend: { display: false } }
        }
      });
    }

    // 4. Cooling Activity Chart
    const coolCtx = document.getElementById('chart-cooling');
    if (coolCtx) {
      this.charts.cooling = new Chart(coolCtx, {
        type: 'bar',
        data: {
          labels: this.telemetry.timeHistory,
          datasets: [{
            label: 'Cooling Duty Cycle (%)',
            data: this.telemetry.coolingDutyHistory,
            backgroundColor: 'rgba(56, 189, 248, 0.65)',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { min: 0, max: 100, grid: { color: '#1E293B' }, ticks: { callback: v => v + '%' } },
            x: { grid: { display: false } }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  updateChartsScale() {
    if (this.charts.temp) {
      const yMin = Math.max(-2, Math.floor(this.telemetry.tempMin - 3));
      const yMax = Math.ceil(this.telemetry.tempMax + 4);
      this.charts.temp.options.scales.y.min = yMin;
      this.charts.temp.options.scales.y.max = yMax;
      this.charts.temp.data.datasets[0].data = [...this.telemetry.tempHistory];
      this.charts.temp.update();
    }

    if (this.charts.humidity) {
      const humYMin = Math.max(50, Math.floor(this.telemetry.humMin - 10));
      this.charts.humidity.options.scales.y.min = humYMin;
      this.charts.humidity.options.scales.y.max = 100;
      this.charts.humidity.data.datasets[0].data = [...this.telemetry.humHistory];
      this.charts.humidity.update();
    }
  }

  bindEvents() {
    // 1. Dashboard Crop Select Dropdown
    const cropSelect = document.getElementById('dash-crop-select');
    if (cropSelect) {
      cropSelect.addEventListener('change', (e) => {
        this.changeCropById(e.target.value);
      });
    }

    // 2. Dashboard Quick Crop Chips
    const cropChips = document.querySelectorAll('.dash-crop-chip');
    cropChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cropId = chip.getAttribute('data-crop');
        if (cropId) {
          this.changeCropById(cropId);
        }
      });
    });

    // 3. Interactive Simulation Controls
    const btnSimDoor = document.getElementById('btn-sim-door');
    if (btnSimDoor) {
      btnSimDoor.addEventListener('click', () => {
        if (this.telemetry.doorState === 'CLOSED') {
          this.telemetry.doorState = 'OPEN (ALERT)';
          this.telemetry.temperature += 2.2;
          this.telemetry.humidity -= 7;
          btnSimDoor.textContent = '🚪 Close Storage Door';
          btnSimDoor.classList.add('active');
        } else {
          this.telemetry.doorState = 'CLOSED';
          this.telemetry.temperature = parseFloat((this.telemetry.tempSetpoint + 0.2).toFixed(1));
          this.telemetry.humidity = this.telemetry.humSetpoint;
          btnSimDoor.textContent = '🚪 Simulate Door Opening';
          btnSimDoor.classList.remove('active');
        }
        this.renderMetricCards();
        this.pushTelemetryPoint();
      });
    }

    const btnSimCooling = document.getElementById('btn-sim-cooling');
    if (btnSimCooling) {
      btnSimCooling.addEventListener('click', () => {
        this.telemetry.coolingState = !this.telemetry.coolingState;
        this.renderMetricCards();
      });
    }

    const btnPingSync = document.getElementById('btn-ping-sync');
    if (btnPingSync) {
      btnPingSync.addEventListener('click', () => {
        const prevText = btnPingSync.textContent;
        btnPingSync.textContent = '📡 Transmitting via LoRa & 4G...';
        btnPingSync.disabled = true;
        setTimeout(() => {
          btnPingSync.textContent = '✅ Telemetry Synced';
          setTimeout(() => {
            btnPingSync.textContent = prevText;
            btnPingSync.disabled = false;
          }, 1500);
        }, 1000);
      });
    }
  }

  startLiveSimulation() {
    // Periodic slight jitter within the selected crop's active safe band
    this.updateInterval = setInterval(() => {
      if (this.telemetry.doorState === 'CLOSED') {
        const tempNoise = (Math.random() - 0.5) * 0.12;
        const boundedTemp = Math.max(
          this.telemetry.tempMin,
          Math.min(this.telemetry.tempMax, this.telemetry.temperature + tempNoise)
        );
        this.telemetry.temperature = parseFloat(boundedTemp.toFixed(1));

        const humNoise = (Math.random() - 0.5) * 0.4;
        const boundedHum = Math.max(
          this.telemetry.humMin,
          Math.min(this.telemetry.humMax, this.telemetry.humidity + humNoise)
        );
        this.telemetry.humidity = Math.round(boundedHum);
      }

      this.renderMetricCards();
    }, 3500);
  }

  pushTelemetryPoint() {
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

    if (this.charts.temp) {
      this.charts.temp.data.labels.push(timeStr);
      this.charts.temp.data.datasets[0].data.push(this.telemetry.temperature);
      if (this.charts.temp.data.labels.length > 10) {
        this.charts.temp.data.labels.shift();
        this.charts.temp.data.datasets[0].data.shift();
      }
      this.charts.temp.update();
    }

    if (this.charts.humidity) {
      this.charts.humidity.data.labels.push(timeStr);
      this.charts.humidity.data.datasets[0].data.push(this.telemetry.humidity);
      if (this.charts.humidity.data.labels.length > 10) {
        this.charts.humidity.data.labels.shift();
        this.charts.humidity.data.datasets[0].data.shift();
      }
      this.charts.humidity.update();
    }
  }

  showToast(msg) {
    let toast = document.getElementById('detect-toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'detect-toast-notification';
      toast.className = 'detect-toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.FreshVaultDash = new FreshVaultDashboard();
});
