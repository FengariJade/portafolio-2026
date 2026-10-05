export interface StatCard {
  label: string;
  value: string | number;
  sub: string;
  icon: string;
  color: string;
  bg: string;
}

export interface RecentDelivery {
  id: string;
  sender: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'failed';
  date: string;
}

export interface Alert {
  type: 'warning' | 'danger';
  icon: string;
  message: string;
  detail: string;
}