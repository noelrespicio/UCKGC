const supabase = supabase.createClient(
  'https://wlthlwxcmltwescezjlk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdGhsd3hjbWx0d2VzY2V6amxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDQ4MDcsImV4cCI6MjA2NzAyMDgwN30.tvUeTFVDdQomDHHV0JSpsXHP9IbQVkOhEvBpCglzI-o'
);

const form = document.getElementById("registerForm");
const spinner = document.getElementById("loadingSpinner");
const errorMsg = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  spinner.style.display = "block";
  errorMsg.textContent = "";

  const email = form.email.value.trim();
  const password = form.password.value;
  const confirm = form.confirm_password.value;
  const location = form.location.value.trim();

  if (password !== confirm) {
    spinner.style.display = "none";
    return errorMsg.textContent = "Passwords don't match!";
  }

  const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password });
  if (authErr) {
    spinner.style.display = "none";
    return errorMsg.textContent = authErr.message;
  }

  const userId = authData.user.id;
  const { error: dbErr } = await supabase
    .from("admins")
    .insert({ id: userId, email, location, role: 'admin', status: 'pending' });

  spinner.style.display = "none";
  if (dbErr) {
    errorMsg.textContent = dbErr.message;
  } else {
    alert("Registered! Please verify your email.");
    window.location.href = "verify.html";
  }
});
