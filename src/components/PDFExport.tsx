import React, { useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import type { Resume } from '../types/resume';
import { Download, Loader2 } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

// Modern Template Styles
const modernStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  sidebar: { width: '32%', backgroundColor: '#1e3a8a', color: '#ffffff', padding: 25 },
  main: { width: '68%', padding: 35, color: '#1f2937' },
  name: { fontSize: 22, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5, letterSpacing: 1 },
  title: { fontSize: 9, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 'bold' },
  sidebarSection: { marginBottom: 20 },
  sidebarTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, borderBottomWidth: 1, borderBottomColor: '#3b82f6', paddingBottom: 4, marginBottom: 8, color: '#93c5fd' },
  sidebarText: { fontSize: 8.5, marginBottom: 4, color: '#d1d5db', lineHeight: 1.4 },
  skillBadge: { backgroundColor: '#1e40af', padding: '3 7', borderRadius: 3, marginBottom: 4, marginRight: 4, fontSize: 8, borderWidth: 1, borderColor: '#3b82f6' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, color: '#1e3a8a', borderBottomWidth: 2, borderBottomColor: '#dbeafe', paddingBottom: 4, marginBottom: 15 },
  expItem: { marginBottom: 18, borderLeftWidth: 2, borderLeftColor: '#dbeafe', paddingLeft: 12 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  expRole: { fontSize: 10.5, fontWeight: 'bold', color: '#111827' },
  expDate: { fontSize: 8, fontWeight: 'bold', color: '#2563eb', backgroundColor: '#eff6ff', padding: '2 6', borderRadius: 8 },
  expCompany: { fontSize: 9.5, fontWeight: 'bold', color: '#4b5563', marginBottom: 4 },
  description: { fontSize: 9, color: '#4b5563', lineHeight: 1.5 },
  eduItem: { marginBottom: 12, borderLeftWidth: 2, borderLeftColor: '#f0fdf4', paddingLeft: 12 },
  eduHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  eduInst: { fontSize: 10.5, fontWeight: 'bold', color: '#111827' },
  eduYear: { fontSize: 8.5, color: '#16a34a', fontWeight: 'bold' },
  eduDegree: { fontSize: 9, color: '#4b5563', fontStyle: 'italic' },
});

