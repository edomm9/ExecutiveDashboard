export type ViewKey =
  | 'overview'
  | 'egp'
  | 'fleet'
  | 'dms'
  | 'pms'
  | 'health';

export type TrendDirection = 'up' | 'down' | 'flat';

export interface Kpi {
  id: string;
  label: string;
  value: string;
  sub: string;
  trend: number;
  trendDirection: TrendDirection;
  accent: 'brand' | 'emerald' | 'amber' | 'rose' | 'slate';
  icon: string;
}

export interface Tender {
  id: string;
  procuringEntity: string;
  title: string;
  category: string;
  budget: number;
  status: 'Open' | 'Evaluation' | 'Awarded' | 'Closed';
  closingDate: string;
  bidders: number;
  region: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  type: 'Sedan' | 'Pickup' | 'Station Wagon' | 'Bus' | 'Truck';
  assignedTo: string;
  status: 'Active' | 'Maintenance' | 'Idle';
  fuelCost: number;
  inspectionDue: string | null;
  insuranceDue: string | null;
  odometer: number;
}

export interface DocItem {
  id: string;
  title: string;
  category: 'Procurement Directive' | 'Framework Contract' | 'Audit Report' | 'Legal Memo';
  uploadedBy: string;
  date: string;
  status: 'Pending Sign-off' | 'In Review' | 'Signed' | 'Archived';
  priority: 'High' | 'Normal' | 'Low';
}

export interface AssetItem {
  id: string;
  name: string;
  category: 'IT Equipment' | 'Office Furniture' | 'Heavy Machinery/Vehicles' | 'Building';
  location: string;
  value: number;
  status: 'In Use' | 'In Storage' | 'Surplus' | 'Pending Disposal';
  custodian: string;
}

export interface TransferRecord {
  id: string;
  assetName: string;
  from: string;
  to: string;
  type: 'Transfer' | 'Disposal' | 'Reassignment';
  date: string;
  value: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  system: 'E-GP' | 'e-Fleet' | 'DMS' | 'PMS' | 'Auth' | 'Core';
  level: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  message: string;
  user: string;
}

export interface SubSystemHealth {
  key: ViewKey;
  name: string;
  uptime: number;
  latency: number;
  status: 'Operational' | 'Degraded' | 'Down';
  incidents: number;
  icon: string;
}
