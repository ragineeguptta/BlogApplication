import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./core/component/navbar/navbar";
import { ImageSelector } from "./shared/components/image-select/image-select";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ImageSelector],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BlogApp');
}
