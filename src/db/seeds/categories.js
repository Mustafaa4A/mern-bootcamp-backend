import CategoryModel from "../../features/categories/model.js";

export const categoriesData = [
  { name: "Hadiith", description: "Sayings and actions of Prophet Muhammad (PBUH)" },
  { name: "Fiqih", description: "Islamic jurisprudence" },
  { name: "Tafsir", description: "Exegesis of the Quran" },
  { name: "Aqidah", description: "Islamic creed and belief" },
  { name: "Seerah", description: "Prophetic biography" },
  { name: "Nahw", description: "Arabic grammar" },
  { name: "Sarf", description: "Arabic morphology" },
  { name: "Akhlaq", description: "Islamic ethics and character" },
];

const seedCategories = async () => {
  try {
    await CategoryModel.deleteMany({});
    console.log("Cleared existing categories.");

    const createdCategories = await CategoryModel.insertMany(categoriesData);
    console.log(`Seeded ${createdCategories.length} categories.`);
    return createdCategories;
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
};

export default seedCategories;
