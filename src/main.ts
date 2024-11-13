import { AsyncPipe, JsonPipe } from "@angular/common";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { Component, inject, Injectable } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

@Injectable()
export class SyncService {
  config = { appName: "Async provider demo" };
}

interface AsyncConfig {
  url: string;
}

@Injectable()
export class AsyncConfigService {
  config$ = inject(HttpClient).get<AsyncConfig>("/config.json");
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  providers: [SyncService, AsyncConfigService],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <p>appName = {{ appName }}</p>
    <p>dynamicUrl = {{ asyncConfig | async | json }}</p>
  `,
})
export class App {
  name = "Angular";
  appName = inject(SyncService).config.appName;
  asyncConfig = inject(AsyncConfigService).config$;
}

bootstrapApplication(App, { providers: [provideHttpClient()] });