// Classic Template Styles
const classicStyles = StyleSheet.create({
  page: { padding: 45, fontFamily: 'Times-Roman', color: '#111827' },
  header: { alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: '#111827', paddingBottom: 15, marginBottom: 25 },
  name: { fontSize: 26, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5 },
  title: { fontSize: 13, color: '#374151', marginTop: 4, fontStyle: 'italic' },
  contact: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 10, fontSize: 10, color: '#4b5563' },
  section: { marginTop: 22 },
  sectionHeader: { borderBottomWidth: 0.8, borderBottomColor: '#9ca3af', paddingBottom: 2, marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  summary: { fontSize: 10.5, lineHeight: 1.6, textAlign: 'justify' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemTitle: { fontSize: 12, fontWeight: 'bold' },
  itemSubtitle: { fontSize: 10.5, fontWeight: 'bold', color: '#374151', marginTop: 1 },
  itemDate: { fontSize: 10, fontStyle: 'italic' },
  description: { fontSize: 10.5, lineHeight: 1.5, marginTop: 4, color: '#4b5563' },
  skills: { fontSize: 10.5, lineHeight: 1.6, color: '#374151' },
});

// ATS Template Styles - Optimized for Readability and ATS Processing
const atsStyles = StyleSheet.create({
  page: { padding: 45, fontFamily: 'Helvetica', color: '#000000', lineHeight: 1.4 },
  header: { borderBottomWidth: 1, borderBottomColor: '#000000', paddingBottom: 10, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 6, fontSize: 10 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#000000', paddingBottom: 2, marginBottom: 10, letterSpacing: 1 },
  item: { marginBottom: 15 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  role: { fontSize: 11, fontWeight: 'bold' },
  date: { fontSize: 10, fontWeight: 'bold' },
  company: { fontSize: 10.5, fontWeight: 'bold', color: '#333333', marginTop: 1 },
  description: { fontSize: 10.5, marginTop: 4, textAlign: 'justify' },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 2 },
  skillItem: { fontSize: 10.5, fontWeight: 'bold', width: '31%' },
  skillBullet: { width: 3, height: 3, backgroundColor: '#000000', borderRadius: 1.5, marginRight: 5 },
});

const ModernDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills } = resume.sections;
  return (
    <Page size="A4" style={modernStyles.page}>
      <View style={modernStyles.sidebar}>
        <Text style={modernStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={modernStyles.title}>{personal.title || 'Professional Title'}</Text>
        
        <View style={modernStyles.sidebarSection}>
          <Text style={modernStyles.sidebarTitle}>Contact</Text>
          {personal.email && <Text style={modernStyles.sidebarText}>{personal.email}</Text>}
          {personal.phone && <Text style={modernStyles.sidebarText}>{personal.phone}</Text>}
          {personal.location && <Text style={modernStyles.sidebarText}>{personal.location}</Text>}
        </View>

        <View style={modernStyles.sidebarSection}>
          <Text style={modernStyles.sidebarTitle}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {skills.map((skill) => (
              <View key={skill} style={modernStyles.skillBadge}>
                <Text style={{ color: 'white' }}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={modernStyles.main}>
        {summary && (
          <View style={{ marginBottom: 25 }}>
            <Text style={modernStyles.sectionTitle}>Profile</Text>
            <Text style={[modernStyles.description, { fontStyle: 'italic' }]}>{summary}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View style={{ marginBottom: 25 }}>
            <Text style={modernStyles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={modernStyles.expItem}>
                <View style={modernStyles.expHeader}>
                  <Text style={modernStyles.expRole}>{exp.role || 'Role'}</Text>
                  <Text style={modernStyles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={modernStyles.expCompany}>{exp.company || 'Company'}</Text>
                <Text style={modernStyles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View>
            <Text style={modernStyles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={modernStyles.eduItem}>
                <View style={modernStyles.eduHeader}>
                  <Text style={modernStyles.eduInst}>{edu.institution || 'Institution'}</Text>
                  <Text style={modernStyles.eduYear}>{edu.year}</Text>
                </View>
                <Text style={modernStyles.eduDegree}>{edu.degree || 'Degree'}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
};

const ClassicDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills } = resume.sections;
  return (
    <Page size="A4" style={classicStyles.page}>
      <View style={classicStyles.header}>
        <Text style={classicStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={classicStyles.title}>{personal.title || 'Professional Title'}</Text>
        <View style={classicStyles.contact}>
          {personal.location && <Text>{personal.location}</Text>}
          {personal.location && personal.email && <Text>|</Text>}
          {personal.email && <Text>{personal.email}</Text>}
          {personal.email && personal.phone && <Text>|</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
        </View>
      </View>

      {summary && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}>
            <Text style={classicStyles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={classicStyles.summary}>{summary}</Text>
        </View>
      )}

      {experience.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}>
            <Text style={classicStyles.sectionTitle}>Professional Experience</Text>
          </View>
          {experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 18 }}>
              <View style={classicStyles.itemHeader}>
                <View>
                  <Text style={classicStyles.itemTitle}>{exp.role || 'Role'}</Text>
                  <Text style={classicStyles.itemSubtitle}>{exp.company || 'Company'}</Text>
                </View>
                <Text style={classicStyles.itemDate}>{exp.startDate} – {exp.endDate}</Text>
              </View>
              <Text style={classicStyles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {education.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}>
            <Text style={classicStyles.sectionTitle}>Education</Text>
          </View>
          {education.map((edu) => (
            <View key={edu.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <View>
                <Text style={classicStyles.itemTitle}>{edu.institution || 'Institution'}</Text>
                <Text style={{ fontSize: 10.5, fontStyle: 'italic', marginTop: 1 }}>{edu.degree || 'Degree'}</Text>
              </View>
              <Text style={classicStyles.itemDate}>{edu.year}</Text>
            </View>
          ))}
        </View>
      )}

      {skills.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}>
            <Text style={classicStyles.sectionTitle}>Technical Skills</Text>
          </View>
          <Text style={classicStyles.skills}>
            <Text style={{ fontWeight: 'bold' }}>Core Competencies: </Text>
            {skills.join(' • ')}
          </Text>
        </View>
      )}
    </Page>
  );
};

const ATSDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills } = resume.sections;
  return (
    <Page size="A4" style={atsStyles.page}>
      <View style={atsStyles.header}>
        <Text style={atsStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <View style={atsStyles.contact}>
          {personal.title && <Text style={{ fontWeight: 'bold' }}>{personal.title.toUpperCase()}</Text>}
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>

      {summary && (
        <View style={atsStyles.section}>
          <Text style={atsStyles.sectionTitle}>Professional Summary</Text>
          <Text style={atsStyles.description}>{summary}</Text>
        </View>
      )}

      {experience.length > 0 && (
        <View style={atsStyles.section}>
          <Text style={atsStyles.sectionTitle}>Professional Experience</Text>
          {experience.map((exp) => (
            <View key={exp.id} style={atsStyles.item}>
              <View style={atsStyles.itemHeader}>
                <Text style={atsStyles.role}>{exp.role || 'Role'}</Text>
                <Text style={atsStyles.date}>{exp.startDate} – {exp.endDate}</Text>
              </View>
              <Text style={atsStyles.company}>{exp.company || 'Company'}</Text>
              <Text style={atsStyles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {education.length > 0 && (
        <View style={atsStyles.section}>
          <Text style={atsStyles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={atsStyles.item}>
              <View style={atsStyles.itemHeader}>
                <View>
                  <Text style={atsStyles.role}>{edu.institution || 'Institution'}</Text>
                  <Text style={{ fontSize: 10, fontStyle: 'italic', marginTop: 1 }}>{edu.degree || 'Degree'}</Text>
                </View>
                <Text style={atsStyles.date}>{edu.year}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {skills.length > 0 && (
        <View style={atsStyles.section}>
          <Text style={atsStyles.sectionTitle}>Skills & Competencies</Text>
          <View style={atsStyles.skillsGrid}>
            {skills.map((skill) => (
              <View key={skill} style={{ flexDirection: 'row', alignItems: 'center', width: '31%' }}>
                <View style={atsStyles.skillBullet} />
                <Text style={{ fontSize: 10.5 }}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Page>
  );
};

const ResumeDocument: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { template } = resume;

  return (
    <Document>
      {template === 'modern' && <ModernDocument resume={resume} />}
      {template === 'classic' && <ClassicDocument resume={resume} />}
      {template === 'ats' && <ATSDocument resume={resume} />}
      {/* Fallback */}
      {!['modern', 'classic', 'ats'].includes(template) && <ModernDocument resume={resume} />}
    </Document>
  );
};

export const DownloadPDF: React.FC = () => {
  const { resume } = useResumeStore();

  // Create a unique key to force PDF regeneration when data or template changes
  const downloadKey = useMemo(() => {
    const dataHash = JSON.stringify({
      template: resume.template,
      personal: resume.sections.personal,
      summary: resume.sections.summary,
      exp: resume.sections.experience.length,
      edu: resume.sections.education.length,
      skills: resume.sections.skills.length
    });
    return dataHash;
  }, [resume]);

  return (
    <PDFDownloadLink
      key={downloadKey}
      document={<ResumeDocument resume={resume} />}
      fileName={`${resume.sections.personal.name || 'resume'}.pdf`}
      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-200"
    >
      {({ loading, error }) => (
        <>
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          {loading ? 'Preparing PDF...' : error ? 'Error!' : 'Download PDF'}
        </>
      )}
    </PDFDownloadLink>
  );
};


