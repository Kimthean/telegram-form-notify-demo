import express, { Request, Response } from 'express';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, EXPRESS_PORT } from './config';
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Telegram notification 
function sendTelegramNotification(message: string) {
  bot.sendMessage(TELEGRAM_CHAT_ID, message);
}

// get the HTML form
app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/contact-form.html');
});

// Express route for form submissions
app.post('/form-submission', (req: Request, res: Response) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Process the form data here (e.g., save to a database).

  // Send a notification to Telegram
  const notificationMessage = `New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
  sendTelegramNotification(notificationMessage);

  res.status(200).json({ message: 'Form submitted successfully' });
});

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});
