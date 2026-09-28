/* ==========================================================================
   FreshVault NER - Live IoT Monitoring Telemetry Engine (Chart.js)
   Smart Mini Cold Storage for North Eastern Region
   ========================================================================== */

class FreshVaultDashboard {
  constructor() {
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
      // Trigger reflow to restart CSS animation
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
    // Interactive Simulation Controls
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
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.FreshVaultDash = new FreshVaultDashboard();
});
