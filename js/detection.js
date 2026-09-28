/* ==========================================================================
   FreshVault NER - Crop Detection & Microclimate Protocol Engine
   Solar-Powered Smart Mini Cold Storage for North Eastern Region
   ========================================================================== */

const CROP_DETECTION_REGISTRY = {
  tomato: {
    id: 'tomato',
    name: 'Tomato',
    scientific: 'Solanum lycopersicum',
    category: 'vegetables',
    categoryLabel: 'Solanaceous Vegetable',
    icon: '🍅',
    isNerSpecial: false,
    regionNotes: 'Critical perishability crop in Meghalaya & Assam hills. Vulnerable to rapid softening in humid transport.',
    durationDays: [14, 21],
    durationHours: [336, 504],
    ambientDays: 4,
    tempMin: 10.0,
    tempMax: 14.0,
    tempSetpoint: 12.0,
    chillingFloor: 10.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    respirationRate: 'Moderate (20–30 mg CO₂/kg·h)',
    ethyleneClass: 'High Producer / Highly Sensitive',
    powerDutyEst: '38W – 45W DC Load',
    precooling: 'Room Pre-cooling or Forced Air within 3h of harvest',
    notes: 'Sensitive to chilling injury below 10°C; do not overcool. Maintain moderate chill to preserve lycopene and skin elasticity.',
    decayPhases: {
      peak: 'Days 1–8: Crisp pericarp & full aroma',
      good: 'Days 9–16: Prime market grade for aggregation',
      critical: 'Days 17–21: Immediate dispatch/processing'
    }
  },
  potato: {
    id: 'potato',
    name: 'Potato',
    scientific: 'Solanum tuberosum',
    category: 'roots',
    categoryLabel: 'Root / Tuber',
    icon: '🥔',
    isNerSpecial: false,
    regionNotes: 'High-altitude staple across Arunachal & Nagaland hill terraced farming.',
    durationDays: [60, 90],
    durationHours: [1440, 2160],
    ambientDays: 18,
    tempMin: 8.0,
    tempMax: 12.0,
    tempSetpoint: 10.0,
    chillingFloor: 4.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    respirationRate: 'Low (10–15 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Sensitive to sprouting',
    powerDutyEst: '25W – 32W DC Load',
    precooling: 'Curing at 15–20°C for 5 days prior to chilled holding',
    notes: 'Avoid chilling below 4°C to prevent cold-induced sweetening (reducing sugar accumulation). Maintain complete dark chamber.',
    decayPhases: {
      peak: 'Days 1–35: Dormant skin & starch integrity',
      good: 'Days 36–70: Excellent table & processing quality',
      critical: 'Days 71–90: Monitor eyes for sprouting'
    }
  },
  cabbage: {
    id: 'cabbage',
    name: 'Cabbage',
    scientific: 'Brassica oleracea var. capitata',
    category: 'cole',
    categoryLabel: 'Cole Crop',
    icon: '🥬',
    isNerSpecial: false,
    regionNotes: 'Dominant rabi commercial crop throughout Nagaland, Meghalaya and Sikkim.',
    durationDays: [30, 45],
    durationHours: [720, 1080],
    ambientDays: 7,
    tempMin: 0.0,
    tempMax: 4.0,
    tempSetpoint: 2.0,
    chillingFloor: 0.0,
    humMin: 90,
    humMax: 95,
    humSetpoint: 94,
    respirationRate: 'Moderate-Low (15–22 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Highly sensitive to leaf yellowing',
    powerDutyEst: '48W – 56W DC Load',
    precooling: 'Rapid hydro-cooling or forced chilled air',
    notes: 'Tolerates near-zero temperatures; requires near-saturation humidity to prevent outer leaf desiccation.',
    decayPhases: {
      peak: 'Days 1–20: Turgid, crisp green wrappers',
      good: 'Days 21–35: Solid head integrity',
      critical: 'Days 36–45: Outer wrapper trimming required'
    }
  },
  cauliflower: {
    id: 'cauliflower',
    name: 'Cauliflower',
    scientific: 'Brassica oleracea var. botrytis',
    category: 'cole',
    categoryLabel: 'Cole Crop',
    icon: '🥦',
    isNerSpecial: false,
    regionNotes: 'High-value curd vegetable cultivated in mid-altitude hills.',
    durationDays: [14, 21],
    durationHours: [336, 504],
    ambientDays: 3,
    tempMin: 0.0,
    tempMax: 4.0,
    tempSetpoint: 1.5,
    chillingFloor: 0.0,
    humMin: 90,
    humMax: 95,
    humSetpoint: 93,
    respirationRate: 'High (35–55 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Highly vulnerable to curd browning',
    powerDutyEst: '46W – 55W DC Load',
    precooling: 'Hydro-cooling within 2 hours of harvest essential',
    notes: 'High respiration rate. Keep near 0–2°C and high RH to preserve bright white curd and avoid black specking.',
    decayPhases: {
      peak: 'Days 1–8: Pristine white, compact curd',
      good: 'Days 9–16: Sound firmness with slight wrapper fading',
      critical: 'Days 17–21: Risk of riceyness and curd softening'
    }
  },
  carrot: {
    id: 'carrot',
    name: 'Carrot',
    scientific: 'Daucus carota',
    category: 'roots',
    categoryLabel: 'Root Vegetable',
    icon: '🥕',
    isNerSpecial: false,
    regionNotes: 'Root crop sensitive to transit moisture depletion across mountain roads.',
    durationDays: [30, 45],
    durationHours: [720, 1080],
    ambientDays: 6,
    tempMin: 0.0,
    tempMax: 4.0,
    tempSetpoint: 1.0,
    chillingFloor: 0.0,
    humMin: 95,
    humMax: 98,
    humSetpoint: 96,
    respirationRate: 'Moderate (18–26 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Bitter isocoumarin risk with ethylene',
    powerDutyEst: '42W – 50W DC Load',
    precooling: 'Hydro-cooling or chilled washing',
    notes: 'Requires near-saturation humidity (95–98%) to prevent root shriveling and retain crunch and sweetness.',
    decayPhases: {
      peak: 'Days 1–20: Full turgidity, sweet carotene core',
      good: 'Days 21–38: High market grade firmness',
      critical: 'Days 39–45: Root tip softening check'
    }
  },
  green_beans: {
    id: 'green_beans',
    name: 'Green Beans',
    scientific: 'Phaseolus vulgaris',
    category: 'vegetables',
    categoryLabel: 'Leguminous Pod',
    icon: '🫘',
    isNerSpecial: false,
    regionNotes: 'Mountain bean varieties grown extensively in Mizoram and Manipur.',
    durationDays: [8, 14],
    durationHours: [192, 336],
    ambientDays: 2,
    tempMin: 5.0,
    tempMax: 8.0,
    tempSetpoint: 6.5,
    chillingFloor: 5.0,
    humMin: 90,
    humMax: 95,
    humSetpoint: 92,
    respirationRate: 'High (45–70 mg CO₂/kg·h)',
    ethyleneClass: 'Moderate / Causes pod yellowing & toughening',
    powerDutyEst: '35W – 44W DC Load',
    precooling: 'Forced-air pre-cooling',
    notes: 'Avoid storing below 5°C to prevent chilling injury (surface pitting, russeting, and water loss).',
    decayPhases: {
      peak: 'Days 1–5: Snap-crisp pods with bright green luster',
      good: 'Days 6–10: Good market snap',
      critical: 'Days 11–14: Pod tip fiber development'
    }
  },
  leafy_greens: {
    id: 'leafy_greens',
    name: 'Leafy Greens (Lai Xaak)',
    scientific: 'Brassica juncea / Leaf Greens',
    category: 'greens',
    categoryLabel: 'Leafy Vegetables',
    icon: '🥗',
    isNerSpecial: false,
    regionNotes: 'Essential Northeast indigenous dietary greens, prone to distress selling within 12h without cooling.',
    durationDays: [5, 8],
    durationHours: [120, 192],
    ambientDays: 1,
    tempMin: 0.0,
    tempMax: 2.0,
    tempSetpoint: 1.0,
    chillingFloor: 0.0,
    humMin: 95,
    humMax: 98,
    humSetpoint: 97,
    respirationRate: 'Very High (70–110 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Extremely sensitive to yellowing',
    powerDutyEst: '50W – 58W DC Load',
    precooling: 'Prompt hydro-cooling within 90 minutes of harvest',
    notes: 'Very high surface area to volume ratio; highest urgency crop. Maximum humidity avoids wilting & chlorophyll degradation.',
    decayPhases: {
      peak: 'Days 1–3: Pristine crispness, zero wilting',
      good: 'Days 4–6: Fresh market standard',
      critical: 'Days 7–8: Leaf yellowing risk'
    }
  },
  cucumber: {
    id: 'cucumber',
    name: 'Cucumber',
    scientific: 'Cucumis sativus',
    category: 'vegetables',
    categoryLabel: 'Cucurbit',
    icon: '🥒',
    isNerSpecial: false,
    regionNotes: 'Khasi and Jaintia hill cucumbers with high hydration demand.',
    durationDays: [10, 14],
    durationHours: [240, 336],
    ambientDays: 3,
    tempMin: 10.0,
    tempMax: 13.0,
    tempSetpoint: 11.5,
    chillingFloor: 10.0,
    humMin: 90,
    humMax: 95,
    humSetpoint: 92,
    respirationRate: 'Moderate (25–35 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Rapid yellowing if exposed to ethylene',
    powerDutyEst: '32W – 40W DC Load',
    precooling: 'Forced air cooling at 12°C',
    notes: 'Chilling vulnerable. Storing under 10°C causes rapid water-soaked lesions and tissue collapse.',
    decayPhases: {
      peak: 'Days 1–5: Deep green skin & crisp seed cavity',
      good: 'Days 6–10: Firm hydration',
      critical: 'Days 11–14: Skin yellowing check'
    }
  },
  capsicum: {
    id: 'capsicum',
    name: 'Capsicum',
    scientific: 'Capsicum annuum',
    category: 'vegetables',
    categoryLabel: 'Solanaceous Fruit',
    icon: '🫑',
    isNerSpecial: false,
    regionNotes: 'High-value polyhouse crop in Sikkim and Arunachal Pradesh.',
    durationDays: [14, 18],
    durationHours: [336, 432],
    ambientDays: 4,
    tempMin: 7.0,
    tempMax: 10.0,
    tempSetpoint: 8.5,
    chillingFloor: 7.0,
    humMin: 90,
    humMax: 95,
    humSetpoint: 92,
    respirationRate: 'Moderate (20–30 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Moderate Sensitivity',
    powerDutyEst: '36W – 42W DC Load',
    precooling: 'Room cooling or forced air',
    notes: 'Maintain moderate humidity to prevent calyx decay while avoiding flaccidity and skin wrinkling.',
    decayPhases: {
      peak: 'Days 1–7: Glossy, rigid walls with green calyx',
      good: 'Days 8–14: Commercial grade firmness',
      critical: 'Days 15–18: Calyx check for mold'
    }
  },
  chilli: {
    id: 'chilli',
    name: 'Green Chilli',
    scientific: 'Capsicum frutescens',
    category: 'spices',
    categoryLabel: 'Spice & Condiment',
    icon: '🌶️',
    isNerSpecial: false,
    regionNotes: 'High cash value crop across Assam valley and hill belts.',
    durationDays: [14, 21],
    durationHours: [336, 504],
    ambientDays: 5,
    tempMin: 8.0,
    tempMax: 12.0,
    tempSetpoint: 9.5,
    chillingFloor: 7.5,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    respirationRate: 'Moderate (18–28 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Moderate Sensitivity',
    powerDutyEst: '34W – 40W DC Load',
    precooling: 'Air cooling in shade',
    notes: 'Good storage resilience; maintain humidity to prevent pod shriveling and preserve capsaicin heat.',
    decayPhases: {
      peak: 'Days 1–8: Pungent, glossy dark green pods',
      good: 'Days 9–16: Firm pod texture',
      critical: 'Days 17–21: Pod tip softening check'
    }
  },
  king_chilli: {
    id: 'king_chilli',
    name: 'King Chilli / Bhut Jolokia',
    scientific: 'Capsicum chinense Jacq.',
    category: 'ner_special',
    categoryLabel: 'NER GI-Tagged Special',
    icon: '🔥',
    isNerSpecial: true,
    regionNotes: 'World-famous GI-tagged super-hot chilli of Assam & Nagaland. High value commodity requiring zero chilling damage.',
    durationDays: [20, 30],
    durationHours: [480, 720],
    ambientDays: 5,
    tempMin: 7.5,
    tempMax: 10.5,
    tempSetpoint: 9.0,
    chillingFloor: 7.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    respirationRate: 'Moderate (18–26 mg CO₂/kg·h)',
    ethyleneClass: 'Low / Delicate aromatic cuticle',
    powerDutyEst: '35W – 42W DC Load',
    precooling: 'Gentle shade pre-cooling with clean airflow',
    notes: 'Preserves extreme SHU heat potency, vibrant red color, and volatile aromatic oils without surface pitting.',
    decayPhases: {
      peak: 'Days 1–12: Peak pungency & characteristic aroma',
      good: 'Days 13–24: High export-grade condition',
      critical: 'Days 25–30: Check calyx hydration'
    }
  },
  ginger: {
    id: 'ginger',
    name: 'Fresh Ginger (Nadia Variety)',
    scientific: 'Zingiber officinale',
    category: 'ner_special',
    categoryLabel: 'NER GI-Tagged Special',
    icon: '🫚',
    isNerSpecial: true,
    regionNotes: 'Flagship organic cash rhizome of Karbi Anglong & Meghalaya. Chilling sensitive; storage must not drop below 12°C.',
    durationDays: [60, 120],
    durationHours: [1440, 2880],
    ambientDays: 16,
    tempMin: 12.0,
    tempMax: 14.0,
    tempSetpoint: 13.0,
    chillingFloor: 12.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    respirationRate: 'Low (10–16 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Avoid excess humidity to prevent sprouting',
    powerDutyEst: '22W – 28W DC Load',
    precooling: 'Curing at 20°C for skin hardening prior to cold holding',
    notes: 'Extremely vulnerable to chilling injury & internal flesh browning below 12°C. Keep well-ventilated.',
    decayPhases: {
      peak: 'Days 1–45: Firm fibrous rhizome, pungent gingerol',
      good: 'Days 46–95: Sound merchantable condition',
      critical: 'Days 96–120: Monitor rhizome nodes for sprouts'
    }
  },
  khasi_mandarin: {
    id: 'khasi_mandarin',
    name: 'Khasi Mandarin (Orange)',
    scientific: 'Citrus reticulata Blanco',
    category: 'fruits',
    categoryLabel: 'NER GI Citrus Fruit',
    icon: '🍊',
    isNerSpecial: true,
    regionNotes: 'Renowned GI fruit of Cherrapunjee & Jaintia hills. Significant seasonal glut requiring buffer holding.',
    durationDays: [28, 45],
    durationHours: [672, 1080],
    ambientDays: 8,
    tempMin: 5.0,
    tempMax: 8.0,
    tempSetpoint: 6.5,
    chillingFloor: 4.0,
    humMin: 88,
    humMax: 92,
    humSetpoint: 90,
    respirationRate: 'Moderate (15–24 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Sensitive to rind breakdown with ethylene',
    powerDutyEst: '34W – 42W DC Load',
    precooling: 'Forced air cooling at 8°C',
    notes: 'Maintains sugar-acid balance, juicy vesicles, and prevents rind oleocellosis (essential oil spotting).',
    decayPhases: {
      peak: 'Days 1–18: High brix sweetness, tight rind adhesion',
      good: 'Days 19–36: Rich flavor & juice content',
      critical: 'Days 37–45: Check stem-end button condition'
    }
  },
  pineapple: {
    id: 'pineapple',
    name: 'Kew Pineapple / Queen',
    scientific: 'Ananas comosus',
    category: 'fruits',
    categoryLabel: 'NER GI Tropical Fruit',
    icon: '🍍',
    isNerSpecial: true,
    regionNotes: 'Flagship GI fruit of Tripura & Manipur foothills with high summer perishability.',
    durationDays: [18, 28],
    durationHours: [432, 672],
    ambientDays: 6,
    tempMin: 8.0,
    tempMax: 12.0,
    tempSetpoint: 10.0,
    chillingFloor: 7.0,
    humMin: 85,
    humMax: 90,
    humSetpoint: 88,
    respirationRate: 'Moderate-High (25–40 mg CO₂/kg·h)',
    ethyleneClass: 'Low Producer / Moderate Sensitivity',
    powerDutyEst: '38W – 46W DC Load',
    precooling: 'Gentle room pre-cooling at 12°C',
    notes: 'Prevent black heart / endogenous brown spot by never chilling below 7°C. Stored with crown intact.',
    decayPhases: {
      peak: 'Days 1–10: Golden aromatics, firm eyelets',
      good: 'Days 11–20: Optimal table sweetness',
      critical: 'Days 21–28: Eye softening surveillance'
    }
  }
};

