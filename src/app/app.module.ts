import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountdownComponent } from './countdown/countdown.component';
import { CommonModule } from '@angular/common';
import { FitTextDirective } from './shared/fit-text.directive';

@NgModule({
  declarations: [
    CountdownComponent,
    FitTextDirective
  ],
  exports: [
    CountdownComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
