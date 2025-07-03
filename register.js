document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const spinner = document.getElementById("loadingSpinner");
  const errorDiv = document.getElementById("errorMessage");
  const form = e.target;

  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirm_password.value;
  const location = form.location.value.trim();

  if (password !== confirmPassword) {
    errorDiv.textContent = "Passwords do not match!";
    return;
  }

  spinner.style.display = "block";

  fetch("registeradmin.php", {
    method: "POST",
    body: new URLSearchParams({
      email,
      password,
      confirm_password: confirmPassword,
      location
    })
  })
    .then(res => res.text())
    .then(response => {
      spinner.style.display = "none";
      document.write(response); // Replace current page with PHP response (including redirect or error)
    })
    .catch(() => {
      spinner.style.display = "none";
      errorDiv.textContent = "Something went wrong. Try again later.";
    });
});
