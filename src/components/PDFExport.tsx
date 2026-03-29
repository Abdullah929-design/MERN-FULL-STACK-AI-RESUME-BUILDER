import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import type { Resume } from '../types/resume';
import { Download, Loader2 } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

// Modern Template Styles
const modernStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  sidebar: { width: '35%', backgroundColor: '#1e3a8a', color: '#ffffff', padding: 30 },
  main: { width: '65%', padding: 40, color: '#1f2937' },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
  title: { fontSize: 10, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 },
  sidebarSection: { marginBottom: 25 },
  sidebarTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#3b82f6', paddingBottom: 5, marginBottom: 10, color: '#93c5fd' },
  sidebarText: { fontSize: 9, marginBottom: 5, color: '#d1d5db' },
  skillBadge: { backgroundColor: '#1e40af', padding: '4 8', borderRadius: 4, marginBottom: 5, marginRight: 5, fontSize: 8, border: 1, borderColor: '#3b82f6' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: '#1e3a8a', borderBottomWidth: 2, borderBottomColor: '#dbeafe', paddingBottom: 5, marginBottom: 15 },
  expItem: { marginBottom: 15, borderLeftWidth: 2, borderLeftColor: '#dbeafe', paddingLeft: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expRole: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
  expDate: { fontSize: 8, fontWeight: 'bold', color: '#2563eb', backgroundColor: '#eff6ff', padding: '2 6', borderRadius: 10 },
  expCompany: { fontSize: 9, fontWeight: 'bold', color: '#4b5563', marginBottom: 4 },
  description: { fontSize: 9, color: '#4b5563', lineHeight: 1.4 },
  eduItem: { marginBottom: 10, borderLeftWidth: 2, borderLeftColor: '#f0fdf4', paddingLeft: 10 },
  eduHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  eduInst: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
  eduYear: { fontSize: 9, color: '#16a34a', fontWeight: 'bold' },
  eduDegree: { fontSize: 9, color: '#4b5563', fontStyle: 'italic' },
});

// Classic Template Styles
const classicStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Times-Roman', color: '#111827' },
  header: { alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#111827', paddingBottom: 15, marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: 14, color: '#374151', marginTop: 5 },
  contact: { flexDirection: 'row', gap: 15, marginTop: 10, fontSize: 10, fontStyle: 'italic', color: '#4b5563' },
  section: { marginTop: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, borderBottomWidth: 1, borderBottomColor: '#d1d5db', paddingBottom: 3, marginBottom: 10 },
  dot: { width: 6, height: 6, backgroundColor: '#111827', borderRadius: 3 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
  summary: { fontSize: 10, lineHeight: 1.6, textAlign: 'justify', textIndent: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold' },
  itemTitle: { fontSize: 12, fontWeight: 'bold' },
  itemSubtitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 2 },
  itemDate: { fontSize: 10 },
  description: { fontSize: 10, lineHeight: 1.5, marginTop: 5, paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: '#f3f4f6', fontStyle: 'italic' },
  skills: { fontSize: 10, lineHeight: 1.6 },
  skillLabel: { fontWeight: 'bold' },
});

