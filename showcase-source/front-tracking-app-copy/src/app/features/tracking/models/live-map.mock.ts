import { ActiveTruck } from '../models/tracking-model'

export const activeTrucks= [
  { id: 'TRK-001', plate: 'ABC-123', driver: 'Carlos López', city: 'Lima',     status: 'in_transit', deliveries: 3 },
  { id: 'TRK-002', plate: 'XYZ-456', driver: 'Ana Torres',   city: 'Abancay',  status: 'in_transit', deliveries: 1 },
  { id: 'TRK-003', plate: 'LMN-789', driver: 'Miguel S.',    city: 'Pucallpa', status: 'in_transit', deliveries: 2 },
  { id: 'TRK-004', plate: 'GHI-654', driver: 'Rosa Chávez',  city: 'Trujillo', status: 'active',     deliveries: 0 },
];