try {
  if (!window.LunaAccounts) {
    console.error("LunaAccounts not found – is accounts-store.js included?");
    throw new Error("Missing LunaAccounts");
  }

  const form = document.getElementById("transfer-form");
  const banner = document.getElementById("transfer-banner");

  const fromAccount = document.getElementById("from-account");
  const toAccount = document.getElementById("to-account");
  const amountInput = document.getElementById("amount");

  const fromError = document.getElementById("from-error");
  const toError = document.getElementById("to-error");
  const amountError = document.getElementById("amount-error");

  function showBanner(msg, isError) {
    banner.textContent = msg;
    banner.className =
      "auth-banner " + (isError ? "auth-banner-error" : "auth-banner-success");
    banner.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearErrors() {
    fromError.textContent = "";
    toError.textContent = "";
    amountError.textContent = "";

    fromAccount.classList.remove("input-error");
    toAccount.classList.remove("input-error");
    amountInput.classList.remove("input-error");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    try {
      clearErrors();
      banner.textContent = "";

      let valid = true;

      const fromId = fromAccount.value;   
      const toId = toAccount.value;
      const amountVal = parseFloat(amountInput.value);

      
      if (!fromId) {
        fromError.textContent = "Choose an account.";
        fromAccount.classList.add("input-error");
        valid = false;
      }

      
      if (!toId) {
        toError.textContent = "Choose an account.";
        toAccount.classList.add("input-error");
        valid = false;
      }

      
      if (fromId && toId && fromId === toId) {
        toError.textContent = "Accounts must be different.";
        toAccount.classList.add("input-error");
        valid = false;
      }

      
      if (!amountInput.value || isNaN(amountVal) || amountVal <= 0) {
        amountError.textContent = "Enter a valid positive amount.";
        amountInput.classList.add("input-error");
        valid = false;
      }

      
      if (valid) {
        const accounts = LunaAccounts.getAll();
        const fromAcc = accounts.find(a => a.id === fromId);

        if (!fromAcc) {
          throw new Error("From account not found");
        }

        if (fromAcc.type !== "Credit Card" && fromAcc.balance < amountVal) {
          amountError.textContent = "Insufficient funds.";
          amountInput.classList.add("input-error");
          valid = false;
        }
      }

      if (!valid) {
        showBanner("Please fix the errors and try again.", true);
        return;
      }

      
      LunaAccounts.applyTransfer(fromId, toId, amountVal);

      const transferID = "TX-" + Math.floor(Math.random() * 999999);

      showBanner(
        `Transfer scheduled successfully. Transfer ID: ${transferID}`,
        false
      );

      form.reset();
    } catch (err) {
      console.error("Transfer JS error:", err);
      showBanner("Something went wrong.", true);
    }
  });
} catch (fatal) {
  console.error("Fatal transfer.js error:", fatal);
}