// ATS Template Styles
const atsStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', color: '#000000' },
  header: { borderBottomWidth: 3, borderBottomColor: '#000000', paddingBottom: 10, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase' },
  contact: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5, fontSize: 9, fontWeight: 'bold' },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: '#f3f4f6', padding: '4 8', marginBottom: 10, letterSpacing: 1.5 },
  item: { marginBottom: 15, paddingHorizontal: 8 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  role: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  date: { fontSize: 10, fontWeight: 'bold' },
  company: { fontSize: 10, fontWeight: 'bold', color: '#374151', fontStyle: 'italic', borderBottomWidth: 1, borderBottomColor: '#f3f4f6', paddingBottom: 2, marginBottom: 5 },
  description: { fontSize: 10, lineHeight: 1.4 },
  skillItem: { flexDirection: 'row', alignItems: 'center', gap: 5, width: '30%', marginBottom: 5 },
  skillDot: { width: 4, height: 4, backgroundColor: '#000000', borderRadius: 2 },
  skillText: { fontSize: 10, fontWeight: 'bold' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 },
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
          {personal.email && <Text style={modernStyles.sidebarText}>E: {personal.email}</Text>}
          {personal.phone && <Text style={modernStyles.sidebarText}>P: {personal.phone}</Text>}
          {personal.location && <Text style={modernStyles.sidebarText}>L: {personal.location}</Text>}
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
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
        </View>
      </View>

      {summary && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}>
            <View style={classicStyles.dot} />
            <Text style={classicStyles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={classicStyles.summary}>{summary}</Text>
        </View>
      )}

      {experience.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}>
            <View style={classicStyles.dot} />
            <Text style={classicStyles.sectionTitle}>Professional Experience</Text>
          </View>
          {experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 15 }}>
              <View style={classicStyles.itemHeader}>
                <Text style={classicStyles.itemTitle}>{exp.role || 'Role'}</Text>
                <Text style={classicStyles.itemDate}>{exp.startDate} – {exp.endDate}</Text>
              </View>
              <Text style={classicStyles.itemSubtitle}>{exp.company || 'Company'}</Text>
              <Text style={classicStyles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {education.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}>
            <View style={classicStyles.dot} />
            <Text style={classicStyles.sectionTitle}>Education</Text>
          </View>
          {education.map((edu) => (
            <View key={edu.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View>
                <Text style={classicStyles.itemTitle}>{edu.institution || 'Institution'}</Text>
                <Text style={{ fontSize: 10, fontStyle: 'italic' }}>{edu.degree || 'Degree'}</Text>
              </View>
              <Text style={classicStyles.itemDate}>{edu.year}</Text>
            </View>
          ))}
        </View>
      )}

      {skills.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}>
            <View style={classicStyles.dot} />
            <Text style={classicStyles.sectionTitle}>Technical Skills</Text>
          </View>
          <Text style={classicStyles.skills}>
            <Text style={classicStyles.skillLabel}>Expertise in: </Text>
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
          {personal.title && <Text style={{ textTransform: 'uppercase' }}>{personal.title}</Text>}
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>

      {summary && (
        <View style={{ marginBottom: 20 }}>
          <Text style={atsStyles.sectionTitle}>Professional Summary</Text>
          <Text style={[atsStyles.description, { paddingHorizontal: 8 }]}>{summary}</Text>
        </View>
      )}

      {experience.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={atsStyles.sectionTitle}>Core Experience</Text>
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
        <View style={{ marginBottom: 20 }}>
          <Text style={atsStyles.sectionTitle}>Education & Certifications</Text>
          {education.map((edu) => (
            <View key={edu.id} style={atsStyles.item}>
              <View style={atsStyles.itemHeader}>
                <View>
                  <Text style={[atsStyles.role, { fontSize: 10 }]}>{edu.institution || 'Institution'}</Text>
                  <Text style={{ fontSize: 9, fontStyle: 'italic', color: '#4b5563' }}>{edu.degree || 'Degree'}</Text>
                </View>
                <Text style={atsStyles.date}>{edu.year}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {skills.length > 0 && (
        <View>
          <Text style={atsStyles.sectionTitle}>Technical Skills</Text>
          <View style={atsStyles.skillsContainer}>
            {skills.map((skill) => (
              <View key={skill} style={atsStyles.skillItem}>
                <View style={atsStyles.skillDot} />
                <Text style={atsStyles.skillText}>{skill}</Text>
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

  return (
    <PDFDownloadLink
      document={<ResumeDocument resume={resume} />}
      fileName={`${resume.sections.personal.name || 'resume'}.pdf`}
      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-200"
    >
      {({ loading }) => (
        <>
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          {loading ? 'Preparing PDF...' : 'Download PDF'}
        </>
      )}
    </PDFDownloadLink>
  );
};

