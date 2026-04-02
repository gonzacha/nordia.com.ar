/**
 * Utility functions for parsing user input in spa demo
 * Handles dates, times, and service selections with tolerance for variations
 */

/**
 * Parse date input with multiple format support
 * Accepts: "viernes 14", "vie 14", "14/02", "14 de febrero", etc.
 */
export function parseDateInput(input: string, availableDates: string[]): string | null {
    const normalized = input.toLowerCase().trim();

    // Direct ISO match
    if (availableDates.includes(input)) {
        return input;
    }

    // Day name + number patterns
    const dayPatterns = [
        { pattern: /(?:jueves|jue)\s*13/i, date: '2026-02-13' },
        { pattern: /(?:viernes|vie)\s*14/i, date: '2026-02-14' },
        { pattern: /(?:lunes|lun)\s*17/i, date: '2026-02-17' },
        { pattern: /(?:martes|mar)\s*18/i, date: '2026-02-18' }
    ];

    for (const { pattern, date } of dayPatterns) {
        if (pattern.test(normalized) && availableDates.includes(date)) {
            return date;
        }
    }

    // Numeric patterns: "14/02", "14-02", "14 02"
    const numericMatch = normalized.match(/(\d{1,2})\s*[\/\-\s]\s*(\d{1,2})/);
    if (numericMatch) {
        const day = numericMatch[1].padStart(2, '0');
        const month = numericMatch[2].padStart(2, '0');
        const candidate = `2026-${month}-${day}`;

        if (availableDates.includes(candidate)) {
            return candidate;
        }
    }

    return null;
}

/**
 * Parse time input with multiple format support
 * Accepts: "14:00", "14", "2pm", "14hs", "las 14"
 */
export function parseTimeInput(input: string, availableSlots: string[]): string | null {
    const normalized = input.toLowerCase().replace(/\s/g, '');

    // Direct match
    if (availableSlots.includes(input)) {
        return input;
    }

    // Extract hour and minute
    const patterns = [
        /(\d{1,2}):(\d{2})/,           // 14:00
        /(\d{1,2})hs/,                  // 14hs
        /(\d{1,2})h/,                   // 14h
        /(\d{1,2})pm/,                  // 2pm
        /(\d{1,2})am/,                  // 10am
        /^(\d{1,2})$/                   // 14
    ];

    for (const pattern of patterns) {
        const match = normalized.match(pattern);
        if (match) {
            let hour = parseInt(match[1]);
            const minute = match[2] || '00';

            // Handle PM notation
            if (normalized.includes('pm') && hour < 12) {
                hour += 12;
            }

            const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;

            if (availableSlots.includes(timeString)) {
                return timeString;
            }
        }
    }

    return null;
}

/**
 * Parse service selection
 * Accepts: "1", "uno", "limpieza", etc.
 */
export function parseServiceInput(input: string, servicesCount: number): number | null {
    const normalized = input.toLowerCase().trim();

    // Numeric input
    const num = parseInt(normalized);
    if (!isNaN(num) && num >= 1 && num <= servicesCount) {
        return num;
    }

    // Word numbers
    const wordNumbers: Record<string, number> = {
        'uno': 1, 'una': 1,
        'dos': 2,
        'tres': 3,
        'cuatro': 4
    };

    if (wordNumbers[normalized] && wordNumbers[normalized] <= servicesCount) {
        return wordNumbers[normalized];
    }

    return null;
}

/**
 * Calculate typing delay based on message length
 * Simulates realistic typing speed (40 words per minute)
 */
export function calculateTypingDelay(text: string): number {
    const wordsPerMinute = 40;
    const words = text.split(/\s+/).length;
    const seconds = (words / wordsPerMinute) * 60;

    // Clamp between 1s and 3s
    return Math.max(1000, Math.min(seconds * 1000, 3000));
}

/**
 * Format date for display
 * "2026-02-14" -> "Viernes 14/02"
 */
export function formatDateDisplay(isoDate: string): string {
    const date = new Date(isoDate);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${dayName} ${day}/${month}`;
}

/**
 * Format time for display
 * "14:00" -> "14:00hs"
 */
export function formatTimeDisplay(time: string): string {
    return `${time}hs`;
}

/**
 * Random delay between min and max (for visual variety only, not business logic)
 */
export function randomDelay(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
