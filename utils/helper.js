import fs from 'fs';
import path from 'path';
/**
 * Generates a random email.
 * @returns {string} A randomly generated email.
 */
export function createEmail() {
  return `secretmissionautomation+${Math.floor(Math.random() * 10000)}@hotmail.com`;
}
/**
 * Generates a secure password with at least one special character.
 * @returns {string} A randomly generated password.
 */
/**
 * Updates a JSON file with the specified key and value for a given object.
 * @param {string} filePath - Path to the JSON file.
 * @param {string} objectKey - Key of the object to update.
 * @param {string} variableKey - Key of the variable to update within the object.
 * @param {string | object} value - New value to set.
 */
export function updateJsonFile(filePath, objectKey, variableKey, value) {
  try {
    // Resolve the file path to ensure correctness
    const absolutePath = path.resolve(filePath);
    // console.log(`Resolved path: ${absolutePath}`);

    // Read the JSON file
    const fileData = fs.readFileSync(absolutePath, 'utf-8');
    const data = JSON.parse(fileData);

    // Check if the object key exists
    if (!data[objectKey]) {
      throw new Error(`Object "${objectKey}" does not exist in the file.`);
    }

    // Update the specified variable
    data[objectKey][variableKey] = value;

    // Write the updated JSON back to the file
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
    // console.log(`Successfully updated ${variableKey} in ${objectKey}.`);
  } catch (error) {
    console.error(`Failed to update JSON file: ${error.message}`);
  }
}