
import { Upload } from "lucide-react";

/* ----------------------------- GENERAL TAB ----------------------------- */
const GeneralSettings = ({ formData, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Platform Name */}
      <div>
        <label className="block font-medium mb-2">Platform Name</label>
        <input
          type="text"
          name="platformName"
          value={formData.platformName}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Signature */}
      <div>
        <label className="block font-medium mb-2">Signature Text</label>
        <input
          type="text"
          name="signatureText"
          value={formData.signatureText}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Logo */}
      <div>
        <label className="block font-medium mb-2">Platform Logo</label>

        <label className="flex flex-col items-center justify-center w-56 h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50">
          <Upload className="w-8 h-8 text-purple-500 mb-2" />
          <p className="text-xs text-gray-500">JPG/PNG, max 2MB</p>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {formData.logo && (
          <p className="text-sm mt-2 text-gray-600">
            Selected: {formData.logo.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Save Changes
      </button>
    </form>
  );
}


export default GeneralSettings;






