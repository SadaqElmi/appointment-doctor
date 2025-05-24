import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/model/doctorModel";

export async function GET() {
  try {
    await connectDB();

    const doctors = await Doctor.find().lean();

    return NextResponse.json({ success: true, doctors });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
