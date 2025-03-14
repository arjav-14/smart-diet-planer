const bcrypt = require("bcryptjs");

const enteredPassword = "123456789"; // The password you're testing
const storedHashedPassword = "$2a$10$jL/BmAeE8EWG465FhWCW6uPs4iis8CTnss6/ng5nwXBhlB1JW.Mja"; // Paste from MongoDB

bcrypt.compare(enteredPassword, storedHashedPassword, (err, isMatch) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else if (isMatch) {
        console.log("✅ Password is CORRECT!");
    } else {
        console.log("❌ Password does NOT match!");
    }
});
