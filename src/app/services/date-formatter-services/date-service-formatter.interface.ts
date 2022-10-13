export interface DateParserFormatter {
  formatDate(date: Date): string;
  parseDate(formattedDate: string): Date | null;
}
