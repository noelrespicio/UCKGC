
const supabase = supabase.createClient(
  'https://wlthlwxcmltwescezjlk.supabase.co', // ⬅️ Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdGhsd3hjbWx0d2VzY2V6amxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDQ4MDcsImV4cCI6MjA2NzAyMDgwN30.tvUeTFVDdQomDHHV0JSpsXHP9IbQVkOhEvBpCglzI-o'                 // ⬅️ Replace with your Supabase anon key

);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const errorDiv = document.getElementById("error");
  errorDiv.style.display = "none"; errorDiv.textContent = "";

  const email = form.email.value.trim();
  const password = form.password.value;

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) throw authError;

    const userId = authData.user.id;
    const { data: admins, error: dbError } = await supabase
      .from('admins')
      .select('role')
      .eq('id', userId)
      .single();

    if (dbError) throw dbError;
    if (!admins) throw new Error("Admin record not found");

    const role = admins.role;
    window.location.href = role === 'superadmin' ? 'main_admin_dashboard.html' : 'dashboard.html';
  } catch (err) {
    console.error(err);
    errorDiv.textContent = err.message || "Invalid email or password!";
    errorDiv.style.display = "block";
  }
});
