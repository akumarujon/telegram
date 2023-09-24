import { Bot } from "grammy";
import help from "@/functions/help";
import start from "@/functions/start";
import error from "@/functions/error";
import what from "@/functions/what";
import warn from "@/functions/warn";

const functions = async (bot: Bot) => {
  bot.use(help);
  bot.use(start);
  bot.use(what);
  bot.use(warn)
  bot.use(error);
};

export default functions;
