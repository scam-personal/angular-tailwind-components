import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardScmComponent } from './card-scm.component';

describe('CardScmComponent', () => {
  let component: CardScmComponent;
  let fixture: ComponentFixture<CardScmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardScmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardScmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
