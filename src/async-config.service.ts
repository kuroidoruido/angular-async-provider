import { StaticProvider } from "@angular/core";

interface AsyncConfig {
  url: string;
}

export class AsyncConfigService {
  constructor(public readonly config: AsyncConfig) {}
}

export async function provideConfigAsync(): Promise<StaticProvider> {
  const config = await fetch("/config.json").then((r) => r.json());
  return {
    provide: AsyncConfigService,
    useValue: new AsyncConfigService(config),
  };
}

export async function provideConfigAsyncTest(
  config: Partial<AsyncConfig> = {}
): Promise<StaticProvider> {
  return {
    provide: AsyncConfigService,
    useValue: new AsyncConfigService({
      url: "http://default-url.local",
      ...config,
    }),
  };
}
