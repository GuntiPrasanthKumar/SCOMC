// ===== MOCK DATA FOR SCOMC =====

export const complaints = [
  { id: 'CMP-2024-001', type: 'Pothole', description: 'Large pothole on MG Road near City Mall causing traffic hazards', location: 'MG Road, Ward 12', gps: { lat: 17.0005, lng: 81.8040 }, status: 'Resolved', priority: 'High', department: 'Roads & Infrastructure', citizen: 'Rajesh Kumar', phone: '+91 98765 43210', createdAt: '2024-01-15', resolvedAt: '2024-01-18', assignedTo: 'Team Alpha' },
  { id: 'CMP-2024-002', type: 'Garbage', description: 'Garbage overflow at community bin near Jubilee Hills checkpost', location: 'Jubilee Hills, Ward 8', gps: { lat: 17.4325, lng: 78.4073 }, status: 'In Progress', priority: 'Medium', department: 'Sanitation', citizen: 'Priya Sharma', phone: '+91 87654 32109', createdAt: '2024-01-20', resolvedAt: null, assignedTo: 'Sanitation Unit B' },
  { id: 'CMP-2024-003', type: 'Water Leakage', description: 'Major water pipeline leak near Begumpet railway station flooding the road', location: 'Begumpet, Ward 15', gps: { lat: 17.4434, lng: 78.4672 }, status: 'Assigned', priority: 'Critical', department: 'Water Supply', citizen: 'Mohammed Ali', phone: '+91 76543 21098', createdAt: '2024-01-22', resolvedAt: null, assignedTo: 'Water Maintenance Crew' },
  { id: 'CMP-2024-004', type: 'Street Light Failure', description: 'Street lights not working on entire stretch of Tank Bund road for past 3 days', location: 'Tank Bund, Ward 5', gps: { lat: 17.4239, lng: 78.4738 }, status: 'Submitted', priority: 'Medium', department: 'Electrical', citizen: 'Suresh Reddy', phone: '+91 65432 10987', createdAt: '2024-01-25', resolvedAt: null, assignedTo: null },
  { id: 'CMP-2024-005', type: 'Fallen Tree', description: 'Large banyan tree fallen blocking the main road after last night storm', location: 'Banjara Hills, Ward 9', gps: { lat: 17.4156, lng: 78.4347 }, status: 'Resolved', priority: 'High', department: 'Horticulture', citizen: 'Lakshmi Devi', phone: '+91 54321 09876', createdAt: '2024-01-10', resolvedAt: '2024-01-11', assignedTo: 'Green Squad' },
  { id: 'CMP-2024-006', type: 'Traffic Issue', description: 'Traffic signal malfunctioning at Ameerpet junction causing severe traffic jams', location: 'Ameerpet, Ward 11', gps: { lat: 17.4375, lng: 78.4483 }, status: 'In Progress', priority: 'High', department: 'Traffic Management', citizen: 'Anil Gupta', phone: '+91 43210 98765', createdAt: '2024-01-28', resolvedAt: null, assignedTo: 'Signal Team' },
  { id: 'CMP-2024-007', type: 'Pothole', description: 'Multiple potholes on Kukatpally Housing Board road', location: 'Kukatpally, Ward 18', gps: { lat: 17.4849, lng: 78.3985 }, status: 'Resolved', priority: 'Medium', department: 'Roads & Infrastructure', citizen: 'Venkat Rao', phone: '+91 32109 87654', createdAt: '2024-01-05', resolvedAt: '2024-01-09', assignedTo: 'Team Beta' },
  { id: 'CMP-2024-008', type: 'Garbage', description: 'Construction debris dumped illegally near Madhapur lake', location: 'Madhapur, Ward 7', gps: { lat: 17.4484, lng: 78.3908 }, status: 'Submitted', priority: 'Low', department: 'Sanitation', citizen: 'Sita Ram', phone: '+91 21098 76543', createdAt: '2024-01-30', resolvedAt: null, assignedTo: null },
  { id: 'CMP-2024-009', type: 'Water Leakage', description: 'Sewage water overflowing from manhole in residential area', location: 'Secunderabad, Ward 3', gps: { lat: 17.4399, lng: 78.4983 }, status: 'In Progress', priority: 'Critical', department: 'Drainage', citizen: 'Kavitha Nair', phone: '+91 10987 65432', createdAt: '2024-01-27', resolvedAt: null, assignedTo: 'Drainage Unit A' },
  { id: 'CMP-2024-010', type: 'Street Light Failure', description: 'Park area completely dark, unsafe for evening walkers', location: 'Necklace Road, Ward 5', gps: { lat: 17.4189, lng: 78.4694 }, status: 'Assigned', priority: 'Medium', department: 'Electrical', citizen: 'Ravi Teja', phone: '+91 09876 54321', createdAt: '2024-01-29', resolvedAt: null, assignedTo: 'Electrical Team C' },
];

