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

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { payment: true, isCompleted: true },
      { new: true }
    );

    if (!updatedAppointment) {
      return NextResponse.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, updatedAppointment });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
