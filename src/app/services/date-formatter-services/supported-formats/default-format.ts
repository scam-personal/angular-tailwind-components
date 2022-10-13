import { DateParserFormatter } from "../date-service-formatter.interface";

export class DefaultFormat implements DateParserFormatter {
  formatDate(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().substring(2);
    return `${month}/${day}/${year}`;
  }

  parseDate(formattedDate: string): Date | null {
    const currentYear = new Date().getFullYear();
    const currentCentury = Math.ceil(currentYear / 100) - 1;
    const previousCentury = currentCentury - 1;
    const splittedDate = formattedDate.split("/");
    const twoDigitYear = splittedDate[2];
    const year = parseInt(twoDigitYear) > (currentYear % 100) + 30 ? parseInt(previousCentury + twoDigitYear) : parseInt(currentCentury + twoDigitYear)
    const day = parseInt(splittedDate[1]);
    const month = parseInt(splittedDate[0]) - 1;
    return new Date(year, month, day);
  }
}
