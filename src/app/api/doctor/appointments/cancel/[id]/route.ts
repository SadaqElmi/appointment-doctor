import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import appointmentModel from "@/model/appointmentDoctor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/components/providers/NextAuthOptions";
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "doctor" && session.user.role !== "admin")
  ) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await appointmentModel.findByIdAndUpdate(params.id, { cancelled: 1 });
    return NextResponse.json({
      success: true,
      message: "Appointment cancelled",
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
