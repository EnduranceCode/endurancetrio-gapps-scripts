/*
 * MIT License
 *
 * Copyright(c) 2025 Ricardo do Canto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files(the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function createEventOrganizerTableScript(spreadsheet) {
  const eventOrganizerData = getEventOrganizerDataFromSpreadsheet(spreadsheet);

  let sql = `-- ${SCHEMA}.${TABLE_EVENT_ORGANIZER} table\n`;
  sql += '-- ------------------------------------------------------\n';
  if (eventOrganizerData.length === 0) {
    sql += `-- No data found in the ${TABLE_EVENT_ORGANIZER} table\n\n`;
    return sql;
  }

  const columns = Object.keys(eventOrganizerData[0]);

  eventOrganizerData.forEach((row) => {
    const values = columns.map((column) => {
      const value = row[column];

      if (value === null || value === undefined) {
        return '';
      } else if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
      } else {
        return value;
      }
    });

    sql += `INSERT INTO ${SCHEMA}.${TABLE_EVENT_ORGANIZER} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
  });

  return sql;
}
