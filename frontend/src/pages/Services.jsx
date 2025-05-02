import React, { useState, useEffect } from 'react';
import { DotLoader } from 'react-spinners';

function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newService, setNewService] = useState({ name: '', category: 'Consultation', description: '', charge: '' });
  const [editingService, setEditingService] = useState(null); // To hold the service being edited
  const [deletingServiceId, setDeletingServiceId] = useState(null); // To hold the ID of the service to delete

  const categories = ["Consultation", "Vaccination", "Surgery", "Dental", "Laboratory", "Imaging", "Grooming"];

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/services');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Add Modal Functions
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewService({ name: '', category: 'Consultation', description: '', charge: '' });
  };
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prevState => ({ ...prevState, [name]: value }));
  };
  const handleAddService = async () => {
    try {
      const response = await fetch('http://localhost:5000/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      if (!response.ok) throw new Error(`Failed to add service: ${response.status}`);
      const data = await response.json();
      setServices(prevServices => [...prevServices, data]);
      closeAddModal();
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit Modal Functions
  const openEditModal = (service) => {
    setEditingService({ ...service });
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingService(null);
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingService(prevState => ({ ...prevState, [name]: value }));
  };
  const handleUpdateService = async () => {
    if (!editingService) return;
    try {
      const response = await fetch(`http://localhost:5000/services/${editingService._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });
      if (!response.ok) throw new Error(`Failed to update service: ${response.status}`);
      const updatedService = await response.json();
      setServices(prevServices =>
        prevServices.map(srv => (srv._id === updatedService._id ? updatedService : srv))
      );
      closeEditModal();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete Modal Functions
  const openDeleteModal = (id) => {
    setDeletingServiceId(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingServiceId(null);
  };
  const handleDeleteService = async () => {
    if (!deletingServiceId) return;
    try {
      const response = await fetch(`http://localhost:5000/services/${deletingServiceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Failed to delete service: ${response.status}`);
      setServices(prevServices => prevServices.filter(srv => srv._id !== deletingServiceId));
      closeDeleteModal();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return ( <DotLoader/>);
  }

  if (error) {
    return <div className="text-red-500">Error loading services: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Manage Services
        </h2>
        <button onClick={openAddModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add New Service
        </button>
      </div>

      {services.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-md">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Category</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Description</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Charge</th>
                <th className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border-b dark:border-gray-600">
                  <td className="py-3 px-4">{service.name}</td>
                  <td className="py-3 px-4">{service.category}</td>
                  <td className="py-3 px-4">{service.description}</td>
                  <td className="py-3 px-4">₱{service.charge?.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => openEditModal(service)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(service._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No services available.</p>
      )}

      {/* Add Service Modal (same as before) */}
      {isAddModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl w-full max-w-md p-6">
            {/* ... Add Service Modal Content ... */}
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Add New Service</h2>
            <div className="mb-4">
              <label htmlFor="add-name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Name:</label>
              <input type="text" id="add-name" name="name" value={newService.name} onChange={handleAddInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="add-category" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Category:</label>
              <select id="add-category" name="category" value={newService.category} onChange={handleAddInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline">
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="add-description" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Description:</label>
              <textarea id="add-description" name="description" value={newService.description} onChange={handleAddInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="add-charge" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Charge:</label>
              <input type="number" id="add-charge" name="charge" value={newService.charge} onChange={handleAddInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex justify-end">
              <button onClick={closeAddModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Cancel</button>
              <button onClick={handleAddService} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Service</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {isEditModalOpen && editingService && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Edit Service</h2>
            <div className="mb-4">
              <label htmlFor="edit-name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Name:</label>
              <input type="text" id="edit-name" name="name" value={editingService.name} onChange={handleEditInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="edit-category" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Category:</label>
              <select id="edit-category" name="category" value={editingService.category} onChange={handleEditInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline">
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="edit-description" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Description:</label>
              <textarea id="edit-description" name="description" value={editingService.description} onChange={handleEditInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="edit-charge" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Charge:</label>
              <input type="number" id="edit-charge" name="charge" value={editingService.charge} onChange={handleEditInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex justify-end">
              <button onClick={closeEditModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Cancel</button>
              <button onClick={handleUpdateService} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Service</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && deletingServiceId && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to delete this service?</p>
            <div className="flex justify-end">
              <button onClick={closeDeleteModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Cancel</button>
              <button onClick={handleDeleteService} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesManagement;