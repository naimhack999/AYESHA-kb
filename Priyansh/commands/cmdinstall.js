const axios = require("axios");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

module.exports.config = {
  name: "install",
  version: "1.0.3",
  hasPermission: 2,
  credits: "Kawsar (optimized by ChatGPT)",
  usePrefix: true,
  description: "Create a new .js file from code or any raw link",
  commandCategory: "utility",
  usages: "[filename.js] [code/link]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const [fileName, ...codeParts] = args;
  const input = codeParts.join(" ");
  const { threadID, messageID } = event;

  // ইনপুট চেক
  if (!fileName || !input)
    return api.sendMessage("⚠️ ফাইল নাম ও কোড/লিংক দিন!", threadID, messageID);

  // ফাইল নাম ভ্যালিডেশন
  if (!fileName.endsWith(".js") || fileName.includes("..") || path.isAbsolute(fileName))
    return api.sendMessage("❌ অবৈধ ফাইল নাম!", threadID, messageID);

  const filePath = path.join(__dirname, fileName);
  if (fs.existsSync(filePath))
    return api.sendMessage("⚠️ এই নামে ফাইল ইতিমধ্যেই আছে!", threadID, messageID);

  try {
    let code;

    // যদি লিংক হয়, তখন axios দিয়ে কোড নাও
    if (/^https?:\/\/.+$/.test(input)) {
      // যেকোনো https লিংক থেকে কোড নামাবে, কোনো filter নাই
      const response = await axios.get(input);
      code = response.data;
    } else {
      // সরাসরি কোড ইনপুট দিলে সেটাই নেবে
      code = input;
    }

    // কোড সিঙ্কট্যাক্স চেক
    new vm.Script(code);

    // ফাইল সেভ
    fs.writeFileSync(filePath, code, "utf-8");
    api.sendMessage(`✅ ফাইল তৈরি হয়েছে:\n📄 ${fileName}`, threadID, messageID);

  } catch (err) {
    console.error(err);
    api.sendMessage(`❌ সমস্যা: ${err.message}`, threadID, messageID);
  }
};
