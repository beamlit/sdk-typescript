import { tool } from "@langchain/core/tools";
import { getTool } from "./index.js";

export async function getLangchainTool(name: string) {
  const blaxelTool = await getTool(name);
  return blaxelTool.map((t) =>
    tool(t.call.bind(t), {
      name: t.name,
      description: t.description,
      schema: t.inputSchema,
    })
  );
}

export async function getLangchainTools(names: string[]) {
  const toolArrays = await Promise.all(names.map(getLangchainTool));
  return toolArrays.flat();
}
