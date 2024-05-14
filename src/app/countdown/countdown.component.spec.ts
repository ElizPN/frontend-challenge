import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CountdownComponent } from './countdown.component'
import { AppModule } from '../app.module'

describe('CountdownComponent', () => {
  let component: CountdownComponent
  let fixture: ComponentFixture<CountdownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [CountdownComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CountdownComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should calculate time difference when selected date is in the future', () => {
    const futureDate = new Date(Date.now() + 876990476)
    component.selectedHolidayDate = futureDate.toISOString()

    component.calculateTimeDifference()

    expect(component.timeDifference.days).toBeGreaterThan(0)
    expect(component.timeDifference.hours).toBeGreaterThan(0)
    expect(component.timeDifference.minutes).toBeGreaterThan(0)
    expect(component.timeDifference.seconds).toBeGreaterThan(0)
  })

  it('should set time difference to zero when no selected date', () => {
    component.selectedHolidayDate = '';

    component.calculateTimeDifference();

    expect(component.timeDifference.days).toBe(0);
    expect(component.timeDifference.hours).toBe(0);
    expect(component.timeDifference.minutes).toBe(0);
    expect(component.timeDifference.seconds).toBe(0);
  });

  it('should set time difference to zero when selected date is in the past', () => {
    component.selectedHolidayDate = '2022-01-01T00:00:00';

    component.calculateTimeDifference();

    expect(component.timeDifference.days).toBe(0);
    expect(component.timeDifference.hours).toBe(0);
    expect(component.timeDifference.minutes).toBe(0);
    expect(component.timeDifference.seconds).toBe(0);
  });
})

