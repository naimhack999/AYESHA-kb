const axios = require("axios");

async function startPing() {
  let url = process.env.RENDER_EXTERNAL_URL;

  if (!url) {
    console.log("[SELF-PING] ❌ Error: RENDER_EXTERNAL_URL is not set in environment variables.");
    return;
  }

  // যদি http বা https না থাকে, তাহলে https যোগ করো
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  console.log(`[SELF-PING] ✅ Uptime started: ${url}`);

  // প্রতি ৫ মিনিট পরপর ping করবে
  setInterval(async () => {
    try {
      await axios.get(url);
      console.log(`[SELF-PING] ✅ Ping success: ${url}`);
    } catch (error) {
      console.log(`[SELF-PING] ❌ Ping failed: ${error.message}`);
    }
  }, 5 * 60 * 1000); // ৫ মিনিট = 300000 মিলিসেকেন্ড
}

module.exports = startPing;
