import { readFileSync } from "node:fs";

// Define the file path and API details
const fileHash = readFileSync("./hash").toString().trim();
const url = "http://localhost:8000/api/v1/scan";

const authorizationToken = readFileSync("./token").toString().trim();

console.log(`Using token: \`${authorizationToken}\``);

async function scanFile() {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: `hash=${fileHash}`,
      headers: {
        "Authorization": authorizationToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      console.log("Scan request successful! 🎉");
      console.log(data);
    } else {
      console.error(`Scan failed with status: ${response.status}`);
      const errorText = await response.text();
      console.error("Error:", errorText);
      process.exit(1);
    }
  } catch (error) {
    console.error("An error occurred during the file upload:", error);
  }
}

// Run the function
scanFile();
