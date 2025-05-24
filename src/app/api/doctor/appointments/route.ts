import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import appointmentModel from "@/model/appointmentDoctor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/components/providers/NextAuthOptions";

const getAge = (dob: string) => {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export async function GET() {
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
    const appointments = await appointmentModel
      .find({ docId: session.user.id })
      .populate("userId")
      .lean();

    const formatted = appointments.map((a) => {
      const now = new Date();
      const appointmentDate = new Date(`${a.slotDate} ${a.slotTime}`);

      let status = "upcoming";
      if (a.cancelled === 1) status = "cancelled";
      else if (a.isCompleted) status = "complete";
      else if (appointmentDate < now) status = "missed";

      return {
        _id: a._id,
        slotDate: a.slotDate,
        slotTime: a.slotTime,
        status,
        userData: {
          name: a.userData?.name || a.userId?.name,
          image: a.userData?.image || a.userId?.image,
          age: a.userId?.dob ? getAge(a.userId.dob) : "N/A",
        },
      };
    });

    return NextResponse.json({ success: true, appointments: formatted });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
