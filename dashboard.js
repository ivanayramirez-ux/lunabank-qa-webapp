
(function () {
  if (!window.LunaAccounts) {
    console.error("LunaAccounts not found. Did you include accounts-store.js?");
    return;
  }

  const accountsTableBody = document.getElementById("accounts-tbody");
  const filterSelect = document.getElementById("account-type-filter");

  
  const summaryTotalEl = document.getElementById("summary-total");
  const summaryCaptionEl =
    summaryTotalEl && summaryTotalEl.closest(".summary-card")
      ? summaryTotalEl.closest(".summary-card").querySelector(".summary-caption")
      : null;

  if (!accountsTableBody || !filterSelect) {
    console.warn("Dashboard table or filter not found on this page.");
    return;
  }

  let allAccounts = LunaAccounts.getAll() || [];
  let currentFilter = "all";

  function formatMoney(amount) {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  function updateSummary() {
    if (!summaryTotalEl) return;

    const totalBalance = allAccounts.reduce(
      (sum, acc) => sum + (Number(acc.balance) || 0),
      0
    );
    const activeCount = allAccounts.filter(
      (acc) => (acc.status || "").toLowerCase() === "active"
    ).length;

    summaryTotalEl.textContent = formatMoney(totalBalance);

    if (summaryCaptionEl) {
      summaryCaptionEl.textContent =
        activeCount === 1
          ? "Across 1 active account"
          : `Across ${activeCount} active accounts`;
    }
  }

  function renderTable() {
    const filtered = allAccounts.filter((acc) => {
      if (currentFilter === "all") return true;
      return acc.type === currentFilter;
    });

    accountsTableBody.innerHTML = "";

    filtered.forEach((acc) => {
      const tr = document.createElement("tr");

      const nameTd = document.createElement("td");
      nameTd.textContent = acc.name;

      const typeTd = document.createElement("td");
      typeTd.textContent = acc.type;

      const balanceTd = document.createElement("td");
      balanceTd.textContent = formatMoney(acc.balance);

      
      if (Number(acc.balance) < 0) {
        balanceTd.classList.add("negative");
      }

      const statusTd = document.createElement("td");
      statusTd.textContent = acc.status;

      tr.appendChild(nameTd);
      tr.appendChild(typeTd);
      tr.appendChild(balanceTd);
      tr.appendChild(statusTd);

      accountsTableBody.appendChild(tr);
    });

    updateSummary();
  }

  filterSelect.addEventListener("change", function () {
    currentFilter = this.value;
    allAccounts = LunaAccounts.getAll() || []; 
    renderTable();
  });

  
  renderTable();
})();


(function () {
  const logoutBtn = document.getElementById("logout-btn");
  const transferBtn = document.getElementById("transfer-btn");

  const rockyCard = document.getElementById("rocky-card");
  const rockyModal = document.getElementById("rocky-modal");
  const rockyCancel = document.getElementById("rocky-cancel-btn");
  const rockyContinue = document.getElementById("rocky-continue-btn");


  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (window.LunaAccounts && LunaAccounts.reset) {
        LunaAccounts.reset();
      } else {
        localStorage.removeItem("lunabank-accounts");
      }


      localStorage.removeItem("lunabank-statement-preferences");
      localStorage.removeItem("lunabank-profile-notifications");
      localStorage.removeItem("lunabank-profile-contact");
      localStorage.removeItem("lunabank-security-settings");

      window.location.href = "login.html";
    });
  }

  
  if (transferBtn) {
    transferBtn.addEventListener("click", () => {
      window.location.href = "transfer.html";
    });
  }

  
  function openRockyModal() {
    if (!rockyModal) return;
    rockyModal.classList.add("rocky-open");
    rockyModal.setAttribute("aria-hidden", "false");
  }

  function closeRockyModal() {
    if (!rockyModal) return;
    rockyModal.classList.remove("rocky-open");
    rockyModal.setAttribute("aria-hidden", "true");
  }

  
  if (rockyCard) {
    rockyCard.addEventListener("click", openRockyModal);
    rockyCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openRockyModal();
      }
    });
  }


  if (rockyContinue) {
    rockyContinue.addEventListener("click", (e) => {
      e.preventDefault();

      
      rockyModal.classList.add("rocky-force-close");

      
      window.open("rocky-down.html", "_blank", "noopener");
    });
  }


  
  if (rockyCancel) {
    rockyCancel.addEventListener("click", closeRockyModal);
  }

  
  if (rockyModal) {
    rockyModal.addEventListener("click", (e) => {
      if (e.target === rockyModal) {
        closeRockyModal();
      }
    });
  }

  
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      rockyModal &&
      rockyModal.classList.contains("rocky-open")
    ) {
      closeRockyModal();
    }
  });
})();
