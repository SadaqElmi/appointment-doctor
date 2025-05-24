import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import appointmentModel from "@/model/appointmentDoctor";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Appointment ID is required." },
        { status: 400 }
      );
    }

    const deleted = await appointmentModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Appointment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment deleted.",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
