import React, { forwardRef } from 'react';
import { objectHasData } from '../utils/hasData';

interface SignatureData {
  primaryLine: string;
  optional: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  logoSize: number;

}

const SignaturePreview = forwardRef<HTMLDivElement, { data: SignatureData }>(({ data }, ref) => {
  // Calculate the actual width in pixels based on the max-width and percentage
  const logoWidth = (120 * data.logoSize) / 100;

  const baseTextColor = '#6b7280';
  const emailTextColor = '#2563eb';
  const hasTextData = objectHasData(data, ['logoSize', 'logo']);



  return (
    <div ref={ref} className="border rounded-md p-4 bg-white w-full max-w-md">
      <div className="prose">
        <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif' }}>
          <tbody>
            <tr>
              <td style={{
                verticalAlign: 'top',
                paddingRight: '15px',
                width: data.logo ? `${logoWidth}px` : '0',
                minWidth: data.logo ? `${logoWidth}px` : '0'
              }}>
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Company logo"
                    style={{
                      width: '100%',
                      height: 'auto'
                    }}
                  />
                )}
              </td>
              <td style={{ verticalAlign: 'top', color: baseTextColor }}>
                {!hasTextData && (
                  <em className='opacity-50'>
                    Edit the fields to see a preview
                  </em>
                )}

                {data.primaryLine && (
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2563eb', marginBottom: '4px' }}>
                    {data.primaryLine}
                  </div>
                )}
                {data.optional && (
                  <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px' }}>
                    {data.optional}
                  </div>
                )}
                {data.address && (
                  <div style={{ fontSize: '12px',  marginBottom: '4px', whiteSpace: 'pre-line' }}>
                    {data.address}
                  </div>
                )}
                {data.phone && (
                  <div style={{ fontSize: '12px',  marginBottom: '2px' }}>
                    Phone: {data.phone}
                  </div>
                )}
                {data.email && (
                  <div style={{ fontSize: '12px' }}>
                    Email: <a href={`mailto:${data.email}`} style={{ color: emailTextColor, textDecoration: 'none' }}>{data.email}</a>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

SignaturePreview.displayName = 'SignaturePreview';

export default SignaturePreview;
