import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { SelectorScmComponent } from "../selector-scm/selector-scm.component";
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
import { supportedFormats } from "src/app/services/date-formatter-services/supported-formats/format-dictionary";

const FirstElement: number = 0;

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
  @Input() dateFormat: supportedFormats = "MMDDYY";
  @Input() preSelectedDate: string = "";
  @Output("onSelect") onDateSelected: EventEmitter<string> = new EventEmitter();

  @ViewChild("datepicker", { static: true }) datepicker!: ElementRef;
  @ViewChildren(SelectorScmComponent)
  selectors!: QueryList<SelectorScmComponent>;

  constructor() {
    this.weekDays = WeekDays;
    this.months = Months;
  }

  ngOnInit(): void {
    this.currentDateSCM = new DateSCM(null, null, null, this.dateFormat);
    this.prevDateSCM = this.currentDateSCM.getPreviousDate();
    this.nextDateSCM = this.currentDateSCM.getNextDate();
    if (this.preSelectedDate.length > 0) {
      this.currentDateSCM = this.currentDateSCM.getParsedDate(
        this.preSelectedDate
      );
      this.userSelectedDateSCM = this.currentDateSCM;
    }
    this.showingDateSCM = this.currentDateSCM;
    this.getCalendarDays();
  }

  userSelectDate(selectedDay: number) {
    this.userSelectedDateSCM = new DateSCM(
      this.showingDateSCM.year,
      this.showingDateSCM.month,
      selectedDay,
      this.dateFormat
    );
    this.onDateSelected.emit(this.userSelectedDateSCM.getFormattedDate());
  }

  isToday(day: number) {
    return DateSCM.isToday(
      new Date(this.showingDateSCM.year, this.showingDateSCM.month - 1, day)
    );
  }

  isSelected(day: number) {
    return (
      this.preSelectedDate.length > 0 &&
      this.userSelectedDateSCM.baseDate.getDate() == day &&
      this.userSelectedDateSCM.month == this.showingDateSCM.month &&
      this.userSelectedDateSCM.year == this.showingDateSCM.year
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

  public get elementRef(): ElementRef {
    return this.datepicker;
  }

  @HostListener("document:click", ["$event"])
  onClick(event: any): void {
    // let isSelector = this.selectors
    //   .get(FirstElement)
    //   ?.elementRef.nativeElement.contains(event.target);
    let isDatepikerClicked = this.elementRef.nativeElement.contains(
      event.target
    );
    // if (isSelector | isDatepiker) event.stopPropagation();
    // else {
    //   this.showMonthSelector = false;
    //   this.showYearSelector = false;
    // }
    // console.log("datepicker: ", isDatepikerClicked);
  }
}
