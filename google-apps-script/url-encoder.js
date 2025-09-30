/**
 * URL Encoder Utility for Google Apps Script Integration
 * This tool helps encode your Google Apps Script URL for secure integration
 */

console.log('🔒 Google Apps Script URL Encoder');
console.log('='.repeat(50));

function encodeURLForIntegration(webAppUrl) {
  // Extract the script ID from the URL
  // Format: https://script.google.com/macros/s/SCRIPT_ID/exec
  const urlMatch = webAppUrl.match(/\/macros\/s\/([^\/]+)\/exec/);

  if (!urlMatch) {
    console.error('❌ Invalid Google Apps Script URL format');
    console.log('Expected format: https://script.google.com/macros/s/SCRIPT_ID/exec');
    return;
  }

  const scriptId = urlMatch[1];
  console.log('✅ Script ID extracted:', scriptId);

  // Split the script ID into two parts for obfuscation
  const midpoint = Math.ceil(scriptId.length / 2);
  const part1 = scriptId.substring(0, midpoint);
  const part2 = scriptId.substring(midpoint);

  console.log('📝 Script ID parts:');
  console.log('   Part 1:', part1);
  console.log('   Part 2:', part2);

  // Encode each part to character codes + 48
  function encodeString(str) {
    return str.split('').map(char => char.charCodeAt(0) + 48);
  }

  const encodedPart1 = encodeString(part1);
  const encodedPart2 = encodeString(part2);

  console.log('\n🔢 Encoded arrays:');
  console.log('   Part 1:', JSON.stringify(encodedPart1));
  console.log('   Part 2:', JSON.stringify(encodedPart2));

  console.log('\n📋 Code to update in progressStorage.js:');
  console.log('Replace lines 28-31 with:');
  console.log('```javascript');
  console.log('    const keyParts = [');
  console.log(`      this.decodePart(${JSON.stringify(encodedPart1)}),`);
  console.log(`      this.decodePart(${JSON.stringify(encodedPart2)})`);
  console.log('    ];');
  console.log('```');

  console.log('\n✅ Integration complete! Your URL is now securely obfuscated.');
}

// Test with example URL (replace with your actual URL)
const exampleUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';

console.log('\n🚀 Usage:');
console.log('1. Deploy your Google Apps Script as a web app');
console.log('2. Copy the web app URL');
console.log('3. Replace YOUR_SCRIPT_ID_HERE below with your actual script ID');
console.log('4. Run this script to get the encoded arrays');
console.log('5. Update progressStorage.js with the generated code');

console.log('\n📝 Example:');
encodeURLForIntegration(exampleUrl);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { encodeURLForIntegration };
}