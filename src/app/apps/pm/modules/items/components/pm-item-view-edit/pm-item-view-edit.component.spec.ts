import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmItemViewEditComponent } from './pm-item-view-edit.component';

describe('PmItemViewEditComponent', () => {
  let component: PmItemViewEditComponent;
  let fixture: ComponentFixture<PmItemViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmItemViewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmItemViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
