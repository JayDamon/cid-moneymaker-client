import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvHeaderMatchComponent } from './csv-header-match.component';

describe('CsvHeaderMatchComponent', () => {
  let component: CsvHeaderMatchComponent;
  let fixture: ComponentFixture<CsvHeaderMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvHeaderMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvHeaderMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
