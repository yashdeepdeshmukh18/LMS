import React from "react";

export default function PaymentDashboard() {
  const transactions = [
    {
      user: "Rahul Mehta",
      course: "Complete Mathematics",
      amount: "2,499",
      date: "02.02.2026",
      status: "Paid",
    },
    {
      user: "Rahul Mehta",
      course: "Complete Mathematics",
      amount: "3,500",
      date: "02.02.2026",
      status: "Refunded",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-purple-300 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-sky-400 to-purple-400 p-[2px] rounded-2xl shadow-lg">
          <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Advanced Payment Dashboard
              </h1>
              <p className="text-gray-500 text-sm">
                Transaction and overview
              </p>
            </div>

            <div className="border rounded-lg px-4 py-2 text-sm bg-gray-50">
              Jan 1,2026 - Jan 31,2026 📅
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-r from-sky-400 to-purple-400 p-6 rounded-2xl shadow-lg space-y-6">

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Bar Chart Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">
                Revenue Trends
              </h2>

              <div className="flex items-end gap-4 h-48 border border-dashed p-4">
                {[50, 80, 70, 30, 90, 70, 25, 85].map((h, i) => (
                  <div
                    key={i}
                    className="bg-red-500 w-8 rounded-t-lg"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Donut Chart Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-8">
              <div>
                <h2 className="text-xl font-semibold text-purple-700 mb-4">
                  Revenue Trends
                </h2>

                {/* Donut */}
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full border-[18px] border-green-600" />
                  <div className="absolute inset-0 rounded-full border-[18px] border-red-500 border-l-transparent border-b-transparent rotate-45" />
                  <div className="absolute inset-6 bg-white rounded-full" />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <p className="text-gray-700">Gross Amount</p>
                <p className="text-gray-700">Payment Gateway</p>
                <p className="text-gray-700">Stripe</p>

                <button className="mt-2 border px-3 py-1 rounded-lg text-sm bg-gray-100 hover:bg-gray-200">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            {/* Header Row */}
            <div className="grid grid-cols-5 bg-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-700 mb-4">
              <p>User</p>
              <p>Course</p>
              <p>Amount</p>
              <p>Date</p>
              <p>Status</p>
            </div>

            {/* Data Rows */}
            <div className="space-y-4">
              {transactions.map((t, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 items-center bg-purple-100 border border-purple-200 rounded-xl px-4 py-4 shadow-sm"
                >
                  <p className="text-gray-800">{t.user}</p>
                  <p className="text-gray-800">{t.course}</p>
                  <p className="text-gray-800">{t.amount}</p>
                  <p className="text-gray-800">{t.date}</p>

                  <span
                    className={`text-white text-xs px-3 py-1 rounded w-fit ${
                      t.status === "Paid"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
