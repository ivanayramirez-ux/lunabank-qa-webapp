// accounts-store.js
(function () {
  const STORAGE_KEY = "lunabank-accounts";

  const DEFAULT_ACCOUNTS = [
    {
      id: "checking",
      name: "Everyday Checking",
      type: "Checking",
      balance: 2430.11,
      status: "Active"
    },
    {
      id: "savings",
      name: "High-Yield Savings",
      type: "Savings",
      balance: 15723.54,
      status: "Active"
    },
    {
      id: "credit",
      name: "Travel Card",
      type: "Credit Card",
      balance: -324.76,
      status: "Active"
    }
  ];

  function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      return null;
    } catch (e) {
      console.warn("Bad accounts data, resetting:", e);
      return null;
    }
  }

  function saveToStorage(accounts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  }

  
  let accounts = loadFromStorage();
  if (!accounts || accounts.length === 0) {
    accounts = DEFAULT_ACCOUNTS.map(a => ({ ...a }));
    saveToStorage(accounts);
  }

  const LunaAccounts = {
    getAll() {
      return accounts.map(a => ({ ...a }));
    },

    applyTransfer(fromId, toId, amount) {
      const amt = Number(amount);
      if (!Number.isFinite(amt) || amt <= 0) return;

      const from = accounts.find(a => a.id === fromId);
      const to = accounts.find(a => a.id === toId);
      if (!from || !to) return;

      from.balance -= amt;
      to.balance += amt;
      saveToStorage(accounts);
    },

    reset() {
      accounts = DEFAULT_ACCOUNTS.map(a => ({ ...a }));
      saveToStorage(accounts);
    }
  };

  window.LunaAccounts = LunaAccounts;
})();
