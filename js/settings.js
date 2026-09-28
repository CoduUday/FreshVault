/* ==========================================================================
   FreshVault NER - Settings & Authentication Engine
   Solar-Powered Smart Mini Cold Storage for North Eastern Region
   ========================================================================== */

class FreshVaultSettings {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('fv_user')) || null;
    this.preferences = JSON.parse(localStorage.getItem('fv_preferences')) || {
      tempTolerance: 1.5,
      doorAlarm: true,
      batteryAlarmLevel: 25,
      smsAlerts: true,
      whatsappAlerts: true,
      language: 'en',
      tempUnit: 'C',
      syncInterval: '30s'
    };

    this.init();
  }

  init() {
    this.bindAuthTabs();
    this.bindPasswordToggles();
    this.bindAuthForms();
    this.bindPreferencesForm();
    this.renderUserState();
  }

  bindAuthTabs() {
    const tabBtns = document.querySelectorAll('.auth-tab-btn');
    const loginForm = document.getElementById('auth-login-form');
    const signupForm = document.getElementById('auth-signup-form');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.getAttribute('data-tab');
        if (mode === 'login') {
          if (loginForm) loginForm.style.display = 'flex';
          if (signupForm) signupForm.style.display = 'none';
        } else {
          if (loginForm) loginForm.style.display = 'none';
          if (signupForm) signupForm.style.display = 'flex';
        }
      });
    });

    // Quick demo buttons
    const demoFarmerBtn = document.getElementById('btn-demo-farmer');
    const demoFpoBtn = document.getElementById('btn-demo-fpo');

    if (demoFarmerBtn) {
      demoFarmerBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');
        const roleSelect = document.getElementById('login-role');
        if (emailInput) emailInput.value = 'farmer.shillong@freshvault.ner';
        if (passInput) passInput.value = 'ner2026fresh';
        if (roleSelect) roleSelect.value = 'farmer';
        this.showToast('ℹ️ Demo credentials filled for Shillong Field Farmer!');
      });
    }

    if (demoFpoBtn) {
      demoFpoBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');
        const roleSelect = document.getElementById('login-role');
        if (emailInput) emailInput.value = 'fpo.karbi@freshvault.ner';
        if (passInput) passInput.value = 'coopkarbi2026';
        if (roleSelect) roleSelect.value = 'fpo_manager';
        this.showToast('ℹ️ Demo credentials filled for Karbi Anglong FPO Lead!');
      });
    }
  }

  bindPasswordToggles() {
    const toggleBtns = document.querySelectorAll('.password-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const inputId = btn.getAttribute('data-target');
        const input = document.getElementById(inputId);
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
          } else {
            input.type = 'password';
            btn.textContent = '👁️';
          }
        }
      });
    });
  }

  bindAuthForms() {
    // Login Form Submit
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;

        if (!email || !password) {
          this.showToast('⚠️ Please enter both Email/Phone and Password.');
          return;
        }

        // Mock login successful
        const roleNames = {
          farmer: 'Field Operator / Farmer',
          fpo_manager: 'FPO Cooperative Lead',
          officer: 'Agri District Officer',
          admin: 'Cold-Chain Admin'
        };

        const username = email.split('@')[0].replace('.', ' ').toUpperCase();
        this.currentUser = {
          name: username || 'Field Operator',
          email: email,
          role: roleNames[role] || 'Field Operator',
          chamberId: 'FV-NER-004',
          region: 'Shillong Agri Hub, Meghalaya',
          loggedInAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        localStorage.setItem('fv_user', JSON.stringify(this.currentUser));
        this.renderUserState();
        this.showToast(`🎉 Welcome back, ${this.currentUser.name}! Authenticated to Unit ${this.currentUser.chamberId}.`);
      });
    }

    // Sign Up Form Submit
    const signupForm = document.getElementById('auth-signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const phone = document.getElementById('signup-phone').value.trim();
        const chamberId = document.getElementById('signup-chamber').value.trim() || 'FV-NER-004';
        const region = document.getElementById('signup-region').value;
        const pass = document.getElementById('signup-password').value;
        const passConfirm = document.getElementById('signup-confirm').value;

        if (!name || !phone || !pass) {
          this.showToast('⚠️ Please fill out all required registration fields.');
          return;
        }

        if (pass !== passConfirm) {
          this.showToast('⚠️ Passwords do not match. Please verify.');
          return;
        }

        // Mock signup successful
        this.currentUser = {
          name: name,
          email: `${phone}@ner-farmers.in`,
          phone: phone,
          role: 'Registered Field Operator',
          chamberId: chamberId,
          region: region,
          loggedInAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        localStorage.setItem('fv_user', JSON.stringify(this.currentUser));
        this.renderUserState();
        this.showToast(`✨ Account created successfully! Chamber ${chamberId} bound to ${name}.`);
      });
    }

    // Logout action
    const logoutBtn = document.getElementById('btn-auth-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.currentUser = null;
        localStorage.removeItem('fv_user');
        this.renderUserState();
        this.showToast('👋 You have been logged out from the Chamber Console.');
      });
    }
  }

  bindPreferencesForm() {
    const saveBtn = document.getElementById('btn-save-settings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const tempTol = document.getElementById('pref-temp-tol');
        const doorAlarm = document.getElementById('pref-door-alarm');
        const battAlarm = document.getElementById('pref-batt-alarm');
        const smsAlerts = document.getElementById('pref-sms-alerts');
        const waAlerts = document.getElementById('pref-wa-alerts');
        const langSelect = document.getElementById('pref-language');
        const syncInterval = document.getElementById('pref-sync-interval');

        if (tempTol) this.preferences.tempTolerance = parseFloat(tempTol.value);
        if (doorAlarm) this.preferences.doorAlarm = doorAlarm.checked;
        if (battAlarm) this.preferences.batteryAlarmLevel = parseInt(battAlarm.value, 10);
        if (smsAlerts) this.preferences.smsAlerts = smsAlerts.checked;
        if (waAlerts) this.preferences.whatsappAlerts = waAlerts.checked;
        if (langSelect) this.preferences.language = langSelect.value;
        if (syncInterval) this.preferences.syncInterval = syncInterval.value;

        localStorage.setItem('fv_preferences', JSON.stringify(this.preferences));
        this.showToast('💾 Chamber operational preferences saved and synchronized with MCU!');
      });
    }

    // Export logs button
    const exportBtn = document.getElementById('btn-export-telemetry');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const data = {
          exportTimestamp: new Date().toISOString(),
          chamberUnit: 'FV-NER-004',
          operator: this.currentUser ? this.currentUser.name : 'Guest Operator',
          liveTelemetry: window.FreshVaultDash ? window.FreshVaultDash.telemetry : {},
          systemPreferences: this.preferences
        };

        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", jsonStr);
        dlAnchor.setAttribute("download", `FreshVault_Telemetry_Log_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();

        this.showToast('📥 Telemetry audit log exported successfully!');
      });
    }

    // Live slider display updates
    const tolSlider = document.getElementById('pref-temp-tol');
    const tolDisplay = document.getElementById('pref-temp-tol-val');
    if (tolSlider && tolDisplay) {
      tolSlider.addEventListener('input', (e) => {
        tolDisplay.textContent = `±${parseFloat(e.target.value).toFixed(1)}°C`;
      });
    }
  }

  renderUserState() {
    const unauthContainer = document.getElementById('auth-unauth-container');
    const loggedinContainer = document.getElementById('auth-loggedin-container');
    const profileName = document.getElementById('auth-profile-name');
    const profileRole = document.getElementById('auth-profile-role');
    const profileChamber = document.getElementById('auth-profile-chamber');
    const profileRegion = document.getElementById('auth-profile-region');
    const profileTime = document.getElementById('auth-profile-time');

    if (this.currentUser) {
      if (unauthContainer) unauthContainer.style.display = 'none';
      if (loggedinContainer) loggedinContainer.style.display = 'flex';

      if (profileName) profileName.textContent = this.currentUser.name;
      if (profileRole) profileRole.textContent = this.currentUser.role;
      if (profileChamber) profileChamber.textContent = `Unit: ${this.currentUser.chamberId}`;
      if (profileRegion) profileRegion.textContent = `📍 ${this.currentUser.region}`;
      if (profileTime) profileTime.textContent = `Session: Active (Since ${this.currentUser.loggedInAt})`;
    } else {
      if (unauthContainer) unauthContainer.style.display = 'block';
      if (loggedinContainer) loggedinContainer.style.display = 'none';
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
  window.FreshVaultSettingsEngine = new FreshVaultSettings();
});
