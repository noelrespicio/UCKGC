const supabase = supabase.createClient(
  'https://wlthlwxcmltwescezjlk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdGhsd3hjbWx0d2VzY2V6amxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDQ4MDcsImV4cCI6MjA2NzAyMDgwN30.tvUeTFVDdQomDHHV0JSpsXHP9IbQVkOhEvBpCglzI-o'
);

const feedback = document.getElementById('feedback');
const spinner = document.getElementById('spinner');

// Get verification params from URL
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
const codeParam = urlParams.get('code');

if (!email) {
  feedback.textContent = "No email specified. Please register first.";
  feedback.className = 'error-message';
}

document.getElementById('verifyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = document.getElementById('code').value.trim();
  
  if (!email || !codeParam) return;

  spinner.style.display = 'block';
  const { data, error } = await supabase
    .from('email_verifications')
    .select('*')
    .eq('email', email)
    .single();

  spinner.style.display = 'none';

  if (error) {
    feedback.textContent = "Unable to verify. Please try again.";
    feedback.className = 'error-message';
    return;
  }

  if (data.code === parseInt(code)) {
    // Save admin entry
    const { error: e2 } = await supabase
      .from('admins')
      .insert([{ email: data.email, password_hash: data.password_hash, location: data.location, role: 'admin', status: 'pending' }]);

    if (e2) {
      feedback.textContent = "Error saving your details.";
      feedback.className = 'error-message';
      return;
    }

    // Delete verification row
    await supabase.from('email_verifications').delete().eq('email', email);

    feedback.textContent = "Registration successful! Await approval.";
    feedback.className = 'success-message';
    setTimeout(() => window.location.href = 'login.html', 2000);
  } else {
    feedback.textContent = "Incorrect code.";
    feedback.className = 'error-message';
  }
});

document.getElementById('resendBtn').addEventListener('click', async () => {
  if (!email) return;
  spinner.style.display = 'block';
  const { error } = await supabase.functions.invoke('send_verification', { body: { email } });
  spinner.style.display = 'none';
  feedback.textContent = error ? error.message : "Verification code resent!";
  feedback.className = error ? 'error-message' : 'success-message';
});
