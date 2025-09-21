const axios = require('axios');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const API_URL = 'http://localhost:5000/api/admin/users/organization-units';
const AUTH_TOKEN = admin_token_here; // Replace with actual admin token
// ---------------------

const HEADERS = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

// Pass the file name as a command-line argument
const jsonFileName = process.argv[2];
if (!jsonFileName) {
  console.error('❌ Please provide the JSON file name to seed. Example: node scripts/seedOrgUnits.js 1-state.json');
  process.exit(1);
}
const orgUnitsFilePath = path.join(__dirname, jsonFileName);

async function seedOrgUnits() {
  try {
    const unitsToCreate = JSON.parse(fs.readFileSync(orgUnitsFilePath, 'utf-8'));
    console.log(`Found ${unitsToCreate.length} organizational units to add.`);

    for (const unit of unitsToCreate) {
      try {
        const response = await axios.post(API_URL, unit, { headers: HEADERS });
        // Log the newly created unit with its ID for easy reference
        console.log(`✅ Successfully added ${unit.type}: ${unit.name} (ID: ${response.data.id})`);
      } catch (error) {
        console.error(`❌ Failed to add unit: ${unit.name}`);
        const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error(`   Error: ${errorMessage}`);
      }
    }
    console.log("\n--- Seeding complete! ---");
    console.log("Remember to update your 'org-units.json' for the next level in the hierarchy.");

  } catch (error) {
    console.error('Error reading or parsing org-units.json:', error);
  }
}

seedOrgUnits();