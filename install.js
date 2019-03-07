
const { execSync } = require('child_process');

console.log(`Installing dependencies in backend`);
execSync(`cd stock-master-backend && npm install`);
console.log('Successfully installed dependencies');

console.log(`Installing dependencies in frontend`);
execSync(`cd stock-master-front && npm install`);
console.log('Successfully installed dependencies');