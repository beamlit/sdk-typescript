import { Agent } from "@mastra/core/agent";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { blModel, blTools, logger } from "../src/index.js";
import { prompt } from "./prompt";

async function main() {
  const agent = new Agent({
    name: "blaxel-agent-mastra",
    model: await blModel("gpt-4o-mini").ToMastra(),
    instructions: prompt,
    tools: {
      ...(await blTools(["blaxel-search"]).ToMastra()),
      weatherTool: createTool({
        id: "weatherTool",
        description: "Get the weather in a specific city",
        inputSchema: z.object({
          city: z.string(),
        }),
        outputSchema: z.object({
          weather: z.string(),
        }),
        execute: async ({ context }: { context: { city: string } }) => {
          logger.debug("TOOLCALLING: local weather", context);
          return Promise.resolve({
            weather: `The weather in ${context.city} is sunny`,
          });
        },
      }),
    },
  });

  const stream = await agent.stream([
    { role: "user", content: process.argv[2] },
  ]);

  for await (const chunk of stream.textStream) {
    if (chunk) process.stdout.write(chunk);
  }
  process.stdout.write("\n\n");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
