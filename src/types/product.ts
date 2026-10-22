export type ProductCategory = 
  | 'smartphones'
  | 'laptops'
  | 'tablets'
  | 'wearables'
  | 'audio'
  | 'accessories';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  nameEn: string;
  description: string;
  iconName: string;
  itemCount: number;
  imageUrl: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface StorageVariant {
  size: string;
  priceDelta: number; // difference from base price in SAR
}

export interface ProductSpecs {
  processor: string;
  ram: string;
  storage: string;
  screenSize: string;
  screenType: string;
  refreshRate?: string;
  battery: string;
  charging?: string;
  mainCamera?: string;
  frontCamera?: string;
  operatingSystem: string;
  connectivity: string;
  weight: string;
  dimensions?: string;
  warranty: string;
  ports?: string;
  audioFeatures?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  brand: string;
  category: ProductCategory;
  price: number; // in SAR
  originalPrice?: number;
  discountPercentage?: number;
  rating: number; // e.g. 4.8
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isDeal?: boolean;
  heroHeadline?: string;
  shortDescription: string;
  fullDescription: string;
  badge?: string;
  leadTime: string; // e.g., "توصيل فوري خلال 24 ساعة"
  images: string[];
  colors: ProductColor[];
  storageVariants: StorageVariant[];
  specs: ProductSpecs;
  highlights: string[];
  usageSuitability: string[]; // e.g. ["ألعاب ثقيلة", "تصميم ومونتاج"]
  targetUse: 'gaming' | 'business' | 'creators' | 'daily' | 'audio';
  budgetTier: 'entry' | 'mid' | 'flagship';
}

export interface FilterState {
  searchQuery: string;
  category: ProductCategory | 'all';
  brand: string | 'all';
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  hasDiscountOnly: boolean;
  minRam?: string;
  targetUse?: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}
