import { HttpClient } from "@angular/common/http";
import { APP_INITIALIZER, Injectable, Provider } from "@angular/core";

interface AsyncConfig {
  url: string;
}

@Injectable()
export class AsyncConfigService {
  public config: AsyncConfig = { url: "" };
}

export function provideConfigAsync(): Provider[] {
  return [
    AsyncConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory:
        (asyncConfigService: AsyncConfigService, http: HttpClient) =>
        async () => {
          const config = await fetch("/config.json").then((r) => r.json());
          asyncConfigService.config = config;
        },
      deps: [AsyncConfigService, HttpClient],
    },
  ];
}

export function provideConfigAsyncTest(
  config: Partial<AsyncConfig> = {}
): Provider[] {
  const service = new AsyncConfigService();
  service.config = {
    url: "http://default-url.local",
    ...config,
  };
  return [{ provide: AsyncConfigService, useValue: service }];
}
