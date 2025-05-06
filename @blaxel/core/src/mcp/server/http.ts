import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";

export class BlaxelHttpMcpServerTransport implements Transport {
  private server: StreamableHTTPServerTransport;

  constructor(port: number) {
    this.server = new StreamableHTTPServerTransport({ port });
  }

  async start(): Promise<void> {
    await this.server.start();
  }

  async send(msg: JSONRPCMessage): Promise<void> {
  }
}