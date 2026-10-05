export interface TrackingEvent {
  status:      string;
  description: string;
  timestamp:   string;
  location?:   string;
}

export interface TrackingResult {
  trackingCode:      string;
  trackingStatus:    'CREATED' | 'PICKED_UP' | 'AT_ORIGIN_WAREHOUSE' | 'IN_TRANSIT' | 'AT_DESTINATION_WAREHOUSE' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED_ATTEMPT' | 'RETURNED_TO_SENDER' | 'EXCEPTION';
  senderName:        string;
  senderAddress:     string;
  receiverName:      string;
  receiverAddress:   string;
  createdAt:         string;
  updatedAt:         string;
}