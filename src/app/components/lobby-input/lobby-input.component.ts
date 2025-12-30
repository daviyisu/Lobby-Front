import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lobby-input',
  templateUrl: './lobby-input.component.html',
  standalone: true,
  styleUrl: './lobby-input.component.scss',
  imports: [ReactiveFormsModule],
})
export class LobbyInputComponent {
  placeholder = input<string>('Escribe aquí...');
  control = input.required<FormControl>();
  type = input<string>('text');
}
