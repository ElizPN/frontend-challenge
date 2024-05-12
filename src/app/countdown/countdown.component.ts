import { Component } from '@angular/core'
import { interval } from 'rxjs'
import holidaysData from '../../holidays.json'

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent {
  inputValue: string = ''
  timeDifference: { days: number; hours: number; minutes: number; seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
  holidaysList: { name: string; date: string }[] = []
  selectedHoliday: { name: string; date: string } | undefined

  calculateTimeDifference() {
    const selectedHolidayDay: string = this.inputValue
    if (!selectedHolidayDay) {
      this.timeDifference = { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return
    }

    const currentDate = new Date()
    const selectedDate = new Date(selectedHolidayDay)
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

    Object.entries(holidaysData).forEach(([name, date]) => {
      this.holidaysList.push({ name, date })
    })
  }

  filterHolidays(searchTerm: string) {
    if (!searchTerm) {
      this.loadHolidays()
      return
    }

    this.holidaysList = Object.keys(holidaysData)
      .filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(key => ({ name: key, date: holidaysData[key as keyof typeof holidaysData] }))
  }

  onHolidaySelect(selectedHoliday: { name: string; date: string }) {
    this.inputValue = selectedHoliday.date
    interval(1000).subscribe(() => {
      this.calculateTimeDifference()
    })
  }

  handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value
    this.filterHolidays(inputValue)
  }
}
