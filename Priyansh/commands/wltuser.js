module.exports = {
  config: {
    name: "whitelistuser",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Kawsar",
    description: "Add/remove user from whitelist",
    commandCategory: "system",
    usages: "[add/remove] [uid]",
    cooldowns: 5
  },

  run: async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    const adminList = global.config.ADMINBOT || [];

    if (!adminList.includes(senderID))
      return api.sendMessage("❌ তুই অ্যাডমিন না ভাই।", threadID, messageID);

    const action = args[0];
    const uid = args[1];

    if (!["add", "remove"].includes(action) || !uid)
      return api.sendMessage("⚙️ ব্যবহারঃ whitelistuser [add/remove] [uid]", threadID, messageID);

    const set = global.whitelistUser;

    if (action === "add") {
      set.add(uid);
      return api.sendMessage(`✅ ইউজার ${uid} কে whitelistUser এ ✅ ADD করা হয়েছে।`, threadID, messageID);
    } else {
      set.delete(uid);
      return api.sendMessage(`❌ ইউজার ${uid} কে whitelistUser থেকে ❌ REMOVE করা হয়েছে।`, threadID, messageID);
    }
  }
};