export const incidents = [
  { id: 'INC-001', category: 'Infrastructure', title: 'Road cave-in near Charminar', priority: 'Critical', status: 'Open', department: 'Roads & Infrastructure', sla: 'At Risk', assignedTeam: 'Emergency Response', location: 'Charminar Area, Ward 1', createdAt: '2024-01-28 09:30', description: 'Major road cave-in reported near Charminar causing traffic diversion', citizenName: 'Ahmed Khan', citizenPhone: '+91 98765 11111' },
  { id: 'INC-002', category: 'Water Supply', title: 'Main pipeline burst in Secunderabad', priority: 'High', status: 'In Progress', department: 'Water Supply', sla: 'Within SLA', assignedTeam: 'Water Emergency Unit', location: 'Secunderabad, Ward 3', createdAt: '2024-01-28 10:15', description: 'Major water pipeline burst causing flooding in residential areas', citizenName: 'Ramesh Babu', citizenPhone: '+91 98765 22222' },
  { id: 'INC-003', category: 'Sanitation', title: 'Garbage processing plant breakdown', priority: 'High', status: 'Open', department: 'Sanitation', sla: 'Breached', assignedTeam: 'Plant Maintenance', location: 'Jawaharnagar, Ward 20', createdAt: '2024-01-27 14:00', description: 'Waste processing plant machinery breakdown affecting waste management', citizenName: 'System Generated', citizenPhone: 'N/A' },
  { id: 'INC-004', category: 'Electrical', title: 'Power grid failure in Zone 5', priority: 'Critical', status: 'In Progress', department: 'Electrical', sla: 'At Risk', assignedTeam: 'Grid Maintenance', location: 'Kukatpally Zone 5', createdAt: '2024-01-28 06:45', description: 'Complete power grid failure affecting 5000+ households', citizenName: 'System Alert', citizenPhone: 'N/A' },
  { id: 'INC-005', category: 'Traffic', title: 'Signal system outage on NH-65', priority: 'Medium', status: 'Resolved', department: 'Traffic Management', sla: 'Within SLA', assignedTeam: 'Signal Team', location: 'NH-65 Corridor', createdAt: '2024-01-26 11:30', description: 'Multiple traffic signals not functioning on the national highway stretch', citizenName: 'Traffic Police', citizenPhone: '+91 100' },
  { id: 'INC-006', category: 'Parks', title: 'Fallen tree in KBR Park', priority: 'Low', status: 'Resolved', department: 'Horticulture', sla: 'Within SLA', assignedTeam: 'Green Squad', location: 'KBR Park, Ward 9', createdAt: '2024-01-25 08:00', description: 'Large tree fallen blocking jogging track, no injuries reported', citizenName: 'Park Security', citizenPhone: '+91 98765 33333' },
];

