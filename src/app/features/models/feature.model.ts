export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive';
  metadata?: Record<string, any>;
}

export interface FeatureResponse {
  items: FeatureItem[];
  total: number;
  page: number;
  pageSize: number;
}
