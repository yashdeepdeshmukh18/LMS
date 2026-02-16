

const PaymentSettings = ({ payments, setPayments }) => {
  const toggle = (id) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, connected: !p.connected } : p
      )
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-semibold">Payment Methods</h2>

      {payments.map((p) => (
        <div
          key={p.id}
          className="flex items-center justify-between border rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center font-bold">
              {p.icon}
            </div>
            <p className="font-medium">{p.name}</p>
          </div>

          <button
            onClick={() => toggle(p.id)}
            className={`px-4 py-1 rounded-full text-sm ${
              p.connected
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {p.connected ? "Connected" : "Connect"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PaymentSettings;
