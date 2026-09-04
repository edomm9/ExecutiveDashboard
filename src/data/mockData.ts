import type {
  Kpi,
  Tender,
  Vehicle,
  DocItem,
  AssetItem,
  TransferRecord,
  SystemLog,
  SubSystemHealth,
} from '@/types';

export const formatETB = (value: number, compact = false): string => {
  if (compact) {
    if (Math.abs(value) >= 1_000_000_000)
      return `ETB ${(value / 1_000_000_000).toFixed(1)}B`;
    if (Math.abs(value) >= 1_000_000) return `ETB ${(value / 1_000_000).toFixed(1)}M`;
    if (Math.abs(value) >= 1_000) return `ETB ${(value / 1_000).toFixed(0)}K`;
  }
  return `ETB ${value.toLocaleString('en-US')}`;
};

export const overviewKpis: Kpi[] = [
  {
    id: 'proc-value',
    label: 'Procurement Value (YTD)',
    value: 'ETB 597.6B',
    sub: 'Processed across all tenders',
    trend: 14,
    trendDirection: 'up',
    accent: 'brand',
    icon: 'TrendingUp',
  },
  {
    id: 'active-tenders',
    label: 'Active Government Tenders',
    value: '1,284',
    sub: 'Across 11 regions',
    trend: 8,
    trendDirection: 'up',
    accent: 'emerald',
    icon: 'FileText',
  },
  {
    id: 'fleet-status',
    label: 'Fleet Operational',
    value: '92.4%',
    sub: '412 of 446 vehicles active',
    trend: 2,
    trendDirection: 'up',
    accent: 'amber',
    icon: 'Truck',
  },
  {
    id: 'asset-value',
    label: 'Total Asset Valuation',
    value: 'ETB 8.42B',
    sub: 'Under PMS management',
    trend: 5,
    trendDirection: 'up',
    accent: 'slate',
    icon: 'Building2',
  },
  {
    id: 'pending-approvals',
    label: 'Pending Executive Approvals',
    value: '23',
    sub: '7 high-priority items',
    trend: 12,
    trendDirection: 'down',
    accent: 'rose',
    icon: 'AlertCircle',
  },
];

export const procurementTrend = [
  { month: 'Sep', procurement: 38.2, assets: 6.1 },
  { month: 'Oct', procurement: 42.5, assets: 6.4 },
  { month: 'Nov', procurement: 45.1, assets: 6.8 },
  { month: 'Dec', procurement: 51.3, assets: 7.0 },
  { month: 'Jan', procurement: 48.7, assets: 7.2 },
  { month: 'Feb', procurement: 54.6, assets: 7.5 },
  { month: 'Mar', procurement: 58.9, assets: 7.8 },
  { month: 'Apr', procurement: 61.2, assets: 8.1 },
  { month: 'May', procurement: 56.4, assets: 8.2 },
  { month: 'Jun', procurement: 63.8, assets: 8.4 },
  { month: 'Jul', procurement: 67.1, assets: 8.4 },
  { month: 'Aug', procurement: 71.5, assets: 8.4 },
];

export const systemHealth: SubSystemHealth[] = [
  {
    key: 'egp',
    name: 'E-GP System',
    uptime: 99.97,
    latency: 142,
    status: 'Operational',
    incidents: 0,
    icon: 'FileText',
  },
  {
    key: 'fleet',
    name: 'e-Fleet Management',
    uptime: 99.89,
    latency: 98,
    status: 'Operational',
    incidents: 1,
    icon: 'Truck',
  },
  {
    key: 'dms',
    name: 'Document Management',
    uptime: 99.95,
    latency: 76,
    status: 'Operational',
    incidents: 0,
    icon: 'FolderOpen',
  },
  {
    key: 'pms',
    name: 'Property Management',
    uptime: 99.82,
    latency: 118,
    status: 'Degraded',
    incidents: 2,
    icon: 'Building2',
  },
];

export const egpMetrics = [
  { label: 'Total Published Tenders', value: '3,642', sub: 'All-time', trend: 6, direction: 'up' as const },
  { label: 'Active Bidders', value: '18,407', sub: 'Registered suppliers', trend: 11, direction: 'up' as const },
  { label: 'Contract Awards Value (YTD)', value: 'ETB 412.8B', sub: '1,156 awards', trend: 9, direction: 'up' as const },
  { label: 'Avg. Bidding Cycle', value: '21 days', sub: 'Target: 18 days', trend: -3, direction: 'down' as const },
];

