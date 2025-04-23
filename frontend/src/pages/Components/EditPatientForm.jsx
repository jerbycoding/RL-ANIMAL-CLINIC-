import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
const EditPatientForm = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [patientInput, setPatientInput] = useState({
    name: "",
    dateOfBirth: "",
    sex: "Male",
    breed: "",
    species: "",
    color: "",
  });

  const [ownerInput, setOwnerInput] = useState({
    name: "",
    address: "",
    contactNumber: "",
    _id: "",
  });

  const [originalOwner, setOriginalOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/patients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { name, dateOfBirth, sex, breed, species, color, owner } = data;
        setPatientInput({
          name,
          dateOfBirth: dateOfBirth.slice(0, 10),
          sex,
          breed,
          species,
          color,
        });
        setOwnerInput({
          name: owner.name,
          address: owner.address,
          contactNumber: owner.contactNumber,
          _id: owner._id,
        });
        setOriginalOwner(owner);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("Failed to fetch patient", { variant: "error" });
        navigate("/PatientManagement");
      });
  }, [id]);

  const ownerChanged = () => {
    return (
      originalOwner?.name !== ownerInput.name ||
      originalOwner?.address !== ownerInput.address ||
      originalOwner?.contactNumber !== ownerInput.contactNumber
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (ownerChanged()) {
      setShowModal(true);
    } else {
      submitData();
    }
  };

  const submitData = async () => {
    try {
      await fetch(`http://localhost:5000/owners/${ownerInput._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ownerInput),
      });

      await fetch(`http://localhost:5000/patients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...patientInput, owner: ownerInput._id }),
      });

      enqueueSnackbar("Patient and owner updated successfully", {
        variant: "success",
      });
      navigate("/PatientManagement");
    } catch (err) {
      enqueueSnackbar("Update failed", { variant: "error" });
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
    <div className="w-full h-full">
      <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Edit Patient
          </h2>
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/dashboard/PatientManagement")}
          >
            Exit
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Patient Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="border p-2 rounded"
                placeholder="Name"
                value={patientInput.name}
                onChange={(e) =>
                  setPatientInput({ ...patientInput, name: e.target.value })
                }
                required
              />
              <input
                className="border p-2 rounded"
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
                className="border p-2 rounded"
                value={patientInput.sex}
                onChange={(e) =>
                  setPatientInput({ ...patientInput, sex: e.target.value })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                className="border p-2 rounded"
                placeholder="Breed"
                value={patientInput.breed}
                onChange={(e) =>
                  setPatientInput({ ...patientInput, breed: e.target.value })
                }
                required
              />
              <input
                className="border p-2 rounded"
                placeholder="Species"
                value={patientInput.species}
                onChange={(e) =>
                  setPatientInput({ ...patientInput, species: e.target.value })
                }
                required
              />
              <input
                className="border p-2 rounded"
                placeholder="Color"
                value={patientInput.color}
                onChange={(e) =>
                  setPatientInput({ ...patientInput, color: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Owner Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="border p-2 rounded"
                placeholder="Owner Name"
                value={ownerInput.name}
                onChange={(e) =>
                  setOwnerInput({ ...ownerInput, name: e.target.value })
                }
                required
              />
              <input
                className="border p-2 rounded"
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
                className="border p-2 rounded col-span-2"
                placeholder="Address"
                value={ownerInput.address}
                onChange={(e) =>
                  setOwnerInput({ ...ownerInput, address: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Custom Confirmation Modal */}
      </div>
      {showModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Confirm Owner Update
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              You're about to update the owner's information. This may affect
              all patients under this owner. Are you sure?
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                onClick={() => {
                  setShowModal(false);
                  submitData();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPatientForm;
