import { JsonPipe } from "@angular/common";
import { Component, inject, Injectable } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { AsyncConfigService, provideConfigAsync } from "./async-config.service";

@Injectable()
export class SyncService {
  config = { appName: "Async provider demo" };
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
  bootstrapApplication(App, { providers: [await provideConfigAsync()] });
})();
