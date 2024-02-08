import Axios from "axios";

/**
 * Fetches pages from the Notion database using the Notion API
 */
async function fetchDatabasePages() {
    // Construct the URL for querying the Notion database
    const url = `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`;
    // Set the required headers for the API request
    const headers = {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": `${process.env.NOTION_API_VERSION}`,
    };
    // Make a POST request to the Notion API
    try {
        const response = await Axios.post(url, {}, { headers });
        return { error: false, response};
    } catch (error) {
        // Handle any errors that occur during the API request
        return { error : true}
    }
}

export default fetchDatabasePages