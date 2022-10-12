export interface dateSCM {
  currentDate: Date;
  year: number;
  month: number;
  totalDays: number;
  firstDayNumber: number;
}

export class DateSCM {
  private currentDateSCM: dateSCM;

  constructor(year?: number, month?: number, day?: number) {
    let currDate: Date;
    if (year && month) currDate = new Date(year, month - 1, day ? day : 1);
    else currDate = new Date();
    let yearSCM = currDate.getFullYear();
    let monthSCM = currDate.getMonth() + 1;
    this.currentDateSCM = {
      currentDate: currDate,
      year: yearSCM,
      month: monthSCM,
      totalDays: new Date(yearSCM, monthSCM, 0).getDate(),
      firstDayNumber: new Date(yearSCM, monthSCM - 1).getDay(),
    };
  }

  public get currentDate(): dateSCM {
    return this.currentDateSCM;
  }

  public get year(): number {
    return this.currentDateSCM.year;
  }

  public get month(): number {
    return this.currentDateSCM.month;
  }

  public get totalDays(): number {
    return this.currentDateSCM.totalDays;
  }

  public get firstDayNumber(): number {
    return this.currentDateSCM.firstDayNumber;
  }

  public static isToday(date?: Date | dateSCM) {
    let today = new Date();
    let isToday: boolean = false;
    let compareDate;
    if (date instanceof Date) compareDate = date;
    else compareDate = date?.currentDate;
    if (
      compareDate &&
      compareDate.getDate() == today.getDate() &&
      compareDate.getMonth() == today.getMonth() &&
      compareDate.getFullYear() == today.getFullYear()
    )
      isToday = true;
    return isToday;
  }

  public getPreviousDate() {
    let month = this.currentDate.month - 1;
    let year = this.currentDate.year;
    if (month == 0) {
      year -= 1;
      month = 12;
    }
    return new DateSCM(year, month);
  }

  public getNextDate() {
    let month = this.currentDate.month + 1;
    let year = this.currentDate.year;
    if (month == 13) {
      year += 1;
      month = 1;
    }
    return new DateSCM(year, month);
  }
}
