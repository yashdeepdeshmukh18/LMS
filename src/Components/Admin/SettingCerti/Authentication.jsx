import React from "react";

const AuthenticationSettings = ({ authData, setAuthData }) => {

  const toggle = (key) => {
    setAuthData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const atLeastOneEnabled =
    authData.google || authData.email;

  return (
    <div className="max-w-3xl space-y-6">

      {/* Title */}
      <h2 className="text-2xl font-semibold">
        Authentication Settings
      </h2>

      {/* Card Wrapper */}
      <div className="border rounded-2xl p-6 shadow-sm bg-white space-y-5">

        {/* GOOGLE LOGIN */}
        <div className="flex items-center justify-between border rounded-xl p-4 shadow-sm">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">
                Google Login
              </h3>

              {/* Enable Badge */}
              {authData.google && (
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Enable
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500">
              allow user to sign in using google
            </p>
          </div>

          {/* Toggle */}
          <button
            onClick={() => toggle("google")}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              authData.google
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                authData.google
                  ? "translate-x-6"
                  : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* EMAIL LOGIN */}
        <div className="flex items-center justify-between border rounded-xl p-4 shadow-sm">

          <div>
            <h3 className="font-semibold text-lg">
              Email & Password
            </h3>

            <p className="text-sm text-gray-500">
              enable email login
            </p>
          </div>

          {/* Toggle */}
          <button
            onClick={() => toggle("email")}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              authData.email
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                authData.email
                  ? "translate-x-6"
                  : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* INFO BOX */}
        {!atLeastOneEnabled && (
          <div className="bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm w-fit">
            At least one method must be enabled
          </div>
        )}

      </div>

      {/* SAVE BUTTON */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">
        Save Changes
      </button>

    </div>
  );
};

export default AuthenticationSettings;
