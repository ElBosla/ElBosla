/**
 * Seed Data Script
 * This script populates the database with dummy data for testing
 * 
 * Usage: node seed-data.js
 */

const sdk = require('node-appwrite');

// Configuration
const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6971430c00318957e6d7')
    .setKey('standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410');

const DATABASE_ID = '6971454f002823a65775';

async function seedData() {
    console.log('🌱 Seeding database with dummy data...\n');

    try {
        // 1. Add Applicants
        console.log('Adding Applicants...');
        for (let i = 1; i <= 5; i++) {
            await databases.createDocument(DATABASE_ID, 'applicants', sdk.ID.unique(), {
                name: `طالب تجريبي ${i}`,
                phone: `0101234567${i}`,
                email: `student${i}@example.com`,
                specialization: 'Web Development',
                plan: i % 2 === 0 ? 'محترف (150 ج.م)' : 'البداية (50 ج.م)',
                status: i === 1 ? 'نشط' : 'قيد المراجعة',
                paymentStatus: i === 1 ? 'paid' : 'unpaid',
                timestamp: new Date().toISOString(),
                notes: 'ملاحظة تجريبية'
            });
        }

        // 2. Add Page Visits
        console.log('Adding Page Visits...');
        for (let i = 0; i < 10; i++) {
            await databases.createDocument(DATABASE_ID, 'page_visits', sdk.ID.unique(), {
                timestamp: new Date().toISOString(),
                device: 'Desktop',
                location: 'Cairo, Egypt'
            });
        }

        // 3. Add Global Tasks
        console.log('Adding Global Tasks...');
        await databases.createDocument(DATABASE_ID, 'global_tasks', sdk.ID.unique(), {
            text: 'مراجعة المتقدمين الجدد',
            done: false,
            createdAt: new Date().toISOString()
        });

        // 4. Add Transaction
        console.log('Adding Transactions...');
        await databases.createDocument(DATABASE_ID, 'transactions', sdk.ID.unique(), {
            amount: 500.0,
            type: 'income',
            category: 'اشتراكات طلاب',
            note: 'اشتراك جديد',
            date: new Date().toISOString()
        });

        console.log('\n✅ Database seeded successfully!');

    } catch (error) {
        console.error('❌ Error seeding data:', error.message);
    }
}

seedData();