class FreshVaultCropDetection {
  constructor() {
    this.selectedCropId = 'tomato';
    this.activeCategory = 'all';
    this.freshnessFactor = 1.0; // 1.0 = Fresh, 0.85 = Field stored, 1.1 = Pre-cooled
    this.searchTerm = '';

    this.init();
  }

  init() {
    this.renderCropGrid();
    this.bindEvents();
    this.selectCrop(this.selectedCropId);
    this.initMultiCropOptimizer();
  }

  bindEvents() {
    // Category tabs filter
    const filterTabs = document.querySelectorAll('.detect-filter-btn');
    filterTabs.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category') || 'all';
        this.renderCropGrid();
      });
    });

    // Search input
    const searchInput = document.getElementById('detect-crop-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.renderCropGrid();
      });
    }

    // Quick select dropdown
    const quickSelect = document.getElementById('detect-quick-dropdown');
    if (quickSelect) {
      quickSelect.addEventListener('change', (e) => {
        this.selectCrop(e.target.value);
      });
    }

    // Harvest freshness factor toggle
    const conditionRadios = document.querySelectorAll('input[name="crop-harvest-condition"]');
    conditionRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.freshnessFactor = parseFloat(e.target.value) || 1.0;
        this.updateDetectionOutput();
      });
    });

    // Action button: Sync to Live Dashboard
    const syncBtn = document.getElementById('btn-sync-to-controller');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        this.syncWithLiveController();
      });
    }

    // Action button: Copy Recipe
    const copyBtn = document.getElementById('btn-copy-crop-recipe');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        this.copyRecipeToClipboard();
      });
    }

    // Action button: Open Simulator
    const simBtn = document.getElementById('btn-jump-to-simulator');
    if (simBtn) {
      simBtn.addEventListener('click', () => {
        const aiSelect = document.getElementById('ai-crop-select');
        if (aiSelect && typeof CROP_DATABASE !== 'undefined' && CROP_DATABASE[this.selectedCropId]) {
          aiSelect.value = this.selectedCropId;
          if (window.FreshVaultAI) {
            window.FreshVaultAI.cropKey = this.selectedCropId;
            window.FreshVaultAI.calculateFreshness();
          }
        }
        const aiSection = document.getElementById('ai-insights');
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  renderCropGrid() {
    const gridEl = document.getElementById('detect-crop-grid');
    if (!gridEl) return;

    const crops = Object.values(CROP_DETECTION_REGISTRY);
    const filtered = crops.filter(crop => {
      const matchCategory =
        this.activeCategory === 'all' ||
        (this.activeCategory === 'ner_special' && crop.isNerSpecial) ||
        crop.category === this.activeCategory;

      const matchSearch =
        !this.searchTerm ||
        crop.name.toLowerCase().includes(this.searchTerm) ||
        crop.scientific.toLowerCase().includes(this.searchTerm) ||
        crop.categoryLabel.toLowerCase().includes(this.searchTerm);

      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="detect-empty-state">
          <span>🔍</span>
          <p>No crops found matching "${this.searchTerm}". Try clearing your search.</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered.map(crop => {
      const isSelected = crop.id === this.selectedCropId;
      return `
        <div class="detect-crop-card ${isSelected ? 'active' : ''} ${crop.isNerSpecial ? 'is-ner-special' : ''}" 
             data-crop-id="${crop.id}" 
             role="button" 
             tabindex="0"
             title="Select ${crop.name} for storage detection">
          ${crop.isNerSpecial ? '<span class="ner-tag-badge">★ NER GI Special</span>' : ''}
          <div class="detect-crop-icon">${crop.icon}</div>
          <div class="detect-crop-info">
            <h4 class="detect-crop-title">${crop.name}</h4>
            <div class="detect-crop-scientific">${crop.scientific}</div>
          </div>
          <div class="detect-crop-specs-micro">
            <span>⏱️ ${crop.durationDays[0]}–${crop.durationDays[1]}d</span>
            <span>🌡️ ${crop.tempMin}–${crop.tempMax}°C</span>
            <span>💧 ${crop.humMin}–${crop.humMax}%</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    gridEl.querySelectorAll('.detect-crop-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-crop-id');
        this.selectCrop(id);
      });
    });
  }

  selectCrop(cropId) {
    if (!CROP_DETECTION_REGISTRY[cropId]) return;
    this.selectedCropId = cropId;

    // Update active state in grid
    document.querySelectorAll('.detect-crop-card').forEach(card => {
      if (card.getAttribute('data-crop-id') === cropId) {
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        card.classList.remove('active');
      }
    });

    // Update quick dropdown if present
    const quickSelect = document.getElementById('detect-quick-dropdown');
    if (quickSelect && quickSelect.value !== cropId) {
      quickSelect.value = cropId;
    }

    this.updateDetectionOutput();

    // Automatically update Live Dashboard Telemetry
    if (window.FreshVaultDash && CROP_DETECTION_REGISTRY[this.selectedCropId]) {
      window.FreshVaultDash.setCrop(CROP_DETECTION_REGISTRY[this.selectedCropId]);
    }
  }

  updateDetectionOutput() {
    const crop = CROP_DETECTION_REGISTRY[this.selectedCropId] || CROP_DETECTION_REGISTRY.tomato;

    // Calculate dynamic duration with freshness factor
    const adjMinDays = Math.max(2, Math.round(crop.durationDays[0] * this.freshnessFactor));
    const adjMaxDays = Math.max(adjMinDays, Math.round(crop.durationDays[1] * this.freshnessFactor));
    const adjMinHours = adjMinDays * 24;
    const adjMaxHours = adjMaxDays * 24;
    const shelfGainPercent = Math.round(((adjMaxDays - crop.ambientDays) / crop.ambientDays) * 100);

    // Update Hero Banner of Result
    const nameEl = document.getElementById('detect-out-name');
    const sciEl = document.getElementById('detect-out-scientific');
    const iconEl = document.getElementById('detect-out-icon');
    const catBadgeEl = document.getElementById('detect-out-category');
    const nerBadgeEl = document.getElementById('detect-out-ner-badge');

    if (nameEl) nameEl.textContent = crop.name;
    if (sciEl) sciEl.textContent = crop.scientific;
    if (iconEl) iconEl.textContent = crop.icon;
    if (catBadgeEl) catBadgeEl.textContent = crop.categoryLabel;
    if (nerBadgeEl) {
      nerBadgeEl.style.display = crop.isNerSpecial ? 'inline-flex' : 'none';
    }

    // Output 1: Storage Duration
    const durValEl = document.getElementById('detect-out-duration-val');
    const durHoursEl = document.getElementById('detect-out-duration-hours');
    const durGainEl = document.getElementById('detect-out-duration-gain');
    const phase1El = document.getElementById('detect-phase-1');
    const phase2El = document.getElementById('detect-phase-2');
    const phase3El = document.getElementById('detect-phase-3');

    if (durValEl) durValEl.textContent = `${adjMinDays} – ${adjMaxDays} Days`;
    if (durHoursEl) durHoursEl.textContent = `(~${adjMinHours} – ${adjMaxHours} Hours of High-Value Safe Storage)`;
    if (durGainEl) durGainEl.innerHTML = `🚀 <strong>+${shelfGainPercent}% Extended Life</strong> vs ambient shelf life (${crop.ambientDays} days)`;
    if (phase1El) phase1El.textContent = crop.decayPhases.peak;
    if (phase2El) phase2El.textContent = crop.decayPhases.good;
    if (phase3El) phase3El.textContent = crop.decayPhases.critical;

    // Output 2: Chamber Temperature
    const tempRangeEl = document.getElementById('detect-out-temp-range');
    const tempSetpointEl = document.getElementById('detect-out-temp-setpoint');
    const tempFloorEl = document.getElementById('detect-out-temp-floor');
    const tempBarFill = document.getElementById('detect-temp-bar-fill');
    const tempMarker = document.getElementById('detect-temp-marker');

    if (tempRangeEl) tempRangeEl.textContent = `${crop.tempMin.toFixed(1)}°C – ${crop.tempMax.toFixed(1)}°C`;
    if (tempSetpointEl) tempSetpointEl.textContent = `${crop.tempSetpoint.toFixed(1)}°C`;
    if (tempFloorEl) {
      tempFloorEl.textContent = crop.chillingFloor > 0 
        ? `⚠️ Chilling Hazard Floor: ${crop.chillingFloor.toFixed(1)}°C (Do NOT freeze or overcool)`
        : `❄️ Chilling Tolerant: Tolerates down to 0.0°C`;
    }

    // Position temperature marker on visual bar (scale: 0°C to 20°C)
    if (tempBarFill && tempMarker) {
      const minPercent = Math.max(0, Math.min(100, (crop.tempMin / 20) * 100));
      const maxPercent = Math.max(0, Math.min(100, (crop.tempMax / 20) * 100));
      const setPercent = Math.max(0, Math.min(100, (crop.tempSetpoint / 20) * 100));
      tempBarFill.style.left = `${minPercent}%`;
      tempBarFill.style.width = `${Math.max(8, maxPercent - minPercent)}%`;
      tempMarker.style.left = `${setPercent}%`;
    }

    // Output 3: Chamber Humidity
    const humRangeEl = document.getElementById('detect-out-hum-range');
    const humSetpointEl = document.getElementById('detect-out-hum-setpoint');
    const humBarFill = document.getElementById('detect-hum-bar-fill');
    const humMarker = document.getElementById('detect-hum-marker');

    if (humRangeEl) humRangeEl.textContent = `${crop.humMin}% – ${crop.humMax}% RH`;
    if (humSetpointEl) humSetpointEl.textContent = `${crop.humSetpoint}% RH`;

    // Position humidity marker on visual bar (scale: 50% to 100%)
    if (humBarFill && humMarker) {
      const minPercent = Math.max(0, Math.min(100, ((crop.humMin - 50) / 50) * 100));
      const maxPercent = Math.max(0, Math.min(100, ((crop.humMax - 50) / 50) * 100));
      const setPercent = Math.max(0, Math.min(100, ((crop.humSetpoint - 50) / 50) * 100));
      humBarFill.style.left = `${minPercent}%`;
      humBarFill.style.width = `${Math.max(8, maxPercent - minPercent)}%`;
      humMarker.style.left = `${setPercent}%`;
    }

    // Diagnostics & Microclimate specs
    const respEl = document.getElementById('detect-out-respiration');
    const ethEl = document.getElementById('detect-out-ethylene');
    const precoolEl = document.getElementById('detect-out-precool');
    const powerEl = document.getElementById('detect-out-power');
    const notesEl = document.getElementById('detect-out-notes');
    const nerNotesEl = document.getElementById('detect-out-ner-notes');

    if (respEl) respEl.textContent = crop.respirationRate;
    if (ethEl) ethEl.textContent = crop.ethyleneClass;
    if (precoolEl) precoolEl.textContent = crop.precooling;
    if (powerEl) powerEl.textContent = crop.powerDutyEst;
    if (notesEl) notesEl.textContent = crop.notes;
    if (nerNotesEl) nerNotesEl.textContent = crop.regionNotes;
  }

  syncWithLiveController() {
    const crop = CROP_DETECTION_REGISTRY[this.selectedCropId];
    if (!crop) return;

    // Update Live Dashboard Telemetry & Charts
    if (window.FreshVaultDash) {
      window.FreshVaultDash.setCrop(crop);
    }

    this.showToast(`✅ Controller setpoints synchronized for ${crop.name} ${crop.icon}! (Temp: ${crop.tempSetpoint}°C | RH: ${crop.humSetpoint}%)`);

    // Smooth scroll to Live Dashboard
    const dashSection = document.getElementById('dashboard');
    if (dashSection) {
      setTimeout(() => {
        dashSection.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }

  copyRecipeToClipboard() {
    const crop = CROP_DETECTION_REGISTRY[this.selectedCropId];
    if (!crop) return;

    const protocolText = `FreshVault NER Cold Storage Protocol Card:
--------------------------------------------------
Crop: ${crop.name} (${crop.scientific})
Category: ${crop.categoryLabel} ${crop.isNerSpecial ? '[NER GI Special]' : ''}
⏱️ Optimal Safe Duration: ${crop.durationDays[0]}–${crop.durationDays[1]} Days (${crop.durationHours[0]}–${crop.durationHours[1]} Hours)
🌡️ Chamber Temperature Range: ${crop.tempMin}°C – ${crop.tempMax}°C (Target Setpoint: ${crop.tempSetpoint}°C)
❄️ Chilling Floor: ${crop.chillingFloor}°C
💧 Chamber Humidity Range: ${crop.humMin}% – ${crop.humMax}% RH (Target Setpoint: ${crop.humSetpoint}% RH)
⚡ DC Thermal Load: ${crop.powerDutyEst}
🍃 Respiration: ${crop.respirationRate}
🧪 Ethylene Profile: ${crop.ethyleneClass}
💡 Advisory: ${crop.notes}
📍 Regional NER Reality: ${crop.regionNotes}
--------------------------------------------------
FreshVault NER — Solar-Powered Decentralized Agri Cold Chain`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(protocolText).then(() => {
        this.showToast(`📋 Storage recipe for ${crop.name} copied to clipboard!`);
      }).catch(() => {
        this.fallbackCopy(protocolText);
      });
    } else {
      this.fallbackCopy(protocolText);
    }
  }

  /* =========================================================================
     MULTI-CROP CO-STORAGE OPTIMIZER METHODS
     ========================================================================= */
  initMultiCropOptimizer() {
    this.selectedMultiCrops = new Set(['cabbage', 'tomato']);
    this.multiCropFilterCategory = 'all';

    this.bindMultiCropEvents();
    this.renderMultiCropGrid();
    this.updateMultiCropOptimizer();
  }

  bindMultiCropEvents() {
    // Multi-Crop Filter buttons
    const filterBtns = document.querySelectorAll('.multicrop-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.multiCropFilterCategory = btn.getAttribute('data-mfilter') || 'all';
        this.renderMultiCropGrid();
      });
    });

    // Preset buttons
    const presetBtns = document.querySelectorAll('.multicrop-preset-chip');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const presetKey = btn.getAttribute('data-preset');
        this.applyMultiCropPreset(presetKey);
      });
    });

    // Clear load button
    const clearBtn = document.getElementById('btn-multicrop-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.selectedMultiCrops.clear();
        document.querySelectorAll('.multicrop-preset-chip').forEach(b => b.classList.remove('active'));
        this.renderMultiCropGrid();
        this.updateMultiCropOptimizer();
        this.showToast('🗑️ Mixed-load fridge chamber cleared.');
      });
    }

    // Select all button
    const selectAllBtn = document.getElementById('btn-multicrop-select-all');
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        Object.keys(CROP_DETECTION_REGISTRY).forEach(id => this.selectedMultiCrops.add(id));
        document.querySelectorAll('.multicrop-preset-chip').forEach(b => b.classList.remove('active'));
        this.renderMultiCropGrid();
        this.updateMultiCropOptimizer();
        this.showToast('➕ Added all 14 crops to fridge chamber analysis.');
      });
    }

    // Action button: Sync Mixed Setpoints to Controller
    const syncMultiBtn = document.getElementById('btn-sync-multicrop-to-controller');
    if (syncMultiBtn) {
      syncMultiBtn.addEventListener('click', () => {
        this.syncMultiCropToController();
      });
    }

    // Action button: Copy Multi-Crop Plan
    const copyMultiBtn = document.getElementById('btn-copy-multicrop-plan');
    if (copyMultiBtn) {
      copyMultiBtn.addEventListener('click', () => {
        this.copyMultiCropPlan();
      });
    }
  }

  applyMultiCropPreset(presetKey) {
    const presets = {
      'cabbage_tomato': ['cabbage', 'tomato'],
      'salad': ['tomato', 'cucumber', 'leafy_greens'],
      'cole': ['cabbage', 'cauliflower', 'carrot'],
      'ner_spices': ['king_chilli', 'ginger', 'khasi_mandarin'],
      'roots': ['potato', 'carrot']
    };

    if (presets[presetKey]) {
      this.selectedMultiCrops = new Set(presets[presetKey]);
      this.renderMultiCropGrid();
      this.updateMultiCropOptimizer();
    }
  }

  renderMultiCropGrid() {
    const gridEl = document.getElementById('multicrop-items-grid');
    if (!gridEl) return;

    const crops = Object.values(CROP_DETECTION_REGISTRY);
    const filtered = crops.filter(crop => {
      if (this.multiCropFilterCategory === 'all') return true;
      if (this.multiCropFilterCategory === 'ner_special') return crop.isNerSpecial;
      return crop.category === this.multiCropFilterCategory;
    });

    gridEl.innerHTML = '';

    filtered.forEach(crop => {
      const isSelected = this.selectedMultiCrops.has(crop.id);
      const card = document.createElement('div');
      card.className = `multicrop-item-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute('data-crop-id', crop.id);

      card.innerHTML = `
        <div class="multicrop-item-checkbox"></div>
        <div class="multicrop-item-icon">${crop.icon}</div>
        <div class="multicrop-item-info">
          <div class="multicrop-item-name">${crop.name}</div>
          <div class="multicrop-item-meta">
            <span class="multicrop-item-tag">${crop.tempMin}°–${crop.tempMax}°C</span>
            <span class="multicrop-item-tag">${crop.humMin}%–${crop.humMax}% RH</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.toggleMultiCrop(crop.id);
      });

      gridEl.appendChild(card);
    });
  }

  toggleMultiCrop(cropId) {
    if (this.selectedMultiCrops.has(cropId)) {
      this.selectedMultiCrops.delete(cropId);
    } else {
      this.selectedMultiCrops.add(cropId);
    }

    // Uncheck preset button highlights if custom selection
    document.querySelectorAll('.multicrop-preset-chip').forEach(b => b.classList.remove('active'));

    this.renderMultiCropGrid();
    this.updateMultiCropOptimizer();
  }

  removeMultiCrop(cropId) {
    this.selectedMultiCrops.delete(cropId);
    document.querySelectorAll('.multicrop-preset-chip').forEach(b => b.classList.remove('active'));
    this.renderMultiCropGrid();
    this.updateMultiCropOptimizer();
  }

  updateMultiCropOptimizer() {
    const crops = Array.from(this.selectedMultiCrops).map(id => CROP_DETECTION_REGISTRY[id]).filter(Boolean);
    const countLabel = document.getElementById('multicrop-count-label');
    const chipsContainer = document.getElementById('multicrop-selected-chips');
    const badgeEl = document.getElementById('multicrop-compat-badge');
    const tableBody = document.getElementById('multicrop-table-body');
    const breakdownBox = document.getElementById('multicrop-breakdown-box');
    const advisoryContent = document.getElementById('multicrop-advisory-content');

    if (countLabel) {
      countLabel.textContent = `${crops.length} crop${crops.length === 1 ? '' : 's'} selected`;
    }

    // Render active chips
    if (chipsContainer) {
      if (crops.length === 0) {
        chipsContainer.innerHTML = `<div class="multicrop-empty-state"><span>👈 Select crops from the left to calculate optimal multi-crop storage microclimate.</span></div>`;
      } else {
        chipsContainer.innerHTML = '';
        crops.forEach(crop => {
          const chip = document.createElement('div');
          chip.className = 'multicrop-chip';
          chip.innerHTML = `
            <span>${crop.icon}</span>
            <span>${crop.name}</span>
            <span class="multicrop-chip-remove" title="Remove ${crop.name}">×</span>
          `;
          chip.querySelector('.multicrop-chip-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeMultiCrop(crop.id);
          });
          chipsContainer.appendChild(chip);
        });
      }
    }

    // Empty state reset
    if (crops.length === 0) {
      if (badgeEl) {
        badgeEl.className = 'multicrop-status-badge';
        badgeEl.textContent = 'Empty Fridge Load';
      }
      this.setMultiCropMetricDefaults();
      if (advisoryContent) {
        advisoryContent.innerHTML = `<p class="multicrop-empty-state">No crops currently in the fridge load. Select crops on the left to begin.</p>`;
      }
      if (breakdownBox) breakdownBox.style.display = 'none';
      return;
    }

    if (breakdownBox) breakdownBox.style.display = 'block';

    // 1. Compute Temperature Microclimate
    const maxTempMin = Math.max(...crops.map(c => c.tempMin));
    const minTempMax = Math.min(...crops.map(c => c.tempMax));
    const maxChillingFloor = Math.max(...crops.map(c => c.chillingFloor));
    const chillingSensitiveCrops = crops.filter(c => c.chillingFloor >= 7.0);

    let optimalTemp = 0;
    let tempStatus = 'green';
    let tempSubtext = '';
    let tempPill = '';
    let isDirectOverlap = maxTempMin <= minTempMax;

    if (isDirectOverlap) {
      optimalTemp = parseFloat(((maxTempMin + minTempMax) / 2).toFixed(1));
      tempSubtext = `Safe Overlap Range: ${maxTempMin.toFixed(1)}°C – ${minTempMax.toFixed(1)}°C`;
      tempPill = `🛡️ Full Overlap: Perfect thermal match`;
    } else {
      // Prioritize protecting chilling-sensitive crops (chilling floor) to prevent tissue rot
      optimalTemp = parseFloat(Math.max(maxChillingFloor, maxTempMin).toFixed(1));
      tempStatus = 'yellow';
      tempSubtext = `Compromise Setpoint (Elevated for Chilling-Sensitive Crops)`;
      const sensitiveNames = chillingSensitiveCrops.map(c => c.name).join(', ');
      tempPill = `🛡️ Chilling Guard: Set to ${optimalTemp}°C to protect ${sensitiveNames || 'sensitive crops'}`;
    }

    const tempValEl = document.getElementById('multicrop-target-temp');
    const tempSubEl = document.getElementById('multicrop-temp-range-sub');
    const tempPillEl = document.getElementById('multicrop-temp-pill');
    const tempMeterFill = document.getElementById('multicrop-temp-meter-fill');
    const tempMeterPointer = document.getElementById('multicrop-temp-meter-pointer');
    const floorTickEl = document.getElementById('multicrop-floor-tick');

    if (tempValEl) tempValEl.textContent = `${optimalTemp.toFixed(1)}°C`;
    if (tempSubEl) tempSubEl.textContent = tempSubtext;
    if (tempPillEl) tempPillEl.textContent = tempPill;
    if (floorTickEl) floorTickEl.textContent = `${maxChillingFloor.toFixed(1)}°C (Chilling Floor)`;

    // Position temperature meter (0°C to 20°C scale)
    if (tempMeterFill && tempMeterPointer) {
      const minScale = isDirectOverlap ? (maxTempMin / 20) * 100 : (maxChillingFloor / 20) * 100;
      const maxScale = isDirectOverlap ? (minTempMax / 20) * 100 : (optimalTemp / 20) * 100 + 10;
      const pointerScale = Math.max(0, Math.min(100, (optimalTemp / 20) * 100));
      tempMeterFill.style.left = `${Math.max(0, minScale)}%`;
      tempMeterFill.style.width = `${Math.max(10, maxScale - minScale)}%`;
      tempMeterPointer.style.left = `${pointerScale}%`;
    }

    // 2. Compute Humidity Microclimate
    const maxHumMin = Math.max(...crops.map(c => c.humMin));
    const minHumMax = Math.min(...crops.map(c => c.humMax));
    let optimalHum = Math.round(crops.reduce((acc, c) => acc + c.humSetpoint, 0) / crops.length);
    let humSubtext = '';

    if (maxHumMin <= minHumMax) {
      humSubtext = `Optimal Safe Overlap: ${maxHumMin}% – ${minHumMax}% RH`;
      optimalHum = Math.round((maxHumMin + minHumMax) / 2);
    } else {
      optimalHum = Math.min(95, Math.max(88, maxHumMin));
      humSubtext = `Balanced Target for Transpiration Retention`;
    }

    const humValEl = document.getElementById('multicrop-target-hum');
    const humSubEl = document.getElementById('multicrop-hum-range-sub');
    const humMeterFill = document.getElementById('multicrop-hum-meter-fill');
    const humMeterPointer = document.getElementById('multicrop-hum-meter-pointer');

    if (humValEl) humValEl.textContent = `${optimalHum}% RH`;
    if (humSubEl) humSubEl.textContent = humSubtext;

    // Position humidity meter (50% to 100% scale)
    if (humMeterFill && humMeterPointer) {
      const humMinScale = Math.max(0, ((maxHumMin - 50) / 50) * 100);
      const humMaxScale = Math.min(100, ((minHumMax - 50) / 50) * 100);
      const humPointerScale = Math.max(0, Math.min(100, ((optimalHum - 50) / 50) * 100));
      humMeterFill.style.left = `${Math.max(0, Math.min(80, humMinScale))}%`;
      humMeterFill.style.width = `${Math.max(12, humMaxScale - humMinScale || 15)}%`;
      humMeterPointer.style.left = `${humPointerScale}%`;
    }

    // 3. Compute Limiting Bottleneck Shelf Life
    const sortedByLife = [...crops].sort((a, b) => a.durationDays[0] - b.durationDays[0]);
    const bottleneckCrop = sortedByLife[0];
    const minDays = bottleneckCrop.durationDays[0];
    const maxDays = bottleneckCrop.durationDays[1];

    const lifeValEl = document.getElementById('multicrop-target-life');
    const lifeSubEl = document.getElementById('multicrop-bottleneck-sub');
    const lifePillEl = document.getElementById('multicrop-life-pill');

    if (lifeValEl) lifeValEl.textContent = `${minDays} – ${maxDays} Days`;
    if (lifeSubEl) {
      lifeSubEl.innerHTML = `⚠️ Limiting Bottleneck: <strong>${bottleneckCrop.name} (${minDays}–${maxDays} Days)</strong>`;
    }
    if (lifePillEl) {
      lifePillEl.textContent = `📦 FIFO: Dispatch ${bottleneckCrop.name} first`;
    }

    // 4. Combined Solar DC Power Load Estimation
    const baseWatts = 28;
    const addedWatts = Math.min(32, (crops.length - 1) * 5);
    const estPowerMin = baseWatts + addedWatts;
    const estPowerMax = estPowerMin + 8;

    const powerValEl = document.getElementById('multicrop-target-power');
    const powerSubEl = document.getElementById('multicrop-power-sub');

    if (powerValEl) powerValEl.textContent = `${estPowerMin}W – ${estPowerMax}W`;
    if (powerSubEl) powerSubEl.textContent = `${crops.length} Crop${crops.length === 1 ? '' : 's'} Active Thermal Mass`;

    // 5. Ethylene & Physiological Diagnostics Engine
    const highEthyleneProducers = crops.filter(c => 
      c.id === 'tomato' || c.id === 'khasi_mandarin' || c.id === 'pineapple'
    );
    const ethyleneSensitiveCrops = crops.filter(c => 
      c.id === 'cabbage' || c.id === 'leafy_greens' || c.id === 'carrot' || c.id === 'cucumber' || c.id === 'cauliflower'
    );
    const pungentCrops = crops.filter(c => c.id === 'king_chilli' || c.id === 'ginger');

    let advisoryCards = [];

    // Temperature Compatibility Diagnostic
    if (isDirectOverlap) {
      advisoryCards.push(`
        <div class="advisory-item-card success">
          <span class="advisory-item-icon">✅</span>
          <div>
            <strong>100% Thermal Harmony:</strong> All selected crops share a safe temperature band (${maxTempMin.toFixed(1)}°C to ${minTempMax.toFixed(1)}°C). Set chamber thermostat to <strong>${optimalTemp.toFixed(1)}°C</strong> for maximum shelf life.
          </div>
        </div>
      `);
    } else {
      const coldTolerant = crops.filter(c => c.tempMin <= 4.0);
      advisoryCards.push(`
        <div class="advisory-item-card warning">
          <span class="advisory-item-icon">⚠️</span>
          <div>
            <strong>Thermal Compromise Mode:</strong> Cold-tolerant crops (${coldTolerant.map(c => c.name).join(', ')}) prefer 0–4°C, but chilling-sensitive crops (${chillingSensitiveCrops.map(c => c.name).join(', ')}) suffer irreversible tissue breakdown below ${maxChillingFloor.toFixed(1)}°C.
            <br><em>FreshVault Strategy: Chamber temperature is safely elevated to <strong>${optimalTemp.toFixed(1)}°C</strong> to safeguard all crops from chilling injury.</em>
          </div>
        </div>
      `);
    }

    // Ethylene Gas Interaction Diagnostic
    if (highEthyleneProducers.length > 0 && ethyleneSensitiveCrops.length > 0) {
      tempStatus = 'yellow';
      advisoryCards.push(`
        <div class="advisory-item-card danger">
          <span class="advisory-item-icon">🧪</span>
          <div>
            <strong>Ethylene Gas Conflict Warning:</strong> <strong>${highEthyleneProducers.map(c => c.name).join(', ')}</strong> emit high ethylene gas, which accelerates rapid yellowing and quality loss in <strong>${ethyleneSensitiveCrops.map(c => c.name).join(', ')}</strong>.
            <br><em>Operational Action: Enable Continuous Chamber Ventilation Fan in Settings, or store greens in perforated poly-liners.</em>
          </div>
        </div>
      `);
    }

    // Aroma Transfer Diagnostic
    if (pungentCrops.length > 0 && (crops.some(c => c.category === 'greens') || crops.some(c => c.category === 'fruits'))) {
      advisoryCards.push(`
        <div class="advisory-item-card info">
          <span class="advisory-item-icon">👃</span>
          <div>
            <strong>Aroma Isolation Advisory:</strong> ${pungentCrops.map(c => c.name).join(' & ')} release potent volatile capsaicin / gingerol oils. Store in separate sealed crates to prevent cross-odor absorption into delicate leafy greens or fruits.
          </div>
        </div>
      `);
    }

    // Shelf Placement Recommendation
    advisoryCards.push(`
      <div class="advisory-item-card info">
        <span class="advisory-item-icon">📍</span>
        <div>
          <strong>Chamber Shelf Stacking Guide:</strong> Place highest hydration crops (${crops.filter(c => c.humMin >= 95).map(c => c.name).join(', ') || 'Leafy Greens'}) on upper shelves near humidifier mist; place root tubers and spices in lower ventilated trays.
        </div>
      </div>
    `);

    if (advisoryContent) {
      advisoryContent.innerHTML = advisoryCards.join('');
    }

    // Update Status Badge
    if (badgeEl) {
      badgeEl.className = 'multicrop-status-badge';
      if (highEthyleneProducers.length > 0 && ethyleneSensitiveCrops.length > 0) {
        badgeEl.classList.add('status-yellow');
        badgeEl.textContent = '🟡 Ethylene Caution (Ventilation Active)';
      } else if (isDirectOverlap) {
        badgeEl.classList.add('status-green');
        badgeEl.textContent = '🟢 100% Thermal & Gas Harmony';
      } else {
        badgeEl.classList.add('status-yellow');
        badgeEl.textContent = '🟡 Safe Compromise Mode';
      }
    }

    // Populate Comparison Table
    if (tableBody) {
      tableBody.innerHTML = '';
      crops.forEach(c => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="crop-name-cell">
              <span>${c.icon}</span>
              <span>${c.name}</span>
            </div>
          </td>
          <td><span class="tag-pill">${c.categoryLabel}</span></td>
          <td><strong>${c.tempMin}°C – ${c.tempMax}°C</strong></td>
          <td><span style="color: ${c.chillingFloor >= 7 ? '#B45309' : '#059669'}; font-weight: 700;">${c.chillingFloor}°C</span></td>
          <td>${c.humMin}% – ${c.humMax}% RH</td>
          <td><strong>${c.durationDays[0]}–${c.durationDays[1]} Days</strong></td>
          <td><span class="tag-pill">${c.ethyleneClass.split('/')[0]}</span></td>
        `;
        tableBody.appendChild(row);
      });
    }

    // Store computed values on instance for controller sync
    this.currentMultiCropCalculation = {
      crops,
      optimalTemp,
      optimalHum,
      minDays,
      maxDays,
      estPowerMin,
      estPowerMax,
      bottleneckCrop
    };
  }

  setMultiCropMetricDefaults() {
    const tempValEl = document.getElementById('multicrop-target-temp');
    const humValEl = document.getElementById('multicrop-target-hum');
    const lifeValEl = document.getElementById('multicrop-target-life');
    const powerValEl = document.getElementById('multicrop-target-power');

    if (tempValEl) tempValEl.textContent = '-- °C';
    if (humValEl) humValEl.textContent = '-- % RH';
    if (lifeValEl) lifeValEl.textContent = '-- Days';
    if (powerValEl) powerValEl.textContent = '-- W';
  }

  syncMultiCropToController() {
    if (!this.currentMultiCropCalculation || this.currentMultiCropCalculation.crops.length === 0) {
      this.showToast('⚠️ Please select at least one crop before syncing.');
      return;
    }

    const { crops, optimalTemp, optimalHum, minDays, maxDays, estPowerMin, estPowerMax } = this.currentMultiCropCalculation;

    const compositeCrop = {
      id: 'mixed_load',
      name: `Mixed Load (${crops.length} Crops)`,
      icon: '🧊',
      scientific: crops.map(c => c.name).join(' + '),
      tempSetpoint: optimalTemp,
      tempMin: Math.min(...crops.map(c => c.tempMin)),
      tempMax: Math.max(...crops.map(c => c.tempMax)),
      humSetpoint: optimalHum,
      humMin: Math.min(...crops.map(c => c.humMin)),
      humMax: Math.max(...crops.map(c => c.humMax)),
      durationDays: [minDays, maxDays],
      powerDutyEst: `${estPowerMin}W – ${estPowerMax}W DC Load`
    };

    if (window.FreshVaultDash) {
      window.FreshVaultDash.setCrop(compositeCrop);
    }

    this.showToast(`✅ Mixed Fridge Setpoints Synchronized! (Temp: ${optimalTemp}°C | Humidity: ${optimalHum}% RH)`);

    // Smooth scroll to Live Monitoring Dashboard
    const dashSection = document.getElementById('dashboard');
    if (dashSection) {
      setTimeout(() => {
        dashSection.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }

  copyMultiCropPlan() {
    if (!this.currentMultiCropCalculation || this.currentMultiCropCalculation.crops.length === 0) {
      this.showToast('⚠️ Please select crops to copy storage protocol.');
      return;
    }

    const { crops, optimalTemp, optimalHum, minDays, maxDays, bottleneckCrop } = this.currentMultiCropCalculation;

    const protocolText = `FreshVault NER — Multi-Crop Mixed Cold Storage Protocol:
======================================================================
Active Crops (${crops.length}): ${crops.map(c => `${c.icon} ${c.name}`).join(', ')}
🌡️ Recommended Chamber Temperature: ${optimalTemp}°C
💧 Target Relative Humidity: ${optimalHum}% RH
⏱️ Limiting Batch Shelf Life: ${minDays} – ${maxDays} Days (Bottleneck: ${bottleneckCrop.name})
⚡ DC Compressor Thermal Load: ${this.currentMultiCropCalculation.estPowerMin}W – ${this.currentMultiCropCalculation.estPowerMax}W
======================================================================
Individual Crop Profiles:
${crops.map(c => `- ${c.name}: Ideal ${c.tempMin}°-${c.tempMax}°C, Chilling Floor ${c.chillingFloor}°C, RH ${c.humMin}%-${c.humMax}%, Safe Hold ${c.durationDays[0]}-${c.durationDays[1]}d`).join('\n')}
======================================================================
FreshVault NER — Solar-Powered Decentralized Smart Agri Cold Chain`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(protocolText).then(() => {
        this.showToast(`📋 Mixed-load storage protocol copied to clipboard!`);
      }).catch(() => {
        this.fallbackCopy(protocolText);
      });
    } else {
      this.fallbackCopy(protocolText);
    }
  }

  fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(`📋 Storage protocol copied to clipboard!`);
    } catch (err) {
      console.warn('Unable to copy', err);
    }
    document.body.removeChild(textArea);
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

// Global auto-initialization
document.addEventListener('DOMContentLoaded', () => {
  window.FreshVaultDetection = new FreshVaultCropDetection();
});
