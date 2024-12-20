import React, { useState, useRef } from 'react';
import SignatureForm from './components/SignatureForm';
import SignaturePreview from './components/SignaturePreview';
import { Code, Image } from 'lucide-react';
import { generateSignatureImage } from './utils/imageGeneration';
import { objectHasData } from './utils/hasData';

interface SignatureData {
  primaryLine: string;
  optional: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  logoSize: number;
}

function App() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    primaryLine: '',
    optional: '',
    address: '',
    phone: '',
    email: '',
    logo: '',
    logoSize: 100,
  });
  const [showCode, setShowCode] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const hasData = objectHasData({
    ...signatureData,
  }, ['logoSize']);

  console.log('signatureData:', signatureData);

  const generateHTML = () => {
    const logoWidth = (120 * signatureData.logoSize) / 100;

    return `<table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="vertical-align: top; padding-right: 15px; width: ${signatureData.logo ? `${logoWidth}px` : '0'}; min-width: ${signatureData.logo ? `${logoWidth}px` : '0'}">
        ${signatureData.logo ? `<img src="${signatureData.logo}" alt="Company logo" style="width: 100%; height: auto;" />` : ''}
      </td>
      <td style="vertical-align: top;">
        ${signatureData.primaryLine ? `<div style="font-size: 16px; font-weight: bold; color: #2563eb; margin-bottom: 4px;">${signatureData.primaryLine}</div>` : ''}
        ${signatureData.optional ? `<div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">${signatureData.optional}</div>` : ''}
        ${signatureData.address ? `<div style="font-size: 12px; color: #6b7280; margin-bottom: 4px; white-space: pre-line;">${signatureData.address}</div>` : ''}
        ${signatureData.phone ? `<div style="font-size: 12px; color: #6b7280; margin-bottom: 2px;">Phone: ${signatureData.phone}</div>` : ''}
        ${signatureData.email ? `<div style="font-size: 12px; color: #6b7280;">Email: <a href="mailto:${signatureData.email}" style="color: #2563eb; text-decoration: none;">${signatureData.email}</a></div>` : ''}
      </td>
    </tr>
  </tbody>
</table>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateHTML());
  };

  const handleGenerateImage = async () => {
    if (!previewRef.current) return;

    try {
      const imageUrl = await generateSignatureImage(previewRef.current);
      window.open(imageUrl, '_blank');
    } catch (error) {
      console.error('Failed to generate signature image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Email Signature Generator
          </h1>
          <p className="text-gray-600">
            Create a professional email signature in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <SignatureForm onUpdate={setSignatureData} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <SignaturePreview ref={previewRef} data={signatureData} />

            <div className="mt-6 space-x-4">
              <button
                type='button'
                disabled={!hasData}
                onClick={() => setShowCode(!showCode)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
              >
                <Code className="h-5 w-5 mr-2" />
                {showCode ? 'Hide Code' : 'Get My Code'}
              </button>

              <button
                disabled={!hasData}
                type='button'
                onClick={handleGenerateImage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300"
              >
                <Image className="h-5 w-5 mr-2" />
                Generate Image
              </button>
            </div>

            {showCode && (
              <div className="mt-4">
                <div className="relative">
                  <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    {generateHTML()}
                  </pre>
                  <button
                    onClick={handleCopyCode}
                    className="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Copy this code and paste it into your email client's signature settings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