export const assets = [
  { id: 'AST-R001', type: 'Road', name: 'MG Road Main Stretch', condition: 'Good', installDate: '2019-06-15', lastMaintenance: '2023-12-01', location: 'Ward 12', length: '2.5 km', category: 'Roads' },
  { id: 'AST-R002', type: 'Road', name: 'Tank Bund Road', condition: 'Fair', installDate: '2015-03-20', lastMaintenance: '2023-08-15', location: 'Ward 5', length: '3.2 km', category: 'Roads' },
  { id: 'AST-SL001', type: 'Street Light', name: 'LED Panel - Jubilee Hills Sector A', condition: 'Good', installDate: '2022-01-10', lastMaintenance: '2024-01-05', location: 'Ward 8', watts: '150W LED', category: 'Street Lights' },
  { id: 'AST-SL002', type: 'Street Light', name: 'Solar Light - Necklace Road', condition: 'Needs Maintenance', installDate: '2021-07-25', lastMaintenance: '2023-06-20', location: 'Ward 5', watts: '100W Solar', category: 'Street Lights' },
  { id: 'AST-P001', type: 'Park', name: 'KBR National Park', condition: 'Good', installDate: '1998-01-01', lastMaintenance: '2024-01-15', location: 'Ward 9', area: '158 acres', category: 'Parks' },
  { id: 'AST-P002', type: 'Park', name: 'Sanjeevaiah Park', condition: 'Fair', installDate: '2010-05-10', lastMaintenance: '2023-11-20', location: 'Ward 5', area: '92 acres', category: 'Parks' },
  { id: 'AST-WP001', type: 'Water Pipeline', name: 'Main Supply Line - Secunderabad', condition: 'Critical', installDate: '2005-08-30', lastMaintenance: '2023-04-10', location: 'Ward 3', diameter: '600mm', category: 'Water Pipelines' },
  { id: 'AST-WP002', type: 'Water Pipeline', name: 'Distribution Line - Banjara Hills', condition: 'Good', installDate: '2018-12-01', lastMaintenance: '2024-01-10', location: 'Ward 9', diameter: '300mm', category: 'Water Pipelines' },
  { id: 'AST-D001', type: 'Drainage', name: 'Storm Water Drain - Ameerpet', condition: 'Needs Maintenance', installDate: '2012-04-15', lastMaintenance: '2023-09-25', location: 'Ward 11', capacity: '5000 L/min', category: 'Drainage Systems' },
  { id: 'AST-D002', type: 'Drainage', name: 'Main Sewer Line - Kukatpally', condition: 'Fair', installDate: '2008-11-20', lastMaintenance: '2023-07-30', location: 'Ward 18', capacity: '8000 L/min', category: 'Drainage Systems' },
];

export const volunteers = [
  { id: 'VOL-001', name: 'Srinivas Reddy', zone: 'Zone A - Main Ghat', duty: 'Active', phone: '+91 98765 10001', shift: 'Morning', skills: ['First Aid', 'Crowd Management'] },
  { id: 'VOL-002', name: 'Padma Lakshmi', zone: 'Zone B - Temple Area', duty: 'Active', phone: '+91 98765 10002', shift: 'Morning', skills: ['Translation', 'First Aid'] },
  { id: 'VOL-003', name: 'Karthik Naidu', zone: 'Zone C - Food Court', duty: 'Break', phone: '+91 98765 10003', shift: 'Afternoon', skills: ['Logistics', 'Communication'] },
  { id: 'VOL-004', name: 'Ananya Sharma', zone: 'Zone A - Main Ghat', duty: 'Active', phone: '+91 98765 10004', shift: 'Morning', skills: ['Medical Support', 'First Aid'] },
  { id: 'VOL-005', name: 'Raju Verma', zone: 'Zone D - Parking Area', duty: 'Off-duty', phone: '+91 98765 10005', shift: 'Night', skills: ['Traffic Management', 'Security'] },
  { id: 'VOL-006', name: 'Meena Kumari', zone: 'Zone B - Temple Area', duty: 'Active', phone: '+91 98765 10006', shift: 'Afternoon', skills: ['First Aid', 'Translation'] },
  { id: 'VOL-007', name: 'Ganesh Prasad', zone: 'Zone E - Medical Camp', duty: 'Active', phone: '+91 98765 10007', shift: 'Morning', skills: ['Medical Support', 'Emergency Response'] },
  { id: 'VOL-008', name: 'Deepa Rao', zone: 'Zone C - Food Court', duty: 'Active', phone: '+91 98765 10008', shift: 'Afternoon', skills: ['Food Safety', 'Logistics'] },
];

export const lostPersons = [
  { id: 'LP-001', name: 'Ramu (Child)', age: 7, gender: 'Male', description: 'Wearing blue shirt and khaki shorts, last seen near Zone A', photo: null, reportedBy: 'Sita Devi (Mother)', phone: '+91 98765 20001', status: 'Searching', reportedAt: '2024-01-28 10:30', lastSeen: 'Zone A - Main Ghat', matchedWith: null },
  { id: 'LP-002', name: 'Savitri Bai (Elderly)', age: 72, gender: 'Female', description: 'Wearing white saree with red border, uses walking stick', photo: null, reportedBy: 'Prakash Kumar (Son)', phone: '+91 98765 20002', status: 'Matched', reportedAt: '2024-01-28 09:15', lastSeen: 'Zone B - Temple Area', matchedWith: 'FP-001' },
  { id: 'LP-003', name: 'Arjun Kumar', age: 35, gender: 'Male', description: 'Wearing green kurta, has a small bag, hearing impaired', photo: null, reportedBy: 'Meera Kumar (Wife)', phone: '+91 98765 20003', status: 'Reunited', reportedAt: '2024-01-27 14:00', lastSeen: 'Zone C - Food Court', matchedWith: 'FP-002' },
];

