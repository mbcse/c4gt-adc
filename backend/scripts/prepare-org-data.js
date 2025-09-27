const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const dataDir = path.join(__dirname, 'data');
const outputDir = __dirname;

// --- Configuration ---
const STATE_NAME = "Haryana"; 
const DISTRICT_NAME = "Rohtak"; 
const FILE_NAMES = [
  'distt rohtal all school.xlsx - Private and Govt. School.csv',
  'distt rohtal all school.xlsx - Govt School.csv'
];
// ---------------------

async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({
          mapHeaders: ({ header }) => header.trim(),
          mapValues: ({ value }) => value.trim()
      }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

function normalizeBlockName(name) {
    if (!name) return null;
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes('l.m') || lowerCaseName.includes('l.majra')) {
        return 'Lakhan Majra';
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}

async function prepareOrgData() {
  console.log('Starting data preparation...');

  // 1. Create State File
  const stateData = [{ name: STATE_NAME, type: 'STATE' }];
  fs.writeFileSync(path.join(outputDir, '1-state.json'), JSON.stringify(stateData, null, 2));
  console.log('✅ Created 1-state.json');

  // 2. Create District File
  // Note: Manually add "parentId" after running the state script. For now, it's a placeholder.
  const districtData = [{ name: DISTRICT_NAME, type: 'DISTRICT', parentId: 'REPLACE_WITH_STATE_ID' }];
  fs.writeFileSync(path.join(outputDir, '2-district.json'), JSON.stringify(districtData, null, 2));
  console.log('✅ Created 2-district.json');


  let allSchools = [];
  for (const fileName of FILE_NAMES) {
    const filePath = path.join(dataDir, fileName);
    console.log(`\nAttempting to read file at this absolute path: ${filePath}`);
    if (fs.existsSync(filePath)) {
        const schools = await parseCSV(filePath);
        allSchools = allSchools.concat(schools);
    } else {
        console.warn(`⚠️  Warning: File not found - ${fileName}`);
    }
  }

  // 3. Create Blocks File
  const blockNames = new Set();
  allSchools.forEach(school => {
    const blockName = normalizeBlockName(school['Block Name']);
    if (blockName) {
      blockNames.add(blockName);
    }
  });

  // Note: Manually add "parentId" after running the district script.
  const blocksData = Array.from(blockNames).map(name => ({
    name: name,
    type: 'BLOCK',
    parentId: 'REPLACE_WITH_DISTRICT_ID'
  }));
  fs.writeFileSync(path.join(outputDir, '3-blocks.json'), JSON.stringify(blocksData, null, 2));
  console.log('✅ Created 3-blocks.json');
  console.log('-> Found blocks:', Array.from(blockNames).join(', '));


  // 4. Create Schools File
  // Note: Manually replace block names with their new IDs after running the block script.
  const schoolsData = allSchools.map(school => {
    const schoolName = school['SCHOOL NAME'];
    const blockName = normalizeBlockName(school['Block Name']);
    if (!schoolName || !blockName) return null;

    return {
      name: schoolName,
      type: 'SCHOOL',
      parentId: `REPLACE_WITH_ID_OF_${blockName.replace(/ /g, '_')}` // Placeholder for parent ID
    };
  }).filter(Boolean); // Remove null entries

  fs.writeFileSync(path.join(outputDir, '4-schools.json'), JSON.stringify(schoolsData, null, 2));
  console.log('✅ Created 4-schools.json');
  console.log(`\n🎉 Data preparation complete! Next, run the seeding script in stages.`);
}

prepareOrgData();