

export type Language = 'en' | 'bn';

export interface CropBatch {
  id: string;
  cropType: string;
  weightKg: number;
  harvestDate: string;
  division: string;
  upazila?: string;
  union?: string; 
  storageType: string;
  status: 'active' | 'sold' | 'loss';
  etclHours?: number; // Estimated Time to Critical Loss
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface ForecastDay {
  dayName: string; // 'Sun', 'Mon' etc. or 'Today'
  tempHigh: number;
  tempLow: number;
  rainChance: number;
  condition: string; // 'Sunny', 'Cloudy', 'Rainy'
}

export interface FarmingTip {
  category: 'irrigation' | 'spraying' | 'fertilizer';
  action: 'recommended' | 'avoid' | 'neutral';
  message: string;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainChance: number;
  windSpeed: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  condition: string;
  location: string;
  forecast: ForecastDay[];
  tips: FarmingTip[];
}

export interface Translation {
  [key: string]: {
    en: string;
    bn: string;
  };
}

export interface FarmerProfile {
  name: string;
  phone: string;
  nid?: string; // National ID Number
  pin?: string; // Security PIN for login
  division: string;
  district: string;
  upazila: string;
  village?: string;
  image?: string; // Base64 string for profile picture
  badges: string[];
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorLocation: string;
  category: 'Buyer Needed' | 'Seller Available' | 'Equipment' | 'Labor' | 'Transport' | 'Advice';
  title: string;
  description: string;
  date: string;
  contactPhone: string;
}