import { DateFormatterSCMService } from "src/app/services/date-formatter-services/date-formatter-scm.service";
import { DateParserFormatter } from "src/app/services/date-formatter-services/date-service-formatter.interface";
import {
  DateFormat,
  supportedFormats,
} from "src/app/services/date-formatter-services/supported-formats/format-dictionary";

export interface dateSCM {
  baseDate: Date;
  year: number;
  month: number;
  totalDays: number;
  firstDayNumber: number;
  formatter: DateParserFormatter;
}

export class DateSCM {
  private currentDateSCM: dateSCM;

  constructor(
    year?: number | null,
    month?: number | null,
    day?: number | null,
    format?: supportedFormats
  ) {
    let currDate: Date;
    if (year && month) currDate = new Date(year, month - 1, day ? day : 1);
    else currDate = new Date();
    let yearSCM = currDate.getFullYear();
    let monthSCM = currDate.getMonth() + 1;
    this.currentDateSCM = {
      baseDate: currDate,
      year: yearSCM,
      month: monthSCM,
      totalDays: new Date(yearSCM, monthSCM, 0).getDate(),
      firstDayNumber: new Date(yearSCM, monthSCM - 1).getDay(),
      formatter: format ? DateFormat[format] : DateFormat.MMDDYY,
    };
  }

  public get currentDate(): dateSCM {
    return this.currentDateSCM;
  }

  public get baseDate(): Date {
    return this.currentDateSCM.baseDate;
  }

  get formatter(): DateParserFormatter {
    return this.currentDateSCM.formatter;
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

  public getFormattedDate(): string {
    return DateFormatterSCMService.format(this.baseDate, this.formatter);
  }

  public getParsedDate(strDate: string) {
    let parsedDate = DateFormatterSCMService.parse(strDate, this.formatter);
    let aux = new DateSCM(
      parsedDate?.getFullYear(),
      parsedDate!.getMonth() + 1,
      parsedDate?.getDate()
    );
    return aux;
  }

  public static isToday(date?: Date | dateSCM) {
    let today = new Date();
    let isToday: boolean = false;
    let compareDate;
    if (date instanceof Date) compareDate = date;
    else compareDate = date?.baseDate;
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
