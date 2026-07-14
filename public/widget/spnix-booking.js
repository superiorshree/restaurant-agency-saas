(async function () {
  const script = document.currentScript;

  const apiKey = script.getAttribute("data-api-key");

  const response = await fetch(
    `/api/widget/config?apiKey=${apiKey}`
  );

  const config = await response.json();

  const container = document.createElement("div");

  container.innerHTML = `
    <div style="
      max-width:400px;
      padding:20px;
      border:1px solid #ddd;
      border-radius:12px;
      font-family:sans-serif;
    ">
      <h2>${config.businesses.name}</h2>

      <input id="sp-name" placeholder="Name" />

      <br><br>

      <input id="sp-phone" placeholder="Phone" />

      <br><br>

      <button id="sp-submit">
        Book Now
      </button>
    </div>
  `;

  script.parentNode.appendChild(container);

  document
    .getElementById("sp-submit")
    .onclick = async () => {
      await fetch("/api/bookings", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },

        body: JSON.stringify({
          customerName:
            document.getElementById("sp-name").value,

          phone:
            document.getElementById("sp-phone").value,

          bookingDate: "2026-07-15",

          bookingTime: "18:00",
        }),
      });

      alert("Booking Submitted");
    };
})();