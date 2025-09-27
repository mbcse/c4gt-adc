const axios = require('axios');
const fs =require('fs');
const path = require('path');

// --- Configuration ---
const API_BASE_URL = 'http://localhost:5000/api/admin/metadata';
const AUTH_TOKEN = admin_token_here; // Replace with actual admin token
const HEADERS = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};
// ---------------------

const metadataFilePath = path.join(__dirname, 'metadata.json');

// Function to post data to an endpoint
async function seedData(endpoint, data, nameKey) {
  console.log(`\n--- Seeding ${endpoint.substring(1)} ---`);
  for (const item of data) {
    try {
      await axios.post(`${API_BASE_URL}${endpoint}`, item, { headers: HEADERS });
      console.log(`✅ Successfully added ${item[nameKey]}`);
    } catch (error) {
      if (error.response && error.response.status === 409) { 
        console.warn(`⚠️  Skipping '${item[nameKey]}', as it probably already exists.`);
      } else {
        const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error(`❌ Failed to add '${item[nameKey]}'. Error: ${errorMessage}`);
      }
    }
  }
}

async function runSeeding() {
  try {
    const metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf-8'));

    if (metadata.categories) await seedData('/categories', metadata.categories, 'name');
    if (metadata.tags) await seedData('/tags', metadata.tags, 'name');
    if (metadata.skillLevels) await seedData('/skill-levels', metadata.skillLevels, 'level');
    if (metadata.grades) await seedData('/grades', metadata.grades, 'value');
    if (metadata.languages) await seedData('/languages', metadata.languages, 'name');

    console.log("\n--- Seeding complete! ---");
    console.log("You can now get the IDs from your database or admin panel to prepare your 'courses.json' file.");

  } catch (error) {
    console.error('Error reading or parsing metadata.json:', error);
  }
}

runSeeding();
