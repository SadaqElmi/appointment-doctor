import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import appointmentModel from "@/model/appointmentDoctor";

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();

    const newAppointment = new appointmentModel(data);
    await newAppointment.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
