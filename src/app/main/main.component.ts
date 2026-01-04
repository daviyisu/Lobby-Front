import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [ProfileComponent, RouterOutlet],
  standalone: true,
})
export class MainComponent {}
