import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { ShellService } from '../../services/shell.service';
import { ThemeMode, ThemeService } from '../../services/theme.service';
import { User } from '../../models/user';
import { GameSearchBarComponent } from '../game-search-bar/game-search-bar.component';

export const NAV_LINKS = [
  { label: 'nav.collection', route: '/mygames', icon: 'grid_view' },
  { label: 'nav.lists', route: '/mylists', icon: 'bookmarks' },
  { label: 'nav.stats', route: '/mystats', icon: 'insights' },
  { label: 'nav.recent', route: '/recent', icon: 'schedule' },
];

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  standalone: false,
})
export class TopBarComponent implements OnInit, OnDestroy {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private userService = inject(UserService);
  private shell = inject(ShellService);
  protected theme = inject(ThemeService);
  protected translate = inject(TranslateService);

  @ViewChild(GameSearchBarComponent) searchBar?: GameSearchBarComponent;

  links = NAV_LINKS;
  user?: User;
  /** On mobile the search expands over the bar. */
  searchOpen = false;

  themeModes: { mode: ThemeMode; icon: string }[] = [
    { mode: 'system', icon: 'contrast' },
    { mode: 'light', icon: 'light_mode' },
    { mode: 'dark', icon: 'dark_mode' },
  ];

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => (this.user = user));
    this.subscriptions.add(
      this.shell.focusSearch$.subscribe(() => this.openSearch()),
    );
    this.subscriptions.add(
      this.shell.steamSynced$.subscribe((data) => {
        if (data.changeAvatar && this.user) {
          this.user.avatar_url = data.avatar;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  openSearch(): void {
    this.searchOpen = true;
    // Wait for the expanded search to render before focusing it.
    setTimeout(() => this.searchBar?.focus());
  }

  goToGame(id: number): void {
    this.searchOpen = false;
    this.router.navigateByUrl('gamedetail/' + id);
  }

  openSteamSync(): void {
    this.shell.openSteamSync();
  }

  setLanguage(lang: 'es' | 'en'): void {
    this.translate.use(lang);
  }

  get initials(): string {
    return (this.user?.username ?? '?').slice(0, 2).toUpperCase();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
