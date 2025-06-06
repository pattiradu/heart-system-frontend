import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import backend from "../../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateRole() {
  const [roleName, setRoleName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await backend.post("/roles", { role_name: roleName });
      toast.success("Role created");
      navigate("/roles");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Create New Role</h1>
        <Link to="/roles">
          <Button>
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-md shadow space-y-4 border dark:border-gray-600"
      >
        <div>
          <Label
            htmlFor="roleName"
            className={"mb-2"}
          >
            Role Name
          </Label>
          <Input
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            type="text"
            id="roleName"
            placeholder="e.g. Doctor, Admin, Patient"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="pt-4">
          <Button type="submit">
            <Save size={18} />
            Save Role
          </Button>
        </div>
      </form>
    </div>
  );
}
