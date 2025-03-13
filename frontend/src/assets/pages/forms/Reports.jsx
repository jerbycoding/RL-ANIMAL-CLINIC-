import { Card, CardContent } from "@/components/ui/card";
import { FileText, ListOrdered } from "lucide-react";

export default function VetClinic() {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Veterinary Clinic</h1>
      
      {/* Overview Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent>
            <p className="text-lg font-semibold">Total Appointments</p>
            <p className="text-3xl font-bold">120</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-lg font-semibold">Revenue</p>
            <p className="text-3xl font-bold">$8,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-lg font-semibold">Expenses</p>
            <p className="text-3xl font-bold">$3,200</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FileText className="mr-2" /> Reports
        </h2>
        <p>Financial reports, invoices, and summaries will go here.</p>
      </div>

      {/* Logs Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <ListOrdered className="mr-2" /> Logs
        </h2>
        <p>Activity logs, appointments, and actions will be displayed here.</p>
      </div>
    </div>
  );
}
