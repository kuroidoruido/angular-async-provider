import { JsonPipe } from "@angular/common";
import { Component, inject, Injectable, InjectionToken } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

@Injectable()
export class SyncService {
  config = { appName: "Async provider demo" };
}

const AsyncConfig = new InjectionToken<{ url: string }>("AsyncConfig");

@Component({
  selector: "app-root",
  standalone: true,
  imports: [JsonPipe],
  providers: [
    SyncService,
    {
      provide: AsyncConfig,
      useFactory: async () => {
        const config = await fetch("/config.json").then((r) => r.json());
        await new Promise((r) => setTimeout(r, 5_000));
        return config;
      },
    },
  ],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <p>appName = {{ appName }}</p>
    <p>dynamicUrl = {{ asyncConfig | json }}</p>
  `,
})
export class App {
  name = "Angular";
  appName = inject(SyncService).config.appName;
  asyncConfig = inject(AsyncConfig);
}

bootstrapApplication(App);
