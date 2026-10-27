document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript connected successfully!");

    // Example: welcome message
    const welcomeButton = document.querySelector("#welcomeButton");

    if (welcomeButton) {
        welcomeButton.addEventListener("click", function () {
            alert("Welcome to my website!");
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const accounts = [];
  let mode = "signup";
  let currentUser = null;

  const modal = document.getElementById("authModal");
  const form = document.getElementById("authForm");
  const nameInput = document.getElementById("authName");
  const emailInput = document.getElementById("authEmail");
  const passwordInput = document.getElementById("authPassword");
  const title = document.getElementById("formTitle");
  const submit = document.getElementById("submitAuth");
  const message = document.getElementById("authMessage");
  const profile = document.getElementById("profileArea");

  // Create a button without changing the existing header
  const openButton = document.createElement("button");
  openButton.textContent = "Login / Signup";
  openButton.type = "button";
  openButton.className = "auth-button";
  document.body.prepend(openButton);

  function setMode(nextMode) {
    mode = nextMode;
    nameInput.hidden = mode === "login";
    nameInput.required = mode === "signup";
    passwordInput.autocomplete =
      mode === "login" ? "current-password" : "new-password";

    title.textContent =
      mode === "signup" ? "Create Account" : "Login";

    submit.textContent =
      mode === "signup" ? "Sign Up" : "Login";

    form.hidden = false;
    profile.hidden = true;
    message.textContent = "";
    message.className = "";
  }

  openButton.addEventListener("click", () => {
    modal.classList.add("show");

    if (currentUser) {
      form.hidden = true;
      profile.hidden = false;
      document.getElementById("welcomeMessage").textContent =
        "Welcome, " + currentUser.name + "!";
    } else {
      setMode("signup");
    }
  });

  document.getElementById("signupTab").addEventListener("click", () => {
    setMode("signup");
  });

  document.getElementById("loginTab").addEventListener("click", () => {
    setMode("login");
  });

  document.getElementById("closeAuth").addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (password.length < 6) {
      message.textContent = "Password must have 6 characters.";
      message.className = "error";
      return;
    }

    if (mode === "signup") {
      if (!name) {
        message.textContent = "Please enter your name.";
        message.className = "error";
        return;
      }

      if (accounts.some(user => user.email === email)) {
        message.textContent = "Email already registered. Please login.";
        message.className = "error";
        return;
      }

      // Practice demo only; data stays in memory.
      accounts.push({ name, email, password });

      message.textContent = "Signup successful! Now click Login.";
      message.className = "success";
      setMode("login");
      emailInput.value = email;
      passwordInput.value = "";
      return;
    }

    const user = accounts.find(
      item => item.email === email && item.password === password
    );

    if (!user) {
      message.textContent = "Incorrect details or account not found.";
      message.className = "error";
      return;
    }

    currentUser = { name: user.name, email: user.email };
    form.hidden = true;
    profile.hidden = false;
    document.getElementById("welcomeMessage").textContent =
      "Welcome, " + currentUser.name + "!";
    openButton.textContent = "My Account";
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    currentUser = null;
    openButton.textContent = "Login / Signup";
    modal.classList.remove("show");
    setMode("signup");
  });
});