// includes/wlt.js

module.exports = function (event) {
  const { senderID, threadID } = event;

  // config থেকে whitelist সেটিংস নে, না থাকলে false ধরে নে
  const config = global.config?.whitelist;
  if (!config) return false; // whitelist config না থাকলে block করবে না

  // admin id গুলা নিবে config থেকে
  const adminList = global.config?.ADMINBOT || [];

  // whitelist ইউজার ও থ্রেড set থেকে নেবে
  const whitelistUser = global.whitelistUser || new Set();
  const whitelistThread = global.whitelistThread || new Set();

  // যদি whitelist user চালু থাকে, চেক কর whitelist user বা admin হলে পাস দাও
  if (config.user) {
    if (!whitelistUser.has(senderID) && !adminList.includes(senderID)) {
      return true; // blocked, কারণ whitelist on আর sender admin বা whitelist এ নেই
    }
  }

  // যদি whitelist thread চালু থাকে, চেক কর whitelist thread বা admin হলে পাস দাও
  if (config.thread) {
    if (!whitelistThread.has(threadID) && !adminList.includes(senderID)) {
      return true; // blocked, whitelist thread on আর group whitelist এ নেই
    }
  }

  // সব ঠিক থাকলে block করবে না
  return false;
};
