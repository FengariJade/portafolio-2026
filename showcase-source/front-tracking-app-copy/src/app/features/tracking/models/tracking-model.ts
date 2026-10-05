export interface TrackingDelivery {
  id: string;
  packageId: string;
  senderName: string;
  recipientName: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'failed';
  driver: string;
  driverPhone: string;
  truck: string;
  createdAt: string;
  estimatedDate: string;
  weight: number;
  category: string;
  width: number;
  height: number;
  length: number;
  currentLocation: string;
  eta: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  status: string;
  label: string;
  description: string;
  date: string;
  done: boolean;
  active: boolean;
}

export interface ActiveTruck {
  id: string;
  plate: string;
  driver: string;
  city: string;
  status: string;
  deliveries: number;
}