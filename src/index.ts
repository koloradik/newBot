import { config } from "dotenv";
import TelegramBot from "node-telegram-bot-api";

config();

const token = process.env.BOT_TOKEN as string;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const admins = await bot.getChatAdministrators(chatId);

    const randomMember1 = Math.floor(Math.random() * admins.length);
    const randomMember2 = Math.floor(Math.random() * admins.length);
    console.log(randomMember1, randomMember2);

    const member1 = admins[randomMember1].user;
    const member2 = admins[randomMember2].user;

    const link1 = `<a href='tg://user?id=${member2.id}'>${member1.first_name}</a>`;
    const link2 = `<a href='tg://user?id=${member2.id}'>${member2.first_name}</a>`;
    return bot.sendMessage(
      chatId,
      `на первом месте ${link1}, на втором: ${link2}`,
      {
        parse_mode: "HTML",
      }
    );
  } catch (error) {
    console.log(error);
  }
});
