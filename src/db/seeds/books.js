import BookModel from "../../features/books/model.js";
import VolumeModel from "../../features/volumes/model.js";
import CategoryModel from "../../features/categories/model.js";

const booksDataRaw = [
  // Hadiith
  { title: "Sahih al-Bukhari", author: "Imam Bukhari", categoryName: "Hadiith", type: "Mujallad", totalVolumes: 9 },
  { title: "Sahih Muslim", author: "Imam Muslim", categoryName: "Hadiith", type: "Mujallad", totalVolumes: 7 },
  { title: "Muwatta Imam Malik", author: "Imam Malik", categoryName: "Hadiith", type: "Mujallad", totalVolumes: 2 },
  { title: "Sunan Abi Dawud", author: "Abu Dawud", categoryName: "Hadiith", type: "Mujallad", totalVolumes: 4 },
  { title: "Jami' at-Tirmidhi", author: "At-Tirmidhi", categoryName: "Hadiith", type: "Mujallad", totalVolumes: 5 },
  { title: "Sunan an-Nasa'i", author: "An-Nasa'i", categoryName: "Hadiith", type: "Mujallad", totalVolumes: 6 },
  { title: "Sunan ibn Majah", author: "Ibn Majah", categoryName: "Hadiith", type: "Mujallad", totalVolumes: 5 },
  { title: "Riyadh as-Salihin", author: "An-Nawawi", categoryName: "Hadiith", type: "Matn", totalVolumes: 1 },
  { title: "Bulugh al-Maram", author: "Ibn Hajar", categoryName: "Hadiith", type: "Matn", totalVolumes: 1 },
  { title: "Al-Adab al-Mufrad", author: "Imam Bukhari", categoryName: "Hadiith", type: "Mujallad", totalVolumes: 1 },

  // Fiqih
  { title: "Al-Mughni", author: "Ibn Qudamah", categoryName: "Fiqih", type: "Mujallad", totalVolumes: 15 },
  { title: "Al-Umm", author: "Imam Shafi'i", categoryName: "Fiqih", type: "Mujallad", totalVolumes: 8 },
  { title: "Minhaj at-Talibin", author: "An-Nawawi", categoryName: "Fiqih", type: "Matn", totalVolumes: 1 },
  { title: "Al-Hidayah", author: "Al-Marghinani", categoryName: "Fiqih", type: "Mujallad", totalVolumes: 4 },
  { title: "Bada'i' as-Sana'i'", author: "Al-Kasani", categoryName: "Fiqih", type: "Mujallad", totalVolumes: 7 },
  { title: "Zad al-Mustaqni'", author: "Al-Hajjawi", categoryName: "Fiqih", type: "Matn", totalVolumes: 1 },
  { title: "Al-Majmu'", author: "An-Nawawi", categoryName: "Fiqih", type: "Mujallad", totalVolumes: 23 },
  { title: "Rawdat at-Talibin", author: "An-Nawawi", categoryName: "Fiqih", type: "Mujallad", totalVolumes: 12 },

  // Tafsir
  { title: "Tafsir al-Tabari", author: "At-Tabari", categoryName: "Tafsir", type: "Mujallad", totalVolumes: 24 },
  { title: "Tafsir ibn Kathir", author: "Ibn Kathir", categoryName: "Tafsir", type: "Mujallad", totalVolumes: 8 },
  { title: "Tafsir al-Qurtubi", author: "Al-Qurtubi", categoryName: "Tafsir", type: "Mujallad", totalVolumes: 20 },
  { title: "Tafsir al-Jalalayn", author: "As-Suyuti", categoryName: "Tafsir", type: "Mujallad", totalVolumes: 1 },
  { title: "Tafsir al-Baghawi", author: "Al-Baghawi", categoryName: "Tafsir", type: "Mujallad", totalVolumes: 8 },
  { title: "Ad-Durr al-Manthur", author: "As-Suyuti", categoryName: "Tafsir", type: "Mujallad", totalVolumes: 8 },

  // Aqidah
  { title: "Al-Aqidah at-Tahawiyyah", author: "At-Tahawi", categoryName: "Aqidah", type: "Matn", totalVolumes: 1 },
  { title: "Al-Aqidah al-Wasitiyyah", author: "Ibn Taymiyyah", categoryName: "Aqidah", type: "Matn", totalVolumes: 1 },
  { title: "Kitab at-Tawhid", author: "Muhammad ibn Abdil Wahhab", categoryName: "Aqidah", type: "Matn", totalVolumes: 1 },
  { title: "Al-Aqidah al-Hamawiyyah", author: "Ibn Taymiyyah", categoryName: "Aqidah", type: "Matn", totalVolumes: 1 },
  { title: "Lum'at al-I'tiqad", author: "Ibn Qudamah", categoryName: "Aqidah", type: "Matn", totalVolumes: 1 },
  { title: "Sharh as-Sunnah", author: "Al-Barbahari", categoryName: "Aqidah", type: "Matn", totalVolumes: 1 },
  { title: "Kitab al-Iman", author: "Ibn Taymiyyah", categoryName: "Aqidah", type: "Mujallad", totalVolumes: 1 },

  // Seerah
  { title: "Ar-Raheeq Al-Makhtum", author: "Al-Mubarakpuri", categoryName: "Seerah", type: "Mujallad", totalVolumes: 1 },
  { title: "Sirat ibn Hisham", author: "Ibn Hisham", categoryName: "Seerah", type: "Mujallad", totalVolumes: 4 },
  { title: "Zad al-Ma'ad", author: "Ibn al-Qayyim", categoryName: "Seerah", type: "Mujallad", totalVolumes: 5 },
  { title: "Ash-Shifa", author: "Qadi Ayyad", categoryName: "Seerah", type: "Mujallad", totalVolumes: 2 },
  { title: "Al-Sirah al-Nabawiyyah", author: "Ibn Kathir", categoryName: "Seerah", type: "Mujallad", totalVolumes: 4 },

  // Nahw / Sarf
  { title: "Al-Ajurrumiyyah", author: "Ibn Ajurrum", categoryName: "Nahw", type: "Matn", totalVolumes: 1 },
  { title: "Alfiyyah ibn Malik", author: "Ibn Malik", categoryName: "Nahw", type: "Matn", totalVolumes: 1 },
  { title: "Qatar an-Nada", author: "Ibn Hisham", categoryName: "Nahw", type: "Matn", totalVolumes: 1 },
  { title: "Shudhur adh-Dhahab", author: "Ibn Hisham", categoryName: "Nahw", type: "Matn", totalVolumes: 1 },
  { title: "Matn al-Bina", author: "Unknown", categoryName: "Sarf", type: "Matn", totalVolumes: 1 },
  { title: "Awdah al-Masalik", author: "Ibn Hisham", categoryName: "Nahw", type: "Mujallad", totalVolumes: 4 },

  // Akhlaq
  { title: "Ihya Ulum al-Din", author: "Al-Ghazali", categoryName: "Akhlaq", type: "Mujallad", totalVolumes: 4 },
  { title: "Minhaj al-Qasidin", author: "Ibn al-Jawzi", categoryName: "Akhlaq", type: "Mujallad", totalVolumes: 1 },
  { title: "Al-Kaba'ir", author: "Adh-Dhahabi", categoryName: "Akhlaq", type: "Matn", totalVolumes: 1 },
  { title: "Hilyat al-Awliya", author: "Abu Nu'aym", categoryName: "Akhlaq", type: "Mujallad", totalVolumes: 10 },
  { title: "Madarij as-Salikin", author: "Ibn al-Qayyim", categoryName: "Akhlaq", type: "Mujallad", totalVolumes: 3 },
  { title: "Adab al-Dunya wa'l-Din", author: "Al-Mawardi", categoryName: "Akhlaq", type: "Mujallad", totalVolumes: 1 },
  { title: "Tahdhib al-Akhlaq", author: "Miskawayh", categoryName: "Akhlaq", type: "Mujallad", totalVolumes: 1 },
];

const seedBooks = async () => {
  try {
    await BookModel.deleteMany({});
    await VolumeModel.deleteMany({});
    console.log("Cleared existing books and volumes.");

    const categories = await CategoryModel.find({});
    if (categories.length === 0) {
      console.warn("No categories found. Run category seed first.");
      return;
    }

    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    const booksToSeed = booksDataRaw.map((book) => ({
      title: book.title,
      author: book.author,
      category: categoryMap[book.categoryName],
      type: book.type,
      totalVolumes: book.totalVolumes,
    }));

    const seededBooks = await BookModel.insertMany(booksToSeed);
    console.log(`Seeded ${seededBooks.length} books.`);

    const volumesData = [];
    seededBooks.forEach((book) => {
      for (let i = 1; i <= book.totalVolumes; i++) {
        volumesData.push({
          book: book._id,
          volumeNumber: i,
          title: book.totalVolumes > 1 ? `${book.title} - Volume ${i}` : book.title,
        });
      }
    });

    await VolumeModel.insertMany(volumesData);
    console.log(`Seeded ${volumesData.length} volumes.`);
  } catch (error) {
    console.error("Error seeding books:", error);
    throw error;
  }
};

export default seedBooks;
