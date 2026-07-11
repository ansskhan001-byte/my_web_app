const SITE_KNOWLEDGE = {
    name: "SquadBuilder",
    tagline: "Build your dream football squad",
    description:
        "SquadBuilder is a football fantasy web app where you register, receive a transfer budget, buy players from the transfer market, and manage a 4-4-2 Starting XI.",
    features: [
        "User registration and login with JWT authentication",
        "Personal dashboard with squad stats and a visual soccer pitch",
        "Transfer market to search, filter, and buy players",
        "4-4-2 formation with Starting XI management (max 11 players)",
        "Profile management (update name, email, change password)",
        "Admin panel for managing users, players, and contact messages",
        "Contact page for support queries"
    ],
    budget: {
        starting: "1,000,000,000 (1 billion)",
        description:
            "Every new user starts with 1 billion in transfer budget. When you buy a player, the purchase price is deducted from your remaining budget."
    },
    positions: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
    formation: "4-4-2 (1 Goalkeeper, 4 Defenders, 4 Midfielders, 2 Forwards)",
    startingXI: {
        max: 11,
        description:
            "You can mark up to 11 squad players as your Starting XI. Toggle players on/off from your Dashboard."
    },
    pages: {
        home: { path: "/", description: "Landing page with app overview and sign-up CTA" },
        login: { path: "/login", description: "Log in with your email and password" },
        signup: { path: "/signup", description: "Create a new account with name, email, and password" },
        dashboard: { path: "/dashboard", description: "View your squad, budget, stats, and manage Starting XI on a visual pitch" },
        market: { path: "/market", description: "Browse and buy players. Filter by name, position, and sort by rating or value" },
        profile: { path: "/profile", description: "Update your profile details and change your password" },
        contact: { path: "/contact", description: "Send support queries or feedback to the SquadBuilder team" },
        admin: { path: "/admin", description: "Admin-only panel for CRUD on users, players, and contact messages (requires admin role)" }
    },
    howToBuy: [
        "Log in to your account",
        "Go to the Market page",
        "Search or filter players by position",
        "Click Buy on a player you can afford",
        "The player is added to your squad and your budget is reduced"
    ],
    faq: [
        {
            keywords: ["register", "sign up", "signup", "create account", "join"],
            answer:
                "To register, go to /signup, enter your full name, email, and password, then click Sign Up. You'll receive 1 billion in starting budget automatically."
        },
        {
            keywords: ["login", "log in", "sign in"],
            answer:
                "Go to /login and enter your registered email and password. You'll stay logged in for 7 days via a secure JWT token."
        },
        {
            keywords: ["budget", "money", "funds", "transfer budget", "remaining"],
            answer:
                "You start with 1 billion transfer budget. Each player purchase deducts their market value from your remaining budget. Check your budget on the Dashboard or Market page."
        },
        {
            keywords: ["buy", "purchase", "transfer", "market", "sign player"],
            answer:
                "Visit the Market page (/market), find a player, and click Buy. You must have enough remaining budget. Purchased players appear in your Dashboard squad."
        },
        {
            keywords: ["starting xi", "starting 11", "lineup", "formation", "pitch", "squad"],
            answer:
                "Your squad uses a 4-4-2 formation. On the Dashboard, toggle players into your Starting XI (maximum 11). The pitch visualization shows your selected lineup by position."
        },
        {
            keywords: ["position", "goalkeeper", "defender", "midfielder", "forward", "gk", "def", "mid", "fwd"],
            answer:
                "Players have four positions: Goalkeeper, Defender, Midfielder, and Forward. The 4-4-2 formation needs 1 GK, 4 DEF, 4 MID, and 2 FWD in your Starting XI."
        },
        {
            keywords: ["profile", "password", "email", "name", "account settings"],
            answer:
                "Go to /profile to update your full name and email, or change your password. You must enter your current password to set a new one."
        },
        {
            keywords: ["admin", "administrator", "manage users", "manage players"],
            answer:
                "The Admin panel at /admin is only for users with the admin role. Admins can create, edit, and delete users and players, and view contact messages."
        },
        {
            keywords: ["contact", "support", "help", "query", "feedback", "message"],
            answer:
                "Visit /contact to send us a message. Fill in your name, email, subject, and message. Our team will review your query and respond."
        },
        {
            keywords: ["rating", "stats", "goals", "assists", "value", "market value"],
            answer:
                "Each player has a rating, market value, and stats (goals, assists, appearances, clean sheets, cards). Use these on the Market to compare players before buying."
        },
        {
            keywords: ["what is", "about", "squadbuilder", "this website", "this app", "what does"],
            answer:
                "SquadBuilder is a football fantasy app where you build your dream squad. Register, get 1B budget, buy players from the transfer market, and set your 4-4-2 Starting XI on a visual pitch."
        }
    ]
};

module.exports = SITE_KNOWLEDGE;
