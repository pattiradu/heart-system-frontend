import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllPatients from "./AllPatients";
import NewPatient from "./NewPatient";
import { toast } from "sonner";
import backend from "@/utils";

function DoctorHome() {
  const [patients, setPatients] = useState([]);

  async function getAllPatients() {
    try {
      const response = await backend.get("/heart-data");
      // const response = await axios.get("http://localhost:5000/heart-data");
      setPatients(response.data);
    } catch (error) {
      toast.error(error?.response?.data.error || error.message);
    }
  }

  const diagnosedPatients = patients.filter(
    (patient) => patient.heartbeat != null
  );

  const waitingPatients = patients.filter(
    (patient) => patient.heartbeat == null
  );

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <div>
      <Tabs defaultValue="patients">
        <TabsList>
          <TabsTrigger value="patients">All Patients</TabsTrigger>
          <TabsTrigger value="diagnosed">Diagnosed</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="newpatient">New Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="patients">
          <AllPatients
            patients={patients}
            getAllPatients={() => getAllPatients()}
          />
        </TabsContent>
        <TabsContent value="newpatient">
          <NewPatient getAllPatients={getAllPatients} />
        </TabsContent>
        <TabsContent value="diagnosed">
          <AllPatients
            patients={diagnosedPatients}
            getAllPatients={getAllPatients}
          />
        </TabsContent>
        <TabsContent value="waiting">
          <AllPatients
            patients={waitingPatients}
            getAllPatients={getAllPatients}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DoctorHome;
