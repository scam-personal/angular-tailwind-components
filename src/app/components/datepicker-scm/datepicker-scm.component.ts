import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AddYears,
  DaysModule,
  DaysToShowMax,
  DaysToShowMin,
  FromYear,
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

  showYearSelector: boolean = false;
  showMonthSelector: boolean = false;

  userSelectedDateSCM!: DateSCM;
  @Output('onDateSelected') onDateSelected: EventEmitter<DateSCM> = new EventEmitter();

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
    this.userSelectedDateSCM = new DateSCM(
      this.showingDateSCM.year,
      this.showingDateSCM.month,
      selectedDay
    );
    this.onDateSelected.emit(this.userSelectedDateSCM);
  }

  isToday(day: number) {
    return DateSCM.isToday(
      new Date(this.showingDateSCM.year, this.showingDateSCM.month - 1, day)
    );
  }

  getYearsArray() {
    let yearsArray = [];
    let maxYear = this.currentDateSCM.year + AddYears;
    for (let year = FromYear; year < maxYear; year++) yearsArray.push(year);
    return yearsArray;
  }

  optionSelected(item: string) {
    let indexMonth = this.months.indexOf(item);
    if (indexMonth >= 0)
      this.showingDateSCM = new DateSCM(
        this.showingDateSCM.year,
        indexMonth + 1
      );
    else
      this.showingDateSCM = new DateSCM(
        parseInt(item),
        this.showingDateSCM.month
      );
    this.getCalendarDays();
    this.showMonthSelector = false;
    this.showYearSelector = false;
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

  showHideMonthSelector() {
    this.showMonthSelector = !this.showMonthSelector;
    this.showYearSelector = false;
  }

  showHideYearSelector() {
    this.showYearSelector = !this.showYearSelector;
    this.showMonthSelector = false;
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
