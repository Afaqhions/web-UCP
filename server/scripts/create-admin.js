const mongoose = require('mongoose');

async function createAdmin() {
    try {
        await mongoose.connect('mongodb://localhost:27017/webucp');
        console.log('Connected to MongoDB');

        const email = 'm.afaqpak@gmail.com';
        const usersCollection = mongoose.connection.db.collection('users');

        const existing = await usersCollection.findOne({ email });

        if (existing) {
            await usersCollection.updateOne(
                { email },
                { $set: { role: 'admin' } }
            );
            console.log('✅ User already existed, updated role to admin');
        } else {
            await usersCollection.insertOne({
                email: email,
                role: 'admin',
                name: 'M. Afaq',
                clerkId: 'PRE_REGISTERED_ADMIN_' + Date.now(),
                isActive: true,
                emailVerified: true,
                createdAt: new Date()
            });
            console.log('✅ Created new Admin user in MongoDB');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

createAdmin();
