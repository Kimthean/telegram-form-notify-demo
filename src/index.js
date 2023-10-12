"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const body_parser_1 = __importDefault(require("body-parser"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const bot = new node_telegram_bot_api_1.default(config_1.TELEGRAM_BOT_TOKEN, { polling: true });
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Telegram notification function
function sendTelegramNotification(message) {
    bot.sendMessage(config_1.TELEGRAM_CHAT_ID, message);
}
// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/contact-form.html');
});
// Express route for form submissions
app.post('/form-submission', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    // Process the form data here (e.g., save to a database).
    // Send a notification to Telegram
    const notificationMessage = `New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    sendTelegramNotification(notificationMessage);
    res.status(200).json({ message: 'Form submitted successfully' });
});
app.listen(config_1.EXPRESS_PORT, () => {
    console.log(`Server is running on port ${config_1.EXPRESS_PORT}`);
});
