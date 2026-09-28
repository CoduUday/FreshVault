/* ==========================================================================
   FreshVault NER - AI Freshness Decision Support Simulation Engine
   Smart Mini Cold Storage for North Eastern Region
   ========================================================================== */

const CROP_DATABASE = {
  tomato: {
    name: 'Tomato',
    optimalTemp: [10, 14],
    optimalHum: [85, 90],
    maxHoursNominal: 360, // 15 days
    chillingLimit: 10,
    gasSensitivity: 1.4,
    icon: '🍅',
    notes: 'Sensitive to chilling injury below 10°C; do not overcool.'
  },
  potato: {
    name: 'Potato',
    optimalTemp: [8, 12],
    optimalHum: [85, 90],
    maxHoursNominal: 1440, // 60 days
    chillingLimit: 5,
    gasSensitivity: 0.8,
    icon: '🥔',
    notes: 'Avoid exposure below 4°C to prevent cold-induced sweetening.'
  },
  cabbage: {
    name: 'Cabbage',
    optimalTemp: [1, 5],
    optimalHum: [90, 95],
    maxHoursNominal: 720, // 30 days
    chillingLimit: 0,
    gasSensitivity: 1.1,
    icon: '🥬',
    notes: 'Maintains crispness best at near-zero temperatures with high RH.'
  },
  cauliflower: {
    name: 'Cauliflower',
    optimalTemp: [1, 4],
    optimalHum: [90, 95],
    maxHoursNominal: 360,
    chillingLimit: 0,
    gasSensitivity: 1.2,
    icon: '🥦',
    notes: 'Curd browning risk if relative humidity drops below 85%.'
  },
  carrot: {
    name: 'Carrot',
    optimalTemp: [1, 4],
    optimalHum: [95, 98],
    maxHoursNominal: 840,
    chillingLimit: 0,
    gasSensitivity: 0.9,
    icon: '🥕',
    notes: 'Requires near-saturation humidity to prevent root shriveling.'
  },
  green_beans: {
    name: 'Green Beans',
    optimalTemp: [5, 8],
    optimalHum: [90, 95],
    maxHoursNominal: 216,
    chillingLimit: 5,
    gasSensitivity: 1.3,
    icon: '🫘',
    notes: 'Pitting and russeting occur rapidly if stored below 5°C.'
  },
  leafy_greens: {
    name: 'Leafy Greens',
    optimalTemp: [0, 2],
    optimalHum: [95, 98],
    maxHoursNominal: 120, // 5 days
    chillingLimit: 0,
    gasSensitivity: 1.6,
    icon: '🥗',
    notes: 'Very high surface area to volume ratio; highest urgency crop.'
  },
  cucumber: {
    name: 'Cucumber',
    optimalTemp: [10, 13],
    optimalHum: [90, 95],
    maxHoursNominal: 240,
    chillingLimit: 10,
    gasSensitivity: 1.5,
    icon: '🥒',
    notes: 'Watery breakdown occurs if exposed to standard refrigerator temps.'
  },
  capsicum: {
    name: 'Capsicum',
    optimalTemp: [7, 10],
    optimalHum: [90, 95],
    maxHoursNominal: 336,
    chillingLimit: 7,
    gasSensitivity: 1.2,
    icon: '🫑',
    notes: 'Moderate temperature requirement; vulnerable to calyx decay.'
  },
  chilli: {
    name: 'Chilli',
    optimalTemp: [8, 12],
    optimalHum: [85, 90],
    maxHoursNominal: 360,
    chillingLimit: 7,
    gasSensitivity: 1.1,
    icon: '🌶️',
    notes: 'Good storage resilience; watch for pod softening.'
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
