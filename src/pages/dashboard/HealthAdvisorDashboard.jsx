import React, { useEffect, useState } from "react";
import backend from "@/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HealthAdvisorDashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    backend.get("/heart-data").then(res => setPatients(res.data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Health Advisor</h1>
      <div className="mb-6">Total Patients: <span className="font-semibold">{patients.length}</span></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Heartbeat</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.patient_name}</TableCell>
              <TableCell>{p.status || 'N/A'}</TableCell>
              <TableCell>{p.heartbeat || 'N/A'}</TableCell>
              <TableCell>{new Date(p.recorded_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 