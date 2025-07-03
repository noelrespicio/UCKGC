// Initialize Supabase
const supabase = window.supabase.createClient(
  'https://wlthlwxcmltwescezjlk.supabase.co', // ⬅️ Replace with your Supabase URL
  'process.env.SUPABASE_KEY'                 // ⬅️ Replace with your Supabase anon key
);

// Login form handler
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = this.email.value.trim();
  const password = this.password.value;
  const errorDiv = document.getElementById("error");

  // Clear any previous error
  errorDiv.style.display = "none";

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      errorDiv.textContent = error.message;
      errorDiv.style.display = "block";
    } else {
      // ✅ Successfully signed in — redirect to dashboard
      window.location.href = "dashboard.html";
    }
  } catch (err) {
    errorDiv.textContent = "Unexpected error occurred. Please try again.";
    errorDiv.style.display = "block";
    console.error("Login Error:", err);
  }
});
