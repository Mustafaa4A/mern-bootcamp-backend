import mongoose from "mongoose";
import "dotenv/config";
import seedUsers from "./seeds/users.js";
import seedCategories from "./seeds/categories.js";
import seedBooks from "./seeds/books.js";

const runSeed = async () => {
  const arg = process.argv[2];

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for seeding...");

    if (arg === "users") {
      await seedUsers();
    } else if (arg === "categories") {
      await seedCategories();
    } else if (arg === "books") {
      await seedBooks();
    } else {
      // Run All
      console.log("Running all seeds...");
      await seedUsers();
      await seedCategories();
      await seedBooks();
    }

    console.log("Seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

runSeed();
