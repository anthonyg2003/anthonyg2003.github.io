document.addEventListener("DOMContentLoaded", () => {
    // shared header
    const headerMount = document.getElementById("header");
    if (headerMount) {
        fetch("/assets/header.html")
        .then(r => { if (!r.ok) throw new Error("Header fetch " + r.status); return r.text(); })
        .then(html => {
            headerMount.innerHTML = html;
            // set active nav link
            const path = location.pathname.replace(/\/index\.html$/, "");
            document.querySelectorAll(".nav a").forEach(a => {
                const href = a.getAttribute("href").replace(/\/index\.html$/, "");
                if (href === path) a.classList.add("active");
            });
        })
        .catch(console.error);
    }

    // shared footer
    const footerMount = document.getElementById("footer");
    if (footerMount) {
        fetch("/assets/footer.html")
        .then(r => { if (!r.ok) throw new Error("Footer fetch " + r.status); return r.text(); })
        .then(html => {
            footerMount.innerHTML = html;
            const y = document.getElementById("year");
            if (y) y.textContent = new Date().getFullYear();
        })
        .catch(console.error);
    }

    // contact form
    const form = document.getElementById("contact-form");
    if (form) {
        const status = form.querySelector(".form-status");
        form.addEventListener("submit", async (e) => {
            if (!form.action.includes("formspree")) return;
                              e.preventDefault();
            status.textContent = "Sending…";
            try {
                const res = await fetch(form.action, {
                    method: "POST",
                    headers: { "Accept": "application/json" },
                    body: new FormData(form)
                });
                if (res.ok) { status.textContent = "Thanks! I’ll get back to you."; form.reset(); }
                else { status.textContent = "There was a problem. Try the email link below."; }
            } catch { status.textContent = "Network error. Try the email link below."; }
        });
    }
});
