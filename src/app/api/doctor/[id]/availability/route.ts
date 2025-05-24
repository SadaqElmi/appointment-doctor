import { connectDB } from "@/lib/mongodb";
import Doctor from "@/model/doctorModel";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const { available } = await req.json();

    const doctor = await Doctor.findByIdAndUpdate(
      params.id,
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
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
