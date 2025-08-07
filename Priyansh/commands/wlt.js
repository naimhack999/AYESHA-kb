module.exports = {
  config: {
    name: "whitelist",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Kawsar",
    description: "Toggle whitelist user/thread system",
    commandCategory: "system",
    usages: "[user/thread] [on/off]",
    cooldowns: 5
  },

  run: async function ({ api, event, args }) {
    const { threadID, senderID, messageID } = event;
    const adminList = global.config.ADMINBOT || [];

    if (!adminList.includes(senderID)) {
      return api.sendMessage("❌ এই কমান্ড চালাতে পারো না ভাই, Admin না!", threadID, messageID);
    }

    const type = args[0];
    const value = args[1];

    if (!["user", "thread"].includes(type) || !["on", "off"].includes(value)) {
      return api.sendMessage(`⚙️ ব্যবহারঃ whitelist [user/thread] [on/off]`, threadID, messageID);
    }

    const newStatus = value === "on";
    global.config.whitelist[type] = newStatus;

    return api.sendMessage(
      `✅ Whitelist "${type}" এখন ${newStatus ? "চালু" : "বন্ধ"} করা হয়েছে।`,
      threadID,
      messageID
    );
  }
};
