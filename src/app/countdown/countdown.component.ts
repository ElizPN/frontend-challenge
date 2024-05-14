import { Component, ViewChild, ElementRef } from '@angular/core'
import { interval } from 'rxjs'
import holidaysData from '../../holidays.json'

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent {
  @ViewChild('searchField', { static: false }) searchField!: ElementRef
  holidayTitle: string = ''
  searchValue: string = ''
  selectedHolidayDate: string = ''
  timeDifference: { days: number; hours: number; minutes: number; seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
  holidaysList: { name: string; date: string }[] = []
  allHolidays: Record<string, string> = { ...holidaysData }
  futureHolidays: Record<string, string> = {}

  constructor() {
    const storedSelectedHolidayDate = localStorage.getItem('selectedHolidayDate')
    const storedSelectedHolidayName = localStorage.getItem('selectedHolidayName')

    if (storedSelectedHolidayDate && storedSelectedHolidayName) {
      this.selectedHolidayDate = storedSelectedHolidayDate
      this.holidayTitle = storedSelectedHolidayName
      interval(1000).subscribe(() => {
        this.calculateTimeDifference()
      })
    }

    for (const holiday in holidaysData) {
      const holidayDate = new Date(this.allHolidays[holiday])
      const currentDate = new Date()

      if (holidayDate > currentDate) {
        this.futureHolidays[holiday] = this.allHolidays[holiday]
      }
    }
  }

  saveToLocalStorage() {
    window.localStorage.setItem('selectedHolidayDate', this.selectedHolidayDate)
    window.localStorage.setItem('selectedHolidayName', this.holidayTitle)
  }

  calculateTimeDifference() {
    if (!this.selectedHolidayDate) {
      this.timeDifference = { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return
    }

    const currentDate = new Date()
    const selectedDate = new Date(this.selectedHolidayDate)
    if (selectedDate < currentDate || !selectedDate) {
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

  loadHolidays() {
    this.holidaysList = []

    Object.entries(this.futureHolidays).forEach(([name, date]) => {
      this.holidaysList.push({ name, date })
    })
  }

  filterHolidays(searchTerm: string) {
    if (!searchTerm) {
      this.loadHolidays()
      return
    }

    this.holidaysList = Object.keys(this.futureHolidays)
      .filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(key => ({ name: key, date: this.futureHolidays[key] }))
  }

  onHolidaySelect({ name, date }: { name: string; date: string }) {
    this.holidayTitle = name
    this.selectedHolidayDate = date
    this.saveToLocalStorage()

    interval(1000).subscribe(() => {
      this.calculateTimeDifference()
    })

    this.searchValue = ''
    this.holidaysList = []
  }

  updateHolidaysOnInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value

    this.filterHolidays(inputValue)

    if (inputValue === '') {
      this.holidaysList = []
    }
  }
}
