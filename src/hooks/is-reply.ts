import { reply } from "@/utils/sender";
import { Context, NextFunction } from "grammy";
import topics from "../../data/topics.json" assert { type: "json" };

export default async (ctx: Context, next: NextFunction) => {
  // if (!ctx.message?.is_topic_message) {
  //   return await reply(
  //     ctx,
  //     `⚠️ <b>We are not in topic to use this command!</b>`,
  //   );
  // }

  if (
    !ctx.message?.reply_to_message ||
    Object.values(topics).includes(ctx.message!.reply_to_message!.message_id)
  ) {
    return await reply(ctx, `↪ Reply the message!`);
  }
  await next();
};
