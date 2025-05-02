import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DotLoader } from "react-spinners";

const PatientForm = () => {
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState(false);
  const [ownerInput, setOwnerInput] = useState({
    name: "",
    address: "",
    contactNumber: "",
  });
  const [patientInput, setPatientInput] = useState({
    name: "",
    dateOfBirth: "",
    sex: "Male",
    breed: "",
    species: "",
    color: "",
    owner: "", // Will store the _id of the selected owner
  });
  const [searchOwnerText, setSearchOwnerText] = useState("");
  const [showOwnerDropdown, setShowOwnerDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/owners")
      .then((res) => res.json())
      .then((data) => {
        setOwners(data);
        setLoading(false);
      })
      .catch((err) =>
        enqueueSnackbar("Error fetching owners", { variant: "error" })
      );
  }, []);

  const handleOwnerSearchChange = (e) => {
    setSearchOwnerText(e.target.value);
    setShowOwnerDropdown(true); // Show dropdown as the user types
    setPatientInput({ ...patientInput, owner: "" }); // Clear selected owner when searching
  };

  const selectExistingOwner = (ownerId) => {
    setPatientInput({ ...patientInput, owner: ownerId });
    setSearchOwnerText(owners.find((o) => o._id === ownerId)?.name || "");
    setShowOwnerDropdown(false);
  };

  const filteredOwners = owners.filter((owner) =>
    owner.name.toLowerCase().includes(searchOwnerText.toLowerCase())
  );

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
        setPatientInput({
          name: "",
          dateOfBirth: "",
          sex: "Male",
          breed: "",
          species: "",
          color: "",
          owner: "",
        });
        setOwnerInput({ name: "", address: "", contactNumber: "" });
        setNewOwner(false);
        setSearchOwnerText("");
        setShowOwnerDropdown(false);
        enqueueSnackbar("Patient added successfully", { variant: "success" });
        navigate("/dashboard/PatientManagement");
      } else {
        enqueueSnackbar("Failed to add patient", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", { variant: "error" });
    }
  };

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <DotLoader size={40} />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Add Patient
        </h2>
        <Button
          className="bg-blue-700 text-white"
          onClick={() => navigate("/dashboard/PatientManagement")}
        >
          Exit
        </Button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Patient Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Patient Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded-md"
              placeholder="Name"
              value={patientInput.name}
              onChange={(e) =>
                setPatientInput({ ...patientInput, name: e.target.value })
              }
              required
            />
            <input
              className="border p-2 rounded-md"
              type="date"
              value={patientInput.dateOfBirth}
              onChange={(e) =>
                setPatientInput({
                  ...patientInput,
                  dateOfBirth: e.target.value,
                })
              }
              required
            />
            <select
              className="border p-2 rounded-md"
              value={patientInput.sex}
              onChange={(e) =>
                setPatientInput({ ...patientInput, sex: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              className="border p-2 rounded-md"
              placeholder="Breed"
              value={patientInput.breed}
              onChange={(e) =>
                setPatientInput({ ...patientInput, breed: e.target.value })
              }
              required
            />
            <input
              className="border p-2 rounded-md"
              placeholder="Species"
              value={patientInput.species}
              onChange={(e) =>
                setPatientInput({ ...patientInput, species: e.target.value })
              }
              required
            />
            <input
              className="border p-2 rounded-md"
              placeholder="Color"
              value={patientInput.color}
              onChange={(e) =>
                setPatientInput({ ...patientInput, color: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Owner Type Toggle */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Owner Type
          </h3>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="ownerType"
                value="existing"
                checked={!newOwner}
                onChange={() => setNewOwner(false)}
              />
              Existing Owner
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="ownerType"
                value="new"
                checked={newOwner}
                onChange={() => setNewOwner(true)}
              />
              New Owner
            </label>
          </div>
        </div>

        {/* Existing Owner Selection */}
        {!newOwner && (
          <div>
            <label
              htmlFor="ownerSearch"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Search Existing Owner
            </label>
            <div className="relative">
              <input
                type="text"
                id="ownerSearch"
                className="border p-2 rounded-md w-full"
                placeholder="Enter owner name"
                value={searchOwnerText}
                onChange={handleOwnerSearchChange}
              />
              {showOwnerDropdown && filteredOwners.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto">
                  {filteredOwners.map((owner) => (
                    <li
                      key={owner._id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => selectExistingOwner(owner._id)}
                    >
                      {owner.name} ({owner.contactNumber})
                    </li>
                  ))}
                  {searchOwnerText && filteredOwners.length === 0 && (
                    <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                      No matching owners
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* New Owner Fields */}
        {newOwner && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Owner Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="border p-2 rounded-md"
                placeholder="Name"
                value={ownerInput.name}
                onChange={(e) =>
                  setOwnerInput({ ...ownerInput, name: e.target.value })
                }
                required
              />
              <input
                className="border p-2 rounded-md"
                placeholder="Contact Number"
                value={ownerInput.contactNumber}
                onChange={(e) =>
                  setOwnerInput({
                    ...ownerInput,
                    contactNumber: e.target.value,
                  })
                }
                required
              />
              <input
                className="border p-2 rounded-md col-span-2"
                placeholder="Address"
                value={ownerInput.address}
                onChange={(e) =>
                  setOwnerInput({ ...ownerInput, address: e.target.value })
                }
                required
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition duration-200"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;