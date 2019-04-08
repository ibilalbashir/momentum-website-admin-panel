import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerCrudComponent } from './speaker-crud.component';

describe('SpeakerCrudComponent', () => {
  let component: SpeakerCrudComponent;
  let fixture: ComponentFixture<SpeakerCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