export const foundPersons = [
  { id: 'FP-001', name: 'Unknown Elderly Woman', age: 70, gender: 'Female', description: 'Found near medical camp, wearing white saree, confused and disoriented', foundAt: 'Zone E - Medical Camp', foundBy: 'Volunteer Ganesh', status: 'Matched', matchedWith: 'LP-002', reportedAt: '2024-01-28 09:45' },
  { id: 'FP-002', name: 'Arjun (Self-reported)', age: 35, gender: 'Male', description: 'Approached volunteer station, hearing impaired, showed ID card', foundAt: 'Zone D - Parking Area', foundBy: 'Volunteer Raju', status: 'Reunited', matchedWith: 'LP-003', reportedAt: '2024-01-27 15:30' },
];

export const departments = [
  { id: 'DEPT-01', name: 'Roads & Infrastructure', head: 'Sri. Narasimha Rao', staff: 245, activeIncidents: 12, resolvedThisMonth: 45, performance: 87 },
  { id: 'DEPT-02', name: 'Water Supply', head: 'Smt. Padmavathi', staff: 180, activeIncidents: 8, resolvedThisMonth: 38, performance: 92 },
  { id: 'DEPT-03', name: 'Sanitation', head: 'Sri. Ramesh Chandra', staff: 320, activeIncidents: 15, resolvedThisMonth: 62, performance: 78 },
  { id: 'DEPT-04', name: 'Electrical', head: 'Sri. Subramaniam', staff: 150, activeIncidents: 6, resolvedThisMonth: 29, performance: 94 },
  { id: 'DEPT-05', name: 'Horticulture', head: 'Smt. Lakshmi Bai', staff: 95, activeIncidents: 3, resolvedThisMonth: 18, performance: 96 },
  { id: 'DEPT-06', name: 'Traffic Management', head: 'Sri. Venkatesh', staff: 200, activeIncidents: 9, resolvedThisMonth: 41, performance: 85 },
  { id: 'DEPT-07', name: 'Drainage', head: 'Sri. Srikanth', staff: 130, activeIncidents: 7, resolvedThisMonth: 25, performance: 88 },
  { id: 'DEPT-08', name: 'Urban Planning', head: 'Sri. Arvind Kumar', staff: 75, activeIncidents: 2, resolvedThisMonth: 12, performance: 91 },
];

export const resources = [
  { type: 'Police', total: 500, available: 320, deployed: 180, icon: 'Shield' },
  { type: 'Volunteers', total: 250, available: 180, deployed: 70, icon: 'Users' },
  { type: 'Medical Staff', total: 150, available: 95, deployed: 55, icon: 'Heart' },
  { type: 'Sanitation Workers', total: 400, available: 280, deployed: 120, icon: 'Trash2' },
  { type: 'Fire Brigade', total: 80, available: 60, deployed: 20, icon: 'Flame' },
  { type: 'Ambulances', total: 45, available: 30, deployed: 15, icon: 'Ambulance' },
];

export const chartData = {
  complaintTrends: [
    { month: 'Jul', complaints: 120, resolved: 105 },
    { month: 'Aug', complaints: 145, resolved: 130 },
    { month: 'Sep', complaints: 160, resolved: 148 },
    { month: 'Oct', complaints: 135, resolved: 128 },
    { month: 'Nov', complaints: 155, resolved: 145 },
    { month: 'Dec', complaints: 170, resolved: 158 },
    { month: 'Jan', complaints: 140, resolved: 125 },
  ],
  departmentPerformance: [
    { department: 'Roads', score: 87, target: 90 },
    { department: 'Water', score: 92, target: 90 },
    { department: 'Sanitation', score: 78, target: 85 },
    { department: 'Electrical', score: 94, target: 90 },
    { department: 'Horticulture', score: 96, target: 85 },
    { department: 'Traffic', score: 85, target: 90 },
  ],
  resolutionTime: [
    { category: 'Pothole', avgDays: 3.2 },
    { category: 'Garbage', avgDays: 1.5 },
    { category: 'Water Leak', avgDays: 2.8 },
    { category: 'Street Light', avgDays: 2.1 },
    { category: 'Fallen Tree', avgDays: 1.2 },
    { category: 'Traffic', avgDays: 4.5 },
  ],
  assetHealth: [
    { name: 'Good', value: 65, color: '#10b981' },
    { name: 'Fair', value: 20, color: '#f59e0b' },
    { name: 'Needs Maintenance', value: 10, color: '#f97316' },
    { name: 'Critical', value: 5, color: '#f43f5e' },
  ],
  crowdDensity: [
    { time: '06:00', count: 2500 },
    { time: '08:00', count: 8000 },
    { time: '10:00', count: 15000 },
    { time: '12:00', count: 22000 },
    { time: '14:00', count: 25000 },
    { time: '16:00', count: 28000 },
    { time: '18:00', count: 35000 },
    { time: '20:00', count: 20000 },
    { time: '22:00', count: 10000 },
  ],
  waterLevel: [
    { time: '00:00', level: 12.5, danger: 18 },
    { time: '04:00', level: 13.2, danger: 18 },
    { time: '08:00', level: 14.1, danger: 18 },
    { time: '12:00', level: 15.8, danger: 18 },
    { time: '16:00', level: 16.5, danger: 18 },
    { time: '20:00', level: 15.2, danger: 18 },
    { time: '24:00', level: 14.0, danger: 18 },
  ],
};

