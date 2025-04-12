/**
 * Format a version tag by replacing underscores with spaces
 * @param {string} name - The version name to format
 * @returns {string} The formatted version name
 */
export const parseTag = (name) => {
  return name.replace(/_/g, ' ');
};
