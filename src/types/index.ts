export type Currency = 'USD' | 'EUR' | 'GBP' | 'AED' | 'JPY';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // conversion relative to USD
  label: string;
  flag: string;
}

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  region: string;
  tag: string;
  mainImage: string;
  galleryImages: string[];
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  climateTemp: string;
  features: string[];
  description: string;
  bestMonths: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  featured: boolean;
}

export type VillaCategory = 'Islands' | 'Yacht Charters' | 'Chateaux' | 'Safaris';

export interface VillaCharter {
  id: string;
  name: string;
  category: VillaCategory;
  location: string;
  guests: number;
  bedrooms: number;
  pricePerNight: number;
  image: string;
  gallery: string[];
  highlights: string[];
  butlerIncluded: boolean;
  helipad: boolean;
  privateDock: boolean;
  rating: number;
}

export interface CustomExperienceOption {
  id: string;
  name: string;
  category: 'aviation' | 'dining' | 'excursion' | 'wellness';
  price: number;
  description: string;
  iconName: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  authorTitle: string;
  readTime: string;
  date: string;
  image: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  title: string;
  source: string;
  avatar: string;
  quote: string;
  rating: number;
  destinationBooked: string;
  isPress: boolean;
}

export interface BookingFormData {
  destinationId: string;
  destinationName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  suites: number;
  addons: string[];
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}
