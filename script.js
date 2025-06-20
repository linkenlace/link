document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "⏳ Enviando…";
    status.className = ""; // quita clases previas

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        form.reset();
        status.textContent = "✅ ¡Gracias! Tu mensaje ha sido enviado.";
        status.className = "mensaje-exito";
      } else {
        const json = await res.json();
        status.textContent =
          "❌ Error: " + (json.error || res.statusText);
        status.className = "mensaje-error";
      }
    } catch (err) {
      status.textContent =
        "❌ Error de red. Por favor inténtalo de nuevo.";
      status.className = "mensaje-error";
    }
  });
});
