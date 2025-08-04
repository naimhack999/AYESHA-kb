const axios = require("axios");
const chalk = require("chalk"); // রঙের জন্য chalk ব্যবহার করা হয়েছে

async function startPing() {
  let url = process.env.RENDER_EXTERNAL_URL;

  if (!url) {
    console.log(chalk.red("[SELF-PING] ❌ Error: RENDER_EXTERNAL_URL is not set in environment variables."));
    return;
  }

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  console.log(chalk.blueBright(`\n[SELF-PING] 🔗 link: ${url}\n`));

  setInterval(async () => {
    try {
      await axios.get(url);
      console.log(chalk.green(`[SELF-PING] Ping success: ${url}`));
    } catch (error) {
      console.log(chalk.red(`[SELF-PING] ❌ Ping failed: ${error.message}`));
    }
  }, 5 * 60 * 1000);
}

module.exports = startPing;
