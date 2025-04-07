import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PatientForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState(false);
  const [ownerInput, setOwnerInput] = useState({ name: "", address: "", contactNumber: "" });
  const [patientInput, setPatientInput] = useState({ name: "", dateOfBirth: "", sex: "Male", breed: "", species: "", color: "", owner: "" });
  const navigate = useNavigate(); 
  useEffect(() => {
    fetch("http://localhost:5000/owners")
      .then((res) => res.json())
      .then((data) => setOwners(data))
      .catch((err) => enqueueSnackbar("Error fetching owners", { variant: "error" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ownerId = patientInput.owner;

    try {
      if (newOwner) {
        const res = await fetch("http://localhost:5000/owners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ownerInput),
        });
        const data = await res.json();
        ownerId = data._id;
        setOwners([...owners, data]);
        enqueueSnackbar("New owner added successfully", { variant: "success" });
      }
      const res = await fetch("http://localhost:5000/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...patientInput, owner: ownerId }),
      });
      if (res.ok) {
        setPatientInput({ name: "", dateOfBirth: "", sex: "Male", breed: "", species: "", color: "", owner: "" });
        setOwnerInput({ name: "", address: "", contactNumber: "" });
        setNewOwner(false);
        enqueueSnackbar("Patient added successfully", { variant: "success" });
        navigate('/PatientManagement')

      } else {
        enqueueSnackbar("Failed to add patient", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", { variant: "error" });
    }
  };

  return (
    <div className="p-4">
        <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-2">Add Patient</h2>
            <Button className="bg-blue-700" onClick={()=>{navigate('/PatientManagement')}}>Exit</Button>
        </div>
 
      <form className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <input className="border p-2" placeholder="Name" value={patientInput.name} onChange={(e) => setPatientInput({ ...patientInput, name: e.target.value })} required />
        <input className="border p-2" type="date" value={patientInput.dateOfBirth} onChange={(e) => setPatientInput({ ...patientInput, dateOfBirth: e.target.value })} required />
        <select className="border p-2" value={patientInput.sex} onChange={(e) => setPatientInput({ ...patientInput, sex: e.target.value })}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input className="border p-2" placeholder="Breed" value={patientInput.breed} onChange={(e) => setPatientInput({ ...patientInput, breed: e.target.value })} required />
        <input className="border p-2" placeholder="Species" value={patientInput.species} onChange={(e) => setPatientInput({ ...patientInput, species: e.target.value })} required />
        <input className="border p-2" placeholder="Color" value={patientInput.color} onChange={(e) => setPatientInput({ ...patientInput, color: e.target.value })} required />
        <div className="flex gap-2">
          <label>
            <input type="radio" name="ownerType" value="existing" checked={!newOwner} onChange={() => setNewOwner(false)} />
            Existing Owner
          </label>
          <label>
            <input type="radio" name="ownerType" value="new" checked={newOwner} onChange={() => setNewOwner(true)} />
            New Owner
          </label>
        </div>
        
        {!newOwner && (
          <select className="border p-2" value={patientInput.owner} onChange={(e) => setPatientInput({ ...patientInput, owner: e.target.value })} required>
            <option value="">Select Owner</option>
            {owners.map((owner) => (
              <option key={owner._id} value={owner._id}>{owner.name}</option>
            ))}
          </select>
        )}

        {newOwner && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Add Owner</h2>
            <input className="border p-2" placeholder="Name" value={ownerInput.name} onChange={(e) => setOwnerInput({ ...ownerInput, name: e.target.value })} required />
            <input className="border p-2" placeholder="Address" value={ownerInput.address} onChange={(e) => setOwnerInput({ ...ownerInput, address: e.target.value })} required />
            <input className="border p-2" placeholder="Contact Number" value={ownerInput.contactNumber} onChange={(e) => setOwnerInput({ ...ownerInput, contactNumber: e.target.value })} required />
          </div>
        )}

        <button className="bg-blue-500 text-white p-2" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatientForm;
