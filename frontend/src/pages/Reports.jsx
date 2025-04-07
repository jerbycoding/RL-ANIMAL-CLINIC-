import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const reportsData = {
  sales: [
    { date: "2025-03-30", item: "Dog Food", quantity: 2, price: "$40", method: "Card" },
    { date: "2025-03-29", item: "Cat Medicine", quantity: 1, price: "$15", method: "Cash" },
  ],
  patients: [
    { pet: "Buddy", owner: "John Doe", species: "Dog", lastVisit: "2025-03-28", history: "Vaccination" },
    { pet: "Whiskers", owner: "Jane Smith", species: "Cat", lastVisit: "2025-03-25", history: "Checkup" },
  ],
};

const logsData = {
  appointments: [
    
    { id: "APT123", pet: "Buddy", owner: "John Doe", date: "2025-03-28", status: "Completed" },
    { id: "APT123", pet: "Buddy", owner: "John Doe", date: "2025-03-28", status: "Completed" },
    { id: "APT123", pet: "Buddy", owner: "John Doe", date: "2025-03-28", status: "Completed" },
    { id: "APT123", pet: "Buddy", owner: "John Doe", date: "2025-03-28", status: "Completed" },
    { id: "APT123", pet: "Buddy", owner: "John Doe", date: "2025-03-28", status: "Completed" },
    { id: "APT123", pet: "Buddy", owner: "John Doe", date: "2025-03-28", status: "Completed" },
    { id: "APT123", pet: "Buddy", owner: "John Doe", date: "2025-03-28", status: "Completed" },
    { id: "APT123", pet: "Buddy", owner: "John Doe", date: "2025-03-28", status: "Completed" },
  ],
  billing: [
    { invoice: "INV456", amount: "$55", method: "Card", date: "2025-03-29" },
  ],
  activity: [
    { user: "Admin", action: "Added new patient", timestamp: "2025-03-30 10:00 AM" },
  ],
  inventory: [
    { item: "Dog Food", change: "-2", updatedStock: "10", date: "2025-03-30" },
  ],
};

function DataTable({ data, columns }) {
  return (
    <div className="overflow-x-auto max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th key={col} className="py-2 px-4 border-b dark:border-gray-600 text-left text-sm font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
              {Object.values(row).map((val, i) => (
                <td key={i} className="py-2 px-4 text-sm">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ReportsLogs() {
  const [tab, setTab] = useState("reports");

  return (
    <div className="w-full h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <Tabs defaultValue="reports" onValueChange={setTab} className="w-full">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Sales Report (Food & Medicine)</h2>
              <DataTable data={reportsData.sales} columns={["Date", "Item", "Quantity", "Price", "Payment Method"]} />
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Patient Report</h2>
              <DataTable data={reportsData.patients} columns={["Pet Name", "Owner", "Species", "Last Visit", "History"]} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Appointment Logs</h2>
              <DataTable data={logsData.appointments} columns={["ID", "Pet", "Owner", "Date", "Status"]} />
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Billing & Payment Logs</h2>
              <DataTable data={logsData.billing} columns={["Invoice", "Amount", "Method", "Date"]} />
              
              <h2 className="text-xl font-semibold mt-6 mb-4">User Activity Logs</h2>
              <DataTable data={logsData.activity} columns={["User", "Action", "Timestamp"]} />
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Inventory Logs</h2>
              <DataTable data={logsData.inventory} columns={["Item", "Change", "Updated Stock", "Date"]} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
