module.exports = {
  config: {
    name: "whitelistthread",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Kawsar",
    description: "Add/remove thread from whitelist",
    commandCategory: "system",
    usages: "[add/remove] [tid]",
    cooldowns: 5
  },

  run: async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    const adminList = global.config.ADMINBOT || [];

    if (!adminList.includes(senderID))
      return api.sendMessage("❌ তুই অ্যাডমিন না ভাই।", threadID, messageID);

    const action = args[0];
    const tid = args[1];

    if (!["add", "remove"].includes(action) || !tid)
      return api.sendMessage("⚙️ ব্যবহারঃ whitelistthread [add/remove] [tid]", threadID, messageID);

    const set = global.whitelistThread;

    if (action === "add") {
      set.add(tid);
      return api.sendMessage(`✅ থ্রেড ${tid} কে whitelistThread এ ✅ ADD করা হয়েছে।`, threadID, messageID);
    } else {
      set.delete(tid);
      return api.sendMessage(`❌ থ্রেড ${tid} কে whitelistThread থেকে ❌ REMOVE করা হয়েছে।`, threadID, messageID);
    }
  }
};
