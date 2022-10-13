import { Injectable } from "@angular/core";
import { DateParserFormatter } from "./date-service-formatter.interface";

@Injectable({
  providedIn: "root",
})
export class DateFormatterSCMService {
  static parse(formattedDate: string, format: DateParserFormatter): Date | null {
    return format.parseDate(formattedDate);
  }

  static format(date: Date, format: DateParserFormatter): string {
    return format.formatDate(date);
  }
}
