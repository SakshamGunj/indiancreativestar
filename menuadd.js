import admin from 'firebase-admin';

// Initialize Firebase Admin SDK with your service account
const serviceAccount = {
  "type": "service_account",
  "project_id": "testapployalty",
  "private_key_id": "3d53618fb3381fe4e02b9ee9b3428612bedbe864",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdVXbpW5qWfXWF\nDxMnCynzhi3qtTG+Jld7cEOMSuxmu2DdVdNUW5uMyHI93taTAZx1C4gTRODVWiGj\ne1LYHZKgFTkvaCAVeGYx7GD11JmfnoZexRsOgTRkTyKyOHHO1YFvrTzjkxsjTxDo\nqfBLFbiKL78fJRYUoQHA6HPF3qdzc/o4/DI4c8jOSiNecwMbFDUp0L5IaI3ukRfb\narHx+QQYb5k8Jm/V3Smb+NQQeo9wLJw4Fi1M/+RNiWwO9vjJkZkrWPQA7UgW+wQM\nGBS8iJR7ACDevZLQT1OJBV8vtXC48TDQgjdodikTV66IRRyOSytX7rkJOM743u0m\n1WprO/tnAgMBAAECggEABLVnJ0lxnLmEoRRzfO4A9cPiVA2KUcfhQxVlrLJmMKic\nPHOJCKXrx55WHFxXbOpxNsM/Osz4/CvoltC4ZFoaOKHVZoIF5YDilYQMlWNuPmvC\nMnCaH8Pu22XzwoRmXUKE8/Lg0mlTAYXfLJrR9deXgHvK5pE3pHRDrfTLj1kSdNyw\nVSXHCysML6sHCovTsGixQmOWx0Nn7gMrsUIS4C0J1BubUncVJN5VigoqHeHVTHEx\n0NEYZDCMjxI0zeJyIQM7AjMw+hbvZlv+OMwLHWOYPzQ89GLRYn1WkoZ/v31H8ihm\nqtfHQbqaYjPFdjjbzIGTUulqaudAG1Ab0jcOCx5jLQKBgQDM69DCjmE1FYB5uyPL\nudcLVzUjkJZV+qXKzo0FzwXKdEG6KO/l4MH5NKAFcL0KaR26AZz0cehZdazKtsx8\ngLEo2DbFc9RVIsdJkwa4m1TVjsLCYy9I+IRJlHz5eP2NVGvW6hD+pHe0vm3AZlrA\nudz+mTD/3p2beecigPTeplmlEwKBgQDEjRB8hyCeKdQ+sZAXn3d5sQJI2n9Nex4M\nGNIOoRnzyKGWkfGNm+9FbMPS7zdNCPhhrz7vgK0Rv/XbG2wInqhBctCesFADEnzg\nFM+gKxqQt2O/8DTwWUUKcG0QXP/Xm2gb74oN9BdGs9H8aol7FFi3gDVg0ULArNF5\nqdsHwsbe3QKBgFLaneOsMb2G3hVaBxUeJMafEgs5MK++0j332akZlVvQOasNVkH5\n6DPchT7t4GFPMwe8Ezv6ullBbQXhdzh3yCmdkjevp5BsqWskGTmXBGv8dt6lv76f\nTM17TjSIKOx1z8xrg0eSNBxOSo3aVKNMAwCl69vopIzycvPOdDN5yxElAoGAImS8\n2c2be5G+Pio8GKYi9fxvdegmFpzQqTU+rKisLeiRvhNTvX/n4rIhoiuR9bz4Gb/c\nt3RA1LZOg0TNJsT8lFdPAjXAComVqHB71H82atRsdA3IdbZpSmZZ718WtdfP4/OK\nqN5ppEmbGRxbalopHBMnRAXaNHUJQsziMv12Z1ECgYBu5MSg7p4IVYAQ49DytMpO\nYDek17Y4OCN00iR9zfvmkSQ5TJRVm1b5UDPn2583+KOja+VRahe+G8t6rs/3SElE\n2r3RjVjTOoTNZh9xvoqQV1Qy7Y5tB0RHHvdcy7lrQyYot5xAdPJDKIpZh0SDJwbT\nDypwQy6XfMYoGPlQ3a+V8Q==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@testapployalty.iam.gserviceaccount.com",
  "client_id": "107103740077956878014",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40testapployalty.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Menu items data
const menuItems = [
  { name: "Veg. Hot & Sour Soup", category: "Appetizers", price: 60, description: "", isAvailable: true },
  { name: "Non. Hot & Sour Soup", category: "Appetizers", price: 80, description: "", isAvailable: true },
  { name: "Veg. Chowmin", category: "Appetizers", price: 80, description: "", isAvailable: true },
  { name: "Veg. Thupa", category: "Appetizers", price: 70, description: "", isAvailable: true },
  { name: "Chicken Chowmin", category: "Appetizers", price: 100, description: "", isAvailable: true },
  { name: "Chicken Thupa", category: "Appetizers", price: 120, description: "", isAvailable: true },
  { name: "Pork Chowmin", category: "Appetizers", price: 140, description: "", isAvailable: true },
  { name: "Buff Thupa", category: "Appetizers", price: 160, description: "", isAvailable: true },
  { name: "Chi. Sehezwan Chowmin", category: "Appetizers", price: 170, description: "", isAvailable: true },
  { name: "Veg. Sehezwan Chowmin", category: "Appetizers", price: 160, description: "", isAvailable: true },
  { name: "Tea", category: "Appetizers", price: 20, description: "", isAvailable: true },
  { name: "Coffee", category: "Appetizers", price: 30, description: "", isAvailable: true },
  { name: "Black Coffee", category: "Appetizers", price: 20, description: "", isAvailable: true },
  { name: "Lemon Tea", category: "Appetizers", price: 20, description: "", isAvailable: true },
  { name: "Black Tea", category: "Appetizers", price: 10, description: "", isAvailable: true },
  { name: "Chicken Momo", category: "Appetizers", price: 90, description: "", isAvailable: true },
  { name: "Veg. Momo", category: "Appetizers", price: 50, description: "", isAvailable: true },
  { name: "Pork Momo", category: "Appetizers", price: 100, description: "", isAvailable: true },
  { name: "Chicken Fried Momo", category: "Appetizers", price: 110, description: "", isAvailable: true },
  { name: "Veg. Fried Momo", category: "Appetizers", price: 70, description: "", isAvailable: true },
  { name: "Chicken Thaipo", category: "Appetizers", price: 50, description: "", isAvailable: true },
  { name: "Peri Peri French Fry", category: "Appetizers", price: 140, description: "", isAvailable: true },
  { name: "French Fry", category: "Appetizers", price: 110, description: "", isAvailable: true },
  { name: "Chicken Curry", category: "Appetizers", price: 150, description: "", isAvailable: true },
  { name: "Egg Curry", category: "Appetizers", price: 100, description: "", isAvailable: true },
  { name: "Fish Curry", category: "Appetizers", price: 130, description: "", isAvailable: true },
  { name: "Pork Curry", category: "Appetizers", price: 180, description: "", isAvailable: true },
  { name: "Buff Curry", category: "Appetizers", price: 180, description: "", isAvailable: true },
  { name: "Butter Paneer Masala", category: "Appetizers", price: 130, description: "", isAvailable: true },
  { name: "Chicken Thali", category: "Appetizers", price: 140, description: "", isAvailable: true },
  { name: "Veg. Thali", category: "Appetizers", price: 90, description: "", isAvailable: true },
  { name: "Pork Thali", category: "Appetizers", price: 170, description: "", isAvailable: true },
  { name: "Buff Thali", category: "Appetizers", price: 170, description: "", isAvailable: true },
  { name: "Egg Thali", category: "Appetizers", price: 110, description: "", isAvailable: true },
  { name: "Fish Thali", category: "Appetizers", price: 170, description: "", isAvailable: true },
  { name: "Roti Sabji", category: "Appetizers", price: 60, description: "", isAvailable: true },
  { name: "Puri Sabji", category: "Appetizers", price: 70, description: "", isAvailable: true },
  { name: "Bread Omlet", category: "Appetizers", price: 70, description: "", isAvailable: true },
  { name: "Paneer Paratha", category: "Appetizers", price: 70, description: "", isAvailable: true },
  { name: "Alu Paratha", category: "Appetizers", price: 60, description: "", isAvailable: true },
  { name: "Chicken Paratha", category: "Appetizers", price: 100, description: "", isAvailable: true },
  { name: "Omlet", category: "Appetizers", price: 20, description: "", isAvailable: true },
  { name: "Boiled Egg", category: "Appetizers", price: 10, description: "", isAvailable: true },
  { name: "Alu Mimi", category: "Appetizers", price: 30, description: "", isAvailable: true },
  { name: "Alu Bhuja", category: "Appetizers", price: 30, description: "", isAvailable: true },
  { name: "Maggi Dry", category: "Appetizers", price: 40, description: "", isAvailable: true },
  { name: "Bread Tost", category: "Appetizers", price: 30, description: "", isAvailable: true },
  { name: "Chicken Falay", category: "Appetizers", price: 80, description: "", isAvailable: true },
  { name: "Egg Roll", category: "Appetizers", price: 90, description: "", isAvailable: true },
  { name: "Veg. Roll", category: "Appetizers", price: 60, description: "", isAvailable: true },
  { name: "Plain Rice", category: "Appetizers", price: 50, description: "", isAvailable: true },
  { name: "Jera Rice", category: "Appetizers", price: 70, description: "", isAvailable: true },
  { name: "Chicken Fried Rice", category: "Appetizers", price: 140, description: "", isAvailable: true },
  { name: "Veg. Fried Rice", category: "Appetizers", price: 90, description: "", isAvailable: true },
  { name: "Pork Fried Rice", category: "Appetizers", price: 160, description: "", isAvailable: true },
  { name: "Buff Fried Rice", category: "Appetizers", price: 170, description: "", isAvailable: true },
  { name: "Egg Fried Rice", category: "Appetizers", price: 110, description: "", isAvailable: true },
  { name: "Mixed Fried Rice", category: "Appetizers", price: 250, description: "", isAvailable: true },
  { name: "Paneer Fried Rice", category: "Appetizers", price: 120, description: "", isAvailable: true },
  { name: "Chic. Sehezwan Fry Rice", category: "Appetizers", price: 160, description: "", isAvailable: true },
  { name: "Veg. Sehezwan Fry Rice", category: "Appetizers", price: 150, description: "", isAvailable: true },
  { name: "Chicken Chilly", category: "Appetizers", price: 150, description: "", isAvailable: true },
  { name: "Paneer Chilly", category: "Appetizers", price: 120, description: "", isAvailable: true },
  { name: "Paneer Bhurji", category: "Appetizers", price: 90, description: "", isAvailable: true },
  { name: "Pork Chilly", category: "Appetizers", price: 200, description: "", isAvailable: true },
  { name: "Buff Chilly", category: "Appetizers", price: 180, description: "", isAvailable: true },
  { name: "Mountain Chilly", category: "Appetizers", price: 170, description: "", isAvailable: true },
  { name: "Drums Of Haven", category: "Appetizers", price: 190, description: "", isAvailable: true },
  { name: "Dragon Chicken", category: "Appetizers", price: 190, description: "", isAvailable: true },
  { name: "Veg. Lemon Corriender", category: "Appetizers", price: 60, description: "", isAvailable: true },
  { name: "Non. Lemon Corriender", category: "Appetizers", price: 80, description: "", isAvailable: true }
];

// Function to determine if item is vegetarian based on name
function isVegetarian(name) {
  const vegKeywords = ['veg', 'paneer', 'alu', 'bread', 'omlet', 'boiled egg', 'maggi', 'rice', 'lemon'];
  const nonVegKeywords = ['chicken', 'pork', 'buff', 'fish', 'egg', 'non'];
  
  const lowerName = name.toLowerCase();
  
  // Check for non-veg keywords first
  for (const keyword of nonVegKeywords) {
    if (lowerName.includes(keyword)) {
      return false;
    }
  }
  
  // Check for veg keywords
  for (const keyword of vegKeywords) {
    if (lowerName.includes(keyword)) {
      return true;
    }
  }
  
  return false; // Default to non-veg if unclear
}

// Function to determine if item is vegan based on name
function isVegan(name) {
  const veganKeywords = ['veg', 'alu', 'bread', 'maggi', 'rice', 'lemon'];
  const nonVeganKeywords = ['chicken', 'pork', 'buff', 'fish', 'egg', 'paneer', 'omlet', 'boiled egg', 'butter', 'non'];
  
  const lowerName = name.toLowerCase();
  
  // Check for non-vegan keywords first
  for (const keyword of nonVeganKeywords) {
    if (lowerName.includes(keyword)) {
      return false;
    }
  }
  
  // Check for vegan keywords
  for (const keyword of veganKeywords) {
    if (lowerName.includes(keyword)) {
      return true;
    }
  }
  
  return false; // Default to non-vegan if unclear
}

// Function to determine spice level based on name
function getSpiceLevel(name) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('sehezwan') || lowerName.includes('chilly') || lowerName.includes('peri peri')) {
    return 'spicy';
  } else if (lowerName.includes('hot') || lowerName.includes('sour')) {
    return 'medium';
  } else {
    return 'none';
  }
}

