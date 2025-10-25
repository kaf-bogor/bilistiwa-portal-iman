import {
  menuItemsService,
  waqfAssetsService,
  scholarshipsService,
  taawunDonationsService,
  productiveWaqfService,
  teacherWelfareService,
  documentsService,
  eventsService,
  usersService
} from './firebaseService';

// Default menu items
const defaultMenuItems = [
  { title: "Dashboard", url: "/", icon: "LayoutDashboard", order: 1, isActive: true },
  { title: "Inisialisasi Database", url: "/firestore-init", icon: "Database", order: 2, isActive: true },
  { title: "Wakaf & Aset", url: "/waqf-assets", icon: "Building2", order: 3, isActive: true },
  { title: "Manajemen Beasiswa", url: "/scholarships", icon: "GraduationCap", order: 4, isActive: true },
  { title: "Donasi Ta'awun", url: "/taawun", icon: "Heart", order: 5, isActive: true },
  { title: "Unit Wakaf Produktif", url: "/productive-waqf", icon: "Store", order: 6, isActive: true },
  { title: "Kesejahteraan Guru", url: "/teacher-welfare", icon: "Users2", order: 7, isActive: true },
  { title: "Manajemen Dokumen", url: "/documents", icon: "FileText", order: 8, isActive: true },
  { title: "Acara & Kalender", url: "/events", icon: "Calendar", order: 9, isActive: true },
  { title: "Manajemen Pengguna", url: "/users", icon: "Settings", order: 10, isActive: true },
  { title: "Manajemen Menu", url: "/menu-management", icon: "Menu", order: 11, isActive: true },
];

// Sample waqf assets
const sampleWaqfAssets = [
  {
    name: "Tanah Kampus Utama",
    type: "Tanah",
    location: "Bogor, Jawa Barat",
    value: 2500000000,
    status: "Aktif",
    description: "Tanah kampus utama untuk Kuttab Al Fatih",
    dateAcquired: "2020-01-15"
  },
  {
    name: "Gedung Sekolah Fase 1",
    type: "Bangunan",
    location: "Bogor, Jawa Barat",
    value: 1800000000,
    status: "Selesai",
    description: "Fase pertama pembangunan sekolah",
    dateAcquired: "2021-06-10"
  }
];

// Sample scholarships
const sampleScholarships = [
  {
    studentName: "Ahmad Fauzi",
    program: "University",
    amount: 5000000,
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    sponsor: "Yayasan Bilistiwa",
    gpa: 3.8,
    description: "Computer Science student at IPB University"
  },
  {
    studentName: "Siti Nurhaliza",
    program: "High School",
    amount: 2500000,
    status: "Active",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    sponsor: "Individual Donor",
    gpa: 3.9,
    description: "Outstanding student in Islamic studies"
  }
];

// Sample donations
const sampleDonations = [
  {
    donorName: "Hamba Allah",
    donorEmail: "anonymous@example.com",
    donorPhone: "-",
    amount: 1000000,
    category: "Emergency Aid",
    status: "Completed",
    donationDate: "2024-01-15",
    purpose: "Help for flood victims in Bogor",
    isAnonymous: true,
    paymentMethod: "Bank Transfer",
    notes: "May Allah accept this donation"
  },
  {
    donorName: "Ahmad Wijaya",
    donorEmail: "ahmad.wijaya@email.com",
    donorPhone: "081234567890",
    amount: 500000,
    category: "Medical Support",
    status: "Confirmed",
    donationDate: "2024-02-01",
    purpose: "Medical treatment for underprivileged children",
    isAnonymous: false,
    paymentMethod: "Online Payment",
    notes: "Regular monthly donation"
  }
];

// Sample productive waqf units
const sampleProductiveWaqf = [
  {
    unitName: "Koperasi Syariah Bilistiwa",
    type: "Koperasi",
    location: "Bogor, Jawa Barat",
    monthlyRevenue: 15000000,
    status: "Operasional",
    description: "Koperasi syariah untuk mendukung ekonomi umat",
    establishedDate: "2022-03-15",
    manager: "Bapak Abdullah"
  }
];

// Sample teacher welfare
const sampleTeacherWelfare = [
  {
    teacherName: "Ustadz Muhammad",
    position: "Guru Tahfidz",
    salary: 5000000,
    allowances: 1500000,
    status: "Active",
    joinDate: "2020-08-01",
    bankAccount: "BCA - 1234567890",
    phone: "081234567890",
    address: "Bogor, Jawa Barat"
  }
];

// Sample documents
const sampleDocuments = [
  {
    title: "Sertifikat Tanah Kampus",
    category: "Legal",
    description: "Sertifikat kepemilikan tanah kampus utama",
    fileUrl: "#",
    uploadDate: "2020-01-15",
    expiryDate: null,
    status: "Active",
    uploadedBy: "Admin"
  }
];

// Sample events
const sampleEvents = [
  {
    title: "Rapat Yayasan Bulanan",
    description: "Rapat rutin bulanan pengurus yayasan",
    date: "2024-03-15",
    startTime: "09:00",
    endTime: "11:00",
    location: "Kantor Yayasan",
    category: "Meeting",
    status: "Scheduled",
    organizer: "Ketua Yayasan"
  }
];

// Sample users
const sampleUsers = [
  {
    name: "Administrator",
    email: "admin@bilistiwa.org",
    role: "Admin",
    status: "Active",
    phone: "081234567890",
    joinDate: "2020-01-01",
    lastLogin: "2024-03-01"
  }
];

