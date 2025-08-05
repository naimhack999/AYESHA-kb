const axios = require("axios");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

module.exports.config = {
  name: "install",
  version: "1.0.4", 
  hasPermission: 2,
  credits: "Kawsar (updated)",
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


  if (!fileName || !input)
    return api.sendMessage("⚠️ ফাইল নাম ও কোড/লিংক দিন!", threadID, messageID);


  if (!fileName.endsWith(".js") || fileName.includes("..") || path.isAbsolute(fileName))
    return api.sendMessage("❌ অবৈধ ফাইল নাম!", threadID, messageID);

  const filePath = path.join(__dirname, fileName);

  try {
    let code;

   
    if (/^https?:\/\/.+$/.test(input)) {
      const response = await axios.get(input);
      code = response.data;
    } else {
      
      code = input;
    }

    
    new vm.Script(code);

    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    
    fs.writeFileSync(filePath, code, "utf-8");
    api.sendMessage(`✅ ফাইল তৈরি হয়েছে  📄 ${fileName}`, threadID, messageID);

  } catch (err) {
    console.error(err);
    api.sendMessage(`❌ সমস্যা: ${err.message}`, threadID, messageID);
  }
};
