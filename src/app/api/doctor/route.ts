import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/model/doctorModel";

export async function GET() {
  try {
    await connectDB();

    const doctors = await Doctor.find().lean();

    return NextResponse.json({ success: true, doctors });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
