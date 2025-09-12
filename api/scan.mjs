import { createReadStream, readFileSync } from "node:fs";
import FormData from "form-data";

// Define the file path and API details
const filePath = process.argv[2];

const url = "http://localhost:8000/api/v1/upload";

const authorizationToken = readFileSync("./token").toString();

async function uploadFile() {
  try {
    // Create a new FormData instance
    const form = new FormData();

    form.append("file", createReadStream(filePath));

    // Make the fetch request
    const response = await fetch(url, {
      method: "POST",
      body: form,
      headers: {
        "Authorization": authorizationToken,
        "Content-Type": "multipart/form-data",
      },
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
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
