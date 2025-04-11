import z from "zod";

export type Tool = {
  name: string;
  description: string;
  inputSchema: z.ZodObject<any>;
  call(input: unknown): Promise<unknown>;
};
