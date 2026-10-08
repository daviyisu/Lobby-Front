import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/** "hace 3 días" / "3 days ago", in the current UI language. */
@Pipe({
  name: 'relativeTime',
  standalone: false,
  pure: false,
})
export class RelativeTimePipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(value: Date | string | null | undefined): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    const seconds = Math.round((date.getTime() - Date.now()) / 1000);
    const units: [Intl.RelativeTimeFormatUnit, number][] = [
      ['year', 31536000],
      ['month', 2592000],
      ['week', 604800],
      ['day', 86400],
      ['hour', 3600],
      ['minute', 60],
    ];
    const format = new Intl.RelativeTimeFormat(
      this.translate.currentLang || 'en',
      { numeric: 'auto' },
    );
    for (const [unit, size] of units) {
      if (Math.abs(seconds) >= size) {
        return format.format(Math.round(seconds / size), unit);
      }
    }
    return format.format(0, 'minute');
  }
}
