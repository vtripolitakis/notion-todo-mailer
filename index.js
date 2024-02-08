// Import the function to fetch data from the database
import fetchDatabasePages from "./fetchData.js";
// Import the functions to create mail data and send email
import { createMailData, sendEmail } from "./utils.js";

// Fetch data from the Notion database
const { error, response } = await fetchDatabasePages();

// Handle the error if there is one, otherwise create mail data and send email
if (error) {
  console.error("Error fetching data from Notion database");
  process.exit(); // Exit the process in case of an error
} else {
  const mailData = createMailData(response);
  // Call the function to send the email
  await sendEmail(mailData);
}