export const egpTenders: Tender[] = [
  { id: 'EGP-2026-0481', procuringEntity: 'Ministry of Finance', title: 'Supply of Enterprise Network Infrastructure', category: 'ICT Equipment', budget: 845_000_000, status: 'Open', closingDate: '2026-09-28', bidders: 34, region: 'Addis Ababa' },
  { id: 'EGP-2026-0479', procuringEntity: 'Ethiopian Electric Power', title: 'Construction of 400kV Transmission Towers', category: 'Construction', budget: 1_240_000_000, status: 'Evaluation', closingDate: '2026-09-15', bidders: 12, region: 'Oromia' },
  { id: 'EGP-2026-0475', procuringEntity: 'Addis Ababa City Administration', title: 'Solid Waste Management Fleet Procurement', category: 'Vehicles & Machinery', budget: 320_000_000, status: 'Awarded', closingDate: '2026-08-30', bidders: 21, region: 'Addis Ababa' },
  { id: 'EGP-2026-0470', procuringEntity: 'Ministry of Health', title: 'Supply of Medical Laboratory Reagents', category: 'Medical Supplies', budget: 178_500_000, status: 'Open', closingDate: '2026-10-05', bidders: 18, region: 'National' },
  { id: 'EGP-2026-0468', procuringEntity: 'Ethiopian Roads Authority', title: 'Rehabilitation of Awash–Gewane Highway', category: 'Construction', budget: 2_850_000_000, status: 'Evaluation', closingDate: '2026-09-20', bidders: 9, region: 'Afar' },
  { id: 'EGP-2026-0462', procuringEntity: 'Ministry of Education', title: 'Procurement of STEM Laboratory Equipment', category: 'Educational Supplies', budget: 96_400_000, status: 'Awarded', closingDate: '2026-08-18', bidders: 27, region: 'National' },
  { id: 'EGP-2026-0458', procuringEntity: 'Addis Ababa Water & Sewerage Authority', title: 'Pipe Manufacturing & Supply Contract', category: 'Construction Materials', budget: 412_000_000, status: 'Closed', closingDate: '2026-08-10', bidders: 15, region: 'Addis Ababa' },
  { id: 'EGP-2026-0455', procuringEntity: 'Ministry of Agriculture', title: 'Supply of Irrigation Pumps & Generators', category: 'Agricultural Equipment', budget: 263_700_000, status: 'Open', closingDate: '2026-10-12', bidders: 22, region: 'Amhara' },
  { id: 'EGP-2026-0451', procuringEntity: 'Ethiopian Airlines Group', title: 'Ground Support Equipment Maintenance', category: 'Aviation Services', budget: 540_000_000, status: 'Evaluation', closingDate: '2026-09-22', bidders: 11, region: 'Addis Ababa' },
  { id: 'EGP-2026-0448', procuringEntity: 'Ministry of Water & Energy', title: 'Rural Electrification Solar Panels', category: 'Energy Equipment', budget: 690_000_000, status: 'Awarded', closingDate: '2026-08-25', bidders: 19, region: 'SNNPR' },
  { id: 'EGP-2026-0443', procuringEntity: 'Oromia Regional Bureau', title: 'School Furniture Supply for 120 Schools', category: 'Office Furniture', budget: 84_200_000, status: 'Closed', closingDate: '2026-07-30', bidders: 31, region: 'Oromia' },
  { id: 'EGP-2026-0440', procuringEntity: 'Ministry of Transport & Logistics', title: 'Fleet Telematics System Implementation', category: 'ICT Services', budget: 215_000_000, status: 'Open', closingDate: '2026-10-18', bidders: 14, region: 'National' },
  { id: 'EGP-2026-0436', procuringEntity: 'Defense Ministry', title: 'Supply of Field Communication Equipment', category: 'ICT Equipment', budget: 1_120_000_000, status: 'Evaluation', closingDate: '2026-09-30', bidders: 7, region: 'National' },
  { id: 'EGP-2026-0432', procuringEntity: 'Amhara Regional Health Bureau', title: 'Mobile Health Clinic Vehicles', category: 'Vehicles & Machinery', budget: 187_600_000, status: 'Awarded', closingDate: '2026-08-12', bidders: 16, region: 'Amhara' },
  { id: 'EGP-2026-0428', procuringEntity: 'Ministry of Urban Development', title: 'Affordable Housing Construction Phase II', category: 'Construction', budget: 3_400_000_000, status: 'Open', closingDate: '2026-10-25', bidders: 13, region: 'Addis Ababa' },
  { id: 'EGP-2026-0425', procuringEntity: 'Ethiopian Sugar Corporation', title: 'Factory Maintenance Spare Parts', category: 'Industrial Supplies', budget: 298_000_000, status: 'Closed', closingDate: '2026-07-28', bidders: 10, region: 'Oromia' },
];

