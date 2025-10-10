module.exports.config = {
  name: "goiadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "Bot will reply when someone tags admin or bot",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};

module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "61577148331416") {  // তোমার বটের আইডি এখানে বসাও
    var aid = ["61577148331416"];  // বটের আইডি
    for (const id of aid) {
      if (Object.keys(event.mentions).includes(id)) {
        var msg = [
          "ওই ব্যস্ত আছে, বলো কি বলবো?", 
          "কি হয়েছে? মেডামকে ডেকে নিয়ে আসবো?", 
          "সে হয়তো ব্যস্ত আছে", 
          "আয়েশা মেম তো চলে গেছে"
        ];
        return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
      }
    }
  }
};

module.exports.run = async function({}) {};
