import { Composer, Context } from "grammy";
import { InlineQueryResultArticle } from "grammy/types";
import { v4 } from "uuid";
import { find } from "@/utils/repos";
import { Repo } from "@/types/repo";

const composer = new Composer();

composer.on("inline_query", async (ctx: Context) => {
  const query = ctx.inlineQuery!.query;
  const repos = await find(query);

  let result: InlineQueryResultArticle[] = [];

  repos.map((repo: Repo) => {
    result.push({
      type: "article",
      id: v4() as string,
      title: repo.name,
      input_message_content: {
        message_text:
          `Repository: ${repo.name}\n` +
          `URL: ${repo.html_url}\n` +
          `Description: ${repo.description}\n` +
          `Stars count: ${repo.stargazers_count}\n` +
          `Language: ${repo.language || "None."}\n` +
          `Forks: ${repo.forks}\n` +
          `Open issues: ${repo.open_issues}\n` +
          `Topics: ${repo.topics?.join(",") || "None."}`,
      },
      description: repo.description,
    });
  });

  await ctx.answerInlineQuery(result);
});

export default composer;
