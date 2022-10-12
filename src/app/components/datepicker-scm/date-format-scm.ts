import { Injectable } from "@angular/core";
import { Months } from "./date-constants";
import { dateSCM } from "./date-scm";

@Injectable({
    providedIn: 'root',
})
export class DateParserFormatterSCM {
    parse(formattedDate: string, format: DateParserFormatter): dateSCM | null {
        return format.parseDate(formattedDate);
    }

    format(date: dateSCM, format: DateParserFormatter): string {
        return format.formatDate(date);
    }
}

export interface DateParserFormatter {
    formatDate(date: dateSCM): string;
    parseDate(formattedDate: string): dateSCM | null;
}

export class LongFormat implements DateParserFormatter {
    formatDate(date: dateSCM): string {
        const day = ('0' + date.currentDate.getDate()).slice(-2);
        const monthName = Months[date.month - 1];
        return `${monthName} ${day}, ${date.year}`;
    }

    parseDate(formattedDate: string): dateSCM | null {
        const splittedDate = formattedDate.split(',');
        const year = parseInt(splittedDate[1].trimStart());
        const day = parseInt(splittedDate[0].split(' ')[1]);
        const month = Months.indexOf(splittedDate[0].split(' ')[0]);
        const date = {
            currentDate: new Date(year, month, day),
            year: year,
            month: month,
            totalDays: new Date(year, month + 1, 0).getDate(),
            firstDayNumber: new Date(year, month).getDay(),
        };
        return date;
    }
}

export class ShortFormat implements DateParserFormatter {
    formatDate(date: dateSCM): string {
        const day = ('0' + date.currentDate.getDate()).slice(-2);
        const monthName = Months[date.month - 1];
        return `${monthName} ${day}`;
    }

    parseDate(formattedDate: string): dateSCM | null {
        const splittedDate = formattedDate.split(' ');
        const day = parseInt(splittedDate[1]);
        const month = Months.indexOf(splittedDate[0]);
        const year = new Date().getFullYear();
        const date = {
            currentDate: new Date(year, month, day),
            year: year,
            month: month,
            totalDays: new Date(year, month + 1, 0).getDate(),
            firstDayNumber: new Date(year, month).getDay(),
        };
        return date;
    }
}

export class DefaultFormat implements DateParserFormatter {
    formatDate(date: dateSCM): string {
        const day = ('0' + date.currentDate.getDate()).slice(-2);
        const month = ('0' + date.month).slice(-2);
        const year = date.year.toString().substring(2);
        return `${month}/${day}/${year}`;
    }

    parseDate(formattedDate: string): dateSCM | null {
        const splittedDate = formattedDate.split('/');
        const year = parseInt(splittedDate[2]);
        const day = parseInt(splittedDate[1]);
        const month = parseInt(splittedDate[0]);
        const date = {
            currentDate: new Date(year, month - 1, day),
            year: year,
            month: month,
            totalDays: new Date(year, month, 0).getDate(),
            firstDayNumber: new Date(year, month - 1).getDay(),
        };
        return date;
    }
}

type supportedFormats = 'MMMMDDYYYY' | 'MMMMDD' | 'MMDDYY';
export const DateFormat: Record<supportedFormats, DateParserFormatter> = {
    'MMDDYY': new DefaultFormat(),
    'MMMMDD': new ShortFormat(),
    'MMMMDDYYYY': new LongFormat()
};
