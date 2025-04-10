const express = require('express');
const bodyParser = require('body-parser');
const line = require('./util/line.util');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Simple user storage (replace with database in production)
const userStorage = {
    users: new Set(),
    addUser: (userId) => {
        if (userId && userId !== 'Udeadbeefdeadbeefdeadbeefdeadbeef') {
            userStorage.users.add(userId);
        }
    },
    getAllUsers: () => Array.from(userStorage.users),
    getUserCount: () => userStorage.users.size
};

// Verify LINE webhook signature
function validateWebhook(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }
    if (!line.verifySignature(req.headers["x-line-signature"], req.body)) {
        return res.status(401).send("Unauthorized");
    }
};

// LINE Webhook Handler
app.post('/webhook', async (req, res) => {
    try {
        validateWebhook(req, res);
        const events = req.body.events;

        for (const event of events) {
            // Store user ID for broadcasting
            //   if (event.source?.userId) {
            //     userStorage.addUser(event.source.userId);
            //   }
            console.log("event", JSON.stringify(event));
            if (event.source.userId === "Udeadbeefdeadbeefdeadbeefdeadbeef") {
                return response.status(200).end();
            }
            switch (event.type) {
                case "follow":
                    await handleFollowEvent(event);
                    break;
                case "message":
                    await handleMessageEvent(event);
                    break;
                case "join":
                    await handleJoinEvent(event);
                    break;
                // Add other event types as needed
            }
        }

        res.status(200).end();
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).end();
    }
});

// Broadcast message endpoint
app.post('/report', async (req, res) => {
    try {
        const message = req.body.message || "Default broadcast message";
        console.log(req.body)
        await line.broadcast({
            type: "text",
            text: message
        });
        // successCount++;
        res.status(200).send("OK");

    } catch (error) {
        console.error('Report error:', error);
        res.status(500).send("Error sending messages");
    }
    res.status(200).send("OK");
});

// Event handlers
async function handleFollowEvent(event) {
    const profile = await line.getProfile(event.source.userId);
    const text = event.follow?.isUnblocked
        ? `Welcome back ${profile.displayName}! How have you been?`
        : `Welcome ${profile.displayName}! Feel free to chat with us.`;

    await line.reply(event.replyToken, [{
        type: "text",
        text: text
    }]);
}

async function handleMessageEvent(event) {
    if (event.message.type !== "text") return;

    const text = event.message.text;

    // Show loading animation for 1-on-1 chats
    if (event.source.type !== "group") {
        await line.showLoadingAnimation(event.source.userId);
    }

    // Simple command handling
    if (text === "menu") {
        await line.reply(event.replyToken, [{
            type: "text",
            text: "Here's our menu: ...",
            quickReply: {
                items: [
                    { type: "action", label: "Option 1", text: "Option 1" },
                    { type: "action", label: "Option 2", text: "Option 2" }
                ]
            }
        }]);
    } else {
        // Default reply
        await line.reply(event.replyToken, [{
            type: "text",
            text: "Thanks for your message!"
        }]);
    }
}

async function handleJoinEvent(event) {
    await line.reply(event.replyToken, [{
        type: "text",
        text: "Hello everyone! Thanks for adding me to the group."
    }]);
}

// Root endpoint
app.get('/', (req, res) => {
    res.json({status : "OK"});
});

// Start server
app.listen(PORT, () => {
    console.log(`LINE Bot running on port ${PORT}`);
});