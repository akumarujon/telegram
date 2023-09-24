import { Composer, Context } from "grammy";

const composer = new Composer();

composer.command("what", async (ctx: Context): Promise<void> => {
  const status = (await ctx.getChatMember(ctx!.from!.id)).status;

  const text =
    `<b>${ctx!.from!.first_name}'s metrics:</b>` +
    `\n` +
    `\n` +
    `<b>Name:</b> ${ctx!.from!.first_name} ${
      ctx!.from!.last_name ? ctx!.from!.last_name : ""
    }` +
    `\n` +
    (ctx?.from?.username
      ? `<b>Username:</b> ${"@" + ctx.from.username}` + `\n`
      : "") +
    (ctx?.chat?.id && `<b>Chat ID:</b> <code>${ctx.chat.id}</code>` + `\n`) +
    (ctx?.message?.from.id &&
      `<b>User ID:</b> <code>${ctx.message.from.id}</code>` + `\n`) +
    (ctx?.message?.message_thread_id
      ? `<b>Topic:</b> <code>${ctx.message.message_thread_id}</code>` + `\n`
      : "") +
    (ctx.chat?.type === "private" ? "" : `<b>Status:</b> ${status}`);

  if (ctx.message!.is_topic_message) {
    await ctx.reply(text, {
      message_thread_id: ctx.message!.message_thread_id,
      parse_mode: "HTML",
    });
  } else {
    await ctx.reply(text, { parse_mode: "HTML" });
  }
});

export default composer;
