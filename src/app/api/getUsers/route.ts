import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find().lean();

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
