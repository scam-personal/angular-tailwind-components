import { Months } from "src/app/components/datepicker-scm/date-constants";
import { DateParserFormatter } from "../date-service-formatter.interface";

export class LongFormat implements DateParserFormatter {
  formatDate(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2);
    const monthName = Months[date.getMonth()];
    return `${monthName} ${day}, ${date.getFullYear()}`;
  }

  parseDate(formattedDate: string): Date | null {
    const splittedDate = formattedDate.split(",");
    const year = parseInt(splittedDate[1].trimStart());
    const day = parseInt(splittedDate[0].split(" ")[1]);
    const month = Months.indexOf(splittedDate[0].split(" ")[0]);
    return new Date(year, month, day);
  }
}
