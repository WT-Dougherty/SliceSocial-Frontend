export function GenerateID(): string {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 8);
}
