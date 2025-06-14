import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import backend from "@/utils";
import Loading from "@/components/Loading";
import NewUserDialog from "./NewUserDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PenLineIcon } from "lucide-react";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import EditUser from "./EditUser";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function getAllUsers() {
    try {
      setLoading(true);
      const { data } = await backend.get("/users");
      setUsers(data);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  async function handleDeleteUser(id) {
    try {
      await backend.delete(`/users/${id}`);
      toast.success("User deleted");
      getAllUsers();
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">All Users</h1>
        <div>
          <NewUserDialog refreshUsers={getAllUsers} />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Names</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.names}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role?.role_name}</TableCell>
              <TableCell className="flex gap-2">
                <DeleteAlertDialog
                  onConfirm={() => handleDeleteUser(user.id)}
                />

                <EditUser
                  refreshUsers={getAllUsers}
                  user={user}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AllUsers;
