const axios = require("axios");

async function startPing() {
  let url = process.env.RENDER_EXTERNAL_URL;

  if (!url) {
    console.log("[SELF-PING] ❌ Error: RENDER_EXTERNAL_URL is not set in environment variables.");
    return; // পিং শুরু হবে না
  }

  if (!url.endsWith("/uptime")) url += "/uptime";

  console.log(`[SELF-PING] ✅ Uptime started: ${url}`);

  setInterval(async () => {
    try {
      await axios.get(url);
      console.log(`[SELF-PING] ✅ Ping success: ${url}`);
    } catch (error) {
      console.log(`[SELF-PING] ❌ Ping failed: ${error.message}`);
    }
  }, 5 * 60 * 1000); // প্রতি ৫ মিনিটে ping চালু থাকবে
}

module.exports = startPing;
