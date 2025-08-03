const axios = require("axios");
const os = require("os");

async function getURL() {
  const hostname = os.hostname(); // শুধু Render hostname ইউজ কর
  let url = `https://${hostname}.onrender.com`;

  if (!url.endsWith("/uptime")) url += "/uptime";
  return url;
}

async function startPing() {
  const pingURL = await getURL();

  console.log(`[SELF-PING] ✅ Started: ${pingURL}`);

  setInterval(async () => {
    try {
      await axios.get(pingURL);
      console.log(`[SELF-PING] ✅ Ping success`);
    } catch (e) {
      console.log(`[SELF-PING] ❌ Ping failed: ${e.message}`);
    }
  }, 5 * 60 * 1000); // প্রতি ৫ মিনিটে ping
}

module.exports = startPing;
