import { readFileSync, existsSync } from "node:fs";
import FormData from "form-data";
import axios from "axios";

// Define the file path and API details
const filePath = "./samples/diva-beta.apk";
const url = "http://localhost:8000/api/v1/upload";

const authorizationToken = readFileSync("./token").toString().trim();

console.log(`Using token: \`${authorizationToken}\``);

async function uploadFile() {
  try {
    // Check if the file exists before trying to create a read stream
    if (!existsSync(filePath)) {
      console.error(`Error: File not found at path: ${filePath}`);
      return;
    }

    // Create a new FormData instance
    const form = new FormData();

    // Append the file stream to the form data.
    // The key 'file' must match the API's expected field name exactly.
    form.append("file", readFileSync(filePath), {
      filename: "sample.apk",
    });

    // Get the headers from the form-data object, which includes the Content-Type
    const formHeaders = form.getHeaders();

    console.log(formHeaders);

    // Make the fetch request
    const response = await axios.post(url, form.getBuffer(), {
      ...formHeaders,
      "Authorization": authorizationToken,
    });

    // Handle the response
    if (response.status == 200) {
      const data = response.data;
      console.log("Upload successful! 🎉");
      console.log(data);
    } else {
      console.error(`Upload failed with status: ${response.status}`);
      const errorText = await response.text();
      console.error("Error:", errorText);
    }
  } catch (error) {
    console.error("An error occurred during the file upload:", error);
  }
}

// Run the function
uploadFile();
