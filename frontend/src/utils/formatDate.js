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

  export function formatDateforupdate(dateString) {
    /**
     * Format a date string from ISO 8601 to MM/DD/YYYY
     */
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for month
    const year = date.getFullYear();

    // Format the date as MM/DD/YYYY
    return `${year}-${month}-${day}`;
}
