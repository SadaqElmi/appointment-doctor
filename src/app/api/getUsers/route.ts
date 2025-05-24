import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find().lean();

    return NextResponse.json({ success: true, users });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
