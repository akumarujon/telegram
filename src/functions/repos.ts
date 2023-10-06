import { Composer, Context, InlineQueryResultBuilder } from "grammy";
import { v4 } from "uuid";
import { find } from "@/utils/repos";
import { Repo } from "@/types/repo";

const composer = new Composer();

composer.on("inline_query", async (ctx: Context) => {
  const query = ctx.inlineQuery!.query;
  const repos = await find(query);

  const result = repos.map((repo: Repo) =>
    InlineQueryResultBuilder.article(v4() as string, repo.name, {
      description: `Description: ${repo.description}`,
    }).text(
      `Repository: ${repo.name}\n` +
        `URL: ${repo.html_url}\n` +
        `Description: ${repo.description}\n` +
        `Stars count: ${repo.stargazers_count}\n` +
        `Language: ${repo.language || "None."}\n` +
        `Forks: ${repo.forks}\n` +
        `Open issues: ${repo.open_issues}\n` +
        `Topics: ${repo.topics?.join(",") || "None."}`
    )
  );

  await ctx.answerInlineQuery(result);
});

export default composer;
