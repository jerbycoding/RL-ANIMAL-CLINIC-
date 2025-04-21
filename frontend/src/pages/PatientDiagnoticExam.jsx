import React, { useState } from "react";
import PhysicalExamForm from "./PhysicalExam";
import TestForm from "./DiagnosticExam";

function PatientDiagnosticExam() {
  const [activeSection, setActiveSection] = useState("Physical Exam");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="  ">
      {/* Header Buttons */}
      <div className=" mb-6 space-x-4 ">
        <button
          onClick={() => handleSectionChange("Physical Exam")}
          className={`py-2 px-4 rounded-md text-white ${
            activeSection === "Physical Exam"
              ? "bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          Physical Exam
        </button>
        <button
          onClick={() => handleSectionChange("Laboratory/Diagnostic")}
          className={`py-2 px-4 rounded-md text-white ${
            activeSection === "Laboratory/Diagnostic"
              ? "bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          Laboratory/Diagnostic
        </button>
      </div>

      {/* Content Section */}
      <div>
        {activeSection === "Physical Exam" && (
          <PhysicalExamForm />
        )}
        {activeSection === "Laboratory/Diagnostic" && (
          <div className=" bg-gray-100 rounded-md shadow-md">


                <TestForm></TestForm>

          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDiagnosticExam;