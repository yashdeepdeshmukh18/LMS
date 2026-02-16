import {useState} from 'react'

import GeneralSettings from '../Components/Admin/SettingCerti/General';
import AuthenticationSettings from '../Components/Admin/SettingCerti/Authentication';
import PaymentSettings from '../Components/Admin/SettingCerti/Payment';

export default function SettingsCertificate() {
  const [activeTab, setActiveTab] = useState("general");

  const [formData, setFormData] = useState({
    platformName: "",
    signatureText: "",
    description: "",
    logo: null,
  });

  const [authData, setAuthData] = useState({
    google: true,
    email: false,
  });

  const [payments, setPayments] = useState([
    { id: 1, name: "Stripe", icon: "S", connected: true },
    { id: 2, name: "Razorpay", icon: "R", connected: true },
    { id: 3, name: "PhonePe", icon: "P", connected: true },
    { id: 4, name: "Card Payment", icon: "C", connected: false },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ formData, authData, payments });
    alert("Settings Saved ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-indigo-200 to-purple-300 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-400 to-purple-400 p-[2px] rounded-2xl shadow-xl">
        <div className="bg-white rounded-2xl p-4 md:p-8">

          {/* Tabs */}
          <div className="flex gap-3 mb-8">
            {["general", "authentication", "payment"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full capitalize ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}

          {activeTab === "general" && (
            <GeneralSettings
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            />
          )}

          {activeTab === "authentication" && (
            <AuthenticationSettings
              authData={authData}
              setAuthData={setAuthData}
            />
          )}

          {activeTab === "payment" && (
            <PaymentSettings
              payments={payments}
              setPayments={setPayments}
            />
          )}

        </div>
      </div>
    </div>
  );
}
