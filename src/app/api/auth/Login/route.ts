// app/api/auth/Login/route.ts

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        image: user.image,
        address: user.address,
        role: user.role,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Server error",
        detail:
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message: string }).message
            : String(err),
      },
      { status: 500 }
    );
  }
}
