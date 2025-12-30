import { z } from "zod";

const taxIdRegex = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]{3}[)])?([-]?[\s]?[0-9])+$/
);

export const customerSchema = z.object({
    id: z.number(),
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),

    taxId: z.string()
        .min(9, "El NIF/CIF debe tener 9 caracteres")
        .max(9, "El NIF/CIF debe tener 9 caracteres")
        .regex(taxIdRegex, "El formato del NIF/CIF no es válido")
        .or(z.string().length(0)),

    phone: z
        .string()
        .min(1, { message: "El teléfono es obligatorio" })
        .min(7, { message: "El número es demasiado corto" })
        .max(15, { message: "El número es demasiado largo" })
        .refine((value) => phoneRegex.test(value), {
            message: "Número de teléfono no válido",
        }),

    email: z.string()
        .email("Introduce un correo electrónico válido")
        .or(z.string().length(0)),

    notes: z.string().max(500, "Las notas no pueden superar los 500 caracteres").optional(),

    active: z.boolean(),

    address: z.object({
        id: z.number(),
        line1: z.string().min(5, "La dirección es demasiado corta"),
        city: z.string().min(1, "La ciudad es obligatoria"),
        postalCode: z.string()
            .min(5, "El CP debe tener 5 dígitos")
            .max(5, "El CP debe tener 5 dígitos"),
        isPrimary: z.boolean()
    })
});

export type CustomerSchema = z.infer<typeof customerSchema>;