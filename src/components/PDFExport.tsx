import React, { useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import type { Resume } from '../types/resume';
import { Download, Loader2 } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

// --- Stylesheets ---

const modernStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  sidebar: { width: '32%', backgroundColor: '#1e3a5f', color: '#ffffff', padding: 30 },
  main: { width: '68%', padding: 40, color: '#1e293b' },
  photo: { width: 90, height: 90, borderRadius: 45, marginBottom: 15, alignSelf: 'center', border: '3px solid #ffffff' },
  name: { fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5, letterSpacing: 1, textAlign: 'center' },
  title: { fontSize: 9, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 25, fontWeight: 'bold', textAlign: 'center' },
  sidebarSection: { marginBottom: 20 },
  sidebarTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, borderBottomWidth: 1, borderBottomColor: '#ffffff', paddingBottom: 4, marginBottom: 8, color: '#93c5fd' },
  sidebarTextItem: { marginBottom: 6 },
  sidebarLabel: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 1 },
  sidebarText: { fontSize: 9, color: '#dbeafe', lineHeight: 1.4 },
  skillBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  skillDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#93c5fd', marginRight: 6 },
  skillText: { fontSize: 9, color: '#e0eaff' },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, color: '#1e3a5f', borderBottomWidth: 2, borderBottomColor: '#dbeafe', paddingBottom: 4, marginBottom: 15 },
  expItem: { marginBottom: 18, borderLeftWidth: 2, borderLeftColor: '#dbeafe', paddingLeft: 12 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  expRole: { fontSize: 11, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase' },
  expDate: { fontSize: 8, fontWeight: 'bold', color: '#2563eb', fontStyle: 'italic' },
  expCompany: { fontSize: 10, fontWeight: 'bold', color: '#334155', marginBottom: 4 },
  description: { fontSize: 9.5, color: '#475569', lineHeight: 1.5 },
  eduItem: { marginBottom: 12, borderLeftWidth: 2, borderLeftColor: '#dcfce7', paddingLeft: 12 },
  eduInst: { fontSize: 10.5, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase' },
  eduHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  eduYear: { fontSize: 8.5, color: '#16a34a', fontWeight: 'bold' },
  eduDegree: { fontSize: 9.5, color: '#475569', fontStyle: 'italic' },
  customItem: { marginBottom: 15, borderLeftWidth: 2, borderLeftColor: '#f1f5f9', paddingLeft: 12 },
});

const classicStyles = StyleSheet.create({
  page: { padding: 45, fontFamily: 'Times-Roman', color: '#111827' },
  header: { alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#111827', paddingBottom: 15, marginBottom: 25 },
  photo: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5 },
  title: { fontSize: 14, color: '#374151', marginTop: 4 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 10, fontSize: 10, fontStyle: 'italic', color: '#4b5563' },
  section: { marginTop: 22 },
  sectionHeader: { borderBottomWidth: 1, borderBottomColor: '#d1d5db', paddingBottom: 2, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  sectionDot: { width: 4, height: 4, backgroundColor: '#111827', borderRadius: 2, marginRight: 6 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  summary: { fontSize: 10.5, lineHeight: 1.6, textAlign: 'justify', paddingLeft: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemTitle: { fontSize: 12, fontWeight: 'bold', fontStyle: 'italic' },
  itemSubtitle: { fontSize: 10, fontWeight: 'bold', color: '#1f2937', marginTop: 1, textTransform: 'uppercase', letterSpacing: 0.5 },
  itemDate: { fontSize: 10 },
  description: { fontSize: 10, lineHeight: 1.5, marginTop: 4, color: '#374151', fontStyle: 'italic', borderLeftWidth: 1, borderLeftColor: '#f3f4f6', paddingLeft: 10 },
  skills: { fontSize: 10, lineHeight: 1.6, color: '#374151' },
});

const atsStyles = StyleSheet.create({
  page: { padding: 45, fontFamily: 'Helvetica', color: '#000000', lineHeight: 1.35 },
  header: { borderBottomWidth: 2, borderBottomColor: '#000000', paddingBottom: 10, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: -0.5 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 4, fontSize: 9.5, fontWeight: 'bold' },
  section: { marginTop: 15 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 9.5, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, backgroundColor: '#f0f0f0', padding: '3 7' },
  sectionLine: { flex: 1, height: 1.5, backgroundColor: '#000000' },
  item: { marginBottom: 12, paddingLeft: 2, paddingRight: 2 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  role: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  date: { fontSize: 9.5, fontWeight: 'bold' },
  company: { fontSize: 9.5, fontWeight: 'bold', color: '#333333', fontStyle: 'italic', borderBottomWidth: 1, borderBottomColor: '#e5e5e5', paddingBottom: 2, marginTop: 1 },
  description: { fontSize: 9.5, marginTop: 3, textAlign: 'justify', color: '#1a1a1a', lineHeight: 1.5 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingLeft: 2, marginTop: 2 },
  skillItem: { flexDirection: 'row', alignItems: 'center' },
  skillBullet: { width: 3, height: 3, backgroundColor: '#000000', borderRadius: 1.5, marginRight: 5 },
});

const executiveStyles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  header: { backgroundColor: '#0f172a', color: '#ffffff', padding: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  photo: { width: 80, height: 80, borderRadius: 8, border: '2px solid #1e293b' },
  name: { fontSize: 26, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 3, borderBottomColor: '#6366f1', paddingBottom: 5, marginBottom: 5 },
  title: { fontSize: 10, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: 1.5 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 8, fontSize: 9, color: '#94a3b8', fontWeight: 'bold' },
  content: { flexDirection: 'row', flex: 1 },
  main: { width: '65%', padding: 35, borderRightWidth: 1, borderRightColor: '#f1f5f9' },
  sidebar: { width: '35%', backgroundColor: '#f8fafc', padding: 30 },
  sectionTitle: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', color: '#6366f1', marginBottom: 12, letterSpacing: 2 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3, alignItems: 'baseline' },
  itemRole: { fontSize: 11.5, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.5 },
  itemDate: { fontSize: 8, color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  itemCompany: { fontSize: 9, color: '#6366f1', fontWeight: 'bold', fontStyle: 'italic', marginBottom: 4 },
  text: { fontSize: 10, color: '#475569', lineHeight: 1.6 },
  descLine: { paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: '#f1f5f9', marginTop: 3 },
  skillItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  skillDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#6366f1' },
});

const minimalistStyles = StyleSheet.create({
  page: { padding: 50, backgroundColor: '#ffffff', fontFamily: 'Helvetica', color: '#111827' },
  header: { alignItems: 'center', marginBottom: 35 },
  name: { fontSize: 32, fontWeight: 'light', color: '#111827', letterSpacing: 2, marginBottom: 5 },
  title: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 3, color: '#4b5563', marginBottom: 15 },
  contact: { flexDirection: 'row', justifyContent: 'center', gap: 15, fontSize: 9, color: '#6b7280' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 6, marginBottom: 15, letterSpacing: 1.5, textAlign: 'center' },
  item: { marginBottom: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 },
  itemRole: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  itemDate: { fontSize: 9, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1 },
  itemCompany: { fontSize: 10, color: '#4b5563', fontStyle: 'italic', marginBottom: 4 },
  text: { fontSize: 10, color: '#4b5563', lineHeight: 1.6, textAlign: 'justify' },
  skills: { fontSize: 10, color: '#4b5563', lineHeight: 1.6, textAlign: 'center' },
});

const creativeStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  main: { width: '70%', padding: 40 },
  sidebar: { width: '30%', backgroundColor: '#0f172a', color: '#ffffff', padding: 35 },
  name: { fontSize: 36, fontWeight: 'bold', color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 },
  title: { fontSize: 12, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: '#0ea5e9', marginBottom: 12, letterSpacing: 2, borderBottomWidth: 2, borderBottomColor: '#e0f2fe', paddingBottom: 4 },
  sideTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: '#38bdf8', paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: '#334155', marginBottom: 15, letterSpacing: 2 },
  item: { marginBottom: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemRole: { fontSize: 13, fontWeight: 'bold', color: '#0f172a' },
  itemDate: { fontSize: 8, backgroundColor: '#e0f2fe', color: '#0284c7', padding: '3 6', borderRadius: 4, fontWeight: 'bold' },
  itemCompany: { fontSize: 10, fontWeight: 'bold', color: '#64748b', marginBottom: 4 },
  text: { fontSize: 9.5, color: '#475569', lineHeight: 1.5 },
  sideText: { fontSize: 9.5, color: '#cbd5e1', marginBottom: 5, lineHeight: 1.4 },
  skillBadge: { backgroundColor: '#1e293b', color: '#7dd3fc', padding: '4 8', fontSize: 9, borderRadius: 4, marginBottom: 6 },
});

const elegantStyles = StyleSheet.create({
  page: { padding: 45, backgroundColor: '#fafaf9', fontFamily: 'Times-Roman', color: '#292524' },
  header: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#d6d3d1', paddingBottom: 25, marginBottom: 25 },
  photo: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 32, fontWeight: 'bold', color: '#1c1917', letterSpacing: 1 },
  title: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, color: '#78716c', marginTop: 4 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 10, fontSize: 9, fontStyle: 'italic', color: '#78716c' },
  content: { flexDirection: 'row' },
  main: { width: '70%', paddingRight: 35 },
  sidebar: { width: '30%', paddingLeft: 25, borderLeftWidth: 1, borderLeftColor: '#e7e5e4' },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: '#292524', borderBottomWidth: 1, borderBottomColor: '#e7e5e4', paddingBottom: 5, marginBottom: 15, letterSpacing: 2 },
  item: { marginBottom: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemRole: { fontSize: 12, fontWeight: 'bold', color: '#292524' },
  itemDate: { fontSize: 9, fontStyle: 'italic', color: '#78716c' },
  itemCompany: { fontSize: 10, fontStyle: 'italic', color: '#57534e', marginBottom: 3 },
  text: { fontSize: 10, color: '#44403c', lineHeight: 1.6, textAlign: 'justify' },
  sideItem: { marginBottom: 15 },
});

const professionalStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#ffffff', fontFamily: 'Helvetica', color: '#111827' },
  header: { backgroundColor: '#111827', color: '#ffffff', padding: 35, paddingBottom: 25 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: 12, color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 15, fontSize: 9, color: '#9ca3af', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  content: { flexDirection: 'row', flex: 1 },
  main: { width: '70%', padding: 35, borderRightWidth: 1, borderRightColor: '#f3f4f6' },
  sidebar: { width: '30%', backgroundColor: '#f9fafb', padding: 30 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', borderBottomWidth: 2, borderBottomColor: '#3b82f6', paddingBottom: 5, marginBottom: 15, letterSpacing: 1 },
  item: { marginBottom: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemRole: { fontSize: 11.5, fontWeight: 'bold', color: '#111827' },
  itemDate: { fontSize: 9, color: '#6b7280', fontWeight: 'bold' },
  itemCompany: { fontSize: 10, color: '#3b82f6', fontWeight: 'bold', marginBottom: 4 },
  text: { fontSize: 10, color: '#4b5563', lineHeight: 1.5 },
  skillBadge: { padding: '4 8', fontSize: 9, marginBottom: 6, color: '#374151', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
});

// --- Template Components ---

// Truncate text to prevent overflow onto a second PDF page
const t = (s?: string, max = 400): string =>
  !s ? '' : s.length > max ? s.slice(0, max).trimEnd() + '\u2026' : s;

const ModernDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={modernStyles.page}>
      <View style={modernStyles.sidebar}>
        {personal.photoUrl && <Image src={personal.photoUrl} style={modernStyles.photo} />}
        <Text style={modernStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={modernStyles.title}>{personal.title || 'Professional Title'}</Text>
        <View style={modernStyles.sidebarSection}>
          <Text style={modernStyles.sidebarTitle}>Contact</Text>
          {personal.email && <View style={modernStyles.sidebarTextItem}><Text style={modernStyles.sidebarLabel}>Email</Text><Text style={modernStyles.sidebarText}>{personal.email}</Text></View>}
          {personal.phone && <View style={modernStyles.sidebarTextItem}><Text style={modernStyles.sidebarLabel}>Phone</Text><Text style={modernStyles.sidebarText}>{personal.phone}</Text></View>}
          {personal.location && <View style={modernStyles.sidebarTextItem}><Text style={modernStyles.sidebarLabel}>Location</Text><Text style={modernStyles.sidebarText}>{personal.location}</Text></View>}
        </View>
        <View style={modernStyles.sidebarSection}>
          <Text style={modernStyles.sidebarTitle}>Skills</Text>
          <View>
            {skills.map((skill) => (
              <View key={skill} style={modernStyles.skillBadge}>
                <View style={modernStyles.skillDot} />
                <Text style={modernStyles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={modernStyles.main}>
        {summary && (
          <View style={{ marginBottom: 20 }}>
            <Text style={modernStyles.sectionTitle}>Profile</Text>
            <Text style={[modernStyles.description, { fontStyle: 'italic' }]}>{t(summary, 600)}</Text>
          </View>
        )}
        {experience.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={modernStyles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={modernStyles.expItem} wrap={false}>
                <View style={modernStyles.expHeader}>
                  <Text style={modernStyles.expRole}>{exp.role}</Text>
                  <Text style={modernStyles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={modernStyles.expCompany}>{exp.company}</Text>
                <Text style={modernStyles.description}>{t(exp.description, 350)}</Text>
              </View>
            ))}
          </View>
        )}
        {education.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={modernStyles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={modernStyles.eduItem}>
                <Text style={modernStyles.eduInst}>{edu.institution}</Text>
                <View style={modernStyles.eduHeader}>
                  <Text style={modernStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={modernStyles.eduYear}>{edu.year}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        {customSections?.map((section) => (
          <View key={section.id} style={{ marginBottom: 20 }}>
            <Text style={modernStyles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={modernStyles.customItem}>
                <View style={modernStyles.expHeader}>
                  <Text style={modernStyles.expRole}>{item.title}</Text>
                  {item.date && <Text style={[modernStyles.expDate, { color: '#64748b' }]}>{item.date}</Text>}
                </View>
                {item.subtitle && <Text style={modernStyles.expCompany}>{item.subtitle}</Text>}
                {item.description && <Text style={modernStyles.description}>{t(item.description, 300)}</Text>}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  );
};

const ClassicDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
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
          <View style={classicStyles.sectionHeader}><View style={classicStyles.sectionDot}/><Text style={classicStyles.sectionTitle}>Professional Summary</Text></View>
          <Text style={classicStyles.summary}>{t(summary, 600)}</Text>
        </View>
      )}
      {experience.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}><View style={classicStyles.sectionDot}/><Text style={classicStyles.sectionTitle}>Professional Experience</Text></View>
          {experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 15 }} wrap={false}>
              <View style={classicStyles.itemHeader}>
                <Text style={classicStyles.itemTitle}>{exp.role}</Text>
                <Text style={classicStyles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <Text style={classicStyles.itemSubtitle}>{exp.company}</Text>
              <Text style={classicStyles.description}>{t(exp.description, 350)}</Text>
            </View>
          ))}
        </View>
      )}
      {education.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}><View style={classicStyles.sectionDot}/><Text style={classicStyles.sectionTitle}>Education</Text></View>
          {education.map((edu) => (
            <View key={edu.id} style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View><Text style={classicStyles.itemTitle}>{edu.institution}</Text><Text style={{ fontSize: 9.5, fontStyle: 'italic', marginTop: 2, color: '#374151' }}>{edu.degree}</Text></View>
              <Text style={classicStyles.itemDate}>{edu.year}</Text>
            </View>
          ))}
        </View>
      )}
      {skills.length > 0 && (
        <View style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}><View style={classicStyles.sectionDot}/><Text style={classicStyles.sectionTitle}>Technical Skills</Text></View>
          <Text style={classicStyles.skills}><Text style={{ fontWeight: 'bold' }}>Expertise in: </Text>{skills.join(' • ')}</Text>
        </View>
      )}
      {customSections?.map((section) => (
        <View key={section.id} style={classicStyles.section}>
          <View style={classicStyles.sectionHeader}><View style={classicStyles.sectionDot}/><Text style={classicStyles.sectionTitle}>{section.title}</Text></View>
          {section.items.map((item) => (
            <View key={item.id} style={{ marginBottom: 15 }}>
              <View style={classicStyles.itemHeader}>
                <Text style={classicStyles.itemTitle}>{item.title}</Text>
                {item.date && <Text style={classicStyles.itemDate}>{item.date}</Text>}
              </View>
              {item.subtitle && <Text style={classicStyles.itemSubtitle}>{item.subtitle}</Text>}
              {item.description && <Text style={classicStyles.description}>{t(item.description, 300)}</Text>}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );
};

const ATSDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={atsStyles.page}>
      <View style={atsStyles.header}>
        <Text style={atsStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <View style={atsStyles.contact}>
          {personal.title && <Text>{personal.title.toUpperCase()}</Text>}
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>
      {summary && (
        <View style={atsStyles.section}>
          <View style={atsStyles.sectionHeader}><Text style={atsStyles.sectionTitle}>Professional Summary</Text><View style={atsStyles.sectionLine} /></View>
          <Text style={atsStyles.description}>{t(summary, 600)}</Text>
        </View>
      )}
      {experience.length > 0 && (
        <View style={atsStyles.section}>
          <View style={atsStyles.sectionHeader}><Text style={atsStyles.sectionTitle}>Core Experience</Text><View style={atsStyles.sectionLine} /></View>
          {experience.map((exp) => (
            <View key={exp.id} style={atsStyles.item} wrap={false}>
              <View style={atsStyles.itemHeader}><Text style={atsStyles.role}>{exp.role}</Text><Text style={atsStyles.date}>{exp.startDate} - {exp.endDate}</Text></View>
              <Text style={atsStyles.company}>{exp.company}</Text>
              <Text style={atsStyles.description}>{t(exp.description, 350)}</Text>
            </View>
          ))}
        </View>
      )}
      {education.length > 0 && (
        <View style={atsStyles.section}>
          <View style={atsStyles.sectionHeader}><Text style={atsStyles.sectionTitle}>Education &amp; Certifications</Text><View style={atsStyles.sectionLine} /></View>
          {education.map((edu) => (
            <View key={edu.id} style={atsStyles.item}>
              <View style={atsStyles.itemHeader}><View><Text style={atsStyles.role}>{edu.institution}</Text><Text style={{ fontSize: 9.5, fontStyle: 'italic', marginTop: 2 }}>{edu.degree}</Text></View><Text style={atsStyles.date}>{edu.year}</Text></View>
            </View>
          ))}
        </View>
      )}
      {skills.length > 0 && (
        <View style={atsStyles.section}>
          <View style={atsStyles.sectionHeader}><Text style={atsStyles.sectionTitle}>Technical Skills</Text><View style={atsStyles.sectionLine} /></View>
          <View style={atsStyles.skillsGrid}>
            {skills.map((skill) => (
              <View key={skill} style={atsStyles.skillItem}>
                <View style={atsStyles.skillBullet} /><Text style={{ fontSize: 10, fontWeight: 'bold' }}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {customSections?.map((section) => (
        <View key={section.id} style={atsStyles.section}>
          <View style={atsStyles.sectionHeader}><Text style={atsStyles.sectionTitle}>{section.title}</Text><View style={atsStyles.sectionLine} /></View>
          {section.items.map((item) => (
            <View key={item.id} style={atsStyles.item} wrap={false}>
              <View style={atsStyles.itemHeader}><Text style={atsStyles.role}>{item.title}</Text>{item.date && <Text style={atsStyles.date}>{item.date}</Text>}</View>
              {item.subtitle && <Text style={atsStyles.company}>{item.subtitle}</Text>}
              {item.description && <Text style={atsStyles.description}>{t(item.description, 300)}</Text>}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );
};

const ExecutiveDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={executiveStyles.page}>
      <View style={executiveStyles.header}>
        <View style={{ flex: 1 }}>
          <Text style={executiveStyles.name}>{personal.name || 'YOUR NAME'}</Text>
          <Text style={executiveStyles.title}>{personal.title || 'Professional Title'}</Text>
          <View style={executiveStyles.contactRow}>
            {personal.email && <Text>{personal.email}</Text>}
            {personal.phone && <Text>{personal.phone}</Text>}
            {personal.location && <Text>{personal.location}</Text>}
          </View>
        </View>
        {personal.photoUrl && <Image src={personal.photoUrl} style={executiveStyles.photo} />}
      </View>
      <View style={executiveStyles.content}>
        <View style={executiveStyles.main}>
          {summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={executiveStyles.sectionTitle}>Executive Profile</Text>
              <Text style={[executiveStyles.text, { fontStyle: 'italic', fontWeight: 'bold' }]}>{t(summary, 600)}</Text>
            </View>
          )}
          {education.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={executiveStyles.sectionTitle}>Academic Background</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8, paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' }}>
                   <View style={executiveStyles.itemHeader}>
                     <View>
                        <Text style={executiveStyles.itemRole}>{edu.institution}</Text>
                        <Text style={executiveStyles.itemCompany}>{edu.degree}</Text>
                     </View>
                     <Text style={executiveStyles.itemDate}>{edu.year}</Text>
                   </View>
                </View>
              ))}
            </View>
          )}
          {experience.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={executiveStyles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 15 }} wrap={false}>
                  <View style={executiveStyles.itemHeader}><Text style={executiveStyles.itemRole}>{exp.role}</Text><Text style={executiveStyles.itemDate}>{exp.startDate} - {exp.endDate}</Text></View>
                  <Text style={executiveStyles.itemCompany}>{exp.company}</Text>
                  <View style={executiveStyles.descLine}><Text style={executiveStyles.text}>{t(exp.description, 350)}</Text></View>
                </View>
              ))}
            </View>
          )}
          {customSections?.map((section) => (
            <View key={section.id} style={{ marginBottom: 20 }}>
              <Text style={executiveStyles.sectionTitle}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item.id} style={{ marginBottom: 12 }}>
                  <View style={executiveStyles.itemHeader}><Text style={executiveStyles.itemRole}>{item.title}</Text>{item.date && <Text style={executiveStyles.itemDate}>{item.date}</Text>}</View>
                  {item.subtitle && <Text style={executiveStyles.itemCompany}>{item.subtitle}</Text>}
                  <Text style={executiveStyles.text}>{t(item.description, 300)}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={executiveStyles.sidebar}>
          <View style={{ marginBottom: 25 }}>
            <Text style={executiveStyles.sectionTitle}>Core Expertise</Text>
            {skills.map((skill) => (
              <View key={skill} style={executiveStyles.skillItem}><View style={executiveStyles.skillDot} /><Text style={[executiveStyles.text, { fontWeight: 'bold' }]}>{skill}</Text></View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  );
};

const MinimalistDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={minimalistStyles.page}>
      <View style={minimalistStyles.header}>
        <Text style={minimalistStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={minimalistStyles.title}>{personal.title || 'Professional Title'}</Text>
        <View style={minimalistStyles.contact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>
      {summary && (
        <View style={minimalistStyles.section}>
          <Text style={minimalistStyles.sectionTitle}>Summary</Text>
          <Text style={minimalistStyles.text}>{t(summary, 600)}</Text>
        </View>
      )}
      {experience.length > 0 && (
        <View style={minimalistStyles.section}>
          <Text style={minimalistStyles.sectionTitle}>Experience</Text>
          {experience.map((exp) => (
            <View key={exp.id} style={minimalistStyles.item} wrap={false}>
              <View style={minimalistStyles.itemHeader}><Text style={minimalistStyles.itemRole}>{exp.role}</Text><Text style={minimalistStyles.itemDate}>{exp.startDate} - {exp.endDate}</Text></View>
              <Text style={minimalistStyles.itemCompany}>{exp.company}</Text>
              <Text style={minimalistStyles.text}>{t(exp.description, 350)}</Text>
            </View>
          ))}
        </View>
      )}
      {education.length > 0 && (
        <View style={minimalistStyles.section}>
          <Text style={minimalistStyles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={minimalistStyles.item}>
              <View style={minimalistStyles.itemHeader}><Text style={minimalistStyles.itemRole}>{edu.institution}</Text><Text style={minimalistStyles.itemDate}>{edu.year}</Text></View>
              <Text style={minimalistStyles.itemCompany}>{edu.degree}</Text>
            </View>
          ))}
        </View>
      )}
      {skills.length > 0 && (
        <View style={minimalistStyles.section}>
          <Text style={minimalistStyles.sectionTitle}>Skills</Text>
          <Text style={minimalistStyles.skills}>{skills.join(' • ')}</Text>
        </View>
      )}
      {customSections?.map((section) => (
        <View key={section.id} style={minimalistStyles.section}>
          <Text style={minimalistStyles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item.id} style={minimalistStyles.item} wrap={false}>
              <View style={minimalistStyles.itemHeader}><Text style={minimalistStyles.itemRole}>{item.title}</Text>{item.date && <Text style={minimalistStyles.itemDate}>{item.date}</Text>}</View>
              {item.subtitle && <Text style={minimalistStyles.itemCompany}>{item.subtitle}</Text>}
              {item.description && <Text style={minimalistStyles.text}>{t(item.description, 300)}</Text>}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );
};

const CreativeDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={creativeStyles.page}>
      <View style={creativeStyles.main}>
        <Text style={creativeStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={creativeStyles.title}>{personal.title || 'Professional Title'}</Text>
        <View style={{ marginTop: 25 }}>
          {summary && (
            <View style={{ marginBottom: 25 }}>
              <Text style={creativeStyles.sectionTitle}>Summary</Text>
              <Text style={creativeStyles.text}>{t(summary, 600)}</Text>
            </View>
          )}
          {experience.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={creativeStyles.sectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={creativeStyles.item} wrap={false}>
                  <View style={creativeStyles.itemHeader}><Text style={creativeStyles.itemRole}>{exp.role}</Text><Text style={creativeStyles.itemDate}>{exp.startDate} - {exp.endDate}</Text></View>
                  <Text style={creativeStyles.itemCompany}>{exp.company}</Text>
                  <Text style={creativeStyles.text}>{t(exp.description, 350)}</Text>
                </View>
              ))}
            </View>
          )}
          {customSections?.map((section) => (
            <View key={section.id} style={{ marginBottom: 20 }}>
              <Text style={creativeStyles.sectionTitle}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item.id} style={creativeStyles.item} wrap={false}>
                  <View style={creativeStyles.itemHeader}><Text style={creativeStyles.itemRole}>{item.title}</Text>{item.date && <Text style={creativeStyles.itemDate}>{item.date}</Text>}</View>
                  {item.subtitle && <Text style={creativeStyles.itemCompany}>{item.subtitle}</Text>}
                  {item.description && <Text style={creativeStyles.text}>{t(item.description, 300)}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={creativeStyles.sidebar}>
        <View style={{ marginBottom: 25 }}>
          <Text style={creativeStyles.sideTitle}>Contact</Text>
          {personal.email && <Text style={creativeStyles.sideText}>{personal.email}</Text>}
          {personal.phone && <Text style={creativeStyles.sideText}>{personal.phone}</Text>}
          {personal.location && <Text style={creativeStyles.sideText}>{personal.location}</Text>}
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text style={creativeStyles.sideTitle}>Skills</Text>
          <View>
            {skills.map((skill) => (
              <View key={skill} style={creativeStyles.skillBadge}><Text>{skill}</Text></View>
            ))}
          </View>
        </View>
        {education.length > 0 && (
          <View>
            <Text style={creativeStyles.sideTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#f8fafc', marginBottom: 2 }}>{edu.institution}</Text>
                <Text style={{ fontSize: 8, color: '#94a3b8', fontStyle: 'italic', marginBottom: 2 }}>{edu.degree}</Text>
                <Text style={{ fontSize: 8, color: '#38bdf8' }}>{edu.year}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
};

const ElegantDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={elegantStyles.page}>
      <View style={elegantStyles.header}>
        <View style={{ flex: 1 }}>
          <Text style={elegantStyles.name}>{personal.name || 'YOUR NAME'}</Text>
          <Text style={elegantStyles.title}>{personal.title || 'Professional Title'}</Text>
          <View style={elegantStyles.contact}>
            {personal.email && <Text>{personal.email}</Text>}
            {personal.phone && <Text>{personal.phone}</Text>}
            {personal.location && <Text>{personal.location}</Text>}
          </View>
        </View>
      </View>
      <View style={elegantStyles.content}>
        <View style={elegantStyles.main}>
          {summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={elegantStyles.sectionTitle}>Summary</Text>
              <Text style={elegantStyles.text}>{t(summary, 600)}</Text>
            </View>
          )}
          {experience.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={elegantStyles.sectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={elegantStyles.item} wrap={false}>
                  <View style={elegantStyles.itemHeader}><Text style={elegantStyles.itemRole}>{exp.role}</Text><Text style={elegantStyles.itemDate}>{exp.startDate} - {exp.endDate}</Text></View>
                  <Text style={elegantStyles.itemCompany}>{exp.company}</Text>
                  <Text style={elegantStyles.text}>{t(exp.description, 350)}</Text>
                </View>
              ))}
            </View>
          )}
          {customSections?.map((section) => (
            <View key={section.id} style={{ marginBottom: 20 }}>
              <Text style={elegantStyles.sectionTitle}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item.id} style={elegantStyles.item} wrap={false}>
                  <View style={elegantStyles.itemHeader}><Text style={elegantStyles.itemRole}>{item.title}</Text>{item.date && <Text style={elegantStyles.itemDate}>{item.date}</Text>}</View>
                  {item.subtitle && <Text style={elegantStyles.itemCompany}>{item.subtitle}</Text>}
                  {item.description && <Text style={elegantStyles.text}>{t(item.description, 300)}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={elegantStyles.sidebar}>
          {skills.length > 0 && (
            <View style={{ marginBottom: 25 }}>
              <Text style={elegantStyles.sectionTitle}>Skills</Text>
              {skills.map((skill) => (<Text key={skill} style={{ fontSize: 10, marginBottom: 5, color: '#44403c' }}>• {skill}</Text>))}
            </View>
          )}
          {education.length > 0 && (
            <View>
              <Text style={elegantStyles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={elegantStyles.sideItem}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#292524', marginBottom: 2 }}>{edu.institution}</Text>
                  <Text style={{ fontSize: 9, fontStyle: 'italic', color: '#57534e', marginBottom: 2 }}>{edu.degree}</Text>
                  <Text style={{ fontSize: 8, color: '#78716c' }}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};

const ProfessionalDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={professionalStyles.page}>
      <View style={professionalStyles.header}>
        <View style={professionalStyles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={professionalStyles.name}>{personal.name || 'YOUR NAME'}</Text>
            <Text style={professionalStyles.title}>{personal.title || 'Professional Title'}</Text>
          </View>
        </View>
        <View style={professionalStyles.contact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>
      <View style={professionalStyles.content}>
        <View style={professionalStyles.main}>
          {summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={professionalStyles.sectionTitle}>Summary</Text>
              <Text style={professionalStyles.text}>{t(summary, 600)}</Text>
            </View>
          )}
          {experience.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={professionalStyles.sectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={professionalStyles.item} wrap={false}>
                  <View style={professionalStyles.itemHeader}><Text style={professionalStyles.itemRole}>{exp.role}</Text><Text style={professionalStyles.itemDate}>{exp.startDate} - {exp.endDate}</Text></View>
                  <Text style={professionalStyles.itemCompany}>{exp.company}</Text>
                  <Text style={professionalStyles.text}>{t(exp.description, 350)}</Text>
                </View>
              ))}
            </View>
          )}
          {customSections?.map((section) => (
            <View key={section.id} style={{ marginBottom: 20 }}>
              <Text style={professionalStyles.sectionTitle}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item.id} style={professionalStyles.item} wrap={false}>
                  <View style={professionalStyles.itemHeader}><Text style={professionalStyles.itemRole}>{item.title}</Text>{item.date && <Text style={professionalStyles.itemDate}>{item.date}</Text>}</View>
                  {item.subtitle && <Text style={professionalStyles.itemCompany}>{item.subtitle}</Text>}
                  {item.description && <Text style={professionalStyles.text}>{t(item.description, 300)}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={professionalStyles.sidebar}>
          {skills.length > 0 && (
            <View style={{ marginBottom: 25 }}>
              <Text style={professionalStyles.sectionTitle}>Skills</Text>
              <View>
                {skills.map((skill) => (
                  <Text key={skill} style={professionalStyles.skillBadge}>{skill}</Text>
                ))}
              </View>
            </View>
          )}
          {education.length > 0 && (
            <View>
              <Text style={professionalStyles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 15 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#111827', marginBottom: 2 }}>{edu.institution}</Text>
                  <Text style={{ fontSize: 9, color: '#4b5563', marginBottom: 2 }}>{edu.degree}</Text>
                  <Text style={{ fontSize: 8, color: '#9ca3af' }}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};

const academiaStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Times-Roman', color: '#111827' },
  header: { borderBottomWidth: 2, borderBottomColor: '#800000', paddingBottom: 20, marginBottom: 20, alignItems: 'center' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#800000', textTransform: 'uppercase' },
  title: { fontSize: 12, marginTop: 5, fontStyle: 'italic', color: '#374151' },
  contact: { flexDirection: 'row', gap: 15, marginTop: 10, fontSize: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#800000', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 5, marginBottom: 15, marginTop: 20, textTransform: 'uppercase' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  itemRole: { fontSize: 12, fontWeight: 'bold' },
  itemDate: { fontSize: 10, fontStyle: 'italic', color: '#4b5563' },
  itemCompany: { fontSize: 11, fontStyle: 'italic', marginBottom: 5 },
  text: { fontSize: 10, lineHeight: 1.5, color: '#374151', textAlign: 'justify' }
});

const AcademiaDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={academiaStyles.page}>
      <View style={academiaStyles.header}>
        <Text style={academiaStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={academiaStyles.title}>{personal.title || 'Professional Title'}</Text>
        <View style={academiaStyles.contact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>
      {summary && <View><Text style={academiaStyles.sectionTitle}>Abstract</Text><Text style={academiaStyles.text}>{t(summary, 600)}</Text></View>}
      {experience.length > 0 && <View><Text style={academiaStyles.sectionTitle}>Academic &amp; Professional Experience</Text>
        {experience.map(exp => <View key={exp.id} style={{ marginBottom: 15 }} wrap={false}><View style={academiaStyles.itemHeader}><Text style={academiaStyles.itemRole}>{exp.role}</Text><Text style={academiaStyles.itemDate}>{exp.startDate} - {exp.endDate}</Text></View><Text style={academiaStyles.itemCompany}>{exp.company}</Text><Text style={academiaStyles.text}>{t(exp.description, 350)}</Text></View>)}
      </View>}
      {education.length > 0 && <View><Text style={academiaStyles.sectionTitle}>Education</Text>
        {education.map(edu => <View key={edu.id} style={{ marginBottom: 10 }}><View style={academiaStyles.itemHeader}><Text style={academiaStyles.itemRole}>{edu.institution}</Text><Text style={academiaStyles.itemDate}>{edu.year}</Text></View><Text style={academiaStyles.itemCompany}>{edu.degree}</Text></View>)}
      </View>}
      {skills.length > 0 && <View><Text style={academiaStyles.sectionTitle}>Competencies</Text><Text style={academiaStyles.text}>{skills.join(' • ')}</Text></View>}
      {customSections?.map((section) => (
        <View key={section.id}>
          <Text style={academiaStyles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item.id} style={{ marginBottom: 15 }} wrap={false}>
              <View style={academiaStyles.itemHeader}><Text style={academiaStyles.itemRole}>{item.title}</Text>{item.date && <Text style={academiaStyles.itemDate}>{item.date}</Text>}</View>
              {item.subtitle && <Text style={academiaStyles.itemCompany}>{item.subtitle}</Text>}
              {item.description && <Text style={academiaStyles.text}>{t(item.description, 300)}</Text>}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );
};

const compactStyles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', color: '#1f2937', fontSize: 9, lineHeight: 1.3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: '#1f2937', paddingBottom: 10, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold' },
  contact: { textAlign: 'right', fontSize: 8 },
  sectionHeader: { backgroundColor: '#f3f4f6', padding: 4, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, marginTop: 12 },
  item: { marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  bold: { fontWeight: 'bold' }
});

const CompactDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={compactStyles.page}>
      <View style={compactStyles.header}>
        <View><Text style={compactStyles.name}>{personal.name || 'YOUR NAME'}</Text><Text style={{ fontSize: 10 }}>{personal.title || 'Professional Title'}</Text></View>
        <View style={compactStyles.contact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>
      {summary && <View><Text style={compactStyles.sectionHeader}>Summary</Text><Text>{t(summary, 600)}</Text></View>}
      {experience.length > 0 && <View><Text style={compactStyles.sectionHeader}>Experience</Text>
        {experience.map(exp => <View key={exp.id} style={compactStyles.item} wrap={false}><View style={compactStyles.row}><Text style={compactStyles.bold}>{exp.role} | {exp.company}</Text><Text>{exp.startDate} - {exp.endDate}</Text></View><Text>{t(exp.description, 350)}</Text></View>)}
      </View>}
      {education.length > 0 && <View><Text style={compactStyles.sectionHeader}>Education</Text>
        {education.map(edu => <View key={edu.id} style={compactStyles.item}><View style={compactStyles.row}><Text style={compactStyles.bold}>{edu.institution}</Text><Text>{edu.year}</Text></View><Text>{edu.degree}</Text></View>)}
      </View>}
      {skills.length > 0 && <View><Text style={compactStyles.sectionHeader}>Skills</Text><Text>{skills.join(', ')}</Text></View>}
      {customSections?.map((section) => (
        <View key={section.id}>
          <Text style={compactStyles.sectionHeader}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item.id} style={compactStyles.item} wrap={false}>
              <View style={compactStyles.row}><Text style={compactStyles.bold}>{item.title} {item.subtitle ? `| ${item.subtitle}` : ''}</Text>{item.date && <Text>{item.date}</Text>}</View>
              {item.description && <Text>{t(item.description, 300)}</Text>}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );
};

const editorialStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff', fontFamily: 'Times-Roman', color: '#111827' },
  left: { width: '35%', padding: 40, borderRightWidth: 1, borderRightColor: '#e5e7eb' },
  right: { width: '65%', padding: 40 },
  name: { fontSize: 32, fontWeight: 'bold', lineHeight: 1.1, marginBottom: 10 },
  title: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 30 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15, marginTop: 20 },
  text: { fontSize: 9, lineHeight: 1.6, color: '#4b5563', marginBottom: 10 }
});

const EditorialDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={editorialStyles.page}>
      <View style={editorialStyles.left}>
        <Text style={editorialStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={editorialStyles.title}>{personal.title || 'Professional Title'}</Text>
        <Text style={editorialStyles.sectionTitle}>Contact</Text>
        {personal.email && <Text style={editorialStyles.text}>{personal.email}</Text>}
        {personal.phone && <Text style={editorialStyles.text}>{personal.phone}</Text>}
        {personal.location && <Text style={editorialStyles.text}>{personal.location}</Text>}
        <Text style={editorialStyles.sectionTitle}>Education</Text>
        {education.map(edu => <View key={edu.id} style={{ marginBottom: 15 }}><Text style={{ fontSize: 9, fontWeight: 'bold' }}>{edu.institution}</Text><Text style={editorialStyles.text}>{edu.degree} ({edu.year})</Text></View>)}
        <Text style={editorialStyles.sectionTitle}>Skills</Text>
        {skills.map(skill => <Text key={skill} style={editorialStyles.text}>{skill}</Text>)}
      </View>
      <View style={editorialStyles.right}>
        {summary && <View><Text style={editorialStyles.sectionTitle}>Biography</Text><Text style={editorialStyles.text}>{t(summary, 600)}</Text></View>}
        {experience.length > 0 && <View><Text style={editorialStyles.sectionTitle}>Experience</Text>
          {experience.map(exp => <View key={exp.id} style={{ marginBottom: 20 }} wrap={false}><Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 2 }}>{exp.role}</Text><Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 5 }}>{exp.company} | {exp.startDate} - {exp.endDate}</Text><Text style={editorialStyles.text}>{t(exp.description, 350)}</Text></View>)}
        </View>}
        {customSections?.map((section) => (
          <View key={section.id}>
            <Text style={editorialStyles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={{ marginBottom: 20 }} wrap={false}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 2 }}>{item.title}</Text>
                {item.subtitle || item.date ? <Text style={{ fontSize: 9, color: '#6b7280', marginBottom: 5 }}>{[item.subtitle, item.date].filter(Boolean).join(' | ')}</Text> : null}
                {item.description && <Text style={editorialStyles.text}>{t(item.description, 300)}</Text>}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  );
};

const nordicStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Helvetica', color: '#334155', backgroundColor: '#f8fafc' },
  header: { marginBottom: 40 },
  name: { fontSize: 26, fontWeight: 'bold', color: '#0f172a', marginBottom: 5 },
  title: { fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15 },
  contact: { flexDirection: 'row', gap: 15, fontSize: 9, color: '#94a3b8' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#0f172a', marginBottom: 15, marginTop: 25 },
  itemContainer: { borderLeftWidth: 2, borderLeftColor: '#e2e8f0', paddingLeft: 15, marginBottom: 20 },
  expRole: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  expMeta: { fontSize: 9, color: '#64748b', marginTop: 3, marginBottom: 5 },
  text: { fontSize: 10, color: '#475569', lineHeight: 1.5 }
});

const NordicDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={nordicStyles.page}>
      <View style={nordicStyles.header}>
        <Text style={nordicStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={nordicStyles.title}>{personal.title || 'Professional Title'}</Text>
        <View style={nordicStyles.contact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>
      {summary && <View><Text style={nordicStyles.sectionTitle}>Profile</Text><Text style={nordicStyles.text}>{t(summary, 600)}</Text></View>}
      {experience.length > 0 && <View><Text style={nordicStyles.sectionTitle}>Experience</Text>
        {experience.map(exp => <View key={exp.id} style={nordicStyles.itemContainer} wrap={false}><Text style={nordicStyles.expRole}>{exp.role}</Text><Text style={nordicStyles.expMeta}>{exp.company} • {exp.startDate} - {exp.endDate}</Text><Text style={nordicStyles.text}>{t(exp.description, 350)}</Text></View>)}
      </View>}
      {education.length > 0 && <View><Text style={nordicStyles.sectionTitle}>Education</Text>
        {education.map(edu => <View key={edu.id} style={nordicStyles.itemContainer}><Text style={nordicStyles.expRole}>{edu.institution}</Text><Text style={nordicStyles.expMeta}>{edu.degree} • {edu.year}</Text></View>)}
      </View>}
      {skills.length > 0 && <View><Text style={nordicStyles.sectionTitle}>Skills</Text><Text style={nordicStyles.text}>{skills.join(' • ')}</Text></View>}
      {customSections?.map((section) => (
        <View key={section.id}>
          <Text style={nordicStyles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item.id} style={nordicStyles.itemContainer} wrap={false}>
              <Text style={nordicStyles.expRole}>{item.title}</Text>
              {(item.subtitle || item.date) && <Text style={nordicStyles.expMeta}>{[item.subtitle, item.date].filter(Boolean).join(' • ')}</Text>}
              {item.description && <Text style={nordicStyles.text}>{t(item.description, 300)}</Text>}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );
};

const timelineStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  main: { flex: 1, padding: 40, borderRightWidth: 1, borderRightColor: '#f3f4f6' },
  sidebar: { width: '30%', backgroundColor: '#f9fafb', padding: 30 },
  headerBg: { backgroundColor: '#5b21b6', padding: 40, color: '#ffffff' },
  name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase' },
  title: { fontSize: 10, color: '#ddd6fe', textTransform: 'uppercase', letterSpacing: 2, marginTop: 5 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: '#6d28d9', borderBottomWidth: 1, borderBottomColor: '#ede9fe', paddingBottom: 5, marginBottom: 15, letterSpacing: 1 },
  timelineItem: { paddingLeft: 15, borderLeftWidth: 1, borderLeftColor: '#c4b5fd', marginBottom: 20 },
  role: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
  date: { fontSize: 8, color: '#8b5cf6', fontWeight: 'bold' },
  company: { fontSize: 9, color: '#6d28d9', marginTop: 2, marginBottom: 5, textTransform: 'uppercase' },
  text: { fontSize: 9, color: '#4b5563', lineHeight: 1.5 },
  skillItem: { fontSize: 9, marginBottom: 4, color: '#4b5563' }
});

const TimelineDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={{ fontFamily: 'Helvetica' }}>
      <View style={timelineStyles.headerBg}>
        <Text style={timelineStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={timelineStyles.title}>{personal.title || 'Professional Title'}</Text>
        <View style={{ flexDirection: 'row', gap: 15, marginTop: 10, fontSize: 9, color: '#c4b5fd' }}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={timelineStyles.main}>
          {summary && <View style={{ marginBottom: 20 }}><Text style={timelineStyles.sectionTitle}>Profile</Text><Text style={timelineStyles.text}>{t(summary, 600)}</Text></View>}
          {experience.length > 0 && <View><Text style={timelineStyles.sectionTitle}>Career Timeline</Text>
            {experience.map(exp => <View key={exp.id} style={timelineStyles.timelineItem} wrap={false}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={timelineStyles.role}>{exp.role}</Text><Text style={timelineStyles.date}>{exp.startDate} - {exp.endDate}</Text></View><Text style={timelineStyles.company}>{exp.company}</Text><Text style={timelineStyles.text}>{t(exp.description, 350)}</Text></View>)}
          </View>}
          {customSections?.map((section) => (
            <View key={section.id}>
              <Text style={timelineStyles.sectionTitle}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item.id} style={timelineStyles.timelineItem} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={timelineStyles.role}>{item.title}</Text>{item.date && <Text style={timelineStyles.date}>{item.date}</Text>}</View>
                  {item.subtitle && <Text style={timelineStyles.company}>{item.subtitle}</Text>}
                  {item.description && <Text style={timelineStyles.text}>{t(item.description, 300)}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={timelineStyles.sidebar}>
          {skills.length > 0 && <View style={{ marginBottom: 20 }}><Text style={timelineStyles.sectionTitle}>Skills</Text>{skills.map(s => <Text key={s} style={timelineStyles.skillItem}>{s}</Text>)}</View>}
          {education.length > 0 && <View><Text style={timelineStyles.sectionTitle}>Education</Text>{education.map(edu => <View key={edu.id} style={{ marginBottom: 10 }}><Text style={{ fontSize: 10, fontWeight: 'bold', color: '#111827' }}>{edu.institution}</Text><Text style={{ fontSize: 8, color: '#6b7280' }}>{edu.degree}</Text><Text style={{ fontSize: 8, color: '#8b5cf6' }}>{edu.year}</Text></View>)}</View>}
        </View>
      </View>
    </Page>
  );
};

// --- PDF Document Switcher ---

const ResumeDocument: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { template } = resume;
  switch (template) {
    case 'modern': return <Document><ModernDocument resume={resume} /></Document>;
    case 'classic': return <Document><ClassicDocument resume={resume} /></Document>;
    case 'ats': return <Document><ATSDocument resume={resume} /></Document>;
    case 'executive': return <Document><ExecutiveDocument resume={resume} /></Document>;
    case 'minimalist': return <Document><MinimalistDocument resume={resume} /></Document>;
    case 'creative': return <Document><CreativeDocument resume={resume} /></Document>;
    case 'elegant': return <Document><ElegantDocument resume={resume} /></Document>;
    case 'professional': return <Document><ProfessionalDocument resume={resume} /></Document>;
    case 'academia': return <Document><AcademiaDocument resume={resume} /></Document>;
    case 'compact': return <Document><CompactDocument resume={resume} /></Document>;
    case 'editorial': return <Document><EditorialDocument resume={resume} /></Document>;
    case 'nordic': return <Document><NordicDocument resume={resume} /></Document>;
    case 'timeline': return <Document><TimelineDocument resume={resume} /></Document>;
    default: return <Document><ModernDocument resume={resume} /></Document>;
  }
};

export const DownloadPDF: React.FC = () => {
  const { resume } = useResumeStore();
  const downloadKey = useMemo(() => JSON.stringify({
    template: resume.template,
    personal: resume.sections.personal,
    summary: resume.sections.summary,
    exp: resume.sections.experience.length,
    edu: resume.sections.education.length,
    skills: resume.sections.skills.length,
    customCount: resume.sections.customSections.length,
  }), [resume]);

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