export const notifications = [
  { id: 1, type: 'alert', message: 'Critical incident reported at Charminar area', time: '5 min ago', read: false },
  { id: 2, type: 'info', message: 'Water pipeline repair completed in Ward 3', time: '1 hour ago', read: false },
  { id: 3, type: 'success', message: 'Complaint CMP-2024-005 resolved successfully', time: '2 hours ago', read: true },
  { id: 4, type: 'warning', message: 'SLA breach alert for INC-003', time: '3 hours ago', read: false },
  { id: 5, type: 'info', message: 'New volunteer registration: 5 volunteers added', time: '4 hours ago', read: true },
];

export const aiClassifications = [
  { label: 'Pothole', confidence: 0.94, department: 'Roads & Infrastructure', icon: 'CircleAlert' },
  { label: 'Garbage Overflow', confidence: 0.89, department: 'Sanitation', icon: 'Trash2' },
  { label: 'Water Leakage', confidence: 0.91, department: 'Water Supply', icon: 'Droplets' },
  { label: 'Fallen Tree', confidence: 0.87, department: 'Horticulture', icon: 'TreePine' },
  { label: 'Broken Street Light', confidence: 0.93, department: 'Electrical', icon: 'Lightbulb' },
  { label: 'Traffic Signal Fault', confidence: 0.85, department: 'Traffic Management', icon: 'TrafficCone' },
];

export const mapLocations = [
  { id: 1, type: 'complaint', lat: 17.0005, lng: 81.8040, title: 'Pothole - MG Road', status: 'Active' },
  { id: 2, type: 'complaint', lat: 17.4325, lng: 78.4073, title: 'Garbage - Jubilee Hills', status: 'In Progress' },
  { id: 3, type: 'asset', lat: 17.4239, lng: 78.4738, title: 'Street Light - Tank Bund', status: 'Active' },
  { id: 4, type: 'asset', lat: 17.4156, lng: 78.4347, title: 'Park - KBR Park', status: 'Good' },
  { id: 5, type: 'incident', lat: 17.3616, lng: 78.4747, title: 'Road Cave-in - Charminar', status: 'Critical' },
  { id: 6, type: 'incident', lat: 17.4399, lng: 78.4983, title: 'Pipeline Burst - Secunderabad', status: 'High' },
  { id: 7, type: 'resource', lat: 17.4484, lng: 78.3908, title: 'Medical Camp - Madhapur', status: 'Active' },
  { id: 8, type: 'resource', lat: 17.4375, lng: 78.4483, title: 'Police Station - Ameerpet', status: 'Active' },
  { id: 9, type: 'flood', lat: 17.4100, lng: 78.5200, title: 'Musi River - Monitoring Station', status: 'Normal' },
  { id: 10, type: 'crowd', lat: 17.2500, lng: 78.3400, title: 'Pushkaralu Venue - Main Ghat', status: 'High Density' },
];

export const crowdZones = [
  { id: 'Z1', name: 'Zone A - Main Ghat', density: 'High', count: 12000, capacity: 15000, risk: 'Medium', lat: 17.2500, lng: 78.3400 },
  { id: 'Z2', name: 'Zone B - Temple Area', density: 'Critical', count: 8500, capacity: 8000, risk: 'High', lat: 17.2520, lng: 78.3420 },
  { id: 'Z3', name: 'Zone C - Food Court', density: 'Medium', count: 3500, capacity: 6000, risk: 'Low', lat: 17.2480, lng: 78.3380 },
  { id: 'Z4', name: 'Zone D - Parking Area', density: 'Low', count: 1200, capacity: 5000, risk: 'Low', lat: 17.2460, lng: 78.3360 },
  { id: 'Z5', name: 'Zone E - Medical Camp', density: 'Low', count: 800, capacity: 2000, risk: 'Low', lat: 17.2540, lng: 78.3440 },
];

