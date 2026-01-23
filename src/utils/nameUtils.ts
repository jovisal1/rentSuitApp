export const getInitials = (value: string, maxParts = 2): string =>
    value
        .split(" ")
        .filter(Boolean)
        .slice(0, maxParts)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
