
(function () {
    const NOTIF_KEY = "lunabank-profile-notifications";
    const CONTACT_KEY = "lunabank-profile-contact";
    const SECURITY_KEY = "lunabank-security-settings";


    const actionsRow = document.getElementById("profile-contact-actions");
    const saveBtn = document.getElementById("profile-contact-save");
    const cancelBtn = document.getElementById("profile-contact-cancel");
    const editBtn = document.getElementById("profile-contact-edit");
    const msgEl = document.getElementById("profile-contact-message");

    let isDirty = false;
    let lastSavedContact = null;
    let lastSavedNotif = null;

    function showActionsRow() {
        if (actionsRow) actionsRow.hidden = false;
    }

    function hideActionsRow() {
        if (actionsRow) actionsRow.hidden = true;
    }

    function markDirty() {
        isDirty = true;
        showActionsRow();
        if (saveBtn) saveBtn.disabled = false;
        if (msgEl) msgEl.textContent = "";
    }

    function clearDirty(message) {
        isDirty = false;
        if (saveBtn) saveBtn.disabled = true;
        hideActionsRow();
        if (msgEl && message) msgEl.textContent = message;
    }


    const contactFieldIds = [
        "pf-email",
        "pf-phone",
        "pf-address-line1",
        "pf-city",
        "pf-state",
        "pf-zip",
    ];

    const contactInputs = contactFieldIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    function setContactEditing(isEditing) {
        contactInputs.forEach((input) => {
            input.disabled = !isEditing;
        });
    }

    function getContactFromDom() {
        const data = {};
        contactInputs.forEach((input) => {
            data[input.id] = input.value.trim();
        });
        return data;
    }

    function applyContactToDom(data) {
        if (!data) return;
        contactInputs.forEach((input) => {
            if (Object.prototype.hasOwnProperty.call(data, input.id)) {
                input.value = data[input.id];
            }
        });
    }

    function loadContact() {
        let saved;
        try {
            saved = JSON.parse(localStorage.getItem(CONTACT_KEY) || "null");
        } catch (e) {
            saved = null;
        }

        if (saved) {
            applyContactToDom(saved);
            lastSavedContact = saved;
        } else {

            lastSavedContact = getContactFromDom();
        }
    }

    if (editBtn) {
        editBtn.addEventListener("click", () => {
            if (msgEl) msgEl.textContent = "";
            setContactEditing(true);
            showActionsRow();
            if (saveBtn) saveBtn.disabled = true;
            isDirty = false;
        });
    }


    contactInputs.forEach((input) => {
        input.addEventListener("input", markDirty);
    });


    const notifInputs = document.querySelectorAll(
        ".profile-toggle-list input[type='checkbox'][data-pref]"
    );

    function applyNotifPrefs(prefs) {
        if (!prefs) return;
        notifInputs.forEach((input) => {
            const key = input.dataset.pref;
            if (key && Object.prototype.hasOwnProperty.call(prefs, key)) {
                input.checked = !!prefs[key];
            }
        });
    }

    function collectNotifPrefs() {
        const prefs = {};
        notifInputs.forEach((input) => {
            const key = input.dataset.pref;
            if (key) {
                prefs[key] = input.checked;
            }
        });
        return prefs;
    }

    function loadNotificationPrefs() {
        let saved;
        try {
            saved = JSON.parse(localStorage.getItem(NOTIF_KEY) || "null");
        } catch (e) {
            saved = null;
        }

        if (saved) {
            applyNotifPrefs(saved);
            lastSavedNotif = saved;
        } else {

            const defaults = {
                balanceAlerts: true,
                largeTransactions: true,
                statementReady: true,
                marketing: false,
            };
            applyNotifPrefs(defaults);
            lastSavedNotif = defaults;
        }
    }


    notifInputs.forEach((input) => {
        input.addEventListener("change", markDirty);
    });


    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            if (!isDirty) return;


            const contactData = getContactFromDom();
            localStorage.setItem(CONTACT_KEY, JSON.stringify(contactData));
            lastSavedContact = contactData;


            const notifPrefs = collectNotifPrefs();
            localStorage.setItem(NOTIF_KEY, JSON.stringify(notifPrefs));
            lastSavedNotif = notifPrefs;


            setContactEditing(false);

            clearDirty("Profile updated for this session.");
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {

            applyContactToDom(lastSavedContact);
            applyNotifPrefs(lastSavedNotif);

            setContactEditing(false);
            clearDirty("Changes canceled.");
        });
    }


    function loadSecuritySettings() {
        const defaults = {
            mfa: true,
            biometrics: true,
            loginAlerts: "email_sms",
            trustedDevices: 3,
        };

        let settings;
        try {
            const raw = localStorage.getItem(SECURITY_KEY);
            settings = raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
        } catch (e) {
            settings = { ...defaults };
        }

        const mfaPill = document.getElementById("security-mfa-pill");
        const bioPill = document.getElementById("security-bio-pill");
        const alertsPill = document.getElementById("security-alerts-pill");
        const devicesPill = document.getElementById("security-devices-pill");

        if (mfaPill) {
            mfaPill.textContent = settings.mfa ? "Enabled" : "Disabled";
        }
        if (bioPill) {
            bioPill.textContent = settings.biometrics ? "Enabled" : "Disabled";
        }
        if (alertsPill) {
            let label = "Email & SMS";
            switch (settings.loginAlerts) {
                case "email":
                    label = "Email only";
                    break;
                case "sms":
                    label = "SMS only";
                    break;
                case "none":
                    label = "Off";
                    break;
            }
            alertsPill.textContent = label;
        }
        if (devicesPill) {
            devicesPill.textContent = `Trusted devices: ${settings.trustedDevices}`;
        }
    }


    loadContact();
    loadNotificationPrefs();
    setContactEditing(false);
    clearDirty("");
    loadSecuritySettings();
})();
