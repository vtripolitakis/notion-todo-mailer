import nodemailer from "nodemailer";

/**
 * Converts the input date string to a custom date format including day, month, year, hours, and minutes.
 *
 * @param {string} dateString - the input date string to be converted
 * @return {string} the custom date format including day, month, year, hours, and minutes, or an error message if the input is invalid
 */
function convertDateFormat(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date)) {
      throw new Error("Invalid date");
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch (error) {
    return error.message;
  }
}

/**
 * Create mail data from response object
 * We assume that it has a ToDo result structure of Notion
 * @param {object} response - The response object containing data
 * @returns {array} - Array of mail data objects
 */
function createMailData(response) {
  // Extract results from the response data
  const data = response.data.results;
  let mailData = data.map((element) => {
    return {
      title: element?.properties?.Name?.title[0]?.plain_text || "N/A",
      date: element?.properties["Date Created"]?.created_time || "N/A",
    };
  });

  return mailData;
}

/**
 * Creates a mail body by formatting the data and intro text
 * @param {Array} data - The data to be formatted
 * @param {string} intro - The introduction text
 * @returns {string} - The formatted mail body
 */
function createMailBody(data, intro) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error("Invalid data input");
  }
  if (typeof intro !== "string") {
    throw new Error("Intro must be a string");
  }

  // Format the data by converting date and combining with title
  const formattedData = data.map((item) => {
    if (!item || typeof item !== "object" || !item.date || !item.title) {
      throw new Error("Invalid item in data array");
    }
    const { date, title } = item;
    if (typeof date !== "string" || typeof title !== "string") {
      throw new Error("Date and title must be strings");
    }
    const formattedDate = convertDateFormat(date); // Convert date format
    return `${formattedDate}\t${title}`;
  });
  // Combine intro text with formatted data
  return `${intro}\n\n${formattedData.join("\n\n")}`;
}

/**
 * Sends an email using the configured SMTP settings
 * @param {object} mailData - The data for the email
 */
async function sendEmail(mailData) {
  try {
    // Create a transporter object with SMTP configuration
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Define the email options
    let mailOptions = {
      from: `${process.env.MAIL_FROM_HUMAN_READABLE_NAME} <${process.env.FROM_EMAIL_ADDRESS}>`,
      to: process.env.TO_EMAIL_ADDRESS,
      subject: "Hello from your Notion ToDo list",
      text: createMailBody(mailData, "Daily ToDo list"),
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export { convertDateFormat, createMailData, createMailBody, sendEmail };
