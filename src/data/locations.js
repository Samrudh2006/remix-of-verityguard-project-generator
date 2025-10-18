// Indian states and major cities/towns data
export const indianStates = [
  { code: 'AP', name: 'Andhra Pradesh', nameHi: 'आंध्र प्रदेश' },
  { code: 'AR', name: 'Arunachal Pradesh', nameHi: 'अरुणाचल प्रदेश' },
  { code: 'AS', name: 'Assam', nameHi: 'असम' },
  { code: 'BR', name: 'Bihar', nameHi: 'बिहार' },
  { code: 'CT', name: 'Chhattisgarh', nameHi: 'छत्तीसगढ़' },
  { code: 'GA', name: 'Goa', nameHi: 'गोवा' },
  { code: 'GJ', name: 'Gujarat', nameHi: 'गुजरात' },
  { code: 'HR', name: 'Haryana', nameHi: 'हरियाणा' },
  { code: 'HP', name: 'Himachal Pradesh', nameHi: 'हिमाचल प्रदेश' },
  { code: 'JH', name: 'Jharkhand', nameHi: 'झारखंड' },
  { code: 'KA', name: 'Karnataka', nameHi: 'कर्नाटक' },
  { code: 'KL', name: 'Kerala', nameHi: 'केरल' },
  { code: 'MP', name: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश' },
  { code: 'MH', name: 'Maharashtra', nameHi: 'महाराष्ट्र' },
  { code: 'MN', name: 'Manipur', nameHi: 'मणिपुर' },
  { code: 'ML', name: 'Meghalaya', nameHi: 'मेघालय' },
  { code: 'MZ', name: 'Mizoram', nameHi: 'मिजोरम' },
  { code: 'NL', name: 'Nagaland', nameHi: 'नागालैंड' },
  { code: 'OD', name: 'Odisha', nameHi: 'ओडिशा' },
  { code: 'PB', name: 'Punjab', nameHi: 'पंजाब' },
  { code: 'RJ', name: 'Rajasthan', nameHi: 'राजस्थान' },
  { code: 'SK', name: 'Sikkim', nameHi: 'सिक्किम' },
  { code: 'TN', name: 'Tamil Nadu', nameHi: 'तमिलनाडु' },
  { code: 'TG', name: 'Telangana', nameHi: 'तेलंगाना' },
  { code: 'TR', name: 'Tripura', nameHi: 'त्रिपुरा' },
  { code: 'UP', name: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश' },
  { code: 'UT', name: 'Uttarakhand', nameHi: 'उत्तराखंड' },
  { code: 'WB', name: 'West Bengal', nameHi: 'पश्चिम बंगाल' },
  { code: 'AN', name: 'Andaman and Nicobar Islands', nameHi: 'अंडमान और निकोबार द्वीप समूह' },
  { code: 'CH', name: 'Chandigarh', nameHi: 'चंडीगढ़' },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu', nameHi: 'दादरा और नगर हवेली और दमन और दीव' },
  { code: 'DL', name: 'Delhi', nameHi: 'दिल्ली' },
  { code: 'JK', name: 'Jammu and Kashmir', nameHi: 'जम्मू और कश्मीर' },
  { code: 'LA', name: 'Ladakh', nameHi: 'लद्दाख' },
  { code: 'LD', name: 'Lakshadweep', nameHi: 'लक्षद्वीप' },
  { code: 'PY', name: 'Puducherry', nameHi: 'पुदुच्चेरी' },
];

// Cities and towns by state
export const citiesByState = {
  AP: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kakinada', 'Rajahmundry', 'Tirupati', 'Annavaram', 'Anantapur'],
  TG: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar', 'Nalgonda'],
  KA: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary'],
  TN: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Erode'],
  MH: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur'],
  DL: ['New Delhi', 'Central Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi'],
  UP: ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly'],
  GJ: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar'],
  RJ: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar'],
  WB: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Baharampur'],
  KL: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Palakkad', 'Alappuzha'],
  MP: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna'],
  // Add more as needed
};

// Simulate reverse geocoding (in real app, use Google Maps API or similar)
export function reverseGeocode(lat, lon) {
  // Mock implementation - maps rough coordinates to locations
  // In production, use a real geocoding service
  const locations = [
    { lat: 17.3850, lon: 78.4867, city: 'Hyderabad', state: 'TG', country: 'India' },
    { lat: 13.0827, lon: 80.2707, city: 'Chennai', state: 'TN', country: 'India' },
    { lat: 19.0760, lon: 72.8777, city: 'Mumbai', state: 'MH', country: 'India' },
    { lat: 28.7041, lon: 77.1025, city: 'New Delhi', state: 'DL', country: 'India' },
    { lat: 12.9716, lon: 77.5946, city: 'Bangalore', state: 'KA', country: 'India' },
    { lat: 17.6868, lon: 83.2185, city: 'Visakhapatnam', state: 'AP', country: 'India' },
    { lat: 17.3297, lon: 82.3029, city: 'Annavaram', state: 'AP', country: 'India' }, // Your example
    { lat: 16.5062, lon: 80.6480, city: 'Vijayawada', state: 'AP', country: 'India' },
    { lat: 22.5726, lon: 88.3639, city: 'Kolkata', state: 'WB', country: 'India' },
    { lat: 23.0225, lon: 72.5714, city: 'Ahmedabad', state: 'GJ', country: 'India' },
  ];

  // Find closest location (simplified)
  let closest = locations[0];
  let minDist = Math.sqrt((lat - closest.lat) ** 2 + (lon - closest.lon) ** 2);

  locations.forEach((loc) => {
    const dist = Math.sqrt((lat - loc.lat) ** 2 + (lon - loc.lon) ** 2);
    if (dist < minDist) {
      minDist = dist;
      closest = loc;
    }
  });

  return closest;
}
