import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceCurdComponent } from './conference-curd.component';

describe('ConferenceCurdComponent', () => {
  let component: ConferenceCurdComponent;
  let fixture: ComponentFixture<ConferenceCurdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceCurdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
