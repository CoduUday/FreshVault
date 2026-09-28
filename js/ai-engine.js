/* ==========================================================================
   FreshVault NER - AI Freshness Decision Support Simulation Engine
   Smart Mini Cold Storage for North Eastern Region
   ========================================================================== */

const CROP_DATABASE = {

  tomato: {
    name: 'Tomato',
    optimalTemp: [12.5, 15],
    optimalHum: [90, 95],
    maxHoursNominal: 336, // ~14 days
    chillingLimit: 10,
    gasSensitivity: 1.4,
    icon: '🍅',
    notes: 'Mature-green tomatoes are best stored at 12.5–15°C; avoid temperatures below 10°C.'
  },

  potato: {
    name: 'Potato',
    optimalTemp: [7, 7],
    optimalHum: [98, 98],
    maxHoursNominal: 840, // 3–5 weeks
    chillingLimit: 5,
    gasSensitivity: 0.8,
    icon: '🥔',
    notes: 'Table potatoes are best stored around 7°C with high humidity; avoid temperatures below 4°C to prevent cold-induced sweetening.'
  },
cabbage: {

  name: 'Cabbage',

  optimalTemp: [0, 0],

  optimalHum: [95, 100],

  maxHoursNominal: 1080, // 45 days (30–45 days)

  chillingLimit: 0,

  gasSensitivity: 1.1,

  icon: '🥬',

  notes: 'Best stored near 0°C with relative humidity above 95% to maintain crispness and quality. Expected storage life: 30–45 days.'

},

  cauliflower: {
    name: 'Cauliflower',
    optimalTemp: [0, 0],
    optimalHum: [90, 98],
    maxHoursNominal: 504, // ~3 weeks
    chillingLimit: 0,
    gasSensitivity: 1.2,
    icon: '🥦',
    notes: 'Best stored near 0°C with high humidity; maintain 90–98% RH to reduce quality loss and browning.'
  },

  carrot: {
    name: 'Carrot',
    optimalTemp: [0, 0],
    optimalHum: [90, 95],
    maxHoursNominal: 3600, // ~5 months
    chillingLimit: 0,
    gasSensitivity: 0.9,
    icon: '🥕',
    notes: 'Best stored near 0°C with 90–95% relative humidity to prevent moisture loss and shriveling.'
  },

  green_beans: {
    name: 'Green Beans',
    optimalTemp: [5, 7.5],
    optimalHum: [95, 100],
    maxHoursNominal: 288, // ~12 days
    chillingLimit: 5,
    gasSensitivity: 1.3,
    icon: '🫛',
    notes: 'Store at 5–7.5°C with very high humidity; temperatures below 5°C can cause chilling injury.'
  },

  leafy_greens: {
    name: 'Leafy Greens',
    optimalTemp: [0, 2],
    optimalHum: [95, 100],
    maxHoursNominal: 336, // ~14 days
    chillingLimit: 0,
    gasSensitivity: 1.6,
    icon: '🌿',
    notes: 'Require very low temperature and high humidity to maintain freshness and prevent wilting.'
  },

  cucumber: {
    name: 'Cucumber',
    optimalTemp: [10, 12.5],
    optimalHum: [95, 95],
    maxHoursNominal: 336, // ~14 days
    chillingLimit: 10,
    gasSensitivity: 1.5,
    icon: '🥒',
    notes: 'Best stored at 10–12.5°C with approximately 95% RH; avoid standard refrigerator temperatures.'
  },

  capsicum: {
    name: 'Capsicum',
    optimalTemp: [7, 10],
    optimalHum: [90, 95],
    maxHoursNominal: 504, // ~3 weeks
    chillingLimit: 7,
    gasSensitivity: 1.2,
    icon: '🫑',
    notes: 'Best stored at 7–10°C with 90–95% relative humidity to maintain quality and reduce calyx decay.'
  },

  chilli: {
    name: 'Green Chilli',
    optimalTemp: [7, 10],
    optimalHum: [90, 95],
    maxHoursNominal: 504, // ~3 weeks
    chillingLimit: 7,
    gasSensitivity: 1.1,
    icon: '🌶️',
    notes: 'Best stored at 7–10°C with 90–95% relative humidity; monitor for pod softening.'
  }

};

class FreshVaultAIEngine {
  constructor() {
    this.cropKey = 'tomato';
    this.hoursStored = 48;
    this.currentTemp = 7.2;
    this.currentHum = 82;
    this.gasLevel = 'low'; // low, medium, elevated

    this.init();
  }

  init() {
    this.bindInputs();
    this.calculateFreshness();
  }

