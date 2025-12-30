import { z } from "zod";

export type FieldErrors = Partial<Record<string, string>>;
export function zodIssuesToFieldErrors(issues: z.ZodIssue[]): FieldErrors {
    const out: FieldErrors = {};

    for (const issue of issues) {
        const key = issue.path.join(".");
        if (!out[key]) out[key] = issue.message;
    }

    return out;
}