export const fleetMetrics = [
  { label: 'Total Fleet Size', value: '446', sub: 'Across 9 depots', trend: 3, direction: 'up' as const },
  { label: 'Active Vehicles', value: '412', sub: '92.4% operational', trend: 2, direction: 'up' as const },
  { label: 'Fuel Consumption (Monthly)', value: 'ETB 12.8M', sub: 'Diesel + Petrol', trend: -5, direction: 'down' as const },
  { label: 'Maintenance Alerts', value: '17', sub: '6 urgent inspections', trend: 4, direction: 'up' as const },
];

export const fleetVehicles: Vehicle[] = [
  { id: 'V-001', plate: 'AA 3-45281', type: 'Sedan', assignedTo: 'Office of the Director General', status: 'Active', fuelCost: 8_400, inspectionDue: null, insuranceDue: null, odometer: 48200 },
  { id: 'V-002', plate: 'AA 3-45282', type: 'Pickup', assignedTo: 'Field Audit Team — Oromia', status: 'Active', fuelCost: 12_600, inspectionDue: '2026-09-18', insuranceDue: null, odometer: 91400 },
  { id: 'V-003', plate: 'AA 3-45283', type: 'Station Wagon', assignedTo: 'Board Secretariat', status: 'Active', fuelCost: 7_200, inspectionDue: null, insuranceDue: '2026-10-02', odometer: 31800 },
  { id: 'V-004', plate: 'AA 3-45284', type: 'Bus', assignedTo: 'Staff Transport — Lideta Depot', status: 'Maintenance', fuelCost: 18_900, inspectionDue: '2026-09-06', insuranceDue: null, odometer: 167500 },
  { id: 'V-005', plate: 'AA 3-45285', type: 'Truck', assignedTo: 'Asset Logistics — PMS', status: 'Active', fuelCost: 22_100, inspectionDue: null, insuranceDue: '2026-09-12', odometer: 203800 },
  { id: 'V-006', plate: 'AA 3-45286', type: 'Sedan', assignedTo: 'Deputy DG — Operations', status: 'Active', fuelCost: 6_800, inspectionDue: null, insuranceDue: null, odometer: 24100 },
  { id: 'V-007', plate: 'AA 3-45287', type: 'Pickup', assignedTo: 'Regional Office — Bahir Dar', status: 'Idle', fuelCost: 4_200, inspectionDue: '2026-09-20', insuranceDue: '2026-09-25', odometer: 73900 },
  { id: 'V-008', plate: 'AA 3-45288', type: 'Station Wagon', assignedTo: 'Legal Affairs Directorate', status: 'Active', fuelCost: 6_500, inspectionDue: null, insuranceDue: null, odometer: 28700 },
  { id: 'V-009', plate: 'AA 3-45289', type: 'Bus', assignedTo: 'Staff Transport — Mekanisa Depot', status: 'Maintenance', fuelCost: 17_400, inspectionDue: '2026-09-08', insuranceDue: null, odometer: 142300 },
  { id: 'V-010', plate: 'AA 3-45290', type: 'Sedan', assignedTo: 'Procurement Directorate', status: 'Active', fuelCost: 7_900, inspectionDue: null, insuranceDue: '2026-11-15', odometer: 39600 },
  { id: 'V-011', plate: 'AA 3-45291', type: 'Pickup', assignedTo: 'Property Inspection Team', status: 'Active', fuelCost: 11_300, inspectionDue: '2026-09-22', insuranceDue: null, odometer: 85600 },
  { id: 'V-012', plate: 'AA 3-45292', type: 'Truck', assignedTo: 'Warehouse — Kaliti Depot', status: 'Idle', fuelCost: 3_800, inspectionDue: null, insuranceDue: '2026-09-30', odometer: 178400 },
];

export const vehicleTypeBreakdown = [
  { type: 'Sedans', count: 168, color: '#3366ff' },
  { type: 'Pickups', count: 112, color: '#10b981' },
  { type: 'Station Wagons', count: 84, color: '#f59e0b' },
  { type: 'Buses', count: 52, color: '#8b5cf6' },
  { type: 'Trucks', count: 30, color: '#ef4444' },
];

