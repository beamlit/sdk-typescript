import { client } from "../client/index.js";
import { interceptors } from "../client/interceptors.js";
import { telemetryManager } from "../instrumentation/telemetryManager.js";
import settings from "./settings.js";

async function autoload() {
  client.setConfig({
    baseUrl: settings.baseUrl,
  })
  for(const interceptor of interceptors) {
    client.interceptors.request.use(interceptor as any)
  }
  telemetryManager.initialize(settings);
  await settings.authenticate();
  await telemetryManager.setConfiguration(settings);
}

const autoloadPromise = autoload()

export const onLoad = function(): Promise<void> {
  return autoloadPromise;
}

autoloadPromise.catch((err) => {
  console.error(err);
  process.exit(1);
});
