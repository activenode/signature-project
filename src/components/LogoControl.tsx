import React from "react";

interface LogoControlProps {
  logoWidth: number;
  logoAlign: "left" | "top";
  onChange: ({
    logoWidth,
    logoAlign,
  }: {
    logoWidth: number;
    logoAlign: "left" | "top";
  }) => void;
}

export function LogoControl({ logoWidth, logoAlign, onChange }: LogoControlProps) {


  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Logo width</span>
        <span className="text-sm text-gray-500">{logoWidth}px</span>
      </label>
      <input
        type="range"
        min="20"
        max="200"
        value={logoWidth}
        onChange={(e) => {
          const newWidth = parseInt(e.target.value);
          onChange({ logoWidth: newWidth, logoAlign })
        }}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />

      <div className="flex gap-4">
        <label className="flex gap-2">
          <input type="radio" name="logo_layout" value="left" checked={logoAlign==='left'}
          onChange={() => onChange({ logoWidth, logoAlign: 'left' })}
          />
          <span>Left</span>
        </label>
        <label className="flex gap-2">
          <input type="radio" name="logo_layout" value="center" checked={logoAlign==='top'}
          onChange={() => onChange({ logoWidth, logoAlign: 'top' })}
          />
          <span>Top</span>
        </label>
      </div>
    </div>
  );
}
