import { DateParserFormatter } from "../date-service-formatter.interface";
import { DefaultFormat } from "./default-format";
import { LongFormat } from "./long-format";
import { ShortFormat } from "./short-format";

export type supportedFormats = 'MMMMDDYYYY' | 'MMMMDD' | 'MMDDYY';
export const DateFormat: Record<supportedFormats, DateParserFormatter> = {
    'MMDDYY': new DefaultFormat(),
    'MMMMDD': new ShortFormat(),
    'MMMMDDYYYY': new LongFormat()
};