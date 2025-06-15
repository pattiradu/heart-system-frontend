import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { PlusCircle, SaveAll, UserCheck2, UserCog } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import backend from "@/utils";

export default function NewUserDialog({ refreshUsers }) {
  const [isLoading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    names: "",
    email: "",
    password: "",
    role_id: "",
  });

  async function getAllRoles() {
    try {
      const { data } = await backend.get("/roles");
      setRoles(data);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    }
  }

  useEffect(() => {
    getAllRoles();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function storeNewUser() {
    // Basic validation
    if (!formData.names.trim()) {
      toast.error("Full Names are required.");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required.");
      return;
    }
    if (!formData.role_id) {
      toast.error("Role is required.");
      return;
    }

    try {
      await backend.post("/users", formData);
      toast.success("New user saved");
      refreshUsers();
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    }
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogDescription>{""}</AlertDialogDescription>
        <AlertDialogTrigger asChild>
          <Button>
            <PlusCircle size={18} /> New User
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent aria-describedby={"undefined"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create new user</AlertDialogTitle>
          </AlertDialogHeader>

          {/* new user form */}
          <div className="space-y-3">
            <Label>Full Names</Label>
            <Input
              type={"text"}
              value={formData.names}
              name={"names"}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-3">
            <Label>Email</Label>
            <Input
              name={"email"}
              type={"email"}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-3">
            <Label>Password</Label>
            <Input
              type={"password"}
              name={"password"}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <Label>Role</Label>
            <Select
              name="role_id"
              onValueChange={(value) =>
                setFormData({ ...formData, role_id: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem
                    key={role.id}
                    value={role.id}
                  >
                    <UserCog /> {role.role_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={storeNewUser}>
                <SaveAll size={18} /> Save User
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
