import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Game } from '../../../models/game';
import { CreateListModalComponent } from './create-list-modal.component';
import { MyListsModule } from '../my-lists.module';
import {
  provideDialog,
  provideTestEnvironment,
  testImports,
} from '../../../testing/test-providers';

describe('CreateListModalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, MyListsModule],
      providers: [...provideTestEnvironment(), ...provideDialog()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CreateListModalComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('rejects a name made only of spaces', () => {
    const component = TestBed.createComponent(
      CreateListModalComponent,
    ).componentInstance;
    component.games = [{ id: 1, name: 'Celeste' } as Game];
    component.listNameFormControl.setValue('   ');
    expect(component.canSave).toBeFalse();
  });

  it('creates the list once even if Save is triggered twice', () => {
    const component = TestBed.createComponent(
      CreateListModalComponent,
    ).componentInstance;
    component.games = [{ id: 1, name: 'Celeste' } as Game];
    component.listNameFormControl.setValue(' Favs ');
    component.save();
    component.save();
    const http = TestBed.inject(HttpTestingController);
    const reqs = http.match((r) => r.url.endsWith('game_list/new'));
    expect(reqs.length).toBe(1);
    expect(reqs[0].request.body.name).toBe('Favs');
  });
});
