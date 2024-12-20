import html2canvas from 'html2canvas';

export const generateSignatureImage = async (elementRef: HTMLElement): Promise<string> => {
  try {
    const canvas = await html2canvas(elementRef, {
      scale: 2, // Higher resolution
      backgroundColor: '#ffffff',
      logging: false,
    });
    const result = canvas.toDataURL('image/png');



    return result;
  } catch (error) {
    console.error('Error generating signature image:', error);
    throw error;
  }
};
