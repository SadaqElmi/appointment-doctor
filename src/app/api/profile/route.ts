import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
export type UserUpdate = {
  phone: string;
  gender: string;
  dob: string;
  age?: number;
  image?: string;
  address: {
    line1: string;
    line2: string;
  };
};

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const phone = formData.get("phone") as string;
    const gender = formData.get("gender") as string;
    const dob = formData.get("dob") as string;
    const line1 = formData.get("address1") as string;
    const line2 = formData.get("address2") as string;
    const image = formData.get("imageFile") as File | null;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID missing" },
        { status: 400 }
      );
    }

    // Calculate age from dob
    function calculateAgeFromDob(dobStr: string): number | undefined {
      const dob = new Date(dobStr);
      if (isNaN(dob.getTime())) return undefined;

      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    }

    const age = calculateAgeFromDob(dob);

    let imageUrl: string | undefined;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      imageUrl = await new Promise((resolve, reject) => {
        const upload = cloudinary.v2.uploader.upload_stream(
          { folder: "profile" },
          (err, result) => {
            if (err || !result) return reject(err);
            resolve(result.secure_url);
          }
        );
        upload.end(buffer);
      });
    }

    const updateFields: UserUpdate = {
      phone,
      gender,
      dob,
      age,
      address: { line1, line2 },
    };

    if (imageUrl) {
      updateFields.image = imageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
