import { Component } from '@angular/core';
import { LobbyButtonComponent } from "../components/lobby-button/lobby-button.component";

@Component({
  selector: 'app-top-menu',
  imports: [LobbyButtonComponent],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
})
export class TopMenuComponent {

}
