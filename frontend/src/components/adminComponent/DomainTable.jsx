import React, { useState } from "react";
import {
  useAddDomainMutation,
  useDeleteDomainMutation,
  useGetDomainMutation
} from "../../slices/adminAdminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDomains } from "../../slices/domainSlice";
import { toast } from "react-toastify";

const DomainTable = () => {
  const [domainName, setDomainName] = useState("");
  const [seletedDomain, setSelectedDomain] = useState({});
  const [deleteDomain, setDeleteDomain] = useState("");
  const [editdomain, setEditDomain] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();
  const [deleteDomainMutation] = useDeleteDomainMutation();
  const domains = useSelector((state) => state.domains.domains);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  const openDeleteConfirmation = (domainToDelete) => {
    setDeleteDomain(domainToDelete);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteDomain("");
    setShowDeleteConfirmation(false);
  };

  const [addDomain] = useAddDomainMutation();
  const handleAddDomain = async () => {
    if (domains.includes(domainName.toUpperCase())) {
      toast.error("Domain already exists.")
      return;
    }

    // Domain doesn't exist, proceed with adding the domain
    const res = await addDomain({ domainName }).unwrap();
    dispatch(setDomains([...domains, res.domain]));
    closeModal();
  };

  const handleDeleteDomain = async () => {
    const res = await deleteDomainMutation(deleteDomain).unwrap();
    const updatedDomains = domains.filter((domain) => domain !== deleteDomain);
    dispatch(setDomains(updatedDomains));
    closeDeleteConfirmation();
  };

  return (
    <>
      <div>
        <div className="mb-4">
          <button
            className="bg-gray-600 text-white py-2 px-4 hover:bg-blue-500"
            onClick={openModal}
          >
            Add Domain
          </button>
        </div>
      </div>
      <div>
        <table className="min-w-full mx-auto border-collapse table-auto">
          <thead className="bg-slate-400">
            <tr>
              <th className="px-4 py-2 text-center">Index</th>
              <th className="px-4 py-2 text-center">Domain</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((domain, index) => (
              <tr key={index} className="hover:bg-slate-400">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{domain}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-600 w-16 rounded text-white ml-2"
                    onClick={() => openDeleteConfirmation(domain)}
                  >
                    Delete
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Domain Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Add Domain</h2>
            <input
              type="text"
              className="w-full border p-2 mb-4"
              placeholder="Domain Name"
              name="domainName"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value.toUpperCase())}
            />
            <div className="text-right">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                onClick={handleAddDomain}
              >
                Add
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this domain?</p>
            <div className="text-right mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={handleDeleteDomain}
              >
                Yes, delete
              </button>
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
                onClick={closeDeleteConfirmation}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DomainTable;