export async function initializeFirestore() {
  const results: { collection: string; status: string; count?: number; error?: string }[] = [];

  try {
    // Initialize Menu Items
    console.log('Initializing menuItems collection...');
    const existingMenuItems = await menuItemsService.getAll();
    if (existingMenuItems.length === 0) {
      await menuItemsService.batchCreate(defaultMenuItems);
      results.push({ collection: 'menuItems', status: 'success', count: defaultMenuItems.length });
      console.log('✓ Menu items initialized');
    } else {
      results.push({ collection: 'menuItems', status: 'skipped', count: existingMenuItems.length });
      console.log('○ Menu items already exist');
    }

    // Initialize Waqf Assets
    console.log('Initializing waqfAssets collection...');
    const existingAssets = await waqfAssetsService.getAll();
    if (existingAssets.length === 0) {
      await waqfAssetsService.batchCreate(sampleWaqfAssets);
      results.push({ collection: 'waqfAssets', status: 'success', count: sampleWaqfAssets.length });
      console.log('✓ Waqf assets initialized');
    } else {
      results.push({ collection: 'waqfAssets', status: 'skipped', count: existingAssets.length });
      console.log('○ Waqf assets already exist');
    }

    // Initialize Scholarships
    console.log('Initializing scholarships collection...');
    const existingScholarships = await scholarshipsService.getAll();
    if (existingScholarships.length === 0) {
      await scholarshipsService.batchCreate(sampleScholarships);
      results.push({ collection: 'scholarships', status: 'success', count: sampleScholarships.length });
      console.log('✓ Scholarships initialized');
    } else {
      results.push({ collection: 'scholarships', status: 'skipped', count: existingScholarships.length });
      console.log('○ Scholarships already exist');
    }

    // Initialize Taawun Donations
    console.log('Initializing taawunDonations collection...');
    const existingDonations = await taawunDonationsService.getAll();
    if (existingDonations.length === 0) {
      await taawunDonationsService.batchCreate(sampleDonations);
      results.push({ collection: 'taawunDonations', status: 'success', count: sampleDonations.length });
      console.log('✓ Taawun donations initialized');
    } else {
      results.push({ collection: 'taawunDonations', status: 'skipped', count: existingDonations.length });
      console.log('○ Taawun donations already exist');
    }

    // Initialize Productive Waqf
    console.log('Initializing productiveWaqf collection...');
    const existingProductiveWaqf = await productiveWaqfService.getAll();
    if (existingProductiveWaqf.length === 0) {
      await productiveWaqfService.batchCreate(sampleProductiveWaqf);
      results.push({ collection: 'productiveWaqf', status: 'success', count: sampleProductiveWaqf.length });
      console.log('✓ Productive waqf initialized');
    } else {
      results.push({ collection: 'productiveWaqf', status: 'skipped', count: existingProductiveWaqf.length });
      console.log('○ Productive waqf already exist');
    }

    // Initialize Teacher Welfare
    console.log('Initializing teacherWelfare collection...');
    const existingTeacherWelfare = await teacherWelfareService.getAll();
    if (existingTeacherWelfare.length === 0) {
      await teacherWelfareService.batchCreate(sampleTeacherWelfare);
      results.push({ collection: 'teacherWelfare', status: 'success', count: sampleTeacherWelfare.length });
      console.log('✓ Teacher welfare initialized');
    } else {
      results.push({ collection: 'teacherWelfare', status: 'skipped', count: existingTeacherWelfare.length });
      console.log('○ Teacher welfare already exist');
    }

    // Initialize Documents
    console.log('Initializing documents collection...');
    const existingDocuments = await documentsService.getAll();
    if (existingDocuments.length === 0) {
      await documentsService.batchCreate(sampleDocuments);
      results.push({ collection: 'documents', status: 'success', count: sampleDocuments.length });
      console.log('✓ Documents initialized');
    } else {
      results.push({ collection: 'documents', status: 'skipped', count: existingDocuments.length });
      console.log('○ Documents already exist');
    }

    // Initialize Events
    console.log('Initializing events collection...');
    const existingEvents = await eventsService.getAll();
    if (existingEvents.length === 0) {
      await eventsService.batchCreate(sampleEvents);
      results.push({ collection: 'events', status: 'success', count: sampleEvents.length });
      console.log('✓ Events initialized');
    } else {
      results.push({ collection: 'events', status: 'skipped', count: existingEvents.length });
      console.log('○ Events already exist');
    }

    // Initialize Users
    console.log('Initializing users collection...');
    const existingUsers = await usersService.getAll();
    if (existingUsers.length === 0) {
      await usersService.batchCreate(sampleUsers);
      results.push({ collection: 'users', status: 'success', count: sampleUsers.length });
      console.log('✓ Users initialized');
    } else {
      results.push({ collection: 'users', status: 'skipped', count: existingUsers.length });
      console.log('○ Users already exist');
    }

    console.log('\n=== Initialization Complete ===');
    return results;
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    throw error;
  }
}

export async function checkFirestoreCollections() {
  console.log('Checking Firestore collections...\n');

  const collections = [
    { name: 'menuItems', service: menuItemsService },
    { name: 'waqfAssets', service: waqfAssetsService },
    { name: 'scholarships', service: scholarshipsService },
    { name: 'taawunDonations', service: taawunDonationsService },
    { name: 'productiveWaqf', service: productiveWaqfService },
    { name: 'teacherWelfare', service: teacherWelfareService },
    { name: 'documents', service: documentsService },
    { name: 'events', service: eventsService },
    { name: 'users', service: usersService },
  ];

  for (const collection of collections) {
    try {
      const count = await collection.service.count();
      console.log(`✓ ${collection.name}: ${count} documents`);
    } catch (error) {
      console.log(`✗ ${collection.name}: Error - ${error}`);
    }
  }
}
