export function addDeficientDigit(number: number): string {
    return number.toString().padStart(2, '0');
}