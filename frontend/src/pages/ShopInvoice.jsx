import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
function ShopInvoice() {
  const [modalOpen, setModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inventory, setInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [shopInvoices, setShopInvoices] = useState([]);
  const printRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  // State for delete confirmation modal (individual)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [invoiceToDeleteId, setInvoiceToDeleteId] = useState(null);

  // State for delete all confirmation modal
  const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/inventory");
        setInventory(res.data);
      } catch (error) {
        console.error("Inventory fetch failed:", error);
      }
    };
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/shop");
        setShopInvoices(res.data);
      } catch (error) {
        console.error("Error fetching shop invoices:", error);
      }
    };

    fetchInvoices();
    fetchInventory();
  }, []);

  const viewShop = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/shop/${id}`);
      setInvoiceData(response.data);
      setModalOpen(true);
      setError("");
    } catch (err) {
      setError("Failed to fetch invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (item) => {
    const existing = selectedItems.find((i) => i.itemId === item._id);
    if (existing) return;

    setSelectedItems([
      ...selectedItems,
      {
        itemId: item._id,
        name: item.name,
        category: item.category,
        quantity: 1,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice,
        maxQuantity: item.quantity,
      },
    ]);
  };

  const handleQuantityChange = (index, newQty) => {
    const updated = [...selectedItems];
    const maxQty = updated[index].maxQuantity;
    const quantity = Math.min(Number(newQty), maxQty);
    updated[index].quantity = quantity;
    updated[index].totalPrice = quantity * updated[index].unitPrice;
    setSelectedItems(updated);
    updateTotal(updated);
  };

  const handleRemoveItem = (index) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
    updateTotal(updated);
  };

  const updateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalAmount(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Please select at least one item");
      return;
    }

    const invoiceNumber = `SHOP-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${Math.floor(10000 + Math.random() * 90000)}`;
    setInvoiceNumber(invoiceNumber);
    const invoiceDataToSend = {
      invoiceNumber,
      items: selectedItems.map((item) => ({
        itemId: item.itemId,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
      totalAmount: totalAmount,
    };

    try {
      const res = await axios.post("http://localhost:5000/shop", invoiceDataToSend);
 
      setSelectedItems([]);
      setTotalAmount(0);
      handlePrint();
      setShopInvoices((prevInvoices) => [...prevInvoices, res.data]);
      enqueueSnackbar("Test submitted successfully!", { variant: "success" });
    } catch (err) {
      console.error("Error submitting invoice:", err);
      alert("Failed to submit invoice");
    }
  };
  const filteredInventory = inventory.filter((item) => {
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/shop/${id}`);
      alert("Invoice deleted successfully.");
      setShopInvoices((prev) => prev.filter((inv) => inv._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete invoice.");
    }
  };

  // const handleDeleteAllInvoices = async () => {
  //   try {
  //     await axios.delete("http://localhost:5000/shop"); // Assuming this endpoint deletes all
  //     alert("All invoices deleted successfully.");
  //     setShopInvoices([]); // Clear the displayed invoices
  //     setDeleteAllModalOpen(false); // Close the modal
  //   } catch (error) {
  //     console.error("Failed to delete all invoices:", error);
  //     alert("Failed to delete all invoices.");
  //   }
  // };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Shop Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              padding: 10px;
              margin: 0;
            }

            .center {
              text-align: center;
            }

            .logo-space {
              margin-bottom: 10px;
            }

            .header p {
              margin: 2px 0;
            }

            .meta, .total, .footer {
              margin: 10px 0;
            }

            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
            }

            .items-table th,
            .items-table td {
              border: 1px solid #000;
              padding: 4px;
              text-align: left;
            }

            .disclaimer {
              font-size: 10px;
              margin-top: 5px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="invoice-header">Shop Invoice</div>
            <div class="invoice-body">
              ${printContent.innerHTML}
            </div>
            <div class="invoice-footer">Total Amount: ₱${totalAmount.toFixed(
              2
            )}</div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl ">
      <h2 className="text-2xl font-bold mb-4">Create Shop Invoice</h2>

      {/* Search and Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-md w-full mb-2"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Medicine">Medicine</option>
        </select>
      </div>

      {/* Inventory List */}
      <div className="grid grid-cols-2 gap-4 mb-6   p-5 max-h-[250px] overflow-y-scroll shadow-md">
        {filteredInventory.map((item) => (
          <div
            key={item._id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.category} — ₱{item.unitPrice}
              </p>
              <p className="text-xs text-gray-400">In stock: {item.quantity}</p>
            </div>
            <button
              onClick={() => handleAddItem(item)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Selected Items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
        {selectedItems.length === 0 && (
          <p className="text-gray-400">No items selected.</p>
        )}
        {selectedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center mb-2 border-b pb-2"
          >
            <div>
              <p>
                {item.name} — ₱{item.unitPrice} x{" "}
              </p>
              <input
                type="number"
                min="1"
                max={item.maxQuantity}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(idx, e.target.value)}
                className="border px-2 py-1 w-20 rounded ml-2"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">
                Total: ₱{item.totalPrice.toFixed(2)}
              </span>
              <button
                onClick={() => handleRemoveItem(idx)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Submit */}
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Total: ₱{totalAmount.toFixed(2)}</p>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Submit Invoice
        </button>
      </div>

      {/* Hidden Printable Content */}
      <div ref={printRef} style={{ display: "none" }}>
        <div className="receipt-container">
          {/* LOGO PLACEHOLDER */}
          <div className="center logo-space">
            {/* TODO: Insert logo image here */}
            {/* <img src="/path-to-your-logo.png" alt="Clinic Logo" className="logo" /> */}
          </div>

          <div className="center header">
            <h2>RL ANIMAL CLINIC</h2>
            <p>
              168-Unit A Bus Stop JP Laurel Highway, cor V Dimayuga, Brgy. 4,
              Tanauan, Batangas
            </p>
            <p>Contact: 0916 621 5953</p>
          </div>

          <hr />

          <div className="meta">
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </p>
            <p>
              <strong>Invoice No:</strong> {invoiceNumber}
            </p>
          </div>

          <hr />

          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.unitPrice}</td>
                  <td>₱{item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />

          <div className="total center">
            <strong>Total Amount:</strong> ₱{totalAmount.toFixed(2)}
          </div>

          <hr />

          <div className="footer center">
            <p>Thank you for shopping with us!</p>
            <p className="disclaimer">
              This receipt is system generated and does not require a signature.
            </p>
          </div>
        </div>
      </div>
{/*
      <div className="mt-10 flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Shop Invoices</h3>
        <button
          onClick={() => setDeleteAllModalOpen(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete All Invoices
        </button>
      </div> */}

      <div className="overflow-y-auto max-h-[650px] shadow rounded-lg">
        <table className="w-full table-auto bg-white border border-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left px-4 py-2 border-b">Date</th>
              <th className="text-left px-4 py-2 border-b">Invoice No</th>
              <th className="text-left px-4 py-2 border-b">Items</th>
              <th className="text-left px-4 py-2 border-b">Total</th>
              <th className="text-left px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shopInvoices.map((invoice) => (
              <tr key={invoice._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-4 py-2 border-b">
                  {invoice.items.map((item) => item.name).join(", ")}
                </td>
                <td className="px-4 py-2 border-b">
                  ₱{invoice.totalAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => viewShop(invoice._id)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setInvoiceToDeleteId(invoice._id);
                      setDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Individual Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this invoice?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteInvoice(invoiceToDeleteId);
                  setDeleteModalOpen(false);
                  setInvoiceToDeleteId(null); // Clear the ID after deletion
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {deleteAllModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete All</h3>
            <p className="mb-4 text-red-600">
              Are you absolutely sure you want to delete{" "}
              <span className="font-bold">all</span> shop invoices? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteAllModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllInvoices}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && invoiceData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Invoice Details</h3>
            <p>
              <strong>Date:</strong> {new Date(invoiceData.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Invoice No:</strong> {invoiceData.invoiceNumber}
            </p>

            <table className="w-full mt-4 border border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Item</th>
                  <th className="border px-2 py-1">Qty</th>
                  <th className="border px-2 py-1">Unit Price</th>
                  <th className="border px-2 py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{item.name}</td>
                    <td className="border px-2 py-1">{item.quantity}</td>
                    <td className="border px-2 py-1">₱{item.unitPrice}</td>
                    <td className="border px-2 py-1">
                      ₱{item.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right font-semibold text-lg">
              Total: ₱{invoiceData.totalAmount.toFixed(2)}
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopInvoice;