export const fleetAlerts = [
  { id: 'FA-1', vehicleId: 'V-004', plate: 'AA 3-45284', severity: 'urgent' as const, message: 'Technical inspection overdue by 2 days', type: 'Inspection' },
  { id: 'FA-2', vehicleId: 'V-009', plate: 'AA 3-45289', severity: 'urgent' as const, message: 'Technical inspection due in 4 days', type: 'Inspection' },
  { id: 'FA-3', vehicleId: 'V-005', plate: 'AA 3-45285', severity: 'warning' as const, message: 'Insurance renewal due in 8 days', type: 'Insurance' },
  { id: 'FA-4', vehicleId: 'V-007', plate: 'AA 3-45287', severity: 'warning' as const, message: 'Insurance renewal due in 21 days', type: 'Insurance' },
  { id: 'FA-5', vehicleId: 'V-012', plate: 'AA 3-45292', severity: 'warning' as const, message: 'Insurance renewal due in 26 days', type: 'Insurance' },
  { id: 'FA-6', vehicleId: 'V-002', plate: 'AA 3-45282', severity: 'info' as const, message: 'Technical inspection due in 14 days', type: 'Inspection' },
];

export const dmsMetrics = [
  { label: 'Total Digitized Documents', value: '284,610', sub: 'Across all directorates', trend: 7, direction: 'up' as const },
  { label: 'Documents Processed Today', value: '1,842', sub: 'Avg. 2.1s per document', trend: 4, direction: 'up' as const },
  { label: 'Pending Review Queue', value: '146', sub: '38 require executive sign-off', trend: -2, direction: 'down' as const },
  { label: 'Digital Signature Rate', value: '94.6%', sub: 'e-signature adoption', trend: 3, direction: 'up' as const },
];

export const dmsCategoryBreakdown = [
  { category: 'Procurement Directives', count: 84200, color: '#3366ff' },
  { category: 'Framework Contracts', count: 61300, color: '#10b981' },
  { category: 'Audit Reports', count: 54800, color: '#f59e0b' },
  { category: 'Legal Memos', count: 42100, color: '#ef4444' },
  { category: 'Other', count: 42210, color: '#64748b' },
];

export const dmsDocuments: DocItem[] = [
  { id: 'DOC-2026-8841', title: 'FY2026 Public Procurement Directive Amendment', category: 'Procurement Directive', uploadedBy: 'Policy Directorate', date: '2026-09-03', status: 'Pending Sign-off', priority: 'High' },
  { id: 'DOC-2026-8837', title: 'National Framework Contract — Medical Supplies', category: 'Framework Contract', uploadedBy: 'Procurement Directorate', date: '2026-09-02', status: 'Pending Sign-off', priority: 'High' },
  { id: 'DOC-2026-8830', title: 'Annual Compliance Audit Report — Q4 FY2025', category: 'Audit Report', uploadedBy: 'Internal Audit', date: '2026-09-01', status: 'In Review', priority: 'Normal' },
  { id: 'DOC-2026-8825', title: 'Legal Opinion — Cross-Border Procurement MOU', category: 'Legal Memo', uploadedBy: 'Legal Affairs', date: '2026-08-30', status: 'Pending Sign-off', priority: 'High' },
  { id: 'DOC-2026-8818', title: 'Framework Agreement — IT Equipment Supply', category: 'Framework Contract', uploadedBy: 'ICT Directorate', date: '2026-08-29', status: 'In Review', priority: 'Normal' },
  { id: 'DOC-2026-8812', title: 'Procurement Directive — SME Preference Scheme', category: 'Procurement Directive', uploadedBy: 'Policy Directorate', date: '2026-08-28', status: 'Signed', priority: 'Normal' },
  { id: 'DOC-2026-8805', title: 'Performance Audit — e-Fleet Utilization', category: 'Audit Report', uploadedBy: 'Internal Audit', date: '2026-08-27', status: 'Signed', priority: 'Low' },
  { id: 'DOC-2026-8799', title: 'Legal Memo — Dispute Resolution Clause Update', category: 'Legal Memo', uploadedBy: 'Legal Affairs', date: '2026-08-26', status: 'Archived', priority: 'Low' },
  { id: 'DOC-2026-8791', title: 'Framework Contract — Fuel Supply Agreement', category: 'Framework Contract', uploadedBy: 'Logistics Directorate', date: '2026-08-25', status: 'Pending Sign-off', priority: 'Normal' },
  { id: 'DOC-2026-8785', title: 'Procurement Directive — Green Procurement Policy', category: 'Procurement Directive', uploadedBy: 'Policy Directorate', date: '2026-08-24', status: 'In Review', priority: 'Normal' },
];

