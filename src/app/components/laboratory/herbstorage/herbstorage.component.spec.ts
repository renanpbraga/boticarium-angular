import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbstorageComponent } from './herbstorage.component';

describe('HerbstorageComponent', () => {
  let component: HerbstorageComponent;
  let fixture: ComponentFixture<HerbstorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerbstorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbstorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
