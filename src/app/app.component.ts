import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarContainer } from './core/components/header/navbar/menubar.container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarContainer
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
