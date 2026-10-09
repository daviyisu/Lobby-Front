import { TestBed } from '@angular/core/testing';
import { StatusSelectorComponent } from './status-selector.component';
import { GameDetailModule } from '../game-detail/game-detail.module';
import { CollectionStatusEnum } from '../../models/enums';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('StatusSelectorComponent', () => {
  let component: StatusSelectorComponent;
  let emitted: CollectionStatusEnum[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, GameDetailModule],
      providers: [...provideTestEnvironment()],
    });
    const fixture = TestBed.createComponent(StatusSelectorComponent);
    component = fixture.componentInstance;
    component.status = CollectionStatusEnum.playing;
    emitted = [];
    component.statusChange.subscribe((s) => emitted.push(s));
    fixture.detectChanges();
  });

  it('renders the five statuses with the current one checked', () => {
    const el: HTMLElement = TestBed.createComponent(
      StatusSelectorComponent,
    ).nativeElement;
    expect(el).toBeTruthy();
    expect(component.options.length).toBe(5);
  });

  it('emits a different status, but not the current one', () => {
    component.select(CollectionStatusEnum.playing);
    component.select(CollectionStatusEnum.completed);
    expect(emitted).toEqual([CollectionStatusEnum.completed]);
  });

  it('moves focus with the arrow keys without selecting', () => {
    const fixture = TestBed.createComponent(StatusSelectorComponent);
    fixture.componentInstance.status = CollectionStatusEnum.playing;
    const changes: CollectionStatusEnum[] = [];
    fixture.componentInstance.statusChange.subscribe((s) => changes.push(s));
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    document.body.appendChild(fixture.nativeElement);
    buttons[0].focus();
    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    expect(document.activeElement).toBe(buttons[1]);
    expect(changes).toEqual([]);
    fixture.nativeElement.remove();
  });

  it('emits nothing while disabled', () => {
    component.disabled = true;
    component.select(CollectionStatusEnum.completed);
    expect(emitted).toEqual([]);
  });
});
