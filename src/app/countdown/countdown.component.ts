import { Component, ViewChild, ElementRef, OnInit } from '@angular/core'
import { interval, Subscription } from 'rxjs'
import holidaysData from '../../holidays.json'

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  @ViewChild('searchField', { static: false }) searchField!: ElementRef
  eventNameValue: string = ''
  selectedDateValue: string = ''
  timeDifference: { days: number; hours: number; minutes: number; seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
  holidaysList: { name: string; date: string }[] = []
  allHolidays: Record<string, string> = { ...holidaysData }
  futureHolidays: Record<string, string> = {}
  private timerSubscription: Subscription | undefined

  ngOnInit() {
    this.startTimer()
  }

  constructor() {
    const storedSelectedHolidayDate = localStorage.getItem('selectedHolidayDate')
    const storedSelectedHolidayName = localStorage.getItem('selectedHolidayName')

    if (storedSelectedHolidayDate && storedSelectedHolidayName) {
      this.selectedDateValue = storedSelectedHolidayDate
      this.eventNameValue = storedSelectedHolidayName
      interval(1000).subscribe(() => {
        this.calculateTimeDifference()
      })
    }
  }

  private startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.calculateTimeDifference()
    })
  }

  calculateTimeDifference() {
    const currentDate = new Date()
    const selectedDate = new Date(this.selectedDateValue)

    if (this.selectedDateValue === '' || selectedDate < currentDate || !selectedDate) {
      this.timeDifference = { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return
    }

    this.timeDifference = this.getTimeDifference(selectedDate, currentDate)
  }

  private getTimeDifference(selectedDate: Date, currentDate: Date) {
    const differenceInMilliseconds = Math.abs(selectedDate.getTime() - currentDate.getTime())
    const seconds = Math.floor(differenceInMilliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    return {
      days: days % 365,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    }
  }

  updateEventName(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value
    window.localStorage.setItem('selectedHolidayName', inputValue)
  }

  updateEventDate(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value
    window.localStorage.setItem('selectedHolidayDate', inputValue)
  }
}
