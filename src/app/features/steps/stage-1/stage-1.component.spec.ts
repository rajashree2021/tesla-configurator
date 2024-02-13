import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1Component } from './stage-1.component';

describe('Step1Component', () => {
  let component: Stage1Component;
  let fixture: ComponentFixture<Stage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stage1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Stage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
