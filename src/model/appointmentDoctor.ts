import { Schema, model, models, Document } from "mongoose";

// Define the TypeScript interface for the appointment document
interface AppointmentDocument extends Document {
  userId: Schema.Types.ObjectId;
  docId: Schema.Types.ObjectId;
  slotDate: string;
  slotTime: string;
  userData: Record<string, Date>;
  docData: Record<string, Date>;
  amount: number;
  date: number;
  cancelled: number;
  payment: boolean;
  isCompleted: boolean;
}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    docId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
  },
  { minimize: false }
);

const appointmentModel =
  models.appointment ||
  model<AppointmentDocument>("appointment", appointmentSchema);

export default appointmentModel;
