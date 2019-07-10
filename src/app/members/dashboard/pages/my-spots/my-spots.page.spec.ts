import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpotsPage } from './my-spots.page';

describe('MySpotsPage', () => {
  let component: MySpotsPage;
  let fixture: ComponentFixture<MySpotsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySpotsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
