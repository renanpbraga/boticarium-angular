import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotionstorageComponent } from './potionstorage.component';

describe('PotionstorageComponent', () => {
  let component: PotionstorageComponent;
  let fixture: ComponentFixture<PotionstorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotionstorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotionstorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
