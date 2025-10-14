const activeSessions = new Map();

module.exports.config = {
    name: "murgi",
    version: "1.0.2",
    hasPermssion: 2,
    credits: "Fixed by kawsar",
    description: "মজা করার জন্য ম্যানশন করুন",
    commandCategory: "fun",
    usages: "murgi @mention | murgi stop",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    const threadID = event.threadID;

    if (event.body.toLowerCase() === "stop" || event.body.toLowerCase() === "murgi off") {
        if (activeSessions.has(threadID)) {
            const timeouts = activeSessions.get(threadID);
            timeouts.forEach(clearTimeout);
            activeSessions.delete(threadID);
            return api.sendMessage("চুদার সময় কেউ থামায় Medam।", threadID);
        } else {
            return api.sendMessage("এখন তো কিছুই চলছে না বন্ধ করার মতো!", threadID);
        }
    }

    const mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("যাকে চুদাতে চান তাকে ম্যানশন করুন", threadID, event.messageID);

    const name = event.mentions[mention].replace(/@/g, '');
    const arraytag = [{ id: mention, tag: name }];

    const messages = [
        `লো চোদা,,🥵🖕🖕`,
        ` খাংকির পোলা তর মারে চুদি,,,,🥵👉👌 @${name}`,
        ` খাংকির পোলা তর কচি বোন রে চুদি,,,,😡🥵 @${name}`,
        `মাদারচোদ তর আম্মু পম পম খাংকির পো,,,,, 🤣🤣 @${name}`,
        ` খাংকির পোলা তর কচি ভুদায় ভুদায় কামর দিমু,,,,,   🥵😡 @${name}`,
        ` খাংকি মাগির পোলা কথা ক কম কম তর আম্মু রে চুদে বানামু আইটেম বোম,,,,🥵👉👌 @${name}`,
        ` উম্মম্মা তর বোন এরকচি ভুদায়,,,,🥵🥵 @${name}`,
        `তর আম্মু রে পায়জামা খুলে চুদি,,,🥵😡😡   @${name}`,
         `টুকাই মাগির পোলা,,,,🥵🥵   @${name}`,
        ` depression থেকেও তর মাইরে চু*** দি,,,🖕🖕 @${name}`,
        ` বস্তির ছেলে অনলাইনের কিং,,,,,🖕🖕😡  @${name}`,
        `  ২০ টাকা এ পতিতা মাগির পোলা,,,,,🖕😡🥵 @${name}`,
        ` ব্যাস্যার পোলা কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে,,,,,🥵🥵 @${name}`,
        ` তর কচি বোন এর পম পম,,,,🥵🥵😡 @${name}`,
        ` মাগির পোলা,,,,🥵🥵😡 @${name}`,
        ` আমার জারজ শন্তান,,,,, @${name}`,
        ` বাস্ট্রাড এর বাচ্ছা বস্তির পোলা,,,,,🖕🖕🖕  @${name}`,
        `  কামলা মাগির পোলা,,,,,🖕😡🥵 @${name}`,
        ` DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম,,,,,🖕🥵👉👌 @${name}`,
        `  তর বোন রে পায়জামা খুলে চুদি,,,,,🖕😡 @${name}`,
        ` নাট বল্টু মাগির পোলা,,,,, 🥵👉👌@${name}`,
        `তর মারে চুদি,,,, 😡😡 @${name}`,
        `depression থেকেও তর মাইরে চু*** দি,,, 🤬  @${name}`,
        ` পতিতা মাগির পোলা,,,🥵🥵 @${name}`,
        `ব্যাস্যার পোলা,,,,👉👌  @${name}`,
        ` ব্যাশ্যা মাগির পোলা,,,,👉👌 @${name}`,
        `খাংকির পোলা,,,,,🖕🖕🥵  @${name}`,
        ` মাদারচোদ,,,🖕🖕🖕 @${name}`,
        `হাই মাদারচোদ তর তর ব্যাশা জাতের আম্মু টা রে আদর করে করে চুদি,,,🥵🖕🖕  @${name}`,
        `চুদা কি আরো খাবি মাগির পোলা 🥵@${name}`,
` বাতিজা শুন তর আম্মু রে চুদলে রাগ করবি না তো আচ্ছা জা রাগ করিস না তর আম্মুর কালা ভুদায় আর চুদলাম না তো বোন এর জামা টা খুলে দে,,,,�🥵@${name}`,
 `অনলাইনে গালি বাজ হয়ে গেছত মাগির পোলা এমন চুদা দিমু লাইফ টাইম মনে রাখভি আবির তর বাপ মাগির ছেলে,,,,,🥵👉👌 @${name}`,
`উফফফ খাদ্দামা মাগির পোলা তর আম্মুর কালা ভুদায় আমার মাল আউট তর কচি বোন রে উপ্তা করে এবার চুদবো,,,,🤣🤣 @${name}`,
 `বান্দি মাগির পোলা তর আম্মু রে চুদি তর দুলা ভাই এর কান্দে ফেলে,,,,🥵🥵🖕@${name}`,
`বান্দির পোলা তর কচি বোনের ভুদা ফাক কর থুতু দিয়ে ভুদায় দন ডুকামু,,,�🖕 @${name}`,
` তর আম্মু রে আচার এর লোভ দেখি চুদি মাগির পোলা,,,,🖕🖕@${name}`,
 `থুথু মেরে চুদি,,,🥵👉👌 @${name}`,
` বিছানায় নিয়ে চুদি,,👉👌@${name}`,

    ];

    const timeouts = [];

    for (let i = 0; i < messages.length; i++) {
        const timeout = setTimeout(() => {
            api.sendMessage({ body: messages[i], mentions: arraytag }, threadID);
        }, i * 1000);
        timeouts.push(timeout);
    }

    activeSessions.set(threadID, timeouts);
};
