import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopCrudComponent } from './workshop-crud.component';

describe('WorkshopCrudComponent', () => {
  let component: WorkshopCrudComponent;
  let fixture: ComponentFixture<WorkshopCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
