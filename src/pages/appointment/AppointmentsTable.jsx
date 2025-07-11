import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCheck, Trash2, Undo2 } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import backend from "@/utils";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { Card, CardContent } from "@/components/ui/card";

function AppointmentsTable({ appointments, getAppointmentsData }) {
  const [waiting, setWaiting] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Notify if action is attempted while waiting
  function showWaitingNotice() {
    toast.info("Please wait", {
      description: "Your previous request is still processing.",
    });
  }

  async function handleAppointmentResolve(activeAppointment) {
    if (activeAppointment == null) {
      return toast.error("No selected appointment");
    }

    try {
      setWaiting(true);
      const { data } = await backend.patch(
        `/appointments/${activeAppointment.id}`
      );
      toast.success("Success", { description: data.success });
      getAppointmentsData(false);
    } catch (error) {
      toast.error("Error", { description: error.message });
    } finally {
      setWaiting(false);
    }
  }

  async function handleAppointmentDelete(activeAppointment) {
    if (activeAppointment == null) {
      return toast.error("No selected appointment");
    }

    try {
      setWaiting(true);
      const { data } = await backend.delete(
        `/appointments/${activeAppointment.id}`
      );
      toast.success("Success", { description: data.success });
      getAppointmentsData(false);
    } catch (error) {
      toast.error("Error", { description: error.message });
    } finally {
      setWaiting(false);
    }
  }

  // if no data
  if (appointments.length === 0) {
    return (
      <Card className={"my-3 bg-red-500/10 text-red-700"}>
        <CardContent>
          <p>No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Date created</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Doctor email</TableHead>
            <TableHead>Doctor name</TableHead>
            <TableHead>Doctor Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((item, index) => {
            const isPending = item.status === "Pending";
            const icon = isPending ? <CheckCheck /> : <Undo2 />;
            const label = isPending ? "Resolve" : "Revert";

            return (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {moment(item.appointment_date).calendar()}
                </TableCell>
                <TableCell>{item.patient_name}</TableCell>
                <TableCell>
                  <Badge
                    variant={cn(
                      item.status === "Pending" ? "destructive" : "outline"
                    )}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.doctor?.email ?? "N/A"}</TableCell>
                <TableCell className="capitalize">
                  {item.doctor?.names ?? "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <DeleteAlertDialog
                      onConfirm={() => handleAppointmentDelete(item)}
                    />

                    <Button
                      disabled={waiting}
                      onClick={() => {
                        if (waiting) return showWaitingNotice();
                        setActiveId(item.id);
                        handleAppointmentResolve(item);
                      }}
                    >
                      {icon} {label}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppointmentsTable;
