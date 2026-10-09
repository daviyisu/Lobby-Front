import { Component, inject } from '@angular/core';
import { ShellService } from '../../services/shell.service';
import { NAV_LINKS } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: false,
})
export class BottomNavComponent {
  protected shell = inject(ShellService);

  /** Collection and Lists, then Search in the middle, then Stats and Recent. */
  start = NAV_LINKS.slice(0, 2);
  end = NAV_LINKS.slice(2);
}
