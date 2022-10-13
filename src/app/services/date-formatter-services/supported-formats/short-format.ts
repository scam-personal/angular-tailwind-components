import { Months } from "src/app/components/datepicker-scm/date-constants";
import { DateParserFormatter } from "../date-service-formatter.interface";

export class ShortFormat implements DateParserFormatter {
  formatDate(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2);
    const monthName = Months[date.getMonth()];
    return `${monthName} ${day}`;
  }

  parseDate(formattedDate: string): Date | null {
    const splittedDate = formattedDate.split(" ");
    const day = parseInt(splittedDate[1]);
    const month = Months.indexOf(splittedDate[0]);
    const year = new Date().getFullYear();
    return new Date(year, month, day);
  }
}
