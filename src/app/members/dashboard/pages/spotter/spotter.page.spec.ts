import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotterPage } from './spotter.page';

describe('SpotterPage', () => {
  let component: SpotterPage;
  let fixture: ComponentFixture<SpotterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
