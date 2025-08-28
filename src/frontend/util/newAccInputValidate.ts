import { DateType } from "../types/post";

export function ValidateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function ValidateUsername(username: string): boolean {
    // Length check
    if (username.length < 5 || username.length > 25) {
        return false;
    }

    // Must start with a letter
    if (!/^[a-zA-Z]/.test(username)) {
        return false;
    }

    // Allowed characters: letters, numbers, underscore, period
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        return false;
    }

    // Cannot end with period or underscore
    if (/[._]$/.test(username)) {
        return false;
    }

    // No consecutive periods or underscores
    if (/(\.\.|__)/.test(username)) {
        return false;
    }

    return true;
}

export function ValidatePassword(password: string): boolean {
    // Length check
    if (password.length < 6 || password.length > 32) {
        return false;
    }

    // At least one lowercase, one uppercase, one digit, one special char
    const lowercase = /[a-z]/;
    const digit = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/';]/;

    if (!lowercase.test(password)) return false;
    // if (!digit.test(password)) return false;
    // if (!specialChar.test(password)) return false;

    // Optional: disallow whitespace
    if (/\s/.test(password)) return false;

    return true;
}

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