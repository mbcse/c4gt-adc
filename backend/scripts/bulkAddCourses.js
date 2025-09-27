const axios = require('axios');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const API_BASE_URL = 'http://localhost:5000/api/admin/courses'; 
const AUTH_TOKEN = admin_token_here; // Replace with actual admin token
const HEADERS = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};
// ---------------------

const coursesFilePath = path.join(__dirname, 'courses.json');

// --- VALIDATION FUNCTION ---
function validateCourseData(courseData, index) {
  const requiredIds = ['categoryId', 'skillLevelId', 'gradeId', 'languageId'];
  for (const key of requiredIds) {
    if (typeof courseData[key] !== 'number') {
      console.error(`❌ Validation failed for course #${index + 1}: '${key}' is missing or not a number. Skipping.`);
      return false;
    }
  }
  if (!Array.isArray(courseData.tagIds) || courseData.tagIds.some(id => typeof id !== 'number')) {
    console.error(`❌ Validation failed for course #${index + 1}: 'tagIds' must be an array of numbers. Skipping.`);
    return false;
  }
  if (!courseData.playlistUrl || courseData.playlistUrl.trim() === '') {
    console.error(`❌ Validation failed for course #${index + 1}: 'playlistUrl' is empty. Skipping.`);
    return false;
  }
  return true;
}
// -----------------------------

async function bulkAddCourses() {
  try {
    const coursesToCreate = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));
    console.log(`Found ${coursesToCreate.length} courses to add.`);

    for (const [index, courseData] of coursesToCreate.entries()) {
      
      if (!validateCourseData(courseData, index)) {
        continue; 
      }

      try {
        console.log(`\nProcessing Course #${index + 1}: ${courseData.playlistUrl}`);

        const response = await axios.post(`${API_BASE_URL}/process-playlist`, {
          playlistUrl: courseData.playlistUrl,
          maxResults: 200 
        }, { headers: HEADERS });

        const { playlistTitle, playlistDescription, videos } = response.data;
        
        console.log(`-> Fetched Title: ${playlistTitle}`);
        console.log(`-> Found ${videos.length} videos.`);

        const createCoursePayload = {
          title: playlistTitle,
          description: playlistDescription,
          categoryId: courseData.categoryId,
          skillLevelId: courseData.skillLevelId,
          gradeId: courseData.gradeId,
          languageId: courseData.languageId,
          tagIds: courseData.tagIds,
          courseVideos: videos 
        };

        await axios.post(API_BASE_URL, createCoursePayload, { headers: HEADERS });
        console.log(`✅ Successfully added course: ${playlistTitle}`);

      } catch (error) {
        console.error(`❌ Failed to add course from playlist: ${courseData.playlistUrl}`);
        const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error(`   Error: ${errorMessage}`);
      }
    }
  } catch (error) {
    console.error('Error reading or parsing courses.json:', error);
  }
}

bulkAddCourses();