export const pmsMetrics = [
  { label: 'Total Fixed Assets', value: '48,265', sub: 'Tracked items', trend: 2, direction: 'up' as const },
  { label: 'Warehouses & Depots', value: '14', sub: '9 regions covered', trend: 0, direction: 'flat' as const },
  { label: 'Surplus/Obsolete Value', value: 'ETB 312.4M', sub: 'Pending disposal review', trend: 6, direction: 'up' as const },
  { label: 'Asset Utilization Rate', value: '87.3%', sub: 'In-use vs. stored', trend: 3, direction: 'up' as const },
];

export const pmsAssetDistribution = [
  { category: 'IT Equipment', value: 2.14, count: 18400, color: '#3366ff' },
  { category: 'Office Furniture', value: 1.38, count: 16200, color: '#10b981' },
  { category: 'Heavy Machinery/Vehicles', value: 3.62, count: 8600, color: '#f59e0b' },
  { category: 'Buildings & Facilities', value: 1.28, count: 465, color: '#8b5cf6' },
];

export const pmsAssets: AssetItem[] = [
  { id: 'AST-48201', name: 'Dell PowerEdge R760 Server Rack', category: 'IT Equipment', location: 'HQ Data Center — Addis Ababa', value: 4_200_000, status: 'In Use', custodian: 'ICT Directorate' },
  { id: 'AST-48198', name: 'Toyota Land Cruiser (2024)', category: 'Heavy Machinery/Vehicles', location: 'Lideta Depot', value: 6_800_000, status: 'In Use', custodian: 'Field Operations' },
  { id: 'AST-48192', name: 'Ergonomic Executive Workstation Set (x40)', category: 'Office Furniture', location: 'HQ — 4th Floor', value: 1_120_000, status: 'In Use', custodian: 'Facilities' },
  { id: 'AST-48188', name: 'Caterpillar 320 Excavator', category: 'Heavy Machinery/Vehicles', location: 'Kaliti Depot', value: 12_400_000, status: 'In Storage', custodian: 'Construction Bureau' },
  { id: 'AST-48180', name: 'HP EliteDesk 800 G9 Desktop (x120)', category: 'IT Equipment', location: 'HQ — Multiple Floors', value: 7_680_000, status: 'In Use', custodian: 'ICT Directorate' },
  { id: 'AST-48175', name: 'Conference Hall Seating System', category: 'Office Furniture', location: 'HQ — Conference Wing', value: 2_340_000, status: 'In Use', custodian: 'Facilities' },
  { id: 'AST-48170', name: 'Isuzu FVR Cargo Truck', category: 'Heavy Machinery/Vehicles', location: 'Mekanisa Depot', value: 4_900_000, status: 'Surplus', custodian: 'Logistics Directorate' },
  { id: 'AST-48165', name: 'Cisco Catalyst 9300 Switch (x8)', category: 'IT Equipment', location: 'Regional Office — Bahir Dar', value: 3_200_000, status: 'In Use', custodian: 'ICT Directorate' },
  { id: 'AST-48160', name: 'Office Partition Wall System', category: 'Office Furniture', location: 'HQ — 2nd Floor', value: 860_000, status: 'Pending Disposal', custodian: 'Facilities' },
  { id: 'AST-48155', name: 'Komatsu PC200 Hydraulic Excavator', category: 'Heavy Machinery/Vehicles', location: 'Adama Depot', value: 9_800_000, status: 'In Use', custodian: 'Construction Bureau' },
];

