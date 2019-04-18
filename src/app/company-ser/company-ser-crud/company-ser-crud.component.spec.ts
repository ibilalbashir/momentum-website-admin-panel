import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySerCrudComponent } from './company-ser-crud.component';

describe('CompanySerCrudComponent', () => {
  let component: CompanySerCrudComponent;
  let fixture: ComponentFixture<CompanySerCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySerCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
