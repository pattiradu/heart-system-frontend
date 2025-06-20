import React, { useEffect, useState } from "react";
import backend from "@/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function UserDashboard() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    backend.get("/heart-data").then(res => {
      // If user has a patient_code or name, filter by that
      const filtered = res.data.filter(p => p.patient_name === user.names);
      setData(filtered);
    });
  }, [user]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.names || 'User'}</h1>
      <div className="mb-6">Your Records: <span className="font-semibold">{data.length}</span></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Heartbeat</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{new Date(p.recorded_at).toLocaleDateString()}</TableCell>
              <TableCell>{p.heartbeat || 'N/A'}</TableCell>
              <TableCell>{p.status || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 