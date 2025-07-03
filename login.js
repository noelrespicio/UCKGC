// Initialize Supabase
const supabase = window.supabase.createClient(
  'https://wlthlwxcmltwescezjlk.supabase.co', // ⬅️ Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdGhsd3hjbWx0d2VzY2V6amxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDQ4MDcsImV4cCI6MjA2NzAyMDgwN30.tvUeTFVDdQomDHHV0JSpsXHP9IbQVkOhEvBpCglzI-o'                 // ⬅️ Replace with your Supabase anon key
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
