import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconService } from '../services/icon.service';
import {FooterComponent} from "./footer/footer.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
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
