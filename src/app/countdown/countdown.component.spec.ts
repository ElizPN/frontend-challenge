import { ComponentFixture, TestBed, tick } from '@angular/core/testing'

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
    component.selectedHolidayDate = ''

    component.calculateTimeDifference()

    expect(component.timeDifference.days).toBe(0)
    expect(component.timeDifference.hours).toBe(0)
    expect(component.timeDifference.minutes).toBe(0)
    expect(component.timeDifference.seconds).toBe(0)
  })

  it('should set time difference to zero when selected date is in the past', () => {
    component.selectedHolidayDate = '2022-01-01T00:00:00'

    component.calculateTimeDifference()

    expect(component.timeDifference.days).toBe(0)
    expect(component.timeDifference.hours).toBe(0)
    expect(component.timeDifference.minutes).toBe(0)
    expect(component.timeDifference.seconds).toBe(0)
  })

  it('should load holidays into holidaysList', () => {
    component.futureHolidays = {
      'New Year': '2024-01-01',
      'Christmas Day': '2024-12-25',
    }

    component.loadHolidays()

    expect(component.holidaysList.length).toBe(2)
    expect(component.holidaysList[0].name).toBe('New Year')
    expect(component.holidaysList[0].date).toBe('2024-01-01')
    expect(component.holidaysList[1].name).toBe('Christmas Day')
    expect(component.holidaysList[1].date).toBe('2024-12-25')
  })

  it('should filter holidays based on search term', () => {
    component.futureHolidays = {
      'New Year': '2024-01-01',
      Christmas: '2024-12-25',
      Easter: '2024-04-05',
    }

    component.filterHolidays('e')

    expect(component.holidaysList.length).toBe(2)
    expect(component.holidaysList[0].name).toBe('New Year')
    expect(component.holidaysList[1].name).toBe('Easter')
  })

  it('should update holiday details and clear search on holiday selection', () => {
    component.holidayTitle = ''
    component.selectedHolidayDate = ''
    component.searchValue = 'Christmas'
    component.holidaysList = [
      { name: 'Christmas', date: '2024-12-25' },
      { name: 'New Year', date: '2024-01-01' },
    ]

    component.onHolidaySelect({ name: 'Christmas', date: '2024-12-25' })

    expect(component.holidayTitle).toBe('Christmas')

    expect(component.searchValue).toBe('')

    expect(component.holidaysList.length).toBe(0)
  })
})
