import { useState, useEffect, useRef } from "react";

const POSBilling = () => {
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // Default: Newest First
  const taxRate = 0.1;
  const printRef = useRef(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactionHistory", JSON.stringify(history));
  }, [history]);

  const addItem = () => {
    if (!service || !price || quantity <= 0) return;
    const newItem = { id: Date.now(), service, price: parseFloat(price), quantity: parseInt(quantity) };
    setCart([...cart, newItem]);
    setService("");
    setPrice("");
    setQuantity(1);
  };

  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const confirmPayment = () => {
    if (cart.length === 0) return;
    const newHistoryItem = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      services: cart.map((item) => item.service).join(", "),
      total: total.toFixed(2),
    };
    setHistory([newHistoryItem, ...history]);
    setCart([]);
  };

  const printReceipt = () => {
    if (history.length === 0) return;
    const lastTransaction = history[0];
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>🐾 Veterinary Clinic Receipt</h2>
          <p><strong>Date:</strong> ${lastTransaction.date}</p>
          <p><strong>Services:</strong> ${lastTransaction.services}</p>
          <p><strong>Total:</strong> $${lastTransaction.total}</p>
          <br><br>
          <p>Thank you for your visit! 🐶🐱</p>
          <script> window.print(); window.close(); </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  // **🔍 Filter & Sort Transactions**
  const filteredHistory = history
    .filter((record) =>
      record.services.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "newest" ? b.id - a.id : a.id - b.id));

  return (
    <div className="flex flex-col p-6 gap-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* POS Section */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">🛒 POS System</h2>
          <input type="text" placeholder="Service / Product" value={service} onChange={(e) => setService(e.target.value)}
            className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"/>
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"/>
          <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"/>
          <button onClick={addItem} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">➕ Add Item</button>
        </div>

        {/* Invoice Table */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">🧾 Invoice</h2>
          <table className="w-full border-collapse">
            <thead><tr className="bg-gray-200 dark:bg-gray-700"><th className="p-2">Service</th><th className="p-2">Price</th><th className="p-2">Qty</th><th className="p-2">Total</th><th className="p-2">🗑️</th></tr></thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-600">
                  <td className="p-2 text-center">{item.service}</td>
                  <td className="p-2 text-center">${item.price.toFixed(2)}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-center">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-2 text-center"><button onClick={() => removeItem(item.id)} className="text-red-500">❌</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-900 dark:text-white">Subtotal: <b>${subtotal.toFixed(2)}</b></p>
            <p className="text-gray-900 dark:text-white">Tax (10%): <b>${tax.toFixed(2)}</b></p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Total: <b>${total.toFixed(2)}</b></p>
          </div>

          <button onClick={confirmPayment} className="w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700">
            ✅ Confirm Payment
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">📜 Transaction History</h2>
        
        {/* 🔍 Search & Sort */}
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
          className="mb-3 bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
        >
          {sortOrder === "newest" ? "⬆️ Oldest First" : "⬇️ Newest First"}
        </button>

        <table className="w-full border-collapse">
          <thead><tr className="bg-gray-200 dark:bg-gray-700"><th>Date & Time</th><th>Services</th><th>Total</th></tr></thead>
          <tbody>
            {filteredHistory.map((record) => (
              <tr key={record.id} className="border-b dark:border-gray-600">
                <td>{record.date}</td><td>{record.services}</td><td>${record.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={printReceipt} className="w-full mt-4 bg-gray-800 text-white p-2 rounded hover:bg-gray-900">🖨️ Print Last Receipt</button>
      </div>
    </div>
  );
};

export default POSBilling;
