import { connectDB } from "@/lib/mongodb";
import Doctor from "@/model/doctorModel";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const { available } = await request.json();

    const doctor = await Doctor.findByIdAndUpdate(
      (await params).id,
      { available },
      { new: true }
    ).lean();

    if (!doctor) {
      return NextResponse.json(
        { success: false, message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, doctor });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
