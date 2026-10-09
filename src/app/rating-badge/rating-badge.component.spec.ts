import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { RatingBadgeComponent } from './rating-badge.component';
import { SharedModule } from '../shared/shared.module';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('RatingBadgeComponent', () => {
  let component: RatingBadgeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, SharedModule],
      providers: [...provideTestEnvironment()],
    });
    component = TestBed.createComponent(RatingBadgeComponent).componentInstance;
  });

  it('maps scores to their color band', () => {
    const tierOf = (value: number) => {
      component.value = value;
      return component.tier;
    };
    expect([0, 4, 5, 7, 8, 9, 10].map(tierOf)).toEqual([
      'low',
      'low',
      'mid',
      'mid',
      'high',
      'high',
      'perfect',
    ]);
  });

  it('shows averages with one decimal in the UI language', () => {
    TestBed.inject(TranslateService).currentLang = 'es';
    component.value = 8.66;
    expect(component.display).toBe('8,7');
    component.value = 9;
    expect(component.display).toBe('9');
  });
});
