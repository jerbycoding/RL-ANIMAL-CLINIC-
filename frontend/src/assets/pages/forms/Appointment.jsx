import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";

export default function VetAppointmentScheduler() {
  const [appointments, setAppointments] = useState([]);
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAddAppointment = () => {
    if (!petName || !ownerName || !date || !time || !reason) return;
    const newAppointment = { petName, ownerName, date, time, reason };
    setAppointments([...appointments, newAppointment]);
    setPetName("");
    setOwnerName("");
    setDate("");
    setTime("");
    setReason("");
  };

  const handleSort = () => {
    const sortedAppointments = [...appointments].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
    setAppointments(sortedAppointments);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-col items-end space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-1/2   max-w-sm">Schedule Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule a Veterinary Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Pet's Name</Label>
            <Input value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="Enter pet's name" />
            <Label>Owner's Name</Label>
            <Input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Enter owner's name" />
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Label>Time</Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <Label>Reason for Visit</Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter reason (e.g., Check-up, Vaccination)" />
            <Button onClick={handleAddAppointment} className="w-full mt-2">
              Schedule Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-white p-6 rounded-xl shadow-md min-w-full">
        <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
        <Button onClick={handleSort} className="mb-4">
          Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </Button>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Pet</th>
                <th className="border border-gray-300 px-4 py-2">Owner</th>
       
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No appointments scheduled.</td>
                </tr>
              ) : (
                appointments.map((appt, index) => (
                  <tr key={index} className="text-center">
                     <td className="border border-gray-300 px-4 py-2">{format(new Date(appt.date), "PPP")}</td>
                    <td className="border border-gray-300 px-4 py-2">{appt.petName}</td>
                    <td className="border border-gray-300 px-4 py-2">{appt.ownerName}</td>
                   
                    <td className="border border-gray-300 px-4 py-2">{appt.time}</td>
                    <td className="border border-gray-300 px-4 py-2">{appt.reason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
