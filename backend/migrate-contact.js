require("dotenv").config();
const db = require("./src/config/db");
const fs = require("fs");
const path = require("path");

const sql = fs.readFileSync(
  path.join(__dirname, "schema/contact_messages.sql"),
  "utf8"
);

db.query(sql, (err) => {
  if (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }
  console.log("contact_messages table ready.");
  process.exit(0);
});
