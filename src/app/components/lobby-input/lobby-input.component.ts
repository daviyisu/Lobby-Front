import { Component, input } from '@angular/core';

@Component({
  selector: 'app-lobby-input',
  templateUrl: './lobby-input.component.html',
  standalone: true,
  styleUrl: './lobby-input.component.scss',
})
export class LobbyInputComponent {
  placeholder = input<string>('Escribe aquí...');
}
