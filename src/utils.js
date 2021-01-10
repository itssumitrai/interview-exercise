export function getFormattedDate(dateString, lang, options = {}) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(lang, options).format(date);
}
