// Add this function to your Google Apps Script to test volunteer signup

function testVolunteerSetup() {
  Logger.log('Testing Volunteer signup...');

  // Test volunteer form submission with mock data
  const testEvent = {
    parameter: {
      name: 'Test Volunteer',
      city: 'Denver',
      zipCode: '80202',
      phone: '555-987-6543',
      email: 'volunteer@example.com',
      type: 'join_us',  // This is the key difference
      source: 'test',
      timestamp: new Date().toISOString()
    }
  };

  try {
    const result = doPost(testEvent);
    Logger.log('✅ Volunteer test submission completed successfully');
    return true;
  } catch (error) {
    Logger.log('❌ Volunteer test submission failed: ' + error.toString());
    return false;
  }
}