import { Translation } from './types';

export const DEFAULT_BG_IMAGE = 'https://images.unsplash.com/photo-1625246333195-58f21671810d?q=80&w=2574&auto=format&fit=crop';

// Helper to generate realistic numbered Unions if real ones aren't listed
function generateUnions(upazilaNameEn: string, upazilaNameBn: string, count: number = 5) {
    const unions = [];
    // Always add a Sadar union
    unions.push({ 
        value: `${upazilaNameEn} Sadar Union`, 
        label: { en: `${upazilaNameEn} Sadar Union`, bn: `${upazilaNameBn} সদর ইউনিয়ন` } 
    });
    
    for (let i = 1; i <= count; i++) {
        unions.push({ 
            value: `${i} No. ${upazilaNameEn} Union`, 
            label: { en: `${i} No. ${upazilaNameEn} Union`, bn: `${convertNumToBn(i)} নং ${upazilaNameBn} ইউনিয়ন` } 
        });
    }
    return unions;
}

// Helper to convert English numbers to Bengali
function convertNumToBn(num: number): string {
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bnNums[parseInt(d)]).join('');
}

// Helper to create an Upazila object with optional real unions
const createUpazila = (en: string, bn: string, realUnions?: {en: string, bn: string}[]) => {
    let unionOptions;
    if (realUnions && realUnions.length > 0) {
        unionOptions = realUnions.map(u => ({
            value: `${u.en} Union`,
            label: { en: `${u.en} Union`, bn: `${u.bn} ইউনিয়ন` }
        }));
    } else {
        unionOptions = generateUnions(en, bn);
    }

    return {
        value: en,
        label: { en: en, bn: bn },
        unions: unionOptions
    };
};

