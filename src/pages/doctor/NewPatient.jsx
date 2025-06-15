import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import backend from "@/utils";
import { toast } from "sonner";

export default function NewPatient() {
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.nationalId.trim())
      newErrors.nationalId = "National ID is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // call api
    const response = await backend.post("/heart-data-patient", {
      patient_name: formData.name,
      nid: formData.nationalId,
      ages: parseInt(formData.dob),
    });
    toast.success("Patient added successfully!");

    // reset form (optional)
    setFormData({ name: "", nationalId: "", dob: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-1"
        >
          Name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* National ID */}
      <div>
        <label
          htmlFor="nationalId"
          className="block text-sm font-medium mb-1"
        >
          National ID
        </label>
        <Input
          id="nationalId"
          name="nationalId"
          placeholder="Enter National ID"
          value={formData.nationalId}
          onChange={handleChange}
        />
        {errors.nationalId && (
          <p className="text-sm text-red-500 mt-1">{errors.nationalId}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label
          htmlFor="dob"
          className="block text-sm font-medium mb-1"
        >
          Date of Birth
        </label>
        <Input
          type="number"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dob && (
          <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
