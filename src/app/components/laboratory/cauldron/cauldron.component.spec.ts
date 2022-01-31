import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauldronComponent } from './cauldron.component';

describe('CauldronComponent', () => {
  let component: CauldronComponent;
  let fixture: ComponentFixture<CauldronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CauldronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauldronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
