import { reply } from "@/utils/sender";
import isReply from "@/hooks/is-reply";
import topics from "../../data/topics.json" assert { type: "json" };
import { Composer, Context, InlineKeyboard } from "grammy";

const composer = new Composer();

type Topics = { [key: string]: number };

composer.command("warn", isReply, async (ctx: Context): Promise<any> => {
  const registeredTopics: Topics = topics;
  const requestedTopic: string =
    typeof ctx.match === "string" ? ctx.match : ctx.match!.join(" ");

  if (!Object.keys(topics).includes(requestedTopic)) {
    return await reply(
      ctx,
      `<b>Seems like we don't have that kind of topic...\n\nWe only have following topics:</b>` +
        `\n` +
        `<i>${Object.keys(registeredTopics).join(" | ")}</i>`
    );
  }

  await ctx.api
    .deleteMessage(ctx.message!.chat!.id, ctx.message!.message_id)
    .catch(() => {
      console.warn("Oh no... I couldn't delete the message!");
    });

  if (ctx?.message?.reply_to_message?.from?.id === ctx.me.id) {
    if (ctx.message) {
      return await reply(ctx, `Ha-ha... nice try!`);
    }
  }

  await ctx.api
    .deleteMessage(
      ctx.message!.chat!.id,
      ctx.message!.reply_to_message!.message_id
    )
    .catch(() => {
      console.warn("Oh no... I couldn't delete the message!");
    });

  const requestedTopicURL = registeredTopics[requestedTopic];

  const text =
    `<b>Hurmatli <a href="tg://user?id=${ctx?.message?.reply_to_message?.from?.id}">${ctx?.message?.reply_to_message?.from?.first_name}</a>,</b>` +
    `\n` +
    `\n` +
    `Seems like you're going offtopic. Please, ` +
    `by pressing the button below, move to <b>${requestedTopic}</b> topic! ` +
    `In our <b>${requestedTopic}</b> topic chat, it's allowed to discuss this kind of things. Let not interfere others 😉` +
    `\n` +
    `\n` +
    `<b>Sincerely, Maiden Assistant</b>`;

  const keyboard = new InlineKeyboard().url(
    `${requestedTopic.charAt(0).toUpperCase()}${requestedTopic.slice(1)} Chat`,
    `https://t.me/madmaids/${requestedTopicURL}`
  );

  return await reply(ctx, text, keyboard);
});

export default composer;
