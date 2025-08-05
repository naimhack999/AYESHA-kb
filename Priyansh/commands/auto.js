module.exports = {
  config: {
    name: "autodl",
    version: "0.0.2",
    hasPermssion: 0,
    credits: "SHAON",
    description: "auto video download",
    commandCategory: "user",
    usages: "",
    cooldowns: 5,
  },

  run: async function ({ api, event, args }) {},

  handleEvent: async function ({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const content = event.body ? event.body : "";
    const body = content.toLowerCase();
    const { alldown } = require("shaon-videos-downloader");

    if (body.startsWith("https://")) {
      api.setMessageReaction("⚠️", event.messageID, (err) => {}, true);

      const data = await alldown(content);
      console.log(data);
      let Shaon = data.url;

      api.setMessageReaction("☢️", event.messageID, (err) => {}, true);

      const video = (
        await axios.get(Shaon, {
          responseType: "arraybuffer",
        })
      ).data;

      const path = __dirname + "/cache/auto.mp4";
      fs.writeFileSync(path, Buffer.from(video, "utf-8"));

      return api.sendMessage(
        {
          body: `🔥🚀 𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗰𝗵𝗮𝘁 𝗯𝗼𝘁 | ᵁᴸᴸ⁴ˢᴴ 🔥💻
📥⚡𝗔𝘂𝘁𝗼 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿⚡📂
🎬 𝐄𝐧𝐣𝐨𝐲 𝐭𝐡𝐞 𝐕𝐢𝐝𝐞𝐨 🎀`,
          attachment: fs.createReadStream(path),
        },
        event.threadID,
        event.messageID,
        () => {
          try {
            fs.unlinkSync(path); // ভিডিও পাঠানোর পর ফাইল ডিলিট
          } catch (err) {
            console.log("File delete error:", err);
          }
        }
      );
    }
  },
};
