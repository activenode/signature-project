import React from 'react';

interface LogoSizeControlProps {
  value: number;
  onChange: (value: number) => void;
}

export function LogoSizeControl({ value, onChange }: LogoSizeControlProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Logo Size</span>
        <span className="text-sm text-gray-500">{value}%</span>
      </label>
      <input
        type="range"
        min="10"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}