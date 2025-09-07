// load common footer
fetch("/assets/footer.html")
.then(r => r.text())
.then(html => {
    document.getElementById("footer").innerHTML = html;
    // set year inside loaded footer
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
});

// contact form progressive enhancement
const form = document.getElementById("contact-form");
if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", async (e) => {
        if (!form.action.includes("formspree")) return; // falls back to default POST if not configured
                          e.preventDefault();
        status.textContent = "Sending…";
        try {
            const res = await fetch(form.action, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: new FormData(form)
            });
            if (res.ok) {
                status.textContent = "Thanks! I’ll get back to you.";
                form.reset();
            } else {
                status.textContent = "There was a problem - try the email link below.";
            }
        } catch (err) {
            status.textContent = "Network error. Try the email link below.";
        }
    });
}
