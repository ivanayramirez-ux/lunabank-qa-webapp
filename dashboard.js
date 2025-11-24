// dashboard.js
(function () {
  if (!window.LunaAccounts) {
    console.error("LunaAccounts not found. Did you include accounts-store.js?");
    return;
  }

  const accountsTableBody = document.getElementById("accounts-tbody");
  const filterSelect = document.getElementById("account-type-filter");

  let allAccounts = LunaAccounts.getAll();
  let currentFilter = "all";

  function formatMoney(amount) {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }

  function renderTable() {
    const filtered = allAccounts.filter(acc => {
      if (currentFilter === "all") return true;
      return acc.type === currentFilter;
    });

    accountsTableBody.innerHTML = "";

    filtered.forEach(acc => {
      const tr = document.createElement("tr");

      const nameTd = document.createElement("td");
      nameTd.textContent = acc.name;

      const typeTd = document.createElement("td");
      typeTd.textContent = acc.type;

      const balanceTd = document.createElement("td");
      balanceTd.textContent = formatMoney(acc.balance);

      const statusTd = document.createElement("td");
      statusTd.textContent = acc.status;

      tr.appendChild(nameTd);
      tr.appendChild(typeTd);
      tr.appendChild(balanceTd);
      tr.appendChild(statusTd);

      accountsTableBody.appendChild(tr);
    });
  }

  filterSelect.addEventListener("change", function () {
    currentFilter = this.value;
    allAccounts = LunaAccounts.getAll(); // refresh from storage
    renderTable();
  });

  renderTable();
})();