  bindInputs() {
    const cropSelect = document.getElementById('ai-crop-select');
    const hoursSlider = document.getElementById('ai-hours-slider');
    const hoursDisplay = document.getElementById('ai-hours-display');
    const tempSlider = document.getElementById('ai-temp-slider');
    const tempDisplay = document.getElementById('ai-temp-display');
    const humSlider = document.getElementById('ai-hum-slider');
    const humDisplay = document.getElementById('ai-hum-display');
    const gasSelect = document.getElementById('ai-gas-select');

    if (cropSelect) {
      cropSelect.addEventListener('change', (e) => {
        this.cropKey = e.target.value;
        this.calculateFreshness();
      });
    }

    if (hoursSlider) {
      hoursSlider.addEventListener('input', (e) => {
        this.hoursStored = parseInt(e.target.value, 10);
        if (hoursDisplay) hoursDisplay.textContent = `${this.hoursStored} hrs (${(this.hoursStored / 24).toFixed(1)} days)`;
        this.calculateFreshness();
      });
    }

    if (tempSlider) {
      tempSlider.addEventListener('input', (e) => {
        this.currentTemp = parseFloat(e.target.value);
        if (tempDisplay) tempDisplay.textContent = `${this.currentTemp.toFixed(1)}°C`;
        this.calculateFreshness();
      });
    }

    if (humSlider) {
      humSlider.addEventListener('input', (e) => {
        this.currentHum = parseInt(e.target.value, 10);
        if (humDisplay) humDisplay.textContent = `${this.currentHum}%`;
        this.calculateFreshness();
      });
    }

    if (gasSelect) {
      gasSelect.addEventListener('change', (e) => {
        this.gasLevel = e.target.value;
        this.calculateFreshness();
      });
    }
  }

  calculateFreshness() {
    const crop = CROP_DATABASE[this.cropKey] || CROP_DATABASE.tomato;

    // Time factor (0 to 1)
    const timeRatio = Math.min(1.0, this.hoursStored / crop.maxHoursNominal);
    let timePenalty = timeRatio * 45;

    // Temperature penalty
    let tempPenalty = 0;
    if (this.currentTemp < crop.optimalTemp[0]) {
      // Under-temperature (Chilling injury risk)
      const underDeg = crop.optimalTemp[0] - this.currentTemp;
      tempPenalty = underDeg * (this.currentTemp < crop.chillingLimit ? 9 : 4);
    } else if (this.currentTemp > crop.optimalTemp[1]) {
      // Over-temperature (accelerated respiration)
      const overDeg = this.currentTemp - crop.optimalTemp[1];
      tempPenalty = overDeg * 6.5;
    }

    // Humidity penalty
    let humPenalty = 0;
    if (this.currentHum < crop.optimalHum[0]) {
      const humDiff = crop.optimalHum[0] - this.currentHum;
      humPenalty = humDiff * 0.7; // Wilting
    } else if (this.currentHum > crop.optimalHum[1] + 4) {
      humPenalty = 8; // Condensation/mould risk
    }

    // Gas indicator penalty (MQ-135 indicator)
    let gasPenalty = 0;
    if (this.gasLevel === 'medium') gasPenalty = 15 * crop.gasSensitivity;
    if (this.gasLevel === 'elevated') gasPenalty = 35 * crop.gasSensitivity;

    // Combined Freshness Score (100 is pristine harvest)
    let rawScore = 100 - (timePenalty + tempPenalty + humPenalty + gasPenalty);
    let freshnessIndex = Math.max(5, Math.min(100, Math.round(rawScore)));

    // Categorization
    let status = 'GOOD';
    let statusClass = 'good';
    let statusEmoji = '🟢';
    let recommendation = '';

    if (freshnessIndex >= 75) {
      status = 'GOOD';
      statusClass = 'good';
      statusEmoji = '🟢';
      recommendation = `Storage conditions are well-aligned with ${crop.name} physiological tolerances. High market grade maintained. Safe to hold for optimal transport logistics.`;
    } else if (freshnessIndex >= 45) {
      status = 'USE SOON';
      statusClass = 'soon';
      statusEmoji = '🟡';
      recommendation = `Storage window narrowing due to elapsed duration or thermal drift. Schedule dispatch within 24–48 hours to preserve peak farm-gate value.`;
    } else {
      status = 'SELL FIRST';
      statusClass = 'sell';
      statusEmoji = '🔴';
      recommendation = `Priority Alert: Significant quality deterioration risk detected for ${crop.name}. Recommend immediate local aggregation or dispatch to prevent distress dumping.`;
    }

    // Update UI DOM
    const scorePill = document.getElementById('ai-sim-status-pill');
    const scoreVal = document.getElementById('ai-sim-score-val');
    const rationaleEl = document.getElementById('ai-sim-rationale');
    const targetRangeEl = document.getElementById('ai-target-range-info');

    if (scorePill) {
      scorePill.className = `freshness-status-pill ${statusClass}`;
      scorePill.innerHTML = `${statusEmoji} ${status}`;
    }

    if (scoreVal) {
      scoreVal.textContent = `Estimated Freshness Index: ${freshnessIndex}%`;
    }

    if (rationaleEl) {
      rationaleEl.innerHTML = `<strong>Physiological Analysis:</strong> ${recommendation} <br><span class="text-xs text-slate-500">Note: ${crop.notes}</span>`;
    }

    if (targetRangeEl) {
      targetRangeEl.textContent = `Optimal Target: ${crop.optimalTemp[0]}–${crop.optimalTemp[1]}°C | ${crop.optimalHum[0]}–${crop.optimalHum[1]}% RH`;
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.FreshVaultAI = new FreshVaultAIEngine();
});
