import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  DaysModule,
  DaysToShowMax,
  DaysToShowMin,
  Months,
  WeekDays,
} from "./date-constants";
import { DateSCM } from "./date-scm";

@Component({
  selector: "app-datepicker-scm",
  templateUrl: "./datepicker-scm.component.html",
  styleUrls: ["./datepicker-scm.component.scss"],
})
export class DatepickerScmComponent implements OnInit {
  currentDateSCM!: DateSCM;
  showingDateSCM!: DateSCM;
  prevDateSCM!: DateSCM;
  nextDateSCM!: DateSCM;
  daysArray!: Array<number>;
  calendarDays!: Array<Array<number>>;
  weekDays!: Array<string>;
  months!: Array<string>;

  userSelectedDateSCM!: DateSCM;
  @Output() onDateSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.weekDays = WeekDays;
    this.months = Months;
    this.currentDateSCM = new DateSCM();
    this.showingDateSCM = this.currentDateSCM;
    this.prevDateSCM = this.currentDateSCM.getPreviousDate();
    this.nextDateSCM = this.currentDateSCM.getNextDate();
  }

  ngOnInit(): void {
    this.getCalendarDays();
  }

  userSelectDate(selectedDay: number) {
    let showingDate = this.showingDateSCM.currentDate;
    this.userSelectedDateSCM = new DateSCM(
      showingDate.year,
      showingDate.month,
      selectedDay
    );
  }

  isToday(day: number) {
    let dateShowed = this.showingDateSCM.currentDate;
    return DateSCM.isToday(
      new Date(dateShowed.year, dateShowed.month - 1, day)
    );
  }

  goPrevMonth() {
    this.nextDateSCM = this.showingDateSCM;
    this.showingDateSCM = this.prevDateSCM;
    this.prevDateSCM = this.showingDateSCM.getPreviousDate();
    this.getCalendarDays();
  }

  goNextMonth() {
    this.prevDateSCM = this.showingDateSCM;
    this.showingDateSCM = this.nextDateSCM;
    this.nextDateSCM = this.showingDateSCM.getNextDate();
    this.getCalendarDays();
  }

  private getCalendarDays() {
    this.daysArray = [
      ...this.generatePrevDaysArray(),
      ...this.generateCurrentDaysArray(),
      ...this.generateNextDaysArray(),
    ];
    this.calendarDays = this.generateCalendarDaysMatrix();
  }

  private generatePrevDaysArray() {
    let prevDaysArray = [];
    let totalPrevDays = this.prevDateSCM.currentDate.totalDays;
    let currFirstDayNumber = this.showingDateSCM.currentDate.firstDayNumber;
    let showFromPrevDays = totalPrevDays - currFirstDayNumber + 1;
    for (let i = showFromPrevDays; i <= totalPrevDays; i++)
      prevDaysArray.push(i);
    return prevDaysArray;
  }

  private generateNextDaysArray() {
    let nextDaysArray = [];
    let currentDate = this.showingDateSCM.currentDate;
    let occupedDays = currentDate.totalDays + currentDate.firstDayNumber;
    let freeDays;
    if (occupedDays <= DaysToShowMin) freeDays = DaysToShowMin - occupedDays;
    else freeDays = DaysToShowMax - occupedDays;
    for (let day = 1; day <= freeDays; day++) nextDaysArray.push(day);
    return nextDaysArray;
  }

  private generateCurrentDaysArray() {
    let currentDaysArray = [];
    let currentDate = this.showingDateSCM.currentDate;
    for (let day = 1; day <= currentDate.totalDays; day++)
      currentDaysArray.push(day);
    return currentDaysArray;
  }

  private generateCalendarDaysMatrix() {
    let calendarDaysMatrix = [];
    for (let index = 1; index < DaysModule; index++)
      calendarDaysMatrix.push(
        this.daysArray.slice(DaysModule * (index - 1), DaysModule * index)
      );
    return calendarDaysMatrix;
  }
}
