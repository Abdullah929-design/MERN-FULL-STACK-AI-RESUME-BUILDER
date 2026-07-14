import React from 'react';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import { ImageIcon, Download, Loader2 } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

export const DownloadPNG: React.FC = () => {
  const { resume } = useResumeStore();
  const [loading, setLoading] = React.useState(false);

  const generatePNG = async () => {
    const node = document.getElementById('resume-preview-root');
    if (!node || !resume) return;

    setLoading(true);
    try {
      // Small delay to ensure all assets are loaded
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture high-resolution image
      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 2, // 2x resolution for retina-clear text
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: node.offsetWidth + 'px',
          height: node.scrollHeight + 'px', // Capture full height
        }
      });

      saveAs(dataUrl, `${resume.sections.personal.name || 'Resume'}_Preview.png`);
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generatePNG}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-200 hover:text-green-600 transition-all shadow-sm font-medium group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <Loader2 className="animate-spin text-green-500" size={18} />
      ) : (
        <ImageIcon className="text-gray-400 group-hover:text-green-500 transition-colors" size={18} />
      )}
      <span>{loading ? 'Capturing...' : 'Download PNG'}</span>
      {!loading && <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />}
    </button>
  );
};
