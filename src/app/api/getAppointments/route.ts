import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import appointmentModel from "@/model/appointmentDoctor";

export async function GET() {
  try {
    await connectDB();

    const appointments = await appointmentModel
      .find()
      .populate("docId") // gets full doctor info
      .populate("userId") // gets full user info
      .lean();

    return NextResponse.json({ success: true, appointments });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
