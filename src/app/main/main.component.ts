import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../top-menu/top-menu.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [ProfileComponent, RouterOutlet, TopMenuComponent],
  standalone: true,
})
export class MainComponent {}
