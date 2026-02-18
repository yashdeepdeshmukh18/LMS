import React, { useState } from "react";

const PricingPlanTab = () => {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: billing === "monthly" ? 19 : 190,
      features: [
        "Access to all features",
        "1k lookups / per month",
        "No API Credits",
        "10 Monitoring Quota",
        "60 minutes Monitoring interval",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: billing === "monthly" ? 49 : 490,
      popular: true,
      features: [
        "Access to all features",
        "1k lookups / per month",
        "10 Monitoring Quota",
        "30K API Credits / month",
        "60 minutes Monitoring interval",
        "20% discount on backorders",
      ],
    },
    {
      id: "advanced",
      name: "Advanced",
      price: billing === "monthly" ? 99 : 990,
      features: [
        "Access to all features",
        "1k lookups / per month",
        "10 Monitoring Quota",
        "30K API Credits / month",
        "60 minutes Monitoring interval",
      ],
    },
  ];

  return (
    <div className="w-full">

      {/* Billing Toggle */}
      <div className="flex justify-center mt-6">
        <div className="flex border rounded-lg overflow-hidden">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 font-medium ${
              billing === "monthly"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`px-6 py-2 font-medium ${
              billing === "yearly"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            Yearly
          </button>

          <span className="bg-yellow-300 px-3 flex items-center text-sm">
            Save 20%
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`border rounded-xl p-6 cursor-pointer transition
            ${
              selectedPlan === plan.id
                ? "border-purple-600 shadow-lg"
                : "border-gray-300"
            }
            ${
              plan.popular
                ? "bg-gradient-to-b from-purple-700 to-purple-500 text-white"
                : "bg-purple-50"
            }`}
          >
            {/* Popular Tag */}
            {plan.popular && (
              <span className="bg-white text-purple-700 text-xs px-2 py-1 rounded">
                Popular
              </span>
            )}

            <h3 className="mt-3 font-semibold text-lg uppercase">
              {plan.name}
            </h3>

            <p className="text-4xl font-bold mt-4">
              ${plan.price}
            </p>

            <p className="text-sm mb-4">
              Per member, per {billing === "monthly" ? "month" : "year"}
            </p>

            <hr className="my-4 opacity-40" />

            {/* Features */}
            <ul className="space-y-2 text-sm">
              {plan.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`mt-6 w-full py-2 rounded font-medium
              ${
                plan.popular
                  ? "bg-yellow-300 text-black"
                  : "bg-black text-white"
              }`}
            >
              Start free 14-day Trial
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
<div className="mt-12 flex flex-col items-center">

  <div className="flex border rounded-lg overflow-hidden shadow-sm">

    <p className="px-6 py-3 bg-purple-50 text-sm">
      Get started with our free plan and make 10 lookups per
      month absolutely free!
    </p>

    <button className="bg-yellow-300 px-6 font-medium">
      Signup for Free
    </button>
  </div>

        {/* Payment Methods */}
        <div className="mt-8 text-center">

            <h4 className="font-semibold mb-3">
            Payment Methods
            </h4>

            <div className="flex gap-4 justify-center items-center">

            {/* Cards */}
            <img
                src="https://img.icons8.com/color/48/visa.png"
                alt="visa"
                className="h-8"
            />

            <img
                src="https://img.icons8.com/color/48/mastercard.png"
                alt="mastercard"
                className="h-8"
            />

            <img
                src="https://img.icons8.com/color/48/paypal.png"
                alt="paypal"
                className="h-8"
            />

            <img
                src="https://img.icons8.com/color/48/amex.png"
                alt="amex"
                className="h-8"
            />
            </div>

                <p className="text-xs text-gray-500 mt-3">
                    We accept Visa, American Express, Mastercard, Paypal
                    and Crypto
                </p>
            </div>
        </div>

    </div>
  );
}

export default PricingPlanTab;
