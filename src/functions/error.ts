import { Composer, Context, InlineKeyboard } from "grammy";
import topics from "../../data/topics.json";
import admins from "../../data/admins.json";

const composer = new Composer();

export const message =
  `<b>⚠️ Oh, I didn't get it...</b>` +
  `\n` +
  `Maybe you'll take a look at my available commands at /help?!`;

export const keyboard = new InlineKeyboard().text(
  "> Go to available commands! <",
  "help"
);

composer.on("message", async (ctx: Context): Promise<any> => {
  if (
    ctx.chat!.id === -1001303954475 &&
    ctx.message!.message_thread_id === topics["news"] &&
    !admins.includes(ctx!.message!.from.id)
  ) {
    return await ctx.deleteMessage();
  }

  if (ctx.message?.chat.type != "private") {
    const chatAdmins = await ctx.getChatAdministrators();

    if (
      ctx.chat!.id === -1001303954475 &&
      ctx.message!.message_thread_id === topics["discussion"] &&
      !chatAdmins.some((admin) => admin.user.id === ctx!.message!.from.id)
    ) {
      return await ctx.deleteMessage();
    }
  }

  if (
    ctx?.message?.from?.username &&
    ctx?.message?.from?.username === "Channel_Bot"
  ) {
    return await ctx.deleteMessage();
  }

  if (ctx.message?.chat.type === "private") {
    return await ctx.reply(message, {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  }
});

export default composer;
