import { Component, inject, Injectable } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

@Injectable()
export class SyncService {
  config = { appName: "Async provider demo" };
}

@Component({
  selector: "app-root",
  standalone: true,
  providers: [SyncService],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <p>appName = {{ appName }}</p>
  `,
})
export class App {
  name = "Angular";
  appName = inject(SyncService).config.appName;
}

bootstrapApplication(App);
