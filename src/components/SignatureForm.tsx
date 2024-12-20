import React, { useState, ChangeEvent } from "react";
import { Building2, Phone, Mail, MapPin, Upload } from "lucide-react";
import { LogoControl } from "./LogoControl";
import { SignatureData } from "../App";

export default function SignatureForm({
  onUpdate,
  data,
}: {
  onUpdate: (data: SignatureData) => void;
  data: SignatureData;
}) {
  const [formData, setFormData] = useState<SignatureData>(data);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleLogoConfigChange = (size: number, align: "left" | "top") => {
    const newData = { ...formData, logoWidth: size, logoAlign: align };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 200;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;

          console.log("canvas", canvas.width, canvas.height);

          const imageRatio = canvas.width / canvas.height;


          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          const resizedBase64 = canvas.toDataURL("image/png");
          const newData = {
            ...formData,
            logo: resizedBase64,
            logoRatio: imageRatio,
          };

          setFormData(newData);
          onUpdate(newData);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 w-full max-w-md">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Business Logo
        </label>
        <div className="flex items-center space-x-2">
          <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
            <Upload className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">Upload Logo</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </label>
          {formData.logo && (
            <img
              src={formData.logo}
              alt="Logo preview"
              className="h-10 object-contain"
            />
          )}

          {formData.logo && (
            <button
              type="button"
              className="text-sm text-red-500 hover:text-red-700 bg-gray-200 p-2 rounded-md"
              onClick={() => {
                const newData = { ...formData, logo: "" };
                setFormData(newData);
                onUpdate(newData);
              }}
            >
              Remove
            </button>
          )}
        </div>
        {formData.logo && (
          <LogoControl
            logoWidth={formData.logoWidth}
            logoAlign={formData.logoAlign}
            onChange={({ logoWidth, logoAlign }) => {

              handleLogoConfigChange(logoWidth, logoAlign);
            }}
          />
        )}
      </div>

      <div className="mt-10">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Primary Line e.g. Business Name
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="primaryLine"
            value={formData.primaryLine}
            onChange={handleInputChange}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First line"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subline
        </label>
        <input
          type="text"
          name="optional"
          value={formData.optional}
          onChange={handleInputChange}
          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title, Department, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>
      </div>
    </div>
  );
}
