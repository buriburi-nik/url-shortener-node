async function shorten() {
  const longUrl = document.getElementById("longUrl").value.trim();
  if (!longUrl) {
    alert("Please enter a valid URL.");
    return;
  }

  const res = await fetch("/api/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ longUrl })
  });

  const data = await res.json();
  const shortUrl = data.shortUrl;

  document.getElementById("shortUrl").href = shortUrl;
  document.getElementById("shortUrl").textContent = shortUrl;
  document.getElementById("result").classList.remove("hidden");
}
