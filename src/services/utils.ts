/**
 * Convierte una fecha (string ISO o Date) a Date válida.
 * Devuelve null si la fecha no es válida.
 */
export const toDate = (value: string | Date | null): Date | null => {
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);
    return isNaN(date.getTime()) ? null : date;
};


/**
* Formatea una fecha para mostrar en UI (DD/MM/YYYY).
* Uso: listas, filas, detalles.
*/
export const formatDateForDisplay = (value: string | Date | null): string => {
    const date = toDate(value);
    if (!date) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};


/**
 * Convierte un string de fecha (ISO o compatible con Date.parse) a Date.
 * Devuelve null si la fecha no es válida.
 */
export function parseOrderDate(value: string | undefined): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return Number.isFinite(d.getTime()) ? d : null;
}