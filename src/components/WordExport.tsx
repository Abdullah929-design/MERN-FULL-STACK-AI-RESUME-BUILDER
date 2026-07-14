import React from 'react';
import { 
  Document, Packer, Paragraph, TextRun, AlignmentType, 
  BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType, VerticalAlign,
  ImageRun
} from 'docx';
import { saveAs } from 'file-saver';
import { FileText, Download, Loader2 } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

export const DownloadDocx: React.FC = () => {
  const { resume } = useResumeStore();
  const [loading, setLoading] = React.useState(false);

  // Helper to fetch image and convert to buffer
  const getImageData = async (url: string): Promise<Uint8Array | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Uint8Array(await blob.arrayBuffer());
    } catch (e) {
      console.error("Failed to load image for Word export:", e);
      return null;
    }
  };

  const generateDocx = async () => {
    if (!resume) return;
    setLoading(true);

    try {
      const { personal, summary, experience, education, skills, customSections } = resume.sections;
      const { template } = resume;

      // Fetch photo if available
      const photoData = personal.photoUrl ? await getImageData(personal.photoUrl) : null;

      // --- Helper Styles based on Template ---
      const getTemplateConfig = () => {
        switch (template) {
          case 'modern': return { accent: "1e3a5f", sidebarBg: "f8fafc", secondary: "60a5fa", hasSidebar: true };
          case 'executive': return { accent: "0f172a", sidebarBg: "f3f4f6", secondary: "6366f1", hasSidebar: true };
          case 'creative': return { accent: "0d9488", sidebarBg: "f8fafc", secondary: "2dd4bf", hasSidebar: true };
          case 'professional': return { accent: "111827", sidebarBg: "f9fafb", secondary: "f59e0b", hasSidebar: true };
          case 'elegant': return { accent: "6b8e23", sidebarBg: "fdfdfa", secondary: "819f42", hasSidebar: false };
          case 'nordic': return { accent: "1c1c1a", sidebarBg: "fafaf8", secondary: "c8a96e", hasSidebar: false };
          case 'timeline': return { accent: "5b21b6", sidebarBg: "f9fafb", secondary: "7c3aed", hasSidebar: true };
          case 'compact': return { accent: "0d0d0d", sidebarBg: "ffffff", secondary: "16a34a", hasSidebar: true };
          case 'editorial': return { accent: "000000", sidebarBg: "f5f0eb", secondary: "e63946", hasSidebar: true };
          case 'academia': return { accent: "8b4513", sidebarBg: "fdf8f0", secondary: "d4a96a", hasSidebar: true };
          default: return { accent: "000000", sidebarBg: "ffffff", secondary: "4b5563", hasSidebar: false };
        }
      };

      const config = getTemplateConfig();

      const createHeading = (text: string, color = config.accent) => (
        new Paragraph({
          children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 18, color: color })],
          spacing: { before: 400, after: 200 },
          border: { bottom: { color: "cccccc", space: 4, style: BorderStyle.SINGLE, size: 2 } },
        })
      );

      // --- Content Builders ---
      
      const buildSidebar = () => [
        new Paragraph({
          children: [new TextRun({ text: "CONTACT", bold: true, size: 16, color: config.secondary })],
          spacing: { after: 100 },
        }),
        ...(personal.email ? [new Paragraph({ children: [new TextRun({ text: personal.email, size: 16 })], spacing: { after: 50 } })] : []),
        ...(personal.phone ? [new Paragraph({ children: [new TextRun({ text: personal.phone, size: 16 })], spacing: { after: 50 } })] : []),
        ...(personal.location ? [new Paragraph({ children: [new TextRun({ text: personal.location, size: 16 })], spacing: { after: 150 } })] : []),

        new Paragraph({
          children: [new TextRun({ text: "EXPERTISE", bold: true, size: 16, color: config.secondary })],
          spacing: { before: 200, after: 100 },
        }),
        ...skills.map(s => new Paragraph({
          children: [new TextRun({ text: `• ${s}`, size: 16 })],
          spacing: { after: 40 },
        })),
      ];

      const buildMain = () => [
        ...(summary ? [
          createHeading("Profile"),
          new Paragraph({
            children: [new TextRun({ text: summary, size: 18 })],
            spacing: { after: 200 },
            alignment: AlignmentType.JUSTIFIED,
          }),
        ] : []),

        // EDUCATION PLACED RIGHT BELOW SUMMARY
        ...(education.length > 0 ? [
          createHeading("Education"),
          ...education.flatMap(edu => [
            new Paragraph({
              spacing: { before: 150 },
              children: [
                new TextRun({ text: edu.institution, bold: true, size: 20 }),
                new TextRun({ text: `\t${edu.year}`, bold: true, size: 16, color: config.secondary }),
              ],
              tabStops: [{ type: "right" as any, position: 9000 }],
            }),
            new Paragraph({
              children: [new TextRun({ text: edu.degree, italics: true, size: 18, color: "444444" })],
              spacing: { after: 150 },
            }),
          ])
        ] : []),

        ...(experience.length > 0 ? [
          createHeading("Professional Experience"),
          ...experience.flatMap((exp) => [
            new Paragraph({
              spacing: { before: 200 },
              children: [
                new TextRun({ text: (exp.role || "Role").toUpperCase(), bold: true, size: 20, color: "000000" }),
                new TextRun({ text: `\t${exp.startDate} - ${exp.endDate}`, bold: true, size: 16, color: config.secondary }),
              ],
              tabStops: [{ type: "right" as any, position: 9000 }],
            }),
            new Paragraph({
              children: [new TextRun({ text: exp.company || "Company", italics: true, size: 18, color: "444444" })],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [new TextRun({ text: exp.description, size: 18 })],
              spacing: { after: 200 },
              alignment: AlignmentType.JUSTIFIED,
            }),
          ]),
        ] : []),

        ...(customSections || []).flatMap((section) => [
          createHeading(section.title),
          ...section.items.flatMap((item) => [
            new Paragraph({
              spacing: { before: 150 },
              children: [
                new TextRun({ text: (item.title || "").toUpperCase(), bold: true, size: 18 }),
                ...(item.date ? [new TextRun({ text: `\t${item.date}`, bold: true, size: 16, color: config.secondary })] : []),
              ],
              tabStops: [{ type: "right" as any, position: 9000 }],
            }),
            ...(item.subtitle ? [new Paragraph({ children: [new TextRun({ text: item.subtitle, italics: true, size: 18 })] })] : []),
            new Paragraph({
              children: [new TextRun({ text: item.description, size: 18 })],
              spacing: { after: 150 },
              alignment: AlignmentType.JUSTIFIED,
            }),
          ]),
        ]),
      ];

      // --- PAGE CONSTRUCTION ---
      const children: any[] = [];

      // Header Table
      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: config.accent },
            left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
          },
          rows: [
            new TableRow({
              children: [
                // PHOTO IF EXISTS
                ...(photoData ? [
                  new TableCell({
                    width: { size: 15, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: photoData,
                            transformation: { width: 80, height: 80 },
                            type: 'png' as any, // Cast to any to bypass strict SvgMediaOptions check if misidentified
                          })
                        ]
                      })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  })
                ] : []),
                new TableCell({
                  width: { size: 60, type: WidthType.PERCENTAGE },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: (personal.name || "YOUR NAME").toUpperCase(), bold: true, size: 48, color: "000000" })],
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: (personal.title || "Professional Title").toUpperCase(), size: 16, color: config.secondary })],
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  children: config.hasSidebar ? [] : [
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: personal.email || "", size: 14 })] }),
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: personal.phone || "", size: 14 })] }),
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: personal.location || "", size: 14 })] }),
                  ],
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
              ],
            }),
          ],
        })
      );

      // Body (Dual Column Layout)
      if (config.hasSidebar) {
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: buildMain(),
                    margins: { top: 400, right: 400 },
                  }),
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: buildSidebar(),
                    shading: { fill: config.sidebarBg, type: ShadingType.CLEAR },
                    margins: { top: 400, left: 300, right: 300 },
                    borders: { left: { style: BorderStyle.SINGLE, color: "eeeeee", size: 1 } },
                  }),
                ],
              }),
            ],
          })
        );
      } else {
        children.push(...buildMain());
        children.push(createHeading("Skills & Expertise"));
        children.push(new Paragraph({ children: [new TextRun({ text: skills.join(" • "), size: 18 })] }));
      }

      const doc = new Document({
        sections: [{
          properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
          children: children,
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${personal.name || 'Resume'}_${template}.docx`);
    } catch (e) {
      console.error("Docx generation failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generateDocx}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm font-medium group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <Loader2 className="animate-spin text-blue-500" size={18} />
      ) : (
        <FileText className="text-gray-400 group-hover:text-blue-500 transition-colors" size={18} />
      )}
      <span>{loading ? 'Processing...' : 'Download Word'}</span>
      {!loading && <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />}
    </button>
  );
};


