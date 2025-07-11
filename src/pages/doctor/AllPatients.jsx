import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ban, Heart, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import HeartbeatStatus from "./HeartBeatStatus";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import backend from "@/utils";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";

export default function AllPatients({ patients, getAllPatients }) {
  if (!patients || patients.length === 0) {
    return <div>No patients found.</div>;
  }

  async function handleDelete(id) {
    try {
      await backend.delete(`/heart-data/${id}`);
      toast.success("Patient deleted successfully");
      getAllPatients();
    } catch (error) {
      toast.error(error?.response?.data.error || error.message);
    }
  }

  useEffect(() => {
    if (getAllPatients) {
      getAllPatients();
    }
  }, []);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>National ID</TableHead>
            <TableHead>Ages</TableHead>
            <TableHead>Heartbeat</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient, index) => (
            <TableRow key={patient.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{patient.patient_code}</TableCell>
              <TableCell>{patient.patient_name}</TableCell>
              <TableCell>{patient.nid || "N/A"}</TableCell>
              <TableCell>{patient.ages || "N/A"}</TableCell>
              <TableCell>
                {patient.heartbeat || (
                  <Ban
                    size={18}
                    color="red"
                  />
                )}
              </TableCell>
              <TableCell>
                {patient.status && (
                  <HeartbeatStatus
                    heartbeat={patient.heartbeat}
                    status={patient.status}
                  />
                )}

                {!patient.status && (
                  <Ban
                    size={18}
                    color="red"
                  />
                )}
              </TableCell>
              <TableCell>
                {new Date(patient.recorded_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(patient.recorded_at).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                <DeleteAlertDialog onConfirm={() => handleDelete(patient.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
