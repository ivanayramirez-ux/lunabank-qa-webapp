
(function () {
    const accountFilter = document.getElementById("stmt-account-filter");
    const yearFilter = document.getElementById("stmt-year-filter");
    const typeFilter = document.getElementById("stmt-format-filter");

    const rows = Array.from(document.querySelectorAll("tr.stmt-row"));

    if (!rows.length) {
        console.warn("statements.js: no .stmt-row elements found.");
        return;
    }

    function matchesFilter(row, filterEl, attrName) {
        if (!filterEl) return true;
        const val = filterEl.value;
        if (!val || val === "all") return true;
        const rowVal = row.getAttribute(attrName);
        return rowVal === val;
    }

    function applyFilters() {
        rows.forEach((row) => {
            const matchAccount = matchesFilter(row, accountFilter, "data-account");
            const matchYear = matchesFilter(row, yearFilter, "data-year");
            const matchType = matchesFilter(row, typeFilter, "data-doc-type");

            row.style.display =
                matchAccount && matchYear && matchType ? "" : "none";
        });
    }

    if (accountFilter) accountFilter.addEventListener("change", applyFilters);
    if (yearFilter) yearFilter.addEventListener("change", applyFilters);
    if (typeFilter) typeFilter.addEventListener("change", applyFilters);

    applyFilters();
})();


(function () {
    const prefsKey = "lunabank-statement-preferences";

    const paperlessCheckbox = document.getElementById("paperless-all");
    const emailInput = document.getElementById("delivery-email");

    const saveBtn = document.querySelector(
        "section[aria-label='Delivery preferences'] button.btn-primary"
    );

    if (!paperlessCheckbox || !emailInput || !saveBtn) {
        return;
    }

    function loadPrefs() {
        try {
            const raw = localStorage.getItem(prefsKey);
            if (!raw) return;

            const prefs = JSON.parse(raw);
            paperlessCheckbox.checked = !!prefs.paperless;
            if (prefs.email) {
                emailInput.value = prefs.email;
            }
        } catch (e) {
            console.warn("Could not load statement prefs", e);
        }
    }

    function savePrefs() {
        const prefs = {
            paperless: paperlessCheckbox.checked,
            email: emailInput.value.trim(),
        };

        try {
            localStorage.setItem(prefsKey, JSON.stringify(prefs));

            alert("Preferences saved for this session.");
        } catch (e) {
            console.warn("Could not save statement prefs", e);
            alert("Could not save preferences.");
        }
    }

    saveBtn.addEventListener("click", savePrefs);


    loadPrefs();
})();
