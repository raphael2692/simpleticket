import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAllComponent } from './ticket-all.component';

describe('TicketAllComponent', () => {
  let component: TicketAllComponent;
  let fixture: ComponentFixture<TicketAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
