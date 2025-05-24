import bcrypt from "bcryptjs";
import { Schema, model, models, Document } from "mongoose";

interface DoctorDocument extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  specialization: string;
  degree: string;
  experience: string;
  about: string;
  available: boolean;
  fees: number;
  department?: string; // ✅ new field
  address: {
    street?: string;
    city?: string;
  };
  date: number;
  slots_booked: Map<string, string>;
  role?: string;
}

const addressSchema = new Schema(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
  },
  { _id: false }
);

const doctorSchema = new Schema<DoctorDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "doctor" },
    image: { type: String, required: true },
    specialization: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    fees: { type: Number, required: true },
    address: { type: addressSchema, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Map, of: String, default: {} },
    department: { type: String, default: "General" },
  },
  { minimize: false }
);
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Doctor = models.Doctor || model<DoctorDocument>("Doctor", doctorSchema);

export default Doctor;
