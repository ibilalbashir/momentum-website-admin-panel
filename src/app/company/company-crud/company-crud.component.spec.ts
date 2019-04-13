import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCrudComponent } from './company-crud.component';

describe('CompanyCrudComponent', () => {
  let component: CompanyCrudComponent;
  let fixture: ComponentFixture<CompanyCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
