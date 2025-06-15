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
import { Edit2, PlusCircle, SaveAll, UserCheck2, UserCog } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import backend from "@/utils";
import { set } from "react-hook-form";

export default function EditUser({ refreshUsers, user }) {
  const [isLoading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [currentRole, setCurrentRole] = useState("");
  // Initialize form data with user details or empty strings
  // This will be used to populate the form fields
  // when editing an existing user or creating a new one

  const [formData, setFormData] = useState({
    names: user?.names || "",
    email: user?.email || "",
    password: user?.password || "",
    role_id: user.role_id || "",
  });

  // filter the selected role from roles and then assign the role name to the defined state
  useEffect(() => {
    const selectedRole = roles.find((role) => role.id === formData.role_id);
    setCurrentRole(selectedRole?.role_name || "");
  }, [formData.role_id, roles]);

  async function getAllRoles() {
    try {
      setLoading(true);
      const { data } = await backend.get("/roles");
      setRoles(data);
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
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

  async function updateUser() {
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
      await backend.put("/users/" + user.id, formData);
      toast.success("User updated successfully");
      refreshUsers();
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    }
  }

  return (
    <div>
      <AlertDialog aria-describedby={"modal"}>
        <AlertDialogTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className="mr-2"
          >
            <Edit2 size={18} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent aria-describedby={"modal"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit a user</AlertDialogTitle>
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

          {roles.length > 0 && (
            <div className="space-y-3">
              <Label>Role</Label>
              <Select
                name="role_id"
                onValueChange={(value) =>
                  setFormData({ ...formData, role_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={currentRole || "Select a role"}
                    defaultValue={formData.role_id}
                  />
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
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={updateUser}
                disabled={isLoading}
              >
                <SaveAll size={18} /> Save Changes
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
