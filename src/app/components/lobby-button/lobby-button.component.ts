import { Component, input } from '@angular/core';

@Component({
  selector: 'app-lobby-button',
  imports: [],
  standalone: true,
  templateUrl: './lobby-button.component.html',
  styleUrl: './lobby-button.component.scss',
})
export class LobbyButtonComponent {
  buttonText = input<string>('Continuar');
  type = input<'button' | 'submit' | 'reset'>('button');
}
