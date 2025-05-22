import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import appointmentModel from "@/model/appointmentDoctor";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { appointmentId } = await req.json();

    if (!appointmentId) {
      return NextResponse.json(
        { success: false, message: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const updated = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { cancelled: 1 },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment cancelled",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