// Full Hierarchical Data for Bangladesh (Major Agricultural Districts Expanded)
export const BANGLADESH_LOCATIONS: Record<string, { label: { en: string, bn: string }, districts: { value: string, label: { en: string, bn: string }, upazilas: { value: string, label: { en: string, bn: string }, unions?: {value: string, label: {en: string, bn: string}}[] }[] }[] }> = {
  'Dhaka': {
    label: { en: 'Dhaka', bn: 'ঢাকা' },
    districts: [
      { 
        value: 'Dhaka', label: { en: 'Dhaka', bn: 'ঢাকা' }, 
        upazilas: [
          createUpazila('Savar', 'সাভার', [{en:'Aminbazar', bn:'আমিনবাজার'}, {en:'Tetuljhora', bn:'তেঁতুলঝোঁড়া'}, {en:'Pathalia', bn:'পাথালিয়া'}, {en:'Ashulia', bn:'আশুলিয়া'}, {en:'Birulia', bn:'বিরুলিয়া'}]),
          createUpazila('Dhamrai', 'ধামরাই'),
          createUpazila('Keraniganj', 'কেরানীগঞ্জ'),
          createUpazila('Nawabganj', 'নবাবগঞ্জ'),
          createUpazila('Dohar', 'দোহার')
        ]
      },
      { 
        value: 'Gazipur', label: { en: 'Gazipur', bn: 'গাজীপুর' }, 
        upazilas: [
          createUpazila('Gazipur Sadar', 'গাজীপুর সদর'),
          createUpazila('Kaliakair', 'কালিয়াকৈর'),
          createUpazila('Kapasia', 'কাপাসিয়া'),
          createUpazila('Sreepur', 'শ্রীপুর'),
          createUpazila('Kaliganj', 'কালীগঞ্জ')
        ]
      },
      { 
        value: 'Tangail', label: { en: 'Tangail', bn: 'টাঙ্গাইল' }, 
        upazilas: [
          createUpazila('Tangail Sadar', 'টাঙ্গাইল সদর'),
          createUpazila('Madhupur', 'মধুপুর'),
          createUpazila('Ghatail', 'ঘাটাইল'),
          createUpazila('Kalihati', 'কালিহাতী'),
          createUpazila('Mirzapur', 'মির্জাপুর'),
          createUpazila('Gopalpur', 'গোপালপুর'),
          createUpazila('Delduar', 'দেলদুয়ার'),
          createUpazila('Bhuapur', 'ভূঞাপুর')
        ]
      },
      { 
        value: 'Narsingdi', label: { en: 'Narsingdi', bn: 'নরসিংদী' }, 
        upazilas: [
          createUpazila('Narsingdi Sadar', 'নরসিংদী সদর'),
          createUpazila('Belabo', 'বেলাবো'),
          createUpazila('Monohardi', 'মনোহরদী'),
          createUpazila('Palash', 'পলাশ'),
          createUpazila('Raipura', 'রায়পুরা'),
          createUpazila('Shibpur', 'শিবপুর')
        ]
      },
      { value: 'Faridpur', label: { en: 'Faridpur', bn: 'ফরিদপুর' }, upazilas: [createUpazila('Faridpur Sadar', 'ফরিদপুর সদর'), createUpazila('Boalmari', 'বোয়ালমারী'), createUpazila('Madhukhali', 'মধুখালী')] },
      { value: 'Kishoreganj', label: { en: 'Kishoreganj', bn: 'কিশোরগঞ্জ' }, upazilas: [createUpazila('Kishoreganj Sadar', 'কিশোরগঞ্জ সদর'), createUpazila('Bhairab', 'ভৈরব'), createUpazila('Itna', 'ইটনা'), createUpazila('Mithamoin', 'মিঠামইন')] },
      { value: 'Manikganj', label: { en: 'Manikganj', bn: 'মানিকগঞ্জ' }, upazilas: [createUpazila('Manikganj Sadar', 'মানিকগঞ্জ সদর'), createUpazila('Singair', 'সিংগাইর'), createUpazila('Shibalaya', 'শিবালয়')] },
      { value: 'Munshiganj', label: { en: 'Munshiganj', bn: 'মুন্সীগঞ্জ' }, upazilas: [createUpazila('Munshiganj Sadar', 'মুন্সীগঞ্জ সদর'), createUpazila('Sreenagar', 'শ্রীনগর'), createUpazila('Lohajang', 'লৌহজং')] },
      { value: 'Narayanganj', label: { en: 'Narayanganj', bn: 'নারায়ণগঞ্জ' }, upazilas: [createUpazila('Narayanganj Sadar', 'নারায়ণগঞ্জ সদর'), createUpazila('Rupganj', 'রূপগঞ্জ'), createUpazila('Sonargaon', 'সোনারগাঁও')] },
    ]
  },
  'Chittagong': {
    label: { en: 'Chittagong', bn: 'চট্টগ্রাম' },
    districts: [
      { 
        value: 'Comilla', label: { en: 'Comilla', bn: 'কুমিল্লা' }, 
        upazilas: [
          createUpazila('Comilla Sadar', 'কুমিল্লা সদর', [{en:'Amratali', bn:'আমড়াতলী'}, {en:'Durganagar', bn:'দুর্গাপুর'}, {en:'Kalirbazar', bn:'কালিরবাজার'}]),
          createUpazila('Debidwar', 'দেবিদ্বার'),
          createUpazila('Muradnagar', 'মুরাদনগর'),
          createUpazila('Daudkandi', 'দাউদকান্দি'),
          createUpazila('Chandina', 'চান্দিনা'),
          createUpazila('Laksam', 'লাকসাম')
        ]
      },
      { 
        value: 'Chittagong', label: { en: 'Chittagong', bn: 'চট্টগ্রাম' }, 
        upazilas: [
          createUpazila('Hathazari', 'হাটহাজারী'),
          createUpazila('Patiya', 'পটিয়া'),
          createUpazila('Rangunia', 'রাঙ্গুনিয়া'),
          createUpazila('Raozan', 'রাউজান'),
          createUpazila('Fatikchhari', 'ফটিকছড়ি'),
          createUpazila('Sitakunda', 'সীতাকুণ্ড'),
          createUpazila('Mirsharai', 'মীরসরাই')
        ]
      },
      { value: 'Brahmanbaria', label: { en: 'Brahmanbaria', bn: 'ব্রাহ্মণবাড়িয়া' }, upazilas: [createUpazila('Brahmanbaria Sadar', 'ব্রাহ্মণবাড়িয়া সদর'), createUpazila('Kasba', 'কসবা'), createUpazila('Nasirnagar', 'নাসিরনগর')] },
      { value: 'Chandpur', label: { en: 'Chandpur', bn: 'চাঁদপুর' }, upazilas: [createUpazila('Chandpur Sadar', 'চাঁদপুর সদর'), createUpazila('Hajiganj', 'হাজীগঞ্জ'), createUpazila('Matlab North', 'মতলব উত্তর')] },
      { value: 'Cox\'s Bazar', label: { en: 'Cox\'s Bazar', bn: 'কক্সবাজার' }, upazilas: [createUpazila('Cox\'s Bazar Sadar', 'কক্সবাজার সদর'), createUpazila('Ramu', 'রামু'), createUpazila('Teknaf', 'টেকনাফ'), createUpazila('Ukhia', 'উখিয়া')] },
      { value: 'Feni', label: { en: 'Feni', bn: 'ফেনী' }, upazilas: [createUpazila('Feni Sadar', 'ফেনী সদর'), createUpazila('Daganbhuiyan', 'দাগনভূঞা')] },
      { value: 'Noakhali', label: { en: 'Noakhali', bn: 'নোয়াখালী' }, upazilas: [createUpazila('Noakhali Sadar', 'নোয়াখালী সদর'), createUpazila('Begumganj', 'বেগমগঞ্জ'), createUpazila('Chatkhil', 'চাটখিল')] },
    ]
  },
  'Rajshahi': {
    label: { en: 'Rajshahi', bn: 'রাজশাহী' },
    districts: [
      { 
        value: 'Bogra', label: { en: 'Bogra', bn: 'বগুড়া' }, 
        upazilas: [
          createUpazila('Bogra Sadar', 'বগুড়া সদর'),
          createUpazila('Shibganj', 'শিবগঞ্জ'),
          createUpazila('Sherpur', 'শেরপুর'),
          createUpazila('Gabtali', 'গাবতলী'),
          createUpazila('Sariakandi', 'সারিয়াকান্দি')
        ]
      },
      { 
        value: 'Rajshahi', label: { en: 'Rajshahi', bn: 'রাজশাহী' }, 
        upazilas: [
          createUpazila('Paba', 'পবা'),
          createUpazila('Godagari', 'গোদাগাড়ী'),
          createUpazila('Tanore', 'তানোর'),
          createUpazila('Bagmara', 'বাগমারা'),
          createUpazila('Puthia', 'পুঠিয়া')
        ]
      },
      { value: 'Naogaon', label: { en: 'Naogaon', bn: 'নওগাঁ' }, upazilas: [createUpazila('Naogaon Sadar', 'নওগাঁ সদর'), createUpazila('Mohadevpur', 'মহাদেবপুর'), createUpazila('Manda', 'মান্দা')] },
      { value: 'Natore', label: { en: 'Natore', bn: 'নাটোর' }, upazilas: [createUpazila('Natore Sadar', 'নাটোর সদর'), createUpazila('Singra', 'সিংড়া'), createUpazila('Baraigram', 'বড়াইগ্রাম')] },
      { value: 'Pabna', label: { en: 'Pabna', bn: 'পাবনা' }, upazilas: [createUpazila('Pabna Sadar', 'পাবনা সদর'), createUpazila('Ishwardi', 'ঈশ্বরদী'), createUpazila('Sujanagar', 'সুজানগর')] },
      { value: 'Sirajganj', label: { en: 'Sirajganj', bn: 'সিরাজগঞ্জ' }, upazilas: [createUpazila('Sirajganj Sadar', 'সিরাজগঞ্জ সদর'), createUpazila('Shahjadpur', 'শাহজাদপুর'), createUpazila('Ullahpara', 'উল্লাপাড়া')] },
    ]
  },
  'Mymensingh': {
    label: { en: 'Mymensingh', bn: 'ময়মনসিংহ' },
    districts: [
      { 
        value: 'Mymensingh', label: { en: 'Mymensingh', bn: 'ময়মনসিংহ' }, 
        upazilas: [
          createUpazila('Mymensingh Sadar', 'ময়মনসিংহ সদর'),
          createUpazila('Muktagachha', 'মুক্তাগাছা'),
          createUpazila('Valuka', 'ভালুকা'),
          createUpazila('Trishal', 'ত্রিশাল'),
          createUpazila('Gafargaon', 'গফরগাঁও'),
          createUpazila('Phulpur', 'ফুলপুর')
        ]
      },
      { value: 'Jamalpur', label: { en: 'Jamalpur', bn: 'জামালপুর' }, upazilas: [createUpazila('Jamalpur Sadar', 'জামালপুর সদর'), createUpazila('Sarishabari', 'সরিষাবাড়ী'), createUpazila('Islampur', 'ইসলামপুর')] },
      { value: 'Netrokona', label: { en: 'Netrokona', bn: 'নেত্রকোণা' }, upazilas: [createUpazila('Netrokona Sadar', 'নেত্রকোণা সদর'), createUpazila('Kendua', 'কেন্দুয়া'), createUpazila('Durgapur', 'দুর্গাপুর')] },
      { value: 'Sherpur', label: { en: 'Sherpur', bn: 'শেরপুর' }, upazilas: [createUpazila('Sherpur Sadar', 'শেরপুর সদর'), createUpazila('Nakla', 'নাকলা'), createUpazila('Nalitabari', 'নালিতাবাড়ী')] },
    ]
  },
  'Khulna': {
    label: { en: 'Khulna', bn: 'খুলনা' },
    districts: [
      { 
        value: 'Khulna', label: { en: 'Khulna', bn: 'খুলনা' }, 
        upazilas: [
          createUpazila('Khulna Sadar', 'খুলনা সদর'),
          createUpazila('Dumuria', 'ডুমুরিয়া'),
          createUpazila('Phultala', 'ফুলতলা'),
          createUpazila('Dighalia', 'দিঘলিয়া'),
          createUpazila('Paikgachha', 'পাইকগাছা')
        ]
      },
      { 
        value: 'Jessore', label: { en: 'Jessore', bn: 'যশোর' }, 
        upazilas: [
          createUpazila('Jessore Sadar', 'যশোর সদর'),
          createUpazila('Jhikargachha', 'ঝিকরগাছা'),
          createUpazila('Sharsha', 'শার্শা'),
          createUpazila('Abhaynagar', 'অভয়নগর')
        ]
      },
      { value: 'Satkhira', label: { en: 'Satkhira', bn: 'সাতক্ষীরা' }, upazilas: [createUpazila('Satkhira Sadar', 'সাতক্ষীরা সদর'), createUpazila('Kalaroa', 'কলারোয়া'), createUpazila('Shyamnagar', 'শ্যামনগর')] },
      { value: 'Kushtia', label: { en: 'Kushtia', bn: 'কুষ্টিয়া' }, upazilas: [createUpazila('Kushtia Sadar', 'কুষ্টিয়া সদর'), createUpazila('Kumarkhali', 'কুমারখালী'), createUpazila('Mirpur', 'মিরপুর')] },
      { value: 'Bagerhat', label: { en: 'Bagerhat', bn: 'বাগেরহাট' }, upazilas: [createUpazila('Bagerhat Sadar', 'বাগেরহাট সদর'), createUpazila('Mongla', 'মংলা')] },
    ]
  },
  'Rangpur': {
    label: { en: 'Rangpur', bn: 'রংপুর' },
    districts: [
      { 
        value: 'Rangpur', label: { en: 'Rangpur', bn: 'রংপুর' }, 
        upazilas: [
          createUpazila('Rangpur Sadar', 'রংপুর সদর'),
          createUpazila('Pirgachha', 'পীরগাছা'),
          createUpazila('Kaunia', 'কাউনিয়া'),
          createUpazila('Mithapukur', 'মিঠাপুকুর'),
          createUpazila('Badarganj', 'বদরগঞ্জ')
        ]
      },
      { value: 'Dinajpur', label: { en: 'Dinajpur', bn: 'দিনাজপুর' }, upazilas: [createUpazila('Dinajpur Sadar', 'দিনাজপুর সদর'), createUpazila('Birganj', 'বীরগঞ্জ'), createUpazila('Parbatipur', 'পার্বতীপুর')] },
      { value: 'Gaibandha', label: { en: 'Gaibandha', bn: 'গাইবান্ধা' }, upazilas: [createUpazila('Gaibandha Sadar', 'গাইবান্ধা সদর'), createUpazila('Gobindaganj', 'গোবিন্দগঞ্জ')] },
      { value: 'Kurigram', label: { en: 'Kurigram', bn: 'কুড়িগ্রাম' }, upazilas: [createUpazila('Kurigram Sadar', 'কুড়িগ্রাম সদর'), createUpazila('Nageshwari', 'নাগেশ্বরী')] },
    ]
  },
  'Barisal': {
    label: { en: 'Barisal', bn: 'বরিশাল' },
    districts: [
      { 
        value: 'Barisal', label: { en: 'Barisal', bn: 'বরিশাল' }, 
        upazilas: [
          createUpazila('Barisal Sadar', 'বরিশাল সদর'),
          createUpazila('Bakerganj', 'বাকেরগঞ্জ'),
          createUpazila('Babuganj', 'বাবুগঞ্জ'),
          createUpazila('Wazirpur', 'উজিরপুর'),
          createUpazila('Banaripara', 'বানারীপাড়া')
        ]
      },
      { value: 'Bhola', label: { en: 'Bhola', bn: 'ভোলা' }, upazilas: [createUpazila('Bhola Sadar', 'ভোলা সদর'), createUpazila('Lalmohan', 'লালমোহন'), createUpazila('Char Fasson', 'চরফ্যাশন')] },
      { value: 'Patuakhali', label: { en: 'Patuakhali', bn: 'পটুয়াখালী' }, upazilas: [createUpazila('Patuakhali Sadar', 'পটুয়াখালী সদর'), createUpazila('Bauphal', 'বাউফল'), createUpazila('Galachipa', 'গলাচিপা')] },
    ]
  },
  'Sylhet': {
    label: { en: 'Sylhet', bn: 'সিলেট' },
    districts: [
      { 
        value: 'Sylhet', label: { en: 'Sylhet', bn: 'সিলেট' }, 
        upazilas: [
          createUpazila('Sylhet Sadar', 'সিলেট সদর'),
          createUpazila('Beanibazar', 'বিয়ানীবাজার'),
          createUpazila('Bishwanath', 'বিশ্বনাথ'),
          createUpazila('Golapganj', 'গোলাপগঞ্জ'),
          createUpazila('Kanaighat', 'কানাইঘাট')
        ]
      },
      { value: 'Sunamganj', label: { en: 'Sunamganj', bn: 'সুনামগঞ্জ' }, upazilas: [createUpazila('Sunamganj Sadar', 'সুনামগঞ্জ সদর'), createUpazila('Tahirpur', 'তাহিরপুর'), createUpazila('Bishwamvarpur', 'বিশ্বম্ভরপুর')] },
      { value: 'Habiganj', label: { en: 'Habiganj', bn: 'হবিগঞ্জ' }, upazilas: [createUpazila('Habiganj Sadar', 'হবিগঞ্জ সদর'), createUpazila('Madhabpur', 'মাধবপুর')] },
      { value: 'Moulvibazar', label: { en: 'Moulvibazar', bn: 'মৌলভীবাজার' }, upazilas: [createUpazila('Moulvibazar Sadar', 'মৌলভীবাজার সদর'), createUpazila('Sreemangal', 'শ্রীমঙ্গল')] },
    ]
  }
};

