const supabase = createClient("https://wlthlwxcmltwescezjlk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdGhsd3hjbWx0d2VzY2V6amxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDQ4MDcsImV4cCI6MjA2NzAyMDgwN30.tvUeTFVDdQomDHHV0JSpsXHP9IbQVkOhEvBpCglzI-o");

document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return window.location.href = "login.html";

  const { data: attendees, error } = await supabase
    .from("attendees")
    .select("*")
    .eq("admin_id", user.id)
    .order("category", { ascending: true });

  if (error) {
    alert("Failed to load attendees.");
    return;
  }

  const tbody = document.querySelector("#attendeesTable tbody");
  let countKid = 0, countYouth = 0, countAdult = 0;

  attendees.forEach((att, index) => {
    if (att.category === "Kid") countKid++;
    else if (att.category === "Youth") countYouth++;
    else if (att.category === "Adult") countAdult++;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${att.first_name} ${att.last_name}</td>
      <td>${att.address}</td>
      <td>${att.category}</td>
      <td>
        ${att.qr_code ? `<img src="${att.qr_code}" width="50" />
        <a href="${att.qr_code}" download class="btn btn-success btn-sm mt-1"><i class="bi bi-download"></i></a>` : '<span class="text-muted">No QR</span>'}
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("count-kid").textContent = countKid;
  document.getElementById("count-youth").textContent = countYouth;
  document.getElementById("count-adult").textContent = countAdult;
});

// Search function
document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  document.querySelectorAll("#attendeesTable tbody tr").forEach(tr => {
    const name = tr.children[1].textContent.toLowerCase();
    tr.style.display = name.includes(value) ? "" : "none";
  });
});

function printTable() {
  const printSection = document.getElementById("attendeesTable").outerHTML;
  const newWindow = window.open();
  newWindow.document.write(`<html><head><title>Print</title></head><body>${printSection}</body></html>`);
  newWindow.print();
}
