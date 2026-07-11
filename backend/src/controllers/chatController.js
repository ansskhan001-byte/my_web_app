const SITE_KNOWLEDGE = require("../data/siteKnowledge");

function scoreMatch(question, keywords) {
    const q = question.toLowerCase();
    let score = 0;
    for (const kw of keywords) {
        if (q.includes(kw.toLowerCase())) score += kw.split(" ").length;
    }
    return score;
}

function findBestAnswer(question) {
    const q = question.toLowerCase().trim();

    if (/^(hi|hello|hey|greetings|good morning|good evening|sup)\b/.test(q)) {
        return `Hello! I'm the SquadBuilder assistant. I can help you with registration, the transfer market, your squad, budget, Starting XI, profile settings, contact support, and more. What would you like to know?`;
    }

    if (/^(thanks|thank you|thx|cheers)\b/.test(q)) {
        return `You're welcome! Feel free to ask anything else about SquadBuilder.`;
    }

    if (/^(bye|goodbye|see you|exit)\b/.test(q)) {
        return `Goodbye! Enjoy building your dream squad on SquadBuilder!`;
    }

    let best = null;
    let bestScore = 0;

    for (const item of SITE_KNOWLEDGE.faq) {
        const score = scoreMatch(q, item.keywords);
        if (score > bestScore) {
            bestScore = score;
            best = item.answer;
        }
    }

    if (best) return best;

    if (q.includes("page") || q.includes("navigate") || q.includes("where")) {
        const pages = Object.entries(SITE_KNOWLEDGE.pages)
            .map(([key, p]) => `• **${key}** (${p.path}): ${p.description}`)
            .join("\n");
        return `Here are all the pages on SquadBuilder:\n\n${pages}`;
    }

    if (q.includes("feature") || q.includes("what can")) {
        return `SquadBuilder features:\n\n${SITE_KNOWLEDGE.features.map((f) => `• ${f}`).join("\n")}`;
    }

    return `I'm the SquadBuilder AI assistant! I can help with:\n\n• **Registration & Login** — how to sign up and log in\n• **Transfer Market** — buying players\n• **Budget** — your 1 billion starting funds\n• **Starting XI** — 4-4-2 formation and lineup\n• **Profile** — updating account settings\n• **Contact** — sending support queries\n• **Admin** — managing users and players\n\nTry asking something like "How do I buy a player?" or "What is the budget?"`;
}

exports.chat = (req, res) => {
    const { message } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({
            success: false,
            message: "Message is required"
        });
    }

    const reply = findBestAnswer(message.trim());

    res.json({
        success: true,
        reply,
        botName: "SquadBuilder AI"
    });
};