// Flattened for easy lookup if needed
export const LOCATION_OPTIONS = Object.values(BANGLADESH_LOCATIONS).flatMap(d => d.districts);

export const CROP_OPTIONS = [
  // Grains
  { value: 'Paddy (Rice)', label: { en: 'Paddy (Rice)', bn: 'ধান' } },
  { value: 'Wheat', label: { en: 'Wheat', bn: 'গম' } },
  { value: 'Maize', label: { en: 'Maize', bn: 'ভুট্টা' } },
  { value: 'Mustard', label: { en: 'Mustard', bn: 'সরিষা' } },
  { value: 'Jute', label: { en: 'Jute', bn: 'পাট' } },
  
  // Vegetables
  { value: 'Potato', label: { en: 'Potato', bn: 'আলু' } },
  { value: 'Tomato', label: { en: 'Tomato', bn: 'টমেটো' } },
  { value: 'Onion', label: { en: 'Onion', bn: 'পেঁয়াজ' } },
  { value: 'Brinjal', label: { en: 'Eggplant', bn: 'বেগুন' } },
  { value: 'Cauliflower', label: { en: 'Cauliflower', bn: 'ফুলকপি' } },
  { value: 'Cabbage', label: { en: 'Cabbage', bn: 'বাঁধাকপি' } },
  { value: 'Chili', label: { en: 'Chili', bn: 'কাঁচামরিচ' } },
  { value: 'Pumpkin', label: { en: 'Pumpkin', bn: 'মিষ্টি কুমড়া' } },
  { value: 'Bottle Gourd', label: { en: 'Bottle Gourd', bn: 'লাউ' } },
  { value: 'Bitter Gourd', label: { en: 'Bitter Gourd', bn: 'করলা' } },
  { value: 'Okra', label: { en: 'Okra', bn: 'ঢেঁড়স' } },
  { value: 'Cucumber', label: { en: 'Cucumber', bn: 'শসা' } },
  { value: 'Beans', label: { en: 'Beans', bn: 'শিম' } },
  { value: 'Radish', label: { en: 'Radish', bn: 'মুলা' } },
  { value: 'Spinach', label: { en: 'Spinach', bn: 'পালং শাক' } },
  { value: 'Red Amaranth', label: { en: 'Red Amaranth', bn: 'লাল শাক' } },
  { value: 'Carrot', label: { en: 'Carrot', bn: 'গাজর' } },
  { value: 'Garlic', label: { en: 'Garlic', bn: 'রসুন' } },
  { value: 'Ginger', label: { en: 'Ginger', bn: 'আদা' } },
  { value: 'Pointed Gourd', label: { en: 'Pointed Gourd', bn: 'পটল' } },
  { value: 'Snake Gourd', label: { en: 'Snake Gourd', bn: 'চিচিঙ্গা' } },
  { value: 'Sponge Gourd', label: { en: 'Sponge Gourd', bn: 'ধুন্দল' } },
  { value: 'Teasel Gourd', label: { en: 'Teasel Gourd', bn: 'কাঁকরোল' } },
  { value: 'Turmeric', label: { en: 'Turmeric', bn: 'হলুদ' } },
  { value: 'Coriander', label: { en: 'Coriander', bn: 'ধনিয়া' } },

  // Fruits
  { value: 'Mango', label: { en: 'Mango', bn: 'আম' } },
  { value: 'Jackfruit', label: { en: 'Jackfruit', bn: 'কাঁঠাল' } },
  { value: 'Banana', label: { en: 'Banana', bn: 'কলা' } },
  { value: 'Litchi', label: { en: 'Litchi', bn: 'লিচু' } },
  { value: 'Guava', label: { en: 'Guava', bn: 'পেয়ারা' } },
  { value: 'Papaya', label: { en: 'Papaya', bn: 'পেঁপে' } },
  { value: 'Watermelon', label: { en: 'Watermelon', bn: 'তরমুজ' } },
  { value: 'Pineapple', label: { en: 'Pineapple', bn: 'আনারস' } },
  { value: 'Lemon', label: { en: 'Lemon', bn: 'লেবু' } },
];

