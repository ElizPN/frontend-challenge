import { Component } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  inputValue: string = '';
  timeDifference: string = '';

  constructor() {}

  calculateTimeDifference() {
    const currentDate = new Date();
    const selectedDate = new Date(this.inputValue);

    const timeDiff = this.getTimeDifference(selectedDate, currentDate);
    this.timeDifference = `${timeDiff.days} days, ${timeDiff.hours} hours, ${timeDiff.minutes} minutes, ${timeDiff.seconds} seconds`;
  }

  private getTimeDifference(selectedDate: Date, currentDate: Date) {
    const differenceInMilliseconds = Math.abs(selectedDate.getTime() - currentDate.getTime());
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days: days % 365,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60
    };
  }
}
