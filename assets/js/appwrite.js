// Appwrite Configuration
var { Client, Account, Databases, Storage, ID, Query } = Appwrite;

var client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Appwrite Endpoint
    .setProject('6971430c00318957e6d7'); // Project ID: Bousla-v4

var account = new Account(client);
var databases = new Databases(client);
var storage = new Storage(client);

// Constants for Database and Collections
var DATABASE_ID = '6971454f002823a65775';
var COLLECTIONS = {
    APPLICANTS: 'applicants',
    CONSULTATIONS: 'consultations',
    ADMINS: 'admins',
    CALENDAR_CONTENT: 'calendar_content',
    GLOBAL_TASKS: 'global_tasks',
    TEACHERS: 'teachers',
    MESSAGES: 'messages',
    TRANSACTIONS: 'transactions',
    FINANCE_TODOS: 'finance_todos',
    TRAINEES: 'trainees',
    COURSES: 'courses',
    COURSE_VIDEOS: 'course_videos',
    SUBSCRIBERS: 'subscribers',
    NOTIFICATIONS: 'notifications'
};

var BUCKETS = {
    COURSE_THUMBNAILS: 'Bousla-Courses',
    COURSE_VIDEOS: 'Bousla-Courses'
};

// Verify Appwrite connection on load
client.ping()
    .then(response => {
        console.log('✅ Appwrite connection successful!', response);
    })
    .catch(error => {
        console.error('❌ Appwrite connection failed:', error);
    });

// Export instances (since we are using vanilla JS, we attach to window)
window.appwrite = {
    client,
    account,
    databases,
    storage,
    ID,
    Query,
    DATABASE_ID,
    COLLECTIONS,
    BUCKETS
};

