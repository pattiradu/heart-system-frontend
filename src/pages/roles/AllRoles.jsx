import {
  PlusCircle,
  SquareDashed,
  SquarePen,
  Trash2Icon,
  UserCog,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import backend from "../../utils";
import { Button } from "@/components/ui/button";

function AllRoles() {
  const [roles, setRoles] = useState([]);

  const getAllRoles = async () => {
    try {
      const { data } = await backend.get("/roles");
      setRoles(data);
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      toast.error(errorMessage);
    }
  };

  //   delete role
  const handleDelete = async (id, role) => {
    if (!window.confirm("Are you sure to delete role " + role)) {
      return;
    }
    try {
      const { data } = await backend.delete("/roles/" + id);
      toast.success("Role deleted");
      getAllRoles();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1>All Roles</h1>
        <div>
          <Link to={"/role-create"}>
            <Button>
              <PlusCircle size={18} /> New role
            </Button>
          </Link>
        </div>
      </div>

      {/* all roles */}
      <div className="grid gap-2 mt-3">
        {roles.map((role, index) => (
          <div
            key={index}
            className="shadow p-3 border dark:border-gray-700 rounded-xl flex justify-between items-center"
          >
            <div className="flex gap-5">
              <UserCog className="text-sky-800" />
              <h1> {role.role_name}</h1>
            </div>

            <ul className="flex items-center gap-5">
              <li>
                <Button
                  variant={"outline"}
                  onClick={() => handleDelete(role.id, role.role_name)}
                  className="flex gap-3 items-center hover:cursor-pointer"
                >
                  <Trash2Icon
                    size={18}
                    className="text-red-700 "
                  />
                  Delete
                </Button>
              </li>
              <li>
                <Link
                  to={"/role-edit/" + role.id}
                  className="flex items-center gap-3"
                >
                  <Button variant={"outline"}>
                    <SquarePen size={18} />
                    Edit
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRoles;
