/**
 * Fix Missing Attributes
 * This script adds the missing attributes that failed during initial setup
 * 
 * Usage: node fix-attributes.js
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

// Missing attributes to add
const missingAttributes = [
    {
        collection: 'applicants',
        attribute: {
            key: 'status',
            type: 'string',
            size: 50,
            required: false, // Changed to false to allow default
            default: 'pending'
        }
    },
    {
        collection: 'messages',
        attribute: {
            key: 'type',
            type: 'string',
            size: 50,
            required: false, // Changed to false to allow default
            default: 'text'
        }
    },
    {
        collection: 'page_visits',
        attribute: {
            key: 'os',
            type: 'string',
            size: 100,
            required: false,
            default: null
        }
    },
    {
        collection: 'calendar_content',
        attribute: {
            key: 'status',
            type: 'string',
            size: 50,
            required: false,
            default: 'draft'
        }
    }
];

async function fixAttribute(collectionId, attr) {
    try {
        console.log(`  ➕ Adding ${attr.key} to ${collectionId}...`);

        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            attr.key,
            attr.size,
            attr.required,
            attr.default
        );

        console.log(`  ✅ ${attr.key} added successfully!`);
        return true;

    } catch (error) {
        if (error.code === 409) {
            console.log(`  ⚠️  ${attr.key} already exists, skipping...`);
        } else {
            console.error(`  ❌ Error adding ${attr.key}:`, error.message);
        }
        return false;
    }
}

async function fixAllAttributes() {
    console.log('🔧 Fixing missing attributes...\n');

    let fixed = 0;
    let skipped = 0;
    let failed = 0;

    for (const item of missingAttributes) {
        const result = await fixAttribute(item.collection, item.attribute);

        if (result) fixed++;
        else skipped++;

        // Wait between operations to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Fixed: ${fixed}`);
    console.log(`   ⚠️  Skipped: ${skipped}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log('\n✨ Done!\n');
}

fixAllAttributes();