// Brief crop advice based on Bangladesh context
export const CROP_PREDICTION_HINTS: Record<string, { en: string; bn: string }> = {
  'Paddy (Rice)': {
    en: 'Maintain proper water levels. Watch for Blast disease in high humidity.',
    bn: 'পানির স্তর সঠিক রাখুন। উচ্চ আর্দ্রতায় ব্লাস্ট রোগ সম্পর্কে সতর্ক থাকুন।'
  },
  'Wheat': {
    en: 'Ensure dry soil during harvest. Protect from late rains.',
    bn: 'ফসল কাটার সময় মাটি শুকনো রাখুন। অকাল বৃষ্টি থেকে রক্ষা করুন।'
  },
  'Maize': {
    en: 'Monitor for Fall Armyworm. Ensure drainage prevents root rot.',
    bn: 'ফল আর্মিওয়ার্ম পোকা দমন করুন। গোড়ায় পানি জমা রোধ করুন।'
  },
  'Mustard': {
    en: 'Aphids attack in foggy weather. Spray if necessary.',
    bn: 'কুয়াশাচ্ছন্ন আবহাওয়ায় জাব পোকার আক্রমণ হতে পারে। প্রয়োজনে স্প্রে করুন।'
  },
  'Jute': {
    en: 'Clean water is essential for retting fiber quality.',
    bn: 'পাটের আঁশের গুণমান ভালো রাখতে পরিষ্কার পচানোর পানি নিশ্চিত করুন।'
  },
  'Potato': {
    en: 'High risk of Late Blight in foggy/cold weather.',
    bn: 'কুয়াশা ও ঠান্ডা আবহাওয়ায় লেট ব্লাইট বা মড়ক রোগের ঝুঁকি থাকে।'
  },
  'Tomato': {
    en: 'Use staking to keep fruits off ground and prevent rot.',
    bn: 'ফল পচন রোধে খুঁটি বা মাচা ব্যবহার করুন।'
  },
  'Onion': {
    en: 'Cure/Dry thoroughly before storage to prevent neck rot.',
    bn: 'গলা পচা রোগ রোধে সংরক্ষণের আগে ভালোভাবে শুকিয়ে নিন।'
  },
  'Brinjal': {
    en: 'Watch for Fruit and Shoot Borer pests.',
    bn: 'ডগা ও ফল ছিদ্রকারী পোকা সম্পর্কে সতর্ক থাকুন।'
  },
  'Mango': {
    en: 'Protect form storms. Watch for hoppers during flowering.',
    bn: 'ঝড় থেকে রক্ষা করুন। মুকুল আসার সময় হপার পোকা দমন করুন।'
  },
  'Jackfruit': {
    en: 'Prevent waterlogging near roots. Watch for fruit rot.',
    bn: 'গোড়ায় পানি জমা রোধ করুন। ফল পচা রোগ খেয়াল রাখুন।'
  },
  'Banana': {
    en: 'Use propping for support during winds. Remove dry leaves.',
    bn: 'বাতাসে হেলে পড়া রোধে খুঁটি দিন। শুকনো পাতা কেটে ফেলুন।'
  },
  'Litchi': {
    en: 'Irrigate regularly during fruit set to prevent cracking.',
    bn: 'ফল ফেটে যাওয়া রোধে নিয়মিত সেচ দিন।'
  },
  'Guava': {
    en: 'Bagging fruits prevents fruit fly attacks.',
    bn: 'ফল মাছি পোকা রোধে পেয়ারা পলিথিন দিয়ে মুড়িয়ে দিন (ব্যাগিং)।'
  }
};

export const STORAGE_OPTIONS = [
    { value: 'Jute Bag Stack', label: { en: 'Jute Bag Stack', bn: 'পাটের বস্তা' } },
    { value: 'Silo', label: { en: 'Silo', bn: 'সাইলো (গোলা)' } },
    { value: 'Open Area', label: { en: 'Open Area', bn: 'খোলা জায়গা' } },
    { value: 'Cold Storage', label: { en: 'Cold Storage', bn: 'হিমাগার' } },
    { value: 'Plastic Drums', label: { en: 'Plastic Drums', bn: 'প্লাস্টিক ড্রাম' } },
    { value: 'Traditional Gola', label: { en: 'Traditional Gola', bn: 'সনাতন গোলা' } },
    { value: 'Machan (Platform)', label: { en: 'Machan', bn: 'মাচা' } },
];

export const COMMUNITY_CATEGORIES = [
  { value: 'Buyer Needed', label: { en: 'Buyer Needed', bn: 'ক্রেতা প্রয়োজন' } },
  { value: 'Seller Available', label: { en: 'Seller Available', bn: 'বিক্রেতা আছে' } },
  { value: 'Equipment', label: { en: 'Equipment Needed/Rent', bn: 'যন্ত্রপাতি প্রয়োজন/ভাড়া' } },
  { value: 'Labor', label: { en: 'Labor Needed', bn: 'শ্রমিক প্রয়োজন' } },
  { value: 'Transport', label: { en: 'Transport Needed', bn: 'পরিবহন প্রয়োজন' } },
  { value: 'Advice', label: { en: 'Farming Advice', bn: 'কৃষি পরামর্শ' } }
];

