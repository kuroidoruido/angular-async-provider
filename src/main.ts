import { JsonPipe } from "@angular/common";
import { Component, inject, Injectable } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

@Injectable()
export class SyncService {
  config = { appName: "Async provider demo" };
}

interface AsyncConfig {
  url: string;
}

export class AsyncConfigService {
  constructor(public readonly config: AsyncConfig) {}
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [JsonPipe],
  providers: [SyncService],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <p>appName = {{ appName }}</p>
    <p>dynamicUrl = {{ asyncConfig | json }}</p>
  `,
})
export class App {
  name = "Angular";
  appName = inject(SyncService).config.appName;
  asyncConfig = inject(AsyncConfigService).config;
}

(async () => {
  const config = await fetch("/config.json").then((r) => r.json());
  bootstrapApplication(App, {
    providers: [
      { provide: AsyncConfigService, useValue: new AsyncConfigService(config) },
    ],
  });
})();
