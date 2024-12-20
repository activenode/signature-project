import React, { useState, useRef } from 'react';
import SignatureForm from './components/SignatureForm';
import SignaturePreview from './components/SignaturePreview';
import { Code, Image } from 'lucide-react';
import { generateSignatureImage } from './utils/imageGeneration';
import { objectHasData } from './utils/hasData';

export interface SignatureData {
  primaryLine: string;
  optional: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  logoWidth: number;
  logoRatio: number;
  logoAlign: 'left' | 'top';
}

function OnEscape({ trigger }: { trigger: () => void }) {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      trigger();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return null;
}

function App() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    primaryLine: '',
    optional: '',
    address: '',
    phone: '',
    email: '',
    logo: '',
    logoWidth: 100,
    logoRatio: 1,
    logoAlign: 'left',
  });
  const [showCode, setShowCode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const hasData = objectHasData({
    ...signatureData,
  }, ['logoWidth', 'logoRatio', 'logoAlign']);




  const generateHTML = () => {


    const fragment = document.createElement('div');



    fragment.innerHTML = previewRef.current?.querySelector('.prose')!.innerHTML as string;

    const upperSpacingTr = document.createElement('tr');
    const upperSpacingTd = document.createElement('td');
    upperSpacingTd.style.fontSize = '17px';
    upperSpacingTd.innerHTML = '&nbsp;';
    upperSpacingTr.appendChild(upperSpacingTd);
    const tbody = fragment.querySelector('tbody');

    tbody!.prepend(upperSpacingTr);


    return fragment.innerHTML;
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateHTML());
  };

  const handleGenerateImage = async () => {
    if (!previewRef.current) return;

    try {

      const imageUrl = await generateSignatureImage(previewRef.current);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Failed to generate signature image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-5xl w-full mx-auto">
        <div className="text-center ">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Free Email Signature Generator
          </h1>
          <p className="text-gray-600">
            Create a professional email signature in seconds, export as HTML or image
          </p>
        </div>

        <div className='flex items-center justify-center mt-6 mb-6'>
          {/* badge "made with love by" */}
          <a href="https://activeno.de" className="text-md flex items-center space-x-1 bg-zinc-200 px-3 py-1 rounded-lg text-gray-600 border-2 border-black/20">
            Made with <span className="text-red-500 mx-2">💙</span> by the Supabase Expert activeno.de
          </a>
        </div>

        <div className='p-8 bg-white shadow-lg border border-zinc-300'>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Information</h2>
              <SignatureForm onUpdate={setSignatureData} data={signatureData} />
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

      {imageUrl && (
        <dialog open>
            <div className="fixed inset-0 flex items-center justify-center">
              <OnEscape trigger={() => {
                setImageUrl(null);
              }} />
              <div className='absolute inset-0  bg-black bg-opacity-50' onClick={() => {
                setImageUrl(null);
              }}></div>
              <div className='p-6 bg-zinc-600 relative'>
                <img src={imageUrl} alt="Generated signature" />
              </div>
            </div>
        </dialog>
      )}
    </div>
  );
}

export default App;