// Expanded Module Information for Landing Page Modals
export const MODULE_INFO = {
  weather: {
    what: { en: 'Real-time hyper-local weather updates specific to your farm location.', bn: 'আপনার খামারের নির্দিষ্ট অবস্থানের জন্য রিয়েল-টাইম আবহাওয়ার আপডেট।' },
    why: { en: 'Helps you plan irrigation, spraying, and harvesting to avoid losses from rain or drought.', bn: 'বৃষ্টি বা খরা থেকে ক্ষতি এড়াতে সেচ, স্প্রে এবং ফসল কাটার পরিকল্পনা করতে সাহায্য করে।' },
    how: { en: 'Check the dashboard daily for rain alerts. Follow the farming tips provided based on the forecast.', bn: 'বৃষ্টির সতর্কতার জন্য প্রতিদিন ড্যাশবোর্ড দেখুন। পূর্বাভাস অনুযায়ী প্রদত্ত কৃষি টিপস অনুসরণ করুন।' },
    action: { en: 'View Forecast', bn: 'পূর্বাভাস দেখুন' }
  },
  scanner: {
    what: { en: 'AI-powered disease detection using your phone camera.', bn: 'আপনার ফোনের ক্যামেরা ব্যবহার করে এআই-চালিত রোগ নির্ণয়।' },
    why: { en: 'Early detection of pests and diseases saves your crop from total destruction.', bn: 'পোকামাকড় এবং রোগের প্রাথমিক সনাক্তকরণ আপনার ফসলকে সম্পূর্ণ ধ্বংস থেকে রক্ষা করে।' },
    how: { en: 'Take a clear photo of the affected leaf or fruit. The app will identify the problem and suggest remedies.', bn: 'আক্রান্ত পাতা বা ফলের পরিষ্কার ছবি তুলুন। অ্যাপটি সমস্যা চিহ্নিত করবে এবং প্রতিকারের পরামর্শ দেবে।' },
    action: { en: 'Try Scanner', bn: 'স্ক্যানার চেষ্টা করুন' }
  },
  storage: {
    what: { en: 'Track your harvested crops, their weight, and storage conditions.', bn: 'আপনার কাটা ফসল, তাদের ওজন এবং সংরক্ষণের অবস্থা ট্র্যাক করুন।' },
    why: { en: 'Prevents food loss by alerting you when crops are about to spoil based on shelf-life calculations.', bn: 'মেয়াদ শেষ হওয়ার হিসাবের উপর ভিত্তি করে ফসল নষ্ট হওয়ার আগে আপনাকে সতর্ক করে খাদ্য অপচয় রোধ করে।' },
    how: { en: 'Register a new harvest batch. Update its status when sold or if you notice issues.', bn: 'নতুন ফসলের ব্যাচ নিবন্ধন করুন। বিক্রি হলে বা সমস্যা দেখলে এর অবস্থা আপডেট করুন।' },
    action: { en: 'Manage Storage', bn: 'মজুদ ব্যবস্থাপনা' }
  },
  community: {
    what: { en: 'A marketplace and forum to connect with other farmers and buyers.', bn: 'অন্যান্য কৃষক এবং ক্রেতাদের সাথে সংযোগ স্থাপনের জন্য একটি মার্কেটপ্লেস এবং ফোরাম।' },
    why: { en: 'Helps you sell produce at better prices and get help/equipment from neighbors.', bn: 'আপনাকে ভালো দামে পণ্য বিক্রি করতে এবং প্রতিবেশীদের কাছ থেকে সাহায্য/সরঞ্জাম পেতে সাহায্য করে।' },
    how: { en: 'Post offers to sell crops or request equipment rental. Browse posts from others nearby.', bn: 'ফসল বিক্রি বা সরঞ্জাম ভাড়ার জন্য পোস্ট দিন। আপনার কাছাকাছি অন্যদের পোস্ট দেখুন।' },
    action: { en: 'Join Community', bn: 'কমিউনিটিতে যোগ দিন' }
  }
};