// Function to add menu items to Firebase
async function addMenuItems() {
  try {
    console.log('Starting to add menu items...');
    
    const restaurantId = 'vna4d8uk7tmmcg3sfi7';
    const categoryId = '35aojek281umdk21fa6';
    const categoryName = 'Appetizers';
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const item of menuItems) {
      try {
        // Generate a unique ID for each menu item
        const menuItemId = db.collection('temp').doc().id;
        
        const menuItemData = {
          allergens: [],
          category: item.category,
          categoryId: categoryId,
          categoryName: categoryName,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          description: item.description,
          id: menuItemId,
          image: "",
          isAvailable: item.isAvailable,
          isGlutenFree: false, // Default to false, can be updated later
          isVegan: isVegan(item.name),
          isVegetarian: isVegetarian(item.name),
          name: item.name,
          preparationTime: 0,
          price: item.price,
          restaurantId: restaurantId,
          spiceLevel: getSpiceLevel(item.name),
          tags: [],
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          variants: {}
        };
        
        // Add the menu item to the collection
        await db.collection('restaurants')
          .doc(restaurantId)
          .collection('menuItems')
          .doc(menuItemId)
          .set(menuItemData);
        
        console.log(`✅ Added: ${item.name} - ₹${item.price}`);
        successCount++;
        
        // Add a small delay to avoid overwhelming Firebase
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error adding ${item.name}:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\n🎉 Process completed!`);
    console.log(`✅ Successfully added: ${successCount} items`);
    console.log(`❌ Failed to add: ${errorCount} items`);
    
  } catch (error) {
    console.error('❌ Error in addMenuItems function:', error);
  } finally {
    // Close the Firebase connection
    process.exit(0);
  }
}

// Run the function
addMenuItems();
