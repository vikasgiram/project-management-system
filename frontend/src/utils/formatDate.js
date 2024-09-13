// utils.js
export function formatDate(dateString) {
    /**
     * Format a date string from ISO 8601 to DD MMMM YYYY
     */
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }