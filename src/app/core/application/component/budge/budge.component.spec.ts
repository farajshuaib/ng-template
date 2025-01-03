import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgeComponent } from './budge.component';

describe('BudgeComponent', () => {
  let component: BudgeComponent;
  let fixture: ComponentFixture<BudgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
