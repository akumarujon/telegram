import { Bot } from "grammy";
import help from "@/functions/help";
import start from "@/functions/start";
import error from "@/functions/error";

const functions = async (bot: Bot) => {
  bot.use(help);
  bot.use(start);
  bot.use(error);
};

export default functions;