export const eventStats = {
  totalVisitors: 85000,
  activeVolunteers: 180,
  medicalRequests: 23,
  lostAndFound: 8,
  emergencies: 3,
  foodDistributed: 45000,
};

export const floodData = {
  currentLevel: 15.8,
  dangerLevel: 18.0,
  warningLevel: 16.0,
  normalLevel: 12.0,
  status: 'Warning',
  lastUpdated: '2024-01-28 16:30',
  riskZones: [
    { name: 'Musi River - Old City', level: 15.8, status: 'Warning', lat: 17.3616, lng: 78.4747 },
    { name: 'Hussain Sagar Overflow', level: 14.2, status: 'Normal', lat: 17.4239, lng: 78.4738 },
    { name: 'Osman Sagar Dam', level: 16.1, status: 'Alert', lat: 17.3800, lng: 78.3100 },
  ],
  alerts: [
    { id: 1, message: 'Water level rising in Musi River - Old City stretch', severity: 'Warning', time: '30 min ago' },
    { id: 2, message: 'Osman Sagar dam reaching alert level', severity: 'Alert', time: '1 hour ago' },
    { id: 3, message: 'Low lying areas in Ward 1 advised to stay alert', severity: 'Info', time: '2 hours ago' },
  ],
};

export const users = [
  { id: 'USR-001', name: 'Commissioner Arvind Kumar', email: 'commissioner@scomc.gov.in', role: 'Administrator', department: 'Municipal Corporation', status: 'Active', lastLogin: '2024-01-28 09:00' },
  { id: 'USR-002', name: 'Narasimha Rao', email: 'narasimha.rao@scomc.gov.in', role: 'Department Head', department: 'Roads & Infrastructure', status: 'Active', lastLogin: '2024-01-28 08:30' },
  { id: 'USR-003', name: 'Padmavathi', email: 'padmavathi@scomc.gov.in', role: 'Department Head', department: 'Water Supply', status: 'Active', lastLogin: '2024-01-28 09:15' },
  { id: 'USR-004', name: 'Rajesh Kumar', email: 'rajesh@citizen.scomc.gov.in', role: 'Citizen', department: 'N/A', status: 'Active', lastLogin: '2024-01-28 10:00' },
  { id: 'USR-005', name: 'Priya Sharma', email: 'priya@citizen.scomc.gov.in', role: 'Citizen', department: 'N/A', status: 'Active', lastLogin: '2024-01-27 14:20' },
  { id: 'USR-006', name: 'Field Agent Ravi', email: 'ravi@field.scomc.gov.in', role: 'Municipal Staff', department: 'Sanitation', status: 'Active', lastLogin: '2024-01-28 07:00' },
];

export const serviceNowTickets = [
  { id: 'SNW-INC-001', sourceComplaint: 'CMP-2024-003', category: 'Water Leakage', status: 'In Progress', priority: 'Critical', assignedGroup: 'Water Maintenance', createdAt: '2024-01-22 10:30', sla: '4 hours', slaStatus: 'At Risk' },
  { id: 'SNW-INC-002', sourceComplaint: 'CMP-2024-001', category: 'Pothole', status: 'Resolved', priority: 'High', assignedGroup: 'Road Repair Team', createdAt: '2024-01-15 11:00', sla: '24 hours', slaStatus: 'Met' },
  { id: 'SNW-INC-003', sourceComplaint: 'CMP-2024-006', category: 'Traffic Signal', status: 'Work in Progress', priority: 'High', assignedGroup: 'Signal Team', createdAt: '2024-01-28 14:00', sla: '8 hours', slaStatus: 'Within SLA' },
  { id: 'SNW-WO-001', sourceIncident: 'INC-001', type: 'Work Order', status: 'Assigned', priority: 'Critical', assignedGroup: 'Emergency Construction', createdAt: '2024-01-28 10:00', estimatedCompletion: '2024-01-29 18:00' },
  { id: 'SNW-WO-002', sourceIncident: 'INC-002', type: 'Work Order', status: 'In Progress', priority: 'High', assignedGroup: 'Pipeline Repair', createdAt: '2024-01-28 11:00', estimatedCompletion: '2024-01-28 20:00' },
];
