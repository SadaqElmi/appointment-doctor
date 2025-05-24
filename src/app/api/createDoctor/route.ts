import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Doctor from "@/model/doctorModel";
import cloudinary from "@/lib/cloudinary";

const cloudinaryV2 = cloudinary.v2;

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("image") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinaryV2.uploader
        .upload_stream({ folder: "doctors" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    const doctor = new Doctor({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: (uploadResult as { secure_url: string }).secure_url,
      specialization: formData.get("specialization"),
      degree: formData.get("degree"),
      experience: formData.get("experience"),
      about: formData.get("about"),
      available: true,
      fees: formData.get("fees"),
      department: formData.get("department"),
      address: {
        street: formData.get("address1"),
        city: formData.get("address2"),
      },
      date: Date.now(),
      slots_booked: {},
    });

    await doctor.save();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
