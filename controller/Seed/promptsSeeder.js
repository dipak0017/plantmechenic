import mongoose from "mongoose";
import connectDB from "../../config/db.js";
import Prompt from "../../Model/Prompt.js";

const prompts = [
  {
    title: "What is my zodiac sign?",
    desc: "What does my zodiac sign reveal about my personality?",
    categories_id: "68232e5de72077640fa1eb8e",
    image: "/Uploads/astrology1.png"
  },
  {
    title: "What is my rising sign?",
    desc: "How does my rising sign differ from my sun sign?",
    categories_id: "68232e5de72077640fa1eb8e",
    image: "/Uploads/astrology2.png"
  },
  {
    title: "How do I find my moon sign?",
    desc: "What does my moon sign represent in astrology?",
    categories_id: "68232e5de72077640fa1eb8e",
    image: "/Uploads/astrology3.png"
  },
  {
    title: "Can you explain compatibility with another zodiac sign?",
    desc: "Understand zodiac compatibility between two signs.",
    categories_id: "68232e5de72077640fa1eb8e",
    image: "/Uploads/astrology4.png"
  },
];

export async function seedPrompts() {
  try {
    await connectDB();
    const inserted = await Prompt.insertMany(prompts);
    console.log(`✅ Inserted ${inserted.length} prompts`);
  } catch (err) {
    console.error('❌ Seeding failed', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
}

seedPrompts();
