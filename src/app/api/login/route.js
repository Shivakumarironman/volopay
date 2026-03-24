import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("volopay");
    const collection = db.collection("users");

    await collection.insertOne({ email, password, createdAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Insertion Error:", error);
    return NextResponse.json(
      { error: "Failed to store login details" },
      { status: 500 }
    );
  }
}
