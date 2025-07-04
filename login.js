
// Initialize Supabase
const supabase = window.supabase.createClient(
  'https://wlthlwxcmltwescezjlk.supabase.co', // ⬅️ Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdGhsd3hjbWx0d2VzY2V6amxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDQ4MDcsImV4cCI6MjA2NzAyMDgwN30.tvUeTFVDdQomDHHV0JSpsXHP9IbQVkOhEvBpCglzI-o'                 // ⬅️ Replace with your Supabase anon key

);

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = this.email.value.trim();
  const password = this.password.value;
  const errorDiv = document.getElementById("error");

  errorDiv.style.display = "none";

  try {
    // Step 1: Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      errorDiv.textContent = authError.message;
      errorDiv.style.display = "block";
      return;
    }

    // Step 2: Query custom `admins` table using the email
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("verified", 1)
      .eq("status", "approved")
      .single();

    if (adminError || !admin) {
      errorDiv.textContent = "You are not authorized to access the admin panel.";
      errorDiv.style.display = "block";
      await supabase.auth.signOut();
      return;
    }

    // Step 3: Redirect if verified and approved
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error("Unexpected login error", err);
    errorDiv.textContent = "An unexpected error occurred. Please try again.";
    errorDiv.style.display = "block";
  }
});