export const pmsTransfers: TransferRecord[] = [
  { id: 'TR-2026-0341', assetName: 'Toyota Land Cruiser (2024)', from: 'Field Operations', to: 'Board Secretariat', type: 'Reassignment', date: '2026-09-03', value: 6_800_000, status: 'Pending' },
  { id: 'TR-2026-0338', assetName: 'Isuzu FVR Cargo Truck', from: 'Mekanisa Depot', to: 'Asset Disposal Committee', type: 'Disposal', date: '2026-09-01', value: 4_900_000, status: 'Pending' },
  { id: 'TR-2026-0335', assetName: 'HP EliteDesk 800 G9 (x15)', from: 'ICT Directorate', to: 'Regional Office — Hawassa', type: 'Transfer', date: '2026-08-30', value: 960_000, status: 'Approved' },
  { id: 'TR-2026-0331', assetName: 'Office Partition Wall System', from: 'HQ — 2nd Floor', to: 'Asset Disposal Committee', type: 'Disposal', date: '2026-08-28', value: 860_000, status: 'Approved' },
  { id: 'TR-2026-0328', assetName: 'Caterpillar 320 Excavator', from: 'Kaliti Depot', to: 'Construction Bureau — Adama', type: 'Transfer', date: '2026-08-26', value: 12_400_000, status: 'Pending' },
  { id: 'TR-2026-0325', assetName: 'Conference Hall Seating System', from: 'Facilities', to: 'New Conference Wing', type: 'Transfer', date: '2026-08-24', value: 2_340_000, status: 'Approved' },
  { id: 'TR-2026-0321', assetName: 'Dell PowerEdge R760 (x2)', from: 'ICT Directorate', to: 'Regional Office — Bahir Dar', type: 'Transfer', date: '2026-08-22', value: 8_400_000, status: 'Rejected' },
  { id: 'TR-2026-0318', assetName: 'Ergonomic Workstation Set (x10)', from: 'HQ — 4th Floor', to: 'Asset Disposal Committee', type: 'Disposal', date: '2026-08-20', value: 280_000, status: 'Approved' },
];

export const systemLogs: SystemLog[] = [
  { id: 'LOG-9841', timestamp: '2026-09-04 09:42:18', system: 'E-GP', level: 'INFO', message: 'Tender EGP-2026-0481 published successfully', user: 'procurement.admin' },
  { id: 'LOG-9840', timestamp: '2026-09-04 09:38:04', system: 'Auth', level: 'WARN', message: 'Failed login attempt for user dg.operations — 3rd attempt', user: 'dg.operations' },
  { id: 'LOG-9839', timestamp: '2026-09-04 09:31:52', system: 'PMS', level: 'ERROR', message: 'Asset sync timeout — Kaliti Depot warehouse node unresponsive', user: 'system' },
  { id: 'LOG-9838', timestamp: '2026-09-04 09:28:15', system: 'DMS', level: 'INFO', message: 'Document DOC-2026-8841 uploaded for executive sign-off', user: 'policy.director' },
  { id: 'LOG-9837', timestamp: '2026-09-04 09:22:41', system: 'e-Fleet', level: 'WARN', message: 'Vehicle V-004 inspection overdue — auto-flag raised', user: 'system' },
  { id: 'LOG-9836', timestamp: '2026-09-04 09:18:03', system: 'E-GP', level: 'INFO', message: 'Bid submission received for EGP-2026-0481 (34th bidder)', user: 'supplier.vendor' },
  { id: 'LOG-9835', timestamp: '2026-09-04 09:12:27', system: 'Core', level: 'CRITICAL', message: 'PMS database replica lag exceeded 5s threshold — failover triggered', user: 'system' },
  { id: 'LOG-9834', timestamp: '2026-09-04 09:08:14', system: 'PMS', level: 'INFO', message: 'Asset transfer TR-2026-0341 submitted for approval', user: 'field.operations' },
  { id: 'LOG-9833', timestamp: '2026-09-04 09:02:51', system: 'DMS', level: 'INFO', message: 'Digital signature applied to DOC-2026-8812', user: 'dg.policy' },
  { id: 'LOG-9832', timestamp: '2026-09-04 08:58:33', system: 'e-Fleet', level: 'INFO', message: 'Fuel consumption report generated for August 2026', user: 'logistics.admin' },
  { id: 'LOG-9831', timestamp: '2026-09-04 08:51:09', system: 'Auth', level: 'INFO', message: 'Executive session established for board.member', user: 'board.member' },
  { id: 'LOG-9830', timestamp: '2026-09-04 08:47:22', system: 'E-GP', level: 'WARN', message: 'Tender EGP-2026-0479 closing date approaching — 11 days remaining', user: 'system' },
  { id: 'LOG-9829', timestamp: '2026-09-04 08:40:16', system: 'PMS', level: 'ERROR', message: 'Warehouse node Kaliti reconnected — sync resumed after 3 retries', user: 'system' },
  { id: 'LOG-9828', timestamp: '2026-09-04 08:34:05', system: 'Core', level: 'INFO', message: 'Scheduled backup completed — 4.2 GB archived to cold storage', user: 'system' },
  { id: 'LOG-9827', timestamp: '2026-09-04 08:28:41', system: 'DMS', level: 'WARN', message: 'OCR processing queue backlog — 23 documents pending', user: 'system' },
];
