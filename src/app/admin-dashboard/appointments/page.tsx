import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { assets_admin } from "@/mockdata/assentAdmin";
import { assets } from "@/mockdata/assets";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const appointments = [
  {
    id: 1,
    patientName: "Richard James",
    patientImg: assets.profile_pic, // replace with correct path
    department: "Richard James",
    age: 28,
    dateTime: "24th July, 2024, 10:AM",
    doctorName: "Dr. Richard James",
    doctorImg: assets.profile_pic, // replace with correct path
    fees: "$50",
  },
  {
    id: 2,
    patientName: "Richard James",
    patientImg: assets.profile_pic,
    department: "Richard James",
    age: 28,
    dateTime: "24th July, 2024, 10:AM",
    doctorName: "Dr. Richard James",
    doctorImg: assets.profile_pic,
    fees: "$50",
  },
];

const Appointments = () => {
  return (
    <div className="p-4">
      <h1 className="font-semibold text-xl mb-4">All Appointments</h1>
      <div className="overflow-x-auto rounded-lg border border-[#E6E8F0] shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB]">
              <TableHead>#</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead className="ml-5">Department</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((app, index) => (
              <TableRow key={app.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={app.patientImg}
                    alt="patient"
                    width={30}
                    height={30}
                    className="rounded-full"
                    priority
                  />
                  {app.patientName}
                </TableCell>
                <TableCell>{app.department}</TableCell>
                <TableCell>{app.age}</TableCell>
                <TableCell>{app.dateTime}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={app.doctorImg}
                    alt="doctor"
                    width={30}
                    height={30}
                    className="rounded-full"
                    priority
                  />
                  {app.doctorName}
                </TableCell>
                <TableCell>{app.fees}</TableCell>
                <TableCell>
                  <button className="bg-red-100 text-red-600 hover:bg-red-200 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ">
                    <X size={14} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Appointments;
