import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconService } from '../services/icon.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private iconService: IconService,
    // Instantiated at startup so the theme follows system changes.
    private themeService: ThemeService,
  ) {
    translate.setDefaultLang('en');
    translate.use(navigator.language.match('es') ? 'es' : 'en');
  }

  ngOnInit() {
    this.iconService.registerIcons();
  }
}
