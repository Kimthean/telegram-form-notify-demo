"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPRESS_PORT = exports.TELEGRAM_CHAT_ID = exports.TELEGRAM_BOT_TOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
exports.TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
exports.EXPRESS_PORT = 3000;
