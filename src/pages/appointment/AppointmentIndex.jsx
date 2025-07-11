import React, { useEffect, useState } from "react";
import AppointmentTable from "./AppointmentsTable";
import { toast } from "sonner";
import backend from "@/utils";
import { Loader } from "lucide-react";
import PendingAppointments from "./AppointmentsTable";

function AppointmentIndex({ type }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const pendingAppData = data.filter(
    (appointment) => appointment.status === "Pending"
  );
  const resolvedAppData = data.filter(
    (appointment) => appointment.status === "Resolved"
  );

  async function getAppointmentsData(lodingEnabled = true) {
    try {
      if (lodingEnabled) {
        setLoading(true);
      }
      const { data: appoints } = await backend.get("/appointments");
      setData(appoints);
    } catch (error) {
      toast.error("Error", { description: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAppointmentsData();
  }, []);

  useEffect(() => {
    getAppointmentsData();
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1>
        <span className="capitalize">{type}</span> appointments
      </h1>
      <AppointmentTable
        getAppointmentsData={getAppointmentsData}
        appointments={type === "pending" ? pendingAppData : resolvedAppData}
      />
    </div>
  );
}

export default AppointmentIndex;
