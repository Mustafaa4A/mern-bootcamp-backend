import UserModel from "../../features/users/model.js";

const usersData = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "Admin",
  },
  {
    name: "Entry User",
    email: "entry@example.com",
    password: "password123",
    role: "Entry",
  },
];

const seedUsers = async () => {
  try {
    await UserModel.deleteMany({});
    console.log("Cleared existing users.");

    await UserModel.create(usersData);
    console.log(`Seeded ${usersData.length} users.`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};

export default seedUsers;
