import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private iconService: IconService,
  ) {
    translate.setDefaultLang('en');
    translate.use(navigator.language.match('es') ? 'es' : 'en');
  }

  ngOnInit() {
    this.iconService.registerIcons();
  }
}
