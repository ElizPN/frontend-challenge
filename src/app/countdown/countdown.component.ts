import { Component } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  inputValue: string = ''

  constructor() {}

  logTextToConsole(text: string) {
    console.log(this.inputValue);
  }

}
