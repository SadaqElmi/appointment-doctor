"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import { assets } from "@/mockdata/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type Patient = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  image?: string;
  bannedUntil?: Date;
};

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/getUsers");

      setPatients(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/users/${id}`);
      if (res) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleRoleDropdownChange = async (
    id: string,
    newRole: "user" | "admin"
  ) => {
    try {
      const res = await axios.patch(`/api/users/${id}`, {
        role: newRole,
      });

      if (res) {
        fetchUsers();
        toast.success("User role updated");
      } else {
        toast.error("Failed to update role");
      }
    } catch (error) {
      console.error("Update role error:", error);
      toast.error("Failed to update role");
    }
  };

  const handleBanUser = async (userId: string, hours: number) => {
    try {
      const res = await fetch(`/api/users/${userId}/ban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours }),
      });

      if (res.ok) {
        toast.success(`User banned for ${hours} hours`);
        fetchUsers();
      } else {
        toast.error("Failed to ban user");
      }
    } catch (error) {
      console.error("Ban error:", error);
      toast.error("Failed to ban user");
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      const res = await axios.put(`/api/users/${userId}/unban`);

      if (res) {
        toast.success("User unbanned");
        fetchUsers();
      } else {
        toast.error("Failed to unban user");
      }
    } catch (error) {
      console.error("Unban error:", error);
      toast.error("Failed to unban user");
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="font-semibold text-xl mb-4">All Patients</h1>
        <div className="overflow-x-auto rounded-lg border border-[#E6E8F0] shadow-sm px-5">
          <Table>
            <TableCaption>A list of all registered users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((app, index) => (
                <TableRow key={app._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Image
                      src={app.image || assets.profile_pic}
                      alt="patient"
                      className="rounded-full object-cover h-[30px] w-[30px]"
                      width={30}
                      height={30}
                      priority
                    />
                    {app.name || "N/A"}
                  </TableCell>
                  <TableCell>{app.email || "N/A"}</TableCell>
                  <TableCell>
                    <select
                      value={app.role}
                      onChange={(e) =>
                        handleRoleDropdownChange(
                          app._id,
                          e.target.value as "user" | "admin"
                        )
                      }
                      className="border border-gray-300 p-1 rounded  dark:bg-[#252728]"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    {app.bannedUntil &&
                    new Date(app.bannedUntil) > new Date() ? (
                      <span className="text-red-500">Banned </span>
                    ) : (
                      <span className="text-green-500">Active</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleBanUser(app._id, 1)}
                        >
                          Ban User (1 hour)
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleBanUser(app._id, 10)}
                        >
                          Ban User (10 hours)
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUnbanUser(app._id)}
                        >
                          Unban User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(app._id)}>
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} className="text-right font-medium">
                  {patients.length} Users
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Patients;
