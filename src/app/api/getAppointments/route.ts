import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import appointmentModel from "@/model/appointmentDoctor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/components/providers/NextAuthOptions";

function getAge(dob: string) {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const appointments = await appointmentModel
      .find({})
      .populate("userId")
      .populate("docId")
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
          name: a.userId?.name || "Unknown Patient",
          image: a.userId?.image || null,
          age: a.userId?.dob ? getAge(a.userId.dob) : "N/A",
        },
        docData: {
          name: a.docId?.name || "Unknown Doctor",
          image: a.docId?.image || null,
          department: a.docId?.department || "General",
          fees: a.docId?.fees || 0,
        },
      };
    });

    return NextResponse.json({ success: true, appointments: formatted });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
