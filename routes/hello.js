import db from './config/db.js'; // Ensure this matches the correct path to your db.js

export const testPrisma = async (req,res) => {
  try {
    // Check DB connection (simple query)
    console.log('Testing Prisma client connection...');

    const users = await db.user.findMany(); // Fetch all users
    console.log('Users from database:', users);

    // If you want to test creating a user:
    // const newUser = await db.user.create({
    //   data: {
    //     name: 'John Doe',
    //     email: 'john.doe@example.com',
    //   },
    // });
    // console.log('New User created:', newUser);
    
    res.status(200).json({ success: true, data: users });

  } catch (error) {
    console.error('Error while testing Prisma:', error.message);
    res.status(500).json({ success: false, message: error.message });
  } 
//   finally {
//     // Optionally disconnect when done
//     // await db.$disconnect();
//   }
};
