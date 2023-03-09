export interface Social {
  title: string;
  startAt: string;
  venue: string;
  capacity: number;
  price: number;
  description: string;
  isManualApprove?: boolean;
  privacy: string;
  banner: string;
  tags: string[];
}

export interface SocialError {
  title?: string;
  startAt?: string;
  venue?: string;
  capacity?: string;
  price?: string;
  description?: string;
  isManualApprove?: string;
  privacy?: string;
  banner?: string;
  tags?: string;
}
