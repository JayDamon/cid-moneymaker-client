import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResourcesDialogComponent } from './no-resources-dialog.component';

describe('NoResourcesDialogComponent', () => {
  let component: NoResourcesDialogComponent;
  let fixture: ComponentFixture<NoResourcesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoResourcesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResourcesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