export const TRANSLATIONS: Translation = {
  appTitle: { en: 'HarvestGuard', bn: 'হারভেস্ট গার্ড' },
  tagline: { en: 'Save your harvest, Secure your future.', bn: 'নিরাপদ ফসল, কম ক্ষতি—স্মার্ট কৃষির নতুন পথ।' },
  navTagline: { en: 'Saving Food, Securing Future', bn: 'আপনার ফসলকে সুরক্ষিত রাখুন, ক্ষতি হ্রাস করুন।' },
  getStarted: { en: 'Get Started', bn: 'শুরু করুন' },
  register: { en: 'Register', bn: 'নিবন্ধন করুন' },
  login: { en: 'Login', bn: 'লগইন' },
  enterPin: { en: 'Enter 4-digit PIN', bn: '৪-সংখ্যার পিন দিন' },
  createPin: { en: 'Create Security PIN', bn: 'নিরাপত্তা পিন তৈরি করুন' },
  confirmPin: { en: 'Confirm PIN', bn: 'পিন নিশ্চিত করুন' },
  pinError: { en: 'PIN must be 4 digits', bn: 'পিন অবশ্যই ৪ সংখ্যার হতে হবে' },
  pinMismatch: { en: 'PINs do not match', bn: 'পিন মিলছে না' },
  pinsMatch: { en: 'PINs Match', bn: 'পিন মিলেছে' },
  wrongPin: { en: 'Incorrect PIN', bn: 'ভুল পিন' },
  logout: { en: 'Logout', bn: 'লগ আউট' },
  resetAccount: { en: 'Reset Account', bn: 'অ্যাকাউন্ট রিসেট করুন' },
  welcomeBack: { en: 'Welcome Back', bn: 'স্বাগতম' },
  forgotPin: { en: 'Forgot PIN?', bn: 'পিন ভুলে গেছেন?' },
  verifyPhone: { en: 'Verify Phone Number', bn: 'মোবাইল নম্বর যাচাই করুন' },
  enterRegPhone: { en: 'Enter your registered phone number', bn: 'আপনার নিবন্ধিত মোবাইল নম্বর দিন' },
  phoneMatchError: { en: 'Phone number does not match our records', bn: 'মোবাইল নম্বরটি আমাদের রেকর্ডের সাথে মিলছে না' },
  resetPin: { en: 'Reset PIN', bn: 'পিন রিসেট করুন' },
  pinResetSuccess: { en: 'PIN reset successfully.', bn: 'পিন সফলভাবে রিসেট করা হয়েছে।' },
  
  // OTP
  enterOtp: { en: 'Enter Verification Code', bn: 'যাচাইকরণ কোড দিন' },
  otpSent: { en: 'OTP sent to your number', bn: 'আপনার নম্বরে OTP পাঠানো হয়েছে' },
  otpInvalid: { en: 'Invalid OTP', bn: 'ভুল OTP' },
  verify: { en: 'Verify', bn: 'যাচাই করুন' },

  // Profile Editing
  editProfile: { en: 'Edit Profile', bn: 'প্রোফাইল সম্পাদনা' },
  nidLabel: { en: 'National ID (NID)', bn: 'জাতীয় পরিচয়পত্র (NID)' },
  setupNid: { en: 'Setup NID', bn: 'NID যুক্ত করুন' },
  verified: { en: 'Verified', bn: 'যাচাইকৃত' },
  changePhoto: { en: 'Change Photo', bn: 'ছবি পরিবর্তন' },
  editInfo: { en: 'Edit Info', bn: 'তথ্য পরিবর্তন' },
  security: { en: 'Security', bn: 'নিরাপত্তা' },
  changePin: { en: 'Change PIN', bn: 'পিন পরিবর্তন' },
  currentPin: { en: 'Current PIN', bn: 'বর্তমান পিন' },
  newPin: { en: 'New PIN', bn: 'নতুন পিন' },
  saveChanges: { en: 'Save Changes', bn: 'পরিবর্তন সংরক্ষণ করুন' },
  cancel: { en: 'Cancel', bn: 'বাতিল' },
  enterNid: { en: 'Enter your NID number', bn: 'আপনার NID নম্বর দিন' },
  oldPin: { en: 'Old PIN', bn: 'পুরাতন পিন' },
  pinChanged: { en: 'PIN changed successfully', bn: 'পিন সফলভাবে পরিবর্তন করা হয়েছে' },
  updatePhoto: { en: 'Update Photo', bn: 'ছবি আপডেট করুন' },
  
  // Navigation
  dashboard: { en: 'Dashboard', bn: 'ড্যাশবোর্ড' },
  weather: { en: 'Weather', bn: 'আবহাওয়া' },
  scanner: { en: 'Scanner', bn: 'স্ক্যানার' },
  addBatch: { en: 'Add Harvest', bn: 'ফসল যুক্ত করুন' },
  riskMap: { en: 'Risk Map', bn: 'ঝুঁকি মানচিত্র' },
  community: { en: 'Community', bn: 'কমিউনিটি' },
  
  // Dashboard
  myCrops: { en: 'My Crops', bn: 'আমার ফসল' },
  noCrops: { en: 'No active harvests found', bn: 'কোন সক্রিয় ফসল পাওয়া যায়নি' },
  riskAverted: { en: 'Risk Averted', bn: 'ঝুঁকি এড়ানো হয়েছে' },
  exportCSV: { en: 'Export CSV', bn: 'CSV ডাউনলোড' },
  welcome: { en: 'Welcome,', bn: 'স্বাগতম,' },
  badges: { en: 'Badges', bn: 'অর্জনসমূহ' },
  weight: { en: 'Weight', bn: 'ওজন' },
  storage: { en: 'Storage', bn: 'সংরক্ষণ' },
  criticalLoss: { en: 'Critical Loss in', bn: 'মজুদ নষ্ট হবে' },
  hours: { en: 'hrs', bn: 'ঘণ্টায়' },
  checkWeather: { en: 'Check weather.', bn: 'আবহাওয়া দেখুন।' },
  viewProfile: { en: 'View Profile', bn: 'প্রোফাইল দেখুন' },
  markSold: { en: 'Mark Sold', bn: 'বিক্রয়' },
  reportLoss: { en: 'Report Loss', bn: 'ক্ষতি' },

  // Profile & Gamification
  farmerProfile: { en: 'Farmer Profile', bn: 'কৃষক প্রোফাইল' },
  stats: { en: 'Statistics', bn: 'পরিসংখ্যান' },
  totalHarvests: { en: 'Total Harvests', bn: 'মোট ফসল' },
  successRate: { en: 'Success Rate', bn: 'সাফল্যের হার' },
  activeBatches: { en: 'Active Batches', bn: 'বর্তমান ফসল' },
  history: { en: 'History', bn: 'ইতিহাস' },
  sold: { en: 'Sold', bn: 'বিক্রিত' },
  loss: { en: 'Loss', bn: 'ক্ষতি' },
  earnedBadges: { en: 'Earned Badges', bn: 'অর্জিত ব্যাজ' },
  badgeFirstHarvest: { en: 'First Harvest', bn: 'প্রথম ফসল' },
  badgeRiskExpert: { en: 'Risk Expert', bn: 'ঝুঁকি বিশেষজ্ঞ' },
  badgeTechSavvy: { en: 'Tech Savvy', bn: 'প্রযুক্তি প্রেমী' },
  badgeCommunityLeader: { en: 'Community Leader', bn: 'সমাজ নেতা' },

  // Add Crop
  cropType: { en: 'Crop Type', bn: 'ফসলের ধরন' },
  weightKg: { en: 'Weight (kg)', bn: 'ওজন (কেজি)' },
  date: { en: 'Harvest Date', bn: 'কাটার তারিখ' },
  location: { en: 'Location', bn: 'এলাকা' },
  division: { en: 'Division', bn: 'বিভাগ' },
  district: { en: 'District', bn: 'জেলা' },
  upazila: { en: 'Upazila', bn: 'উপজেলা' },
  village: { en: 'Village / Union', bn: 'গ্রাম / ইউনিয়ন' },
  enterVillage: { en: 'Enter village/union name', bn: 'গ্রাম বা ইউনিয়নের নাম লিখুন' },
  storageMethod: { en: 'Storage Method', bn: 'সংরক্ষণ পদ্ধতি' },
  save: { en: 'Save Record', bn: 'তথ্য সংরক্ষণ করুন' },
  registerHarvest: { en: 'Register a new harvest to track safety.', bn: 'ফসলের নিরাপত্তা নিশ্চিত করতে তথ্য দিন।' },
  selectUnion: { en: 'Select Union', bn: 'ইউনিয়ন নির্বাচন করুন' },
  searchPlaceholder: { en: 'Search...', bn: 'অনুসন্ধান...' },
  noResults: { en: 'No results found', bn: 'কিছু পাওয়া যায়নি' },
  close: { en: 'Close', bn: 'বন্ধ করুন' },

  // Weather
  loading: { en: 'Loading...', bn: 'লোড হচ্ছে...' },
  humidity: { en: 'Humidity', bn: 'আর্দ্রতা' },
  rainRisk: { en: 'Rain Risk', bn: 'বৃষ্টির ঝুঁকি' },
  windSpeed: { en: 'Wind Speed', bn: 'বাতাসের গতি' },
  uvIndex: { en: 'UV Index', bn: 'ইউভি ইনডেক্স' },
  sunrise: { en: 'Sunrise', bn: 'সূর্যোদয়' },
  sunset: { en: 'Sunset', bn: 'সূর্যাস্ত' },
  advisory: { en: 'Farmer Advisory', bn: 'কৃষি পরামর্শ' },
  farmingTips: { en: 'Farming Tips', bn: 'কৃষি টিপস' },
  irrigation: { en: 'Irrigation', bn: 'সেচ' },
  spraying: { en: 'Spraying', bn: 'স্প্রে' },
  fertilizer: { en: 'Fertilizer', bn: 'সার' },
  aiGenerated: { en: 'AI Generated', bn: 'এআই জেনারেটেড' },
  localized: { en: 'Localized', bn: 'লোকালাইজড' },
  activeHarvestsIn: { en: 'Active Harvests in', bn: 'সক্রিয় ফসল:' },
  noCropsLoc: { en: 'No crops registered in this location.', bn: 'এই এলাকায় কোন ফসল নেই।' },
  forecast: { en: '7-Day Forecast', bn: '৭ দিনের পূর্বাভাস' },
  today: { en: 'Today', bn: 'আজ' },
  day_Sun: { en: 'Sun', bn: 'রবি' },
  day_Mon: { en: 'Mon', bn: 'সোম' },
  day_Tue: { en: 'Tue', bn: 'মঙ্গল' },
  day_Wed: { en: 'Wed', bn: 'বুধ' },
  day_Thu: { en: 'Thu', bn: 'বৃহ' },
  day_Fri: { en: 'Fri', bn: 'শুক্র' },
  day_Sat: { en: 'Sat', bn: 'শনি' },

  // Risks & Advice
  riskHigh: { en: 'High Risk!', bn: 'উচ্চ ঝুঁকি!' },
  riskMedium: { en: 'Medium Risk', bn: 'মাঝারি ঝুঁকি' },
  riskLow: { en: 'Safe', bn: 'নিরাপদ' },
  
  // Scanner
  scanCrop: { en: 'Scan Crop Health', bn: 'ফসলের স্বাস্থ্য পরীক্ষা' },
  aiDiseaseDetection: { en: 'AI-powered disease detection for your crops.', bn: 'আপনার ফসলের জন্য এআই-চালিত রোগ নির্ণয়।' },
  takePhoto: { en: 'Take Photo', bn: 'ছবি তুলুন' },
  tapToCapture: { en: 'Tap to capture or upload', bn: 'ছবি তুলতে বা আপলোড করতে ট্যাপ করুন' },
  newScan: { en: 'New Scan', bn: 'নতুন স্ক্যান' },
  analyzing: { en: 'Analyzing...', bn: 'বিশ্লেষণ করা হচ্ছে...' },
  processing: { en: 'Processing image data...', bn: 'ছবির তথ্য প্রক্রিয়া করা হচ্ছে...' },
  readyToAnalyze: { en: 'Ready to Analyze', bn: 'বিশ্লেষণের জন্য প্রস্তুত' },
  uploadInstruction: { en: 'Upload a photo of your crop. Our AI will check for signs of:', bn: 'আপনার ফসলের ছবি আপলোড করুন। এআই যা পরীক্ষা করবে:' },
  fungus: { en: 'Fungus', bn: 'ছত্রাক' },
  rot: { en: 'Rot', bn: 'পচন' },
  discoloration: { en: 'Discoloration', bn: 'বিবর্ণতা' },
  healthy: { en: 'Healthy Crop', bn: 'সুস্থ ফসল' },
  rotten: { en: 'Signs of Rot/Mold', bn: 'পচন/ছত্রাকের লক্ষণ' },
  confidence: { en: 'Confidence', bn: 'নির্ভুলতা' },
  aiReport: { en: 'AI Analysis Report', bn: 'এআই বিশ্লেষণ রিপোর্ট' },
  immediateAction: { en: 'Immediate Action Required', bn: 'জরুরি ব্যবস্থা প্রয়োজন' },
  isolateBatch: { en: 'Isolate this batch immediately and reduce moisture levels to prevent spread.', bn: 'দ্রুত এই ব্যাচটি আলাদা করুন এবং আর্দ্রতা কমান।' },
  goodCondition: { en: 'Good Condition', bn: 'ভালো অবস্থা' },
  healthyMsg: { en: 'Crop looks healthy. Continue regular monitoring schedule.', bn: 'ফসল সুস্থ দেখাচ্ছে। নিয়মিত পর্যবেক্ষণ করুন।' },

  // Landing / Story
  scroll: { en: 'Scroll', bn: 'স্ক্রল করুন' },
  problemTitle: { en: 'The Problem', bn: 'বর্তমান সমস্যা' },
  problemDescMain: { en: 'Bangladesh loses a significant portion of its food grains every year due to inadequate storage.', bn: 'বাংলাদেশে প্রতি বছর অপর্যাপ্ত সংরক্ষণের কারণে বিশাল পরিমাণ খাদ্যশস্য নষ্ট হয়।' },
  problemDescSub: { en: 'Inefficient handling and lack of data contribute to food insecurity, economic waste, and environmental impact directly linked to SDG 12.3.', bn: 'অদক্ষ ব্যবস্থাপনা এবং তথ্যের অভাবে খাদ্য নিরাপত্তা হুমকির মুখে, যা সরাসরি এসডিজি ১২.৩ এর সাথে সম্পর্কিত।' },
  annualLossTitle: { en: 'Annual Food Loss', bn: 'বার্ষিক খাদ্য অপচয়' },
  metricTonnes: { en: 'Metric Tonnes', bn: 'মেট্রিক টন' },
  econImpactTitle: { en: 'Economic Impact', bn: 'অর্থনৈতিক ক্ষতি' },
  usdLost: { en: 'USD Lost Annually', bn: 'মার্কিন ডলার ক্ষতি (বার্ষিক)' },
  modulesTitle: { en: 'Smart Modules', bn: 'স্মার্ট মডিউল' },
  modulesSubtitle: { en: 'for Modern Farming', bn: 'আধুনিক কৃষির জন্য' },
  sysVer: { en: 'System Version 2.0', bn: 'সিস্টেম সংস্করণ ২.০' },
  sysFeat: { en: 'Integrated • Offline-Ready • AI-Powered', bn: 'ইন্টিগ্রেটেড • অফলাইন • এআই চালিত' },
  modWeatherTitle: { en: 'Weather Integration', bn: 'আবহাওয়া বার্তা' },
  modWeatherDesc: { en: 'Hyper-local forecasts and risk alerts based on your specific location.', bn: 'আপনার এলাকার সঠিক পূর্বাভাস এবং ঝুঁকির সতর্কতা।' },
  modRealTime: { en: 'Real-time Data', bn: 'রিয়েল-টাইম তথ্য' },
  modScanTitle: { en: 'Crop Scanner', bn: 'ফসল স্ক্যানার' },
  modScanDesc: { en: 'Early disease detection using on-device AI analysis.', bn: 'এআই বিশ্লেষণের মাধ্যমে দ্রুত রোগ নির্ণয়।' },
  modInstant: { en: 'Instant Analysis', bn: 'তাৎক্ষণিক ফলাফল' },
  modStorageTitle: { en: 'Digital Storage', bn: 'ডিজিটাল মজুদ' },
  modStorageDesc: { en: 'Track crop batches, monitor shelf life, and get storage advice.', bn: 'ফসলের মজুদ ট্র্যাক করুন এবং সংরক্ষণের পরামর্শ নিন।' },
  modCloud: { en: 'Cloud Sync', bn: 'ক্লাউড সিঙ্ক' },
  modCommunityTitle: { en: 'Community Hub', bn: 'কমিউনিটি হাব' },
  modCommunityDesc: { en: 'Connect with buyers, rent equipment, and share farming advice.', bn: 'ক্রেতাদের সাথে যোগাযোগ করুন, যন্ত্রপাতি ভাড়া নিন এবং কৃষি পরামর্শ নিন।' },

  footerMain: { en: 'Less words, more action.', bn: 'কথায় নয়, কাজে বিশ্বাসী।' },
  footerSub: { en: 'Make farming efficient today.', bn: 'আজই কৃষি কাজকে দক্ষ করুন।' },
  goToDash: { en: 'Go to Dashboard', bn: 'ড্যাশবোর্ডে যান' },
  footerCopyright: { en: 'HarvestGuard © 2025 • Designed for Impact', bn: 'হারভেস্ট গার্ড © ২০২৫ • পরিবর্তনের জন্য তৈরি' },

  // Onboarding
  welcomeSetup: { en: 'Welcome to HarvestGuard', bn: 'হারভেস্ট গার্ডে স্বাগতম' },
  letsSetup: { en: "Let's set up your profile to give you the best farming advice.", bn: 'সেরা কৃষি পরামর্শ পেতে আপনার প্রোফাইল তৈরি করুন।' },
  yourName: { en: 'Your Name', bn: 'আপনার নাম' },
  enterName: { en: 'Enter your full name', bn: 'আপনার পুরো নাম লিখুন' },
  yourPhone: { en: 'Phone Number', bn: 'মোবাইল নম্বর' },
  enterPhone: { en: '01xxxxxxxxx', bn: '০১xxxxxxxxx' },
  phoneError: { en: 'Invalid phone number (must be 11 digits starting with 01)', bn: 'সঠিক মোবাইল নম্বর দিন (০১ দিয়ে শুরু ১১ ডিজিট)' },
  phoneErrorPrefix: { en: 'Must start with 01', bn: 'নম্বর অবশ্যই ০১ দিয়ে শুরু হতে হবে' },
  phoneErrorLength: { en: 'Must be 11 digits', bn: 'নম্বর ১১ সংখ্যার হতে হবে' },
  phoneErrorOperator: { en: 'Invalid operator code', bn: 'অবৈধ অপারেটর কোড' },
  phoneValid: { en: 'Valid Number', bn: 'সঠিক নম্বর' },
  confirmNumber: { en: 'Confirm Number', bn: 'নম্বর নিশ্চিত করুন' },
  isNumberCorrect: { en: 'Is this number correct?', bn: 'এই নম্বরটি কি সঠিক?' },
  yesConfirm: { en: 'Yes, Confirm', bn: 'হ্যাঁ, নিশ্চিত করুন' },
  edit: { en: 'Edit', bn: 'পরিবর্তন' },
  yourPhoto: { en: 'Profile Photo', bn: 'প্রোফাইল ছবি' },
  tapToUpload: { en: 'Tap to upload photo', bn: 'ছবি আপলোড করতে ট্যাপ করুন' },
  selectLanguage: { en: 'Preferred Language', bn: 'পছন্দের ভাষা' },
  next: { en: 'Next', bn: 'পরবর্তী' },
  finish: { en: 'Finish Setup', bn: 'সেটআপ শেষ করুন' },
  selectLocation: { en: 'Select Your Area', bn: 'আপনার এলাকা নির্বাচন করুন' },
  locDesc: { en: 'This helps us provide accurate weather and crop advice.', bn: 'এটি সঠিক আবহাওয়া এবং ফসলের পরামর্শ দিতে সাহায্য করবে।' },
  
  // Onboarding - Step 3
  profileReady: { en: 'Profile Ready!', bn: 'প্রোফাইল প্রস্তুত!' },
  addFirstCrop: { en: 'Add your first harvest now to get tailored weather alerts and risk insights immediately.', bn: 'তাৎক্ষণিক আবহাওয়া সতর্কতা এবং ঝুঁকির তথ্য পেতে এখনই আপনার প্রথম ফসল যুক্ত করুন।' },
  addCropNow: { en: 'Add Crop Now', bn: 'ফসল যুক্ত করুন' },
  skipToDash: { en: 'Skip to Dashboard', bn: 'ড্যাশবোর্ডে যান' },

  // Tutorial
  tutSkip: { en: 'Skip', bn: 'এড়িয়ে যান' },
  tutWelcome: { en: 'Welcome to HarvestGuard!', bn: 'হারভেস্ট গার্ডে স্বাগতম!' },
  tutWelcomeDesc: { en: "Let's take a quick tour of your new farming assistant.", bn: 'আসুন আপনার নতুন কৃষি সহকারীর সাথে পরিচিত হই।' },
  tutDash: { en: 'Dashboard', bn: 'ড্যাশবোর্ড' },
  tutDashDesc: { en: 'View all your active harvests, storage status, and risk alerts in one place.', bn: 'আপনার সব ফসল, মজুদ অবস্থা এবং ঝুঁকির সতর্কতা এক জায়গায় দেখুন।' },
  tutAdd: { en: 'Add Harvest', bn: 'ফসল যুক্ত করুন' },
  tutAddDesc: { en: 'Register new crops to start tracking their safety and shelf life.', bn: 'ফসলের নিরাপত্তা এবং স্থায়িত্ব ট্র্যাক করতে নতুন ফসল নিবন্ধন করুন।' },
  tutWeather: { en: 'Weather Advisory', bn: 'আবহাওয়া পরামর্শ' },
  tutWeatherDesc: { en: 'Get hyper-local weather alerts tailored to your specific crop needs.', bn: 'আপনার ফসলের জন্য নির্দিষ্ট আবহাওয়া সতর্কতা পান।' },
  tutScanner: { en: 'Crop Scanner', bn: 'ফসল স্ক্যানার' },
  tutScannerDesc: { en: 'Take a photo of your crop to detect diseases instantly using AI.', bn: 'এআই ব্যবহার করে রোগ নির্ণয় করতে আপনার ফসলের ছবি তুলুন।' },
  tutFinish: { en: "You're all set!", bn: 'আপনি প্রস্তুত!' },
  tutFinishDesc: { en: 'Start using HarvestGuard to protect your crops today.', bn: 'আজই আপনার ফসল রক্ষা করতে হারভেস্ট গার্ড ব্যবহার শুরু করুন।' },
  tutStart: { en: 'Start Farming', bn: 'কাজ শুরু করুন' },

  // Workflow
  howItWorks: { en: 'How It Works', bn: 'কিভাবে কাজ করে' },
  workflowSubtitle: { en: 'From Data to Saved Harvest', bn: 'তথ্য থেকে ফসল রক্ষা' },
  step1Title: { en: 'Data', bn: 'তথ্য সংগ্রহ' },
  step1Desc: { en: 'Weather & Sensors', bn: 'আবহাওয়া ও সেন্সর' },
  step2Title: { en: 'Warning', bn: 'সতর্কতা' },
  step2Desc: { en: 'AI Risk Analysis', bn: 'এআই ঝুঁকি বিশ্লেষণ' },
  step3Title: { en: 'Action', bn: 'পদক্ষেপ' },
  step3Desc: { en: 'Protective Measures', bn: 'প্রতিরক্ষামূলক ব্যবস্থা' },
  step4Title: { en: 'Saved', bn: 'ফসল রক্ষা' },
  step4Desc: { en: 'Secure Harvest', bn: 'নিরাপদ ফসল' },
  
  // Risk Map
  riskMapTitle: { en: 'Community Risk Map', bn: 'কমিউনিটি ঝুঁকি মানচিত্র' },
  riskMapDesc: { en: 'View real-time crop risks in your area anonymously.', bn: 'আপনার এলাকার ফসলের ঝুঁকি দেখুন (নামহীন)।' },
  yourLocation: { en: 'Your Location', bn: 'আপনার অবস্থান' },
  neighborRisk: { en: 'Neighbor Risk', bn: 'প্রতিবেশীর ঝুঁকি' },
  updated: { en: 'Updated', bn: 'আপডেট' },
  minsAgo: { en: 'mins ago', bn: 'মিনিট আগে' },

  // Community
  comTitle: { en: 'Community Needs', bn: 'কমিউনিটি' },
  comDesc: { en: 'Connect with farmers and buyers near you.', bn: 'আপনার এলাকার কৃষক এবং ক্রেতাদের সাথে যুক্ত হন।' },
  createPost: { en: 'Create Post', bn: 'নতুন পোস্ট' },
  filterCat: { en: 'Category', bn: 'ক্যাটাগরি' },
  searchPosts: { en: 'Search posts...', bn: 'পোস্ট খুঁজুন...' },
  contact: { en: 'Contact', bn: 'যোগাযোগ' },
  postedBy: { en: 'Posted by', bn: 'পোস্টদাতা' },
  postTitle: { en: 'Post Title', bn: 'পোস্টের শিরোনাম' },
  postDesc: { en: 'Description', bn: 'বিবরণ' },
  submitPost: { en: 'Submit Post', bn: 'পোস্ট করুন' },
  voiceInput: { en: 'Tap to Speak', bn: 'কথা বলতে ট্যাপ করুন' },
  listening: { en: 'Listening...', bn: 'শুনছি...' },
};