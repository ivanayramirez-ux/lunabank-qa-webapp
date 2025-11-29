
(function () {
  const SECURITY_KEY = "lunabank-security-settings";

  const mfaToggle = document.querySelector('[data-sec-toggle="mfa"]');
  const bioToggle = document.querySelector('[data-sec-toggle="biometrics"]');
  const alertRadios = document.querySelectorAll('input[name="sec-alerts"]');
  const trustedCountEl = document.querySelector('[data-sec="trusted-count"]');

  const cancelBtn = document.getElementById("sec-cancel");
  const saveBtn = document.getElementById("sec-save");
  const messageEl = document.getElementById("sec-message");

  const defaults = {
    mfa: true,
    biometrics: true,
    loginAlerts: "email_sms",
    trustedDevices: 3,
  };

  let currentSettings = { ...defaults };
  let initialSettings = { ...defaults };
  let hasChanges = false;

  function loadSettings() {
    try {
      const raw = localStorage.getItem(SECURITY_KEY);
      if (!raw) return { ...defaults };
      const parsed = JSON.parse(raw);
      return { ...defaults, ...parsed };
    } catch (e) {
      return { ...defaults };
    }
  }

  function applySettingsToForm(settings) {
    if (mfaToggle) {
      mfaToggle.checked = !!settings.mfa;
    }
    if (bioToggle) {
      bioToggle.checked = !!settings.biometrics;
    }

    if (alertRadios && alertRadios.length) {
      alertRadios.forEach((radio) => {
        radio.checked = radio.value === settings.loginAlerts;
      });
    }

    if (trustedCountEl) {
      trustedCountEl.textContent = String(settings.trustedDevices);
    }
  }

  function readFormSettings() {
    const settings = { ...currentSettings };

    if (mfaToggle) {
      settings.mfa = mfaToggle.checked;
    }
    if (bioToggle) {
      settings.biometrics = bioToggle.checked;
    }

    if (alertRadios && alertRadios.length) {
      alertRadios.forEach((radio) => {
        if (radio.checked) {
          settings.loginAlerts = radio.value;
        }
      });
    }

    
    if (!settings.mfa && !settings.biometrics) {
      settings.trustedDevices = 1;
    } else {
      settings.trustedDevices = 3;
    }

    return settings;
  }

  function updateSaveState() {
    if (!saveBtn) return;
    if (hasChanges) {
      saveBtn.disabled = false;
    } else {
      saveBtn.disabled = true;
    }
  }

  function markDirty() {
    hasChanges = true;
    updateSaveState();
    if (messageEl) {
      messageEl.textContent = "You have unsaved security changes.";
    }
  }

  function resetFormToInitial() {
    currentSettings = { ...initialSettings };
    applySettingsToForm(currentSettings);
    hasChanges = false;
    updateSaveState();
    if (messageEl) {
      messageEl.textContent = "Changes canceled.";
    }
  }

  function saveSettings() {
    const newSettings = readFormSettings();
    currentSettings = { ...newSettings };
    initialSettings = { ...newSettings };

    localStorage.setItem(SECURITY_KEY, JSON.stringify(newSettings));

    applySettingsToForm(newSettings);

    hasChanges = false;
    updateSaveState();

    if (messageEl) {
      messageEl.textContent =
        "Security settings updated for this session. They will reset after you log out.";
    }
  }

  function attachListeners() {
    if (mfaToggle) {
      mfaToggle.addEventListener("change", markDirty);
    }
    if (bioToggle) {
      bioToggle.addEventListener("change", markDirty);
    }

    if (alertRadios && alertRadios.length) {
      alertRadios.forEach((radio) => {
        radio.addEventListener("change", markDirty);
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", resetFormToInitial);
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", saveSettings);
    }
  }

  
  currentSettings = loadSettings();
  initialSettings = { ...currentSettings };
  applySettingsToForm(currentSettings);
  updateSaveState();
  attachListeners();
})();
