import { DateType } from "../types/post";

export function ValidateDate(date : DateType): boolean {
    const lengths : Record<string, number> = {
        'January': 31,
        'February': 29,
        'March': 31,
        'April': 30,
        'May': 31,
        'June': 30,
        'July': 31,
        'August': 31,
        'September': 30,
        'October': 31,
        'November': 30,
        'December': 31,
    };
    if ( lengths[date.month] < Number(date.day) || Number(date.day) < 1) { return false; }
    return true;
}