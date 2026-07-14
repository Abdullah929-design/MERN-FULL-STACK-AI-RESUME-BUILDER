import React, { useMemo, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, usePDF, Image } from '@react-pdf/renderer';
import type { Resume } from '../types/resume';
import { Loader2, FileText } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { saveAs } from 'file-saver';

// --- Stylesheets ---

const modernStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff', fontFamily: 'Helvetica', paddingTop: 0, paddingBottom: 0 },
  sidebar: { width: '30%', backgroundColor: '#1e3a5f', color: '#ffffff', padding: 20, minHeight: '100%' },
  main: { width: '70%', padding: 30, color: '#1e293b' },
  photo: { width: 80, height: 80, borderRadius: 40, marginBottom: 10, alignSelf: 'center', borderWidth: 2, borderStyle: 'solid', borderColor: '#ffffff' },
  name: { fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4, letterSpacing: 0.5, textAlign: 'center' },
  title: { fontSize: 8, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15, fontWeight: 'bold', textAlign: 'center' },
  sidebarSection: { marginBottom: 15 },
  sidebarTitle: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#ffffff', paddingBottom: 3, marginBottom: 6, color: '#93c5fd' },
  sidebarTextItem: { marginBottom: 4 },
  sidebarLabel: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 1 },
  sidebarText: { fontSize: 8.5, color: '#dbeafe', lineHeight: 1.3 },
  skillBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  skillDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#93c5fd', marginRight: 5 },
  skillText: { fontSize: 8.5, color: '#e0eaff' },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: '#1e3a5f', borderBottomWidth: 1.5, borderBottomColor: '#dbeafe', paddingBottom: 3, marginBottom: 10 },
  expItem: { marginBottom: 12, borderLeftWidth: 1.5, borderLeftColor: '#dbeafe', paddingLeft: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  expRole: { fontSize: 10, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase' },
  expDate: { fontSize: 8, fontWeight: 'bold', color: '#2563eb', fontStyle: 'italic' },
  expCompany: { fontSize: 9, fontWeight: 'bold', color: '#334155', marginBottom: 2 },
  description: { fontSize: 9, color: '#475569', lineHeight: 1.4 },
  eduItem: { marginBottom: 10, borderLeftWidth: 1.5, borderLeftColor: '#dcfce7', paddingLeft: 10 },
  eduInst: { fontSize: 9.5, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase' },
  eduHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 },
  eduYear: { fontSize: 8, color: '#16a34a', fontWeight: 'bold' },
  eduDegree: { fontSize: 9, color: '#475569', fontStyle: 'italic' },
  customItem: { marginBottom: 10, borderLeftWidth: 1.5, borderLeftColor: '#f1f5f9', paddingLeft: 10 },
});

const classicStyles = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 40, fontFamily: 'Times-Roman', color: '#111827', backgroundColor: '#ffffff' },
  header: { alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#111827', paddingBottom: 15, marginBottom: 20, paddingTop: 24 },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.1 },
  title: { fontSize: 12, fontWeight: 'bold', color: '#374151', marginTop: 3 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', fontSize: 9, fontStyle: 'italic', color: '#4b5563', marginTop: 4 },
  contactItem: { marginRight: 15 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#d1d5db', paddingBottom: 2, marginBottom: 4, marginTop: 4 },
  sectionDot: { width: 5, height: 5, backgroundColor: '#111827', borderRadius: 2.5, marginRight: 6 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  section: { marginBottom: 6 },
  summaryText: { fontSize: 9.5, lineHeight: 1.5, color: '#374151' },
  expItem: { marginBottom: 12 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  expRole: { fontSize: 11.5, fontWeight: 'bold', fontStyle: 'italic', color: '#111827' },
  expDate: { fontSize: 9, color: '#6b7280' },
  expCompany: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', color: '#1f2937', marginBottom: 2 },
  expDesc: { fontSize: 9.5, lineHeight: 1.45, color: '#374151', paddingLeft: 8, borderLeftWidth: 1.5, borderLeftColor: '#f3f4f6' },
  eduItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  eduInst: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
  eduDegree: { fontSize: 9, fontStyle: 'italic', color: '#374151', marginTop: 1 },
  eduYear: { fontSize: 9, fontStyle: 'italic', color: '#4b5563' },
  skillsText: { fontSize: 9.5, color: '#374151', lineHeight: 1.5 },
  skillsBold: { fontWeight: 'bold' },
  customItem: { marginBottom: 10 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  customTitle: { fontSize: 10, fontWeight: 'bold', fontStyle: 'italic', color: '#111827' },
  customDate: { fontSize: 9, fontStyle: 'italic', color: '#6b7280' },
  customSubtitle: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', color: '#1f2937', marginBottom: 2 },
  customDesc: { fontSize: 9.5, lineHeight: 1.45, color: '#374151', paddingLeft: 8, borderLeftWidth: 1.5, borderLeftColor: '#f3f4f6' },
});

const atsStyles = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 44, fontFamily: 'Helvetica', color: '#000000', backgroundColor: '#ffffff' },
  header: { borderBottomWidth: 1.5, borderBottomColor: '#000000', paddingBottom: 6, marginBottom: 10, paddingTop: 30 },
  name: { fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: -0.2, lineHeight: 1.1, marginBottom: 3 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', fontSize: 9, fontWeight: 'bold', marginTop: 3 },
  contactItem: { marginRight: 14 },
  contactTitle: { textTransform: 'uppercase', letterSpacing: 0.3 },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5, marginTop: 10 },
  sectionTitle: { fontSize: 7.5, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, color: '#000000', marginRight: 5 },
  sectionLine: { flex: 1, height: 1.2, backgroundColor: '#000000', marginBottom: 2 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  role: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.3 },
  date: { fontSize: 9, fontWeight: 'bold', flexShrink: 0, marginLeft: 8 },
  company: { fontSize: 9.5, fontWeight: 'bold', fontStyle: 'italic', color: '#333333', borderBottomWidth: 0.5, borderBottomColor: '#dddddd', paddingBottom: 2, marginBottom: 2 },
  description: { fontSize: 9.5, lineHeight: 1.35, color: '#1a1a1a' },
  expItem: { marginBottom: 8 },
  eduRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  eduInst: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.3 },
  eduDegree: { fontSize: 9, fontStyle: 'italic', color: '#444444', marginTop: 1 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  skillItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 4 },
  skillBullet: { width: 3, height: 3, backgroundColor: '#000000', borderRadius: 1.5, marginRight: 3, flexShrink: 0 },
  skillText: { fontSize: 9.5, fontWeight: 'bold' },
  summaryText: { fontSize: 9.5, lineHeight: 1.4, color: '#111111' },
});
const executiveStyles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', fontFamily: 'Helvetica', paddingBottom: 0, paddingTop: 0 },
  header: { backgroundColor: '#0f172a', color: '#ffffff', padding: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  photo: { width: 70, height: 70, borderRadius: 8, borderWidth: 1.5, borderStyle: 'solid', borderColor: '#1e293b' },
  name: { fontSize: 22, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 2, borderBottomColor: '#6366f1', paddingBottom: 3, marginBottom: 4 },
  title: { fontSize: 9, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: 1.2 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 6, fontSize: 8, color: '#94a3b8', fontWeight: 'bold' },
  content: { flexDirection: 'row', flex: 1 },
  main: { width: '65%', padding: 25, borderRightWidth: 1, borderRightColor: '#f1f5f9' },
  sidebar: { width: '35%', backgroundColor: '#f8fafc', padding: 20 },
  sectionTitle: { fontSize: 8.5, fontWeight: 'bold', textTransform: 'uppercase', color: '#6366f1', marginBottom: 10, letterSpacing: 1.5 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, alignItems: 'baseline' },
  itemRole: { paddingRight: 10, fontSize: 10.5, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.3 },
  itemDate: { fontSize: 7.5, color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.3, flexShrink: 0 },
  itemCompany: { fontSize: 8.5, color: '#6366f1', fontWeight: 'bold', fontStyle: 'italic', marginBottom: 2 },
  text: { fontSize: 9, color: '#475569', lineHeight: 1.35 },
  descLine: { paddingLeft: 8, borderLeftWidth: 1.5, borderLeftColor: '#f1f5f9', marginTop: 2 },
  skillItem: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  skillDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#6366f1' },
});

const minimalistStyles = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 0, paddingHorizontal: 40, backgroundColor: '#ffffff', fontFamily: 'Helvetica', color: '#334155' },
  header: { borderBottomWidth: 1.5, borderBottomColor: '#f1f5f9', borderStyle: 'solid', paddingBottom: 20, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  photo: { width: 60, height: 60, borderRadius: 30, opacity: 0.8 },
  name: { fontSize: 24, fontWeight: 'normal', color: '#0f172a', fontStyle: 'italic' },
  title: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#64748b', marginTop: 3 },
  contact: { flexDirection: 'row', gap: 12, marginTop: 8, fontSize: 8.5, color: '#94a3b8' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 8.5, fontWeight: 'bold', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, letterSpacing: 1.5 },
  item: { borderLeftWidth: 1, borderLeftColor: '#f1f5f9', borderStyle: 'solid', paddingLeft: 10, marginBottom: 10 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  itemRole: { flex: 1, paddingRight: 10, fontSize: 9.5, fontWeight: 'bold', fontStyle: 'italic', color: '#0f172a' },
  itemDate: { fontSize: 7.5, color: '#cbd5e1', flexShrink: 0 },
  itemCompany: { fontSize: 8, color: '#94a3b8', marginBottom: 1 },
  text: { fontSize: 8.5, color: '#64748b', lineHeight: 1.3 },
  skills: { fontSize: 8.5, color: '#64748b', fontStyle: 'italic', lineHeight: 1.5 },
});

const creativeStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#f8fafc', fontFamily: 'Helvetica', paddingTop: 0, paddingBottom: 0 },
  main: { flex: 1, backgroundColor: '#ffffff', paddingTop: 28, paddingBottom: 25, paddingLeft: 30, paddingRight: 28 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#0d9488', lineHeight: 0.95, letterSpacing: -0.5, textTransform: 'uppercase', marginBottom: 3 },
  headerTitle: { fontSize: 8, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, lineHeight: 1 },
  sectionLabel: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#0d9488', marginBottom: 6 },
  mainSection: { marginBottom: 12 },
  summaryBorder: { borderLeftWidth: 3, borderLeftColor: '#f0fdfa', paddingLeft: 10, marginBottom: 12 },
  summaryLabel: { fontSize: 6.5, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#0d9488', marginBottom: 3 },
  summaryText: { fontSize: 9.5, lineHeight: 1.45, color: '#475569', fontStyle: 'italic' },
  expItem: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  expRole: { fontSize: 11, fontWeight: 'bold', color: '#0f172a', letterSpacing: -0.3, lineHeight: 1 },
  expDateBadge: { fontSize: 6.5, fontWeight: 'bold', color: '#f0fdfa', backgroundColor: '#0d9488', paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 5, paddingRight: 5, borderRadius: 6, flexShrink: 0, marginLeft: 6 },
  expCompany: { fontSize: 7.5, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 1 },
  expDesc: { fontSize: 9, color: '#64748b', lineHeight: 1.4 },
  customItem: { marginBottom: 8 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  customTitle: { fontSize: 10, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase', letterSpacing: -0.3, lineHeight: 1 },
  customDateBadge: { fontSize: 6.5, fontWeight: 'bold', color: '#f0fdfa', backgroundColor: '#0d9488', paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 5, paddingRight: 5, borderRadius: 6, flexShrink: 0, marginLeft: 6 },
  customSubtitle: { fontSize: 7, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 1 },
  customDesc: { fontSize: 9, color: '#64748b', lineHeight: 1.4 },
  sidebar: { width: 150, backgroundColor: '#0f172a', minHeight: '100%', paddingTop: 28, paddingBottom: 25, paddingLeft: 16, paddingRight: 16 },
  sideSection: { marginBottom: 14 },
  sideSectionLabel: { fontSize: 6.5, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#2dd4bf', borderBottomWidth: 1, borderBottomColor: '#1e293b', paddingBottom: 3, marginBottom: 6 },
  photo: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderStyle: 'solid', borderColor: '#1e293b', alignSelf: 'center', marginBottom: 15 },
  contactFieldLabel: { fontSize: 6, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.2, color: '#0d9488', marginBottom: 1 },
  contactFieldValue: { fontSize: 8, color: '#cbd5e1', marginBottom: 4 },
  eduInst: { fontSize: 8.5, fontWeight: 'bold', color: '#f1f5f9', textTransform: 'uppercase', letterSpacing: -0.3, lineHeight: 1.2, marginBottom: 1 },
  eduDegree: { fontSize: 7.5, fontWeight: 'bold', color: '#2dd4bf', fontStyle: 'italic', marginBottom: 1 },
  eduYear: { fontSize: 6.5, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8 },
  eduItem: { marginBottom: 6 },
  skillBadge: { fontSize: 8, color: '#cbd5e1', marginBottom: 3, lineHeight: 1.3 },
});

const elegantStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#fbfbf9', fontFamily: 'Times-Roman', color: '#2c312e', paddingBottom: 0, paddingTop: 0 },
  topLine: { height: 4, backgroundColor: '#6b8e23', width: '100%', flexShrink: 0 },
  header: { 
    paddingHorizontal: 36, paddingTop: 15, paddingBottom: 12, 
    borderBottomWidth: 1.5, borderBottomColor: '#e5eadb', 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
  },
  headerLeft: { flex: 1, paddingRight: 12 },
  name: { fontSize: 22, fontFamily: 'Times-Roman', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: -0.3, lineHeight: 0.9, marginBottom: 4 },
  title: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#6b8e23', marginBottom: 4 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, fontSize: 8, fontWeight: 'bold', color: '#8a918e', fontStyle: 'italic' },
  photo: { width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#d2ddbf' },
  body: { flexDirection: 'row', width: '100%', position: 'relative' },
  mainCol: { width: '68%', paddingLeft: 36, paddingRight: 24, paddingTop: 12, paddingBottom: 8 },
  sideCol: { width: '32%', paddingLeft: 15, paddingRight: 20, paddingTop: 12, paddingBottom: 8 },
  divider: { width: 1, backgroundColor: '#eaf0df', marginTop: 12, marginBottom: 8 },
  sectionLabelText: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2.5, color: '#6b8e23', marginBottom: 3 },
  sectionLabelLine: { borderBottomWidth: 1, borderBottomColor: '#d2ddbf', marginBottom: 8 },
  summaryText: { fontSize: 9.5, lineHeight: 1.45, color: '#4a514d', textAlign: 'justify', marginBottom: 14 },
  eduSection: { marginBottom: 14 },
  eduItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', borderBottomWidth: 1, borderBottomColor: '#eaf0df', paddingBottom: 4, marginBottom: 6 },
  eduInst: { fontSize: 9.5, fontWeight: 'bold', fontStyle: 'italic', color: '#1a1d1b', marginBottom: 1 },
  eduDegree: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', color: '#8a918e', fontStyle: 'italic' },
  eduYear: { fontSize: 6.5, fontWeight: 'bold', color: '#819f42', letterSpacing: 0.8, flexShrink: 0 },
  expSection: { marginBottom: 14 },
  expItem: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  expRole: { flex: 1, paddingRight: 10, fontSize: 10, fontWeight: 'bold', fontStyle: 'italic', color: '#1a1d1b', flexShrink: 1 },
  expDate: { fontSize: 6.5, fontWeight: 'bold', color: '#8a8880', textTransform: 'uppercase', letterSpacing: 0.8, flexShrink: 0 },
  expCompany: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', color: '#628020', fontStyle: 'italic', letterSpacing: 1, marginBottom: 1 },
  expDesc: { fontSize: 8.5, color: '#4a514d', lineHeight: 1.3, paddingLeft: 8, borderLeftWidth: 1.5, borderLeftColor: '#e5eadb' },
  customSection: { marginBottom: 14 },
  customItem: { marginBottom: 8 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  customTitle: { fontSize: 10.5, fontWeight: 'bold', fontStyle: 'italic', color: '#1a1d1b', flexShrink: 1, paddingRight: 8 },
  customDate: { fontSize: 6.5, fontWeight: 'bold', color: '#8a918e', textTransform: 'uppercase', letterSpacing: 0.8, flexShrink: 0 },
  customSubtitle: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', color: '#8a918e', fontStyle: 'italic', marginBottom: 1 },
  customDesc: { fontSize: 9, color: '#505553', lineHeight: 1.45, fontStyle: 'italic', marginTop: 1 },
  skillSection: { marginBottom: 14 },
  skillItemWrap: { borderBottomWidth: 1, borderBottomColor: '#eaf0df', paddingBottom: 3, marginBottom: 4 },
  skillItem: { fontSize: 9, color: '#4a514d', letterSpacing: 0.3 },
});

const professionalStyles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', fontFamily: 'Helvetica', color: '#111827', paddingTop: 0, paddingBottom: 0 },
  header: { 
    backgroundColor: '#111827', color: '#ffffff', 
    paddingTop: 20, paddingBottom: 16, paddingHorizontal: 36, 
    flexDirection: 'row', gap: 20, alignItems: 'center', 
    borderBottomWidth: 3, borderBottomColor: '#f59e0b' 
  },
  photoContainer: { padding: 3, backgroundColor: '#1f2937', flexShrink: 0 },
  photo: { width: 75, height: 75, borderWidth: 1.5, borderColor: 'rgba(245,158,11,0.3)' },
  name: { fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: -0.3, lineHeight: 1 },
  headerTitle: { fontSize: 8, color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.2 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 4 },
  contactItem: { flexDirection: 'column', gap: 0 },
  contactLabel: { fontSize: 6, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.8, color: '#f59e0b', opacity: 0.6 },
  contactValue: { fontSize: 8.5, color: '#9ca3af' },
  content: { flexDirection: 'row', flex: 1 },
  main: { flex: 1, paddingVertical: 15, paddingLeft: 30, paddingRight: 20, borderRightWidth: 1, borderRightColor: '#f3f4f6' },
  sidebar: { width: 160, backgroundColor: '#f9fafb', paddingVertical: 15, paddingLeft: 14, paddingRight: 16, minHeight: '100%' },
  sectionTitle: { fontSize: 7.5, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#f3f4f6', paddingBottom: 3, marginBottom: 6, letterSpacing: 1.2 },
  summaryText: { fontSize: 9.5, lineHeight: 1.5, color: '#4b5563', fontWeight: 'bold' },
  item: { marginBottom: 10 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  itemTitle: { paddingRight: 10, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', fontStyle: 'italic', letterSpacing: 0.1 },
  itemSubtitle: { fontSize: 8, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', fontStyle: 'italic' },
  itemDateBadge: { fontSize: 7, fontWeight: 'bold', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 0.8, backgroundColor: '#fffbeb', paddingHorizontal: 5, paddingVertical: 1, flexShrink: 0 },
  expRole: { paddingRight: 10, fontSize: 10.5, fontWeight: 'bold', textTransform: 'uppercase', fontStyle: 'italic', letterSpacing: -0.1 },
  expDate: { fontSize: 7.5, fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.3, flexShrink: 0 },
  expCompany: { fontSize: 8, color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  text: { fontSize: 8.5, color: '#4b5563', lineHeight: 1.35, fontStyle: 'italic', borderLeftWidth: 1.5, borderLeftColor: '#f9fafb', paddingLeft: 10, marginTop: 1 },
  sidebarLabel: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, color: '#f59e0b', opacity: 0.7, paddingBottom: 3, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', marginBottom: 6 },
  skillBadge: { borderBottomWidth: 0.5, borderBottomColor: '#f3f4f6', paddingVertical: 3, fontSize: 9, fontWeight: 'bold', fontStyle: 'italic', color: '#374151', marginBottom: 1 },
});

// --- Template Components ---

const t = (s?: string, max = 400): string =>
  !s ? '' : s.length > max ? s.slice(0, max).trimEnd() + '\u2026' : s;

const ConditionalMargin = ({ height = 18 }: { height?: number }) => (
  <View
    fixed
    render={({ pageNumber }) => (
      pageNumber > 1 ? <View style={{ height, width: '100%' }} /> : null
    )}
  />
);

const ModernDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={modernStyles.page}>
      <View style={modernStyles.sidebar}>
        <ConditionalMargin />
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
        <ConditionalMargin />
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

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={classicStyles.sectionHeader}>
      <View style={classicStyles.sectionDot} />
      <Text style={classicStyles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <Page size="A4" style={classicStyles.page}>
      <ConditionalMargin />

      {/* Header */}
      <View style={classicStyles.header}>
        <Text style={classicStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        {personal.title && <Text style={classicStyles.title}>{personal.title}</Text>}
        <View style={classicStyles.contact}>
          {personal.location && <Text style={classicStyles.contactItem}>{personal.location}</Text>}
          {personal.email && <Text style={classicStyles.contactItem}>{personal.email}</Text>}
          {personal.phone && <Text style={classicStyles.contactItem}>{personal.phone}</Text>}
        </View>
      </View>

      {/* Summary */}
      {summary && (
        <View style={classicStyles.section}>
          <SectionHeader title="Professional Summary" />
          <Text style={classicStyles.summaryText}>{summary}</Text>
        </View>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <View style={classicStyles.section}>
          <SectionHeader title="Professional Experience" />
          {experience.map((exp) => (
            <View key={exp.id} style={classicStyles.expItem} wrap={false}>
              <View style={classicStyles.expHeader}>
                <Text style={classicStyles.expRole}>{exp.role || 'Role Name'}</Text>
                <Text style={classicStyles.expDate}>{exp.startDate} – {exp.endDate}</Text>
              </View>
              <Text style={classicStyles.expCompany}>{exp.company || 'Company Name'}</Text>
              {exp.description && <Text style={classicStyles.expDesc}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View style={classicStyles.section}>
          <SectionHeader title="Education" />
          {education.map((edu) => (
            <View key={edu.id} style={classicStyles.eduItem} wrap={false}>
              <View>
                <Text style={classicStyles.eduInst}>{edu.institution || 'Institution'}</Text>
                <Text style={classicStyles.eduDegree}>{edu.degree || 'Degree'}</Text>
              </View>
              <Text style={classicStyles.eduYear}>{edu.year}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <View style={classicStyles.section}>
          <SectionHeader title="Technical Skills" />
          <Text style={classicStyles.skillsText}>
            <Text style={classicStyles.skillsBold}>Expertise in: </Text>
            {skills.join(' • ')}
          </Text>
        </View>
      )}

      {/* Custom Sections */}
      {customSections?.map((section) => (
        <View key={section.id} style={classicStyles.section}>
          <SectionHeader title={section.title} />
          {section.items.map((item) => (
            <View key={item.id} style={classicStyles.customItem} wrap={false}>
              <View style={classicStyles.customHeader}>
                <Text style={classicStyles.customTitle}>{item.title || 'Title'}</Text>
                {item.date && <Text style={classicStyles.customDate}>{item.date}</Text>}
              </View>
              {item.subtitle && <Text style={classicStyles.customSubtitle}>{item.subtitle}</Text>}
              {item.description && <Text style={classicStyles.customDesc}>{item.description}</Text>}
            </View>
          ))}
        </View>
      ))}

    </Page>
  );
};
const ATSDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  const ATSLabel = ({ text }: { text: string }) => (
    <View style={atsStyles.sectionHeader}>
      <Text style={atsStyles.sectionTitle}>{text}</Text>
      <View style={atsStyles.sectionLine} />
    </View>
  );

  return (
    <Page size="A4" style={atsStyles.page}>
      <ConditionalMargin />

      {/* Header */}
      <View style={atsStyles.header}>
        <Text style={atsStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <View style={atsStyles.contact}>
          {personal.title && <Text style={[atsStyles.contactItem, atsStyles.contactTitle]}>{personal.title}</Text>}
          {personal.email && <Text style={atsStyles.contactItem}>{personal.email}</Text>}
          {personal.phone && <Text style={atsStyles.contactItem}>{personal.phone}</Text>}
          {personal.location && <Text style={atsStyles.contactItem}>{personal.location}</Text>}
        </View>
      </View>

      {/* Summary */}
      {summary && (
        <View>
          <ATSLabel text="Professional Summary" />
          <Text style={atsStyles.summaryText}>{summary}</Text>
        </View>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <View>
          <ATSLabel text="Core Experience" />
          {experience.map((exp) => (
            <View key={exp.id} style={atsStyles.expItem} wrap={false}>
              <View style={atsStyles.itemHeader}>
                <Text style={atsStyles.role}>{exp.role || 'Role Name'}</Text>
                <Text style={atsStyles.date}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <Text style={atsStyles.company}>{exp.company || 'Company Name'}</Text>
              {exp.description && <Text style={atsStyles.description}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View>
          <ATSLabel text="Education & Certifications" />
          {education.map((edu) => (
            <View key={edu.id} style={atsStyles.eduRow} wrap={false}>
              <View>
                <Text style={atsStyles.eduInst}>{edu.institution || 'Institution'}</Text>
                <Text style={atsStyles.eduDegree}>{edu.degree || 'Degree'}</Text>
              </View>
              <Text style={atsStyles.date}>{edu.year}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <View>
          <ATSLabel text="Technical Skills" />
          <View style={atsStyles.skillsGrid}>
            {skills.map((skill) => (
              <View key={skill} style={atsStyles.skillItem}>
                <View style={atsStyles.skillBullet} />
                <Text style={atsStyles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Custom Sections */}
      {customSections?.map((section) => (
        <View key={section.id}>
          <ATSLabel text={section.title} />
          {section.items.map((item) => (
            <View key={item.id} style={atsStyles.expItem} wrap={false}>
              <View style={atsStyles.itemHeader}>
                <Text style={atsStyles.role}>{item.title || 'Title'}</Text>
                {item.date && <Text style={atsStyles.date}>{item.date}</Text>}
              </View>
              {item.subtitle && <Text style={atsStyles.company}>{item.subtitle}</Text>}
              {item.description && <Text style={atsStyles.description}>{item.description}</Text>}
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
          <ConditionalMargin />
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
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, paddingRight: 15 }}>
                      <Text style={[executiveStyles.itemRole, { fontSize: 11, marginBottom: 2 }]}>{edu.institution}</Text>
                      <Text style={[executiveStyles.itemCompany, { fontSize: 9 }]}>{edu.degree}</Text>
                    </View>
                    <View style={{ width: 85, textAlign: 'right' }}>
                      <Text style={executiveStyles.itemDate}>{edu.year}</Text>
                    </View>
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
  const { personal, summary, experience, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={minimalistStyles.page}>
      <ConditionalMargin />
      <View style={minimalistStyles.header}>
        <View style={{ flex: 1 }}>
          <Text style={minimalistStyles.name}>{personal.name}</Text>
          <Text style={minimalistStyles.title}>{personal.title}</Text>
          <View style={minimalistStyles.contact}>
            {personal.email && <Text>{personal.email}</Text>}
            {personal.phone && <Text>{personal.phone}</Text>}
          </View>
        </View>
        {personal.photoUrl && <Image src={personal.photoUrl} style={minimalistStyles.photo} />}
      </View>
      <View style={minimalistStyles.section}>
        {summary && <View style={{ marginBottom: 25 }}><Text style={minimalistStyles.sectionTitle}>Profile</Text><Text style={minimalistStyles.text}>{t(summary, 600)}</Text></View>}
        {experience.length > 0 && (
          <View style={{ marginBottom: 25 }}>
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
        {skills.length > 0 && <View><Text style={minimalistStyles.sectionTitle}>Skills</Text><Text style={minimalistStyles.skills}>{skills.join(' • ')}</Text></View>}
        {customSections?.map((section) => (
          <View key={section.id} style={{ marginTop: 20 }}><Text style={minimalistStyles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={minimalistStyles.item}><View style={minimalistStyles.itemHeader}><Text style={minimalistStyles.itemRole}>{item.title}</Text><Text style={minimalistStyles.itemDate}>{item.date}</Text></View><Text style={minimalistStyles.text}>{t(item.description, 300)}</Text></View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  );
};

const CreativeDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <Page size="A4" style={creativeStyles.page}>
      {/* LEFT MAIN COLUMN */}
      <View style={creativeStyles.main}>
        <ConditionalMargin />
        {/* Header */}
        <View style={{ marginBottom: 22 }}>
          <Text style={creativeStyles.name}>{personal.name || 'YOUR NAME'}</Text>
          {personal.title && <Text style={creativeStyles.headerTitle}>{personal.title}</Text>}
        </View>

        {/* Summary */}
        {summary && (
          <View style={creativeStyles.summaryBorder}>
            <Text style={creativeStyles.summaryLabel}>The Mission</Text>
            <Text style={creativeStyles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Education — below summary */}
        {education.length > 0 && (
          <View style={creativeStyles.mainSection}>
            <Text style={creativeStyles.sectionLabel}>Knowledge Base</Text>
            {education.map((edu) => (
              <View key={edu.id} style={creativeStyles.expItem} wrap={false}>
                <View style={creativeStyles.expHeader}>
                  <Text style={creativeStyles.expRole}>{edu.institution || 'Institution'}</Text>
                  <Text style={creativeStyles.expDateBadge}>{edu.year}</Text>
                </View>
                <Text style={creativeStyles.expCompany}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={creativeStyles.mainSection}>
            <Text style={creativeStyles.sectionLabel}>The Journey</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={creativeStyles.expItem} wrap={false}>
                <View style={creativeStyles.expHeader}>
                  <Text style={creativeStyles.expRole}>{exp.role || 'Role Name'}</Text>
                  <Text style={creativeStyles.expDateBadge}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={creativeStyles.expCompany}>{exp.company || 'Company Name'}</Text>
                {exp.description && <Text style={creativeStyles.expDesc}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {customSections?.map((section) => (
          <View key={section.id} style={creativeStyles.mainSection}>
            <Text style={creativeStyles.sectionLabel}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={creativeStyles.customItem} wrap={false}>
                <View style={creativeStyles.customHeader}>
                  <Text style={creativeStyles.customTitle}>{item.title || 'Title'}</Text>
                  {item.date && <Text style={creativeStyles.customDateBadge}>{item.date}</Text>}
                </View>
                {item.subtitle && <Text style={creativeStyles.customSubtitle}>{item.subtitle}</Text>}
                {item.description && <Text style={creativeStyles.customDesc}>{item.description}</Text>}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* RIGHT SIDEBAR */}
      <View style={creativeStyles.sidebar}>
        <ConditionalMargin />

        {/* Photo */}
        {personal.photoUrl && (
          <Image src={personal.photoUrl} style={creativeStyles.photo} />
        )}

        {/* Contact */}
        <View style={creativeStyles.sideSection}>
          <Text style={creativeStyles.sideSectionLabel}>Reach Me</Text>
          {personal.email && (
            <View>
              <Text style={creativeStyles.contactFieldLabel}>Email</Text>
              <Text style={creativeStyles.contactFieldValue}>{personal.email}</Text>
            </View>
          )}
          {personal.phone && (
            <View>
              <Text style={creativeStyles.contactFieldLabel}>Mobile</Text>
              <Text style={creativeStyles.contactFieldValue}>{personal.phone}</Text>
            </View>
          )}
          {personal.location && (
            <View>
              <Text style={creativeStyles.contactFieldLabel}>Location</Text>
              <Text style={creativeStyles.contactFieldValue}>{personal.location}</Text>
            </View>
          )}
        </View>

        {/* Skills */}
        {skills.length > 0 && (
          <View style={creativeStyles.sideSection}>
            <Text style={creativeStyles.sideSectionLabel}>Arsenal</Text>
            <View>
              {skills.map((skill) => (
                <View key={skill} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#2dd4bf', marginRight: 7, flexShrink: 0 }} />
                  <Text style={creativeStyles.skillBadge}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

      </View>
    </Page>
  );
};
const ElegantDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  const ElegantLabel = ({ text }: { text: string }) => (
    <View style={{ marginBottom: 10 }}>
      <Text style={elegantStyles.sectionLabelText}>{text}</Text>
      <View style={elegantStyles.sectionLabelLine} />
    </View>
  );

  return (
    <Page size="A4" style={elegantStyles.page}>
      {/* ── Top accent banner ── */}
      <View style={elegantStyles.topLine} />

      {/* ── Header ── */}
      <View style={elegantStyles.header}>
        <View style={elegantStyles.headerLeft}>
          <Text style={elegantStyles.name}>{personal.name || 'YOUR NAME'}</Text>
          <Text style={elegantStyles.title}>{personal.title || 'PROFESSIONAL TITLE'}</Text>
          <View style={elegantStyles.contactRow}>
            {personal.email && <Text style={{ textDecoration: 'underline', color: 'rgba(107,142,35,0.7)' }}>{personal.email}</Text>}
            {personal.phone && <Text>{personal.phone}</Text>}
            {personal.location && <Text>{personal.location}</Text>}
          </View>
        </View>
        {personal.photoUrl && <Image src={personal.photoUrl} style={elegantStyles.photo} />}
      </View>

      {/* ── Two-column body ── */}
      <View style={elegantStyles.body}>
        
        {/* ════ LEFT MAIN COLUMN ════ */}
        <View style={elegantStyles.mainCol}>
          <ConditionalMargin />
          
          {/* Summary */}
          {summary && (
            <View>
              <ElegantLabel text="Profile" />
              <Text style={elegantStyles.summaryText}>{summary}</Text>
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={elegantStyles.eduSection}>
              <ElegantLabel text="Education" />
              {education.map((edu) => (
                <View key={edu.id} style={elegantStyles.eduItem} wrap={false}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={elegantStyles.eduInst}>{edu.institution || 'Institution'}</Text>
                    <Text style={elegantStyles.eduDegree}>{edu.degree}</Text>
                  </View>
                  <Text style={elegantStyles.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <View style={elegantStyles.expSection}>
              <ElegantLabel text="Experience" />
              {experience.map((exp) => (
                <View key={exp.id} style={elegantStyles.expItem} wrap={false}>
                  <View style={elegantStyles.expHeader}>
                    <Text style={elegantStyles.expRole}>{exp.role || 'Role Name'}</Text>
                    <Text style={elegantStyles.expDate}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  <Text style={elegantStyles.expCompany}>{exp.company || 'Company'}</Text>
                  {exp.description && <Text style={elegantStyles.expDesc}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Custom Sections */}
          {customSections?.map((section) => (
            <View key={section.id} style={elegantStyles.customSection}>
              <ElegantLabel text={section.title} />
              {section.items.map((item) => (
                <View key={item.id} style={elegantStyles.customItem} wrap={false}>
                  <View style={elegantStyles.customHeader}>
                    <Text style={elegantStyles.customTitle}>{item.title || 'Title'}</Text>
                    {item.date && <Text style={elegantStyles.customDate}>{item.date}</Text>}
                  </View>
                  {item.subtitle && <Text style={elegantStyles.customSubtitle}>{item.subtitle}</Text>}
                  {item.description && <Text style={elegantStyles.customDesc}>{item.description}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* ════ VERTICAL DIVIDER ════ */}
        <View style={elegantStyles.divider} />

        {/* ════ RIGHT SIDEBAR (Skills Only) ════ */}
        <View style={elegantStyles.sideCol}>
          {skills.length > 0 && (
            <View style={elegantStyles.skillSection}>
              <ElegantLabel text="Knowledge" />
              {skills.map((skill) => (
                <View key={skill} style={elegantStyles.skillItemWrap}>
                  <Text style={elegantStyles.skillItem}>{skill}</Text>
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
      <ConditionalMargin />
      <View style={professionalStyles.header}>
        {personal.photoUrl && (
          <View style={professionalStyles.photoContainer}>
            <Image src={personal.photoUrl} style={professionalStyles.photo} />
          </View>
        )}
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={professionalStyles.name}>{personal.name || 'YOUR NAME'}</Text>
          <Text style={professionalStyles.headerTitle}>{personal.title || 'PROFESSIONAL TITLE'}</Text>
          <View style={professionalStyles.contact}>
            {personal.email && (
              <View style={professionalStyles.contactItem}>
                <Text style={professionalStyles.contactLabel}>Email</Text>
                <Text style={professionalStyles.contactValue}>{personal.email}</Text>
              </View>
            )}
            {personal.phone && (
              <View style={professionalStyles.contactItem}>
                <Text style={professionalStyles.contactLabel}>Phone</Text>
                <Text style={professionalStyles.contactValue}>{personal.phone}</Text>
              </View>
            )}
            {personal.location && (
              <View style={professionalStyles.contactItem}>
                <Text style={professionalStyles.contactLabel}>Location</Text>
                <Text style={professionalStyles.contactValue}>{personal.location}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={professionalStyles.content}>
        <View style={professionalStyles.main}>
          <ConditionalMargin height={18} />
          {summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={professionalStyles.sectionTitle}>Professional Summary</Text>
              <Text style={professionalStyles.summaryText}>{summary}</Text>
            </View>
          )}

          {education.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={professionalStyles.sectionTitle}>Academic Pedigree</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, paddingRight: 15 }}>
                      <Text style={[professionalStyles.itemTitle, { fontSize: 10.5, marginBottom: 2 }]}>{edu.institution}</Text>
                      <Text style={professionalStyles.itemSubtitle}>{edu.degree}</Text>
                    </View>
                    <View style={{ width: 80, textAlign: 'right' }}>
                      <Text style={professionalStyles.itemDateBadge}>{edu.year}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {experience.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={professionalStyles.sectionTitle}>Career Milestones</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 14 }} wrap={false}>
                  <View style={professionalStyles.itemHeader}>
                    <Text style={professionalStyles.expRole}>{exp.role}</Text>
                    <Text style={professionalStyles.expDate}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  <Text style={professionalStyles.expCompany}>{exp.company}</Text>
                  {exp.description && <Text style={professionalStyles.text}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {customSections?.map((section) => (
            <View key={section.id} style={{ marginBottom: 20 }}>
              <Text style={professionalStyles.sectionTitle}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item.id} style={{ marginBottom: 12 }} wrap={false}>
                  <View style={professionalStyles.itemHeader}>
                    <Text style={professionalStyles.itemTitle}>{item.title}</Text>
                    {item.date && <Text style={professionalStyles.expDate}>{item.date}</Text>}
                  </View>
                  {item.subtitle && <Text style={[professionalStyles.itemSubtitle, { color: 'rgba(245,158,11,0.75)' }]}>{item.subtitle}</Text>}
                  {item.description && <Text style={[professionalStyles.text, { borderLeftWidth: 0, paddingLeft: 0, fontStyle: 'italic', color: '#6b7280' }]}>{item.description}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={professionalStyles.sidebar}>
          <ConditionalMargin height={18} />
          <Text style={professionalStyles.sidebarLabel}>Technological Mastery</Text>
          <View>
            {skills.map((skill) => (
              <Text key={skill} style={professionalStyles.skillBadge}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Page>
  );
};

const academiaStyles = StyleSheet.create({
  page: { backgroundColor: '#fdf8f0', fontFamily: 'Times-Roman', color: '#2a2118', paddingTop: 0, paddingBottom: 0 },
  topBorderThick: { height: 3, backgroundColor: '#8b4513' },
  topBorderMid: { height: 1.5, backgroundColor: '#d4a96a', marginHorizontal: 22, marginTop: 1.5 },
  topBorderThin: { height: 0.5, backgroundColor: 'rgba(201,149,74,0.25)', marginHorizontal: 36, marginTop: 1 },
  header: { alignItems: 'center', paddingHorizontal: 36, paddingTop: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(139,69,19,0.2)', borderBottomStyle: 'dashed' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2a2118', letterSpacing: -0.3, lineHeight: 1.1 },
  title: { fontFamily: 'Helvetica-Bold', fontSize: 6, letterSpacing: 1.5, textTransform: 'uppercase', color: '#8b4513', marginTop: 2 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, fontSize: 7.5, color: '#7a6a55', fontStyle: 'italic', marginTop: 2 },
  body: { flexDirection: 'row', flex: 1 },
  main: { flex: 1, paddingTop: 12, paddingBottom: 15, paddingLeft: 30, paddingRight: 15 },
  sidebar: { width: 130, paddingTop: 12, paddingBottom: 15, paddingLeft: 10, paddingRight: 15, backgroundColor: 'rgba(139,69,19,0.02)', borderLeftWidth: 1, borderLeftColor: 'rgba(212,169,106,0.25)', minHeight: '100%' },
  sectionLabel: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
  sectionLabelText: { fontFamily: 'Helvetica-Bold', fontSize: 5.5, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, color: '#8b4513' },
  sectionLabelLine: { flex: 1, height: 0.8, backgroundColor: 'rgba(212,169,106,0.35)' },
  sectionLabelDot: { width: 2, height: 2, borderRadius: 1, backgroundColor: '#8b4513' },
  mainSection: { marginBottom: 10 },
  summaryText: { fontSize: 9, lineHeight: 1.5, color: '#3d2f20', textAlign: 'justify' },
  expItem: { marginBottom: 8 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  expRole: { fontSize: 9.5, fontWeight: 'bold', fontStyle: 'italic', color: '#2a2118' },
  expDate: { fontFamily: 'Helvetica-Bold', fontSize: 5.5, textTransform: 'uppercase', letterSpacing: 0.6, color: '#8b4513' },
  expCompany: { fontFamily: 'Helvetica-Bold', fontSize: 6.5, textTransform: 'uppercase', letterSpacing: 0.2, color: '#7a6a55', marginBottom: 1 },
  expDesc: { fontSize: 8, lineHeight: 1.45, color: '#3d2f20', paddingLeft: 6, borderLeftWidth: 1, borderLeftColor: 'rgba(212,169,106,0.4)', marginTop: 1 },
  customItem: { marginBottom: 6, paddingBottom: 4, borderBottomWidth: 0.5, borderBottomColor: 'rgba(212,169,106,0.3)', borderBottomStyle: 'dashed' },
  eduItem: { marginBottom: 6, paddingBottom: 6, borderBottomWidth: 0.5, borderBottomColor: 'rgba(212,169,106,0.35)', borderBottomStyle: 'dashed' },
  eduInst: { fontSize: 9, fontWeight: 'bold', color: '#2a2118', lineHeight: 1.2 },
  eduDegree: { fontSize: 8, fontStyle: 'italic', color: '#5a4a35', marginTop: 1 },
  eduYear: { fontFamily: 'Helvetica-Bold', fontSize: 5.5, textTransform: 'uppercase', letterSpacing: 0.6, color: '#8b4513', marginTop: 0.5 },
  skillItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 3, marginBottom: 3 },
  skillBullet: { width: 2.5, height: 2.5, borderRadius: 1.25, backgroundColor: '#8b4513', marginTop: 2, flexShrink: 0 },
  skillText: { fontSize: 8.5, color: '#3d2f20', lineHeight: 1.3 },
  bottomBorderThin: { height: 0.5, backgroundColor: 'rgba(201,149,74,0.25)', marginHorizontal: 36, marginBottom: 1 },
  bottomBorderMid: { height: 1.5, backgroundColor: '#d4a96a', marginHorizontal: 22, marginBottom: 1.5 },
  bottomBorderThick: { height: 3, backgroundColor: '#8b4513' },
});

const AcademiaDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  const SectionLabel = ({ text }: { text: string }) => (
    <View style={academiaStyles.sectionLabel}>
      <View style={academiaStyles.sectionLabelDot} />
      <Text style={academiaStyles.sectionLabelText}>{text}</Text>
      <View style={academiaStyles.sectionLabelLine} />
      <View style={academiaStyles.sectionLabelDot} />
    </View>
  );
  return (
    <Page size="A4" style={academiaStyles.page}>
      <ConditionalMargin />
      {/* Top decorative border */}
      <View style={academiaStyles.topBorderThick} />
      <View style={academiaStyles.topBorderMid} />
      <View style={academiaStyles.topBorderThin} />

      {/* Header */}
      <View style={academiaStyles.header}>
        <Text style={academiaStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        {personal.title && <Text style={academiaStyles.title}>{personal.title}</Text>}
        <View style={academiaStyles.contact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.location && <Text>· {personal.location}</Text>}
          {personal.phone && <Text>· {personal.phone}</Text>}
        </View>
      </View>

      {/* Two-column body */}
      <View style={academiaStyles.body}>

        {/* LEFT: Summary → Experience → Custom Sections */}
        <View style={academiaStyles.main}>
          {summary && (
            <View style={academiaStyles.mainSection}>
              <SectionLabel text="Abstract" />
              <Text style={academiaStyles.summaryText}>{summary}</Text>
            </View>
          )}
          {experience.length > 0 && (
            <View style={academiaStyles.mainSection}>
              <SectionLabel text="Academic & Professional Experience" />
              {experience.map((exp) => (
                <View key={exp.id} style={academiaStyles.expItem} wrap={false}>
                  <View style={academiaStyles.expHeader}>
                    <Text style={academiaStyles.expRole}>{exp.role || 'Role Name'}</Text>
                    <Text style={academiaStyles.expDate}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  <Text style={academiaStyles.expCompany}>{exp.company || 'Institution'}</Text>
                  {exp.description && <Text style={academiaStyles.expDesc}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}
          {customSections?.map((section) => (
            <View key={section.id} style={academiaStyles.mainSection}>
              <SectionLabel text={section.title} />
              {section.items.map((item) => (
                <View key={item.id} style={academiaStyles.customItem} wrap={false}>
                  <View style={academiaStyles.expHeader}>
                    <Text style={academiaStyles.expRole}>{item.title || 'Title'}</Text>
                    {item.date && <Text style={academiaStyles.expDate}>{item.date}</Text>}
                  </View>
                  {item.subtitle && <Text style={academiaStyles.expCompany}>{item.subtitle}</Text>}
                  {item.description && <Text style={academiaStyles.expDesc}>{item.description}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* RIGHT SIDEBAR: Education → Skills */}
        <View style={academiaStyles.sidebar}>
          <ConditionalMargin />
          {education.length > 0 && (
            <View style={{ marginBottom: 18 }}>
              <SectionLabel text="Education" />
              {education.map((edu) => (
                <View key={edu.id} style={academiaStyles.eduItem} wrap={false}>
                  <Text style={academiaStyles.eduInst}>{edu.institution || 'University'}</Text>
                  <Text style={academiaStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={academiaStyles.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}
          {skills.length > 0 && (
            <View>
              <SectionLabel text="Research Areas" />
              {skills.map((skill) => (
                <View key={skill} style={academiaStyles.skillItem}>
                  <View style={academiaStyles.skillBullet} />
                  <Text style={academiaStyles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Bottom decorative border */}
      <View style={academiaStyles.bottomBorderThin} />
      <View style={academiaStyles.bottomBorderMid} />
      <View style={academiaStyles.bottomBorderThick} />
    </Page>
  );
};

const compactStyles = StyleSheet.create({
  page: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 0, fontFamily: 'Helvetica', color: '#0d0d0d', backgroundColor: '#ffffff' },
  headerBg: { backgroundColor: '#0d0d0d', paddingHorizontal: 30, paddingTop: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerLeft: { flexDirection: 'column', gap: 3 },
  headerRight: { flexDirection: 'column', alignItems: 'flex-end', gap: 2 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', letterSpacing: -0.3, lineHeight: 1.1 },
  headerTitle: { fontSize: 8, fontWeight: 'bold', color: '#4ade80', letterSpacing: 1.5 },
  headerContact: { fontSize: 7, color: '#9ca3af' },
  terminalBar: { backgroundColor: '#111111', paddingHorizontal: 30, paddingVertical: 5, flexDirection: 'row', alignItems: 'center' },
  terminalText: { fontSize: 7.5, color: '#4ade80' },
  terminalCursor: { width: 5, height: 8, backgroundColor: '#4ade80', marginLeft: 2 },
  body: { flexDirection: 'row', paddingHorizontal: 30, paddingTop: 20, gap: 20 },
  main: { flex: 1 },
  sidebar: { width: 160, borderLeftWidth: 1.5, borderLeftColor: '#e5e7eb', borderLeftStyle: 'dashed', paddingLeft: 16 },
  sectionLabel: { fontSize: 7, fontWeight: 'bold', color: '#16a34a', textTransform: 'uppercase', letterSpacing: 1.2, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', paddingBottom: 2, marginBottom: 6 },
  mainSection: { marginBottom: 14 },
  summaryText: { fontSize: 9.5, color: '#4b5563', lineHeight: 1.45 },
  expItem: { marginBottom: 12 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  expRole: { fontSize: 9.5, fontWeight: 'bold', textTransform: 'uppercase', color: '#0d0d0d' },
  expDate: { fontSize: 7, color: '#9ca3af', textTransform: 'uppercase' },
  expCompany: { fontSize: 7.5, fontWeight: 'bold', color: '#16a34a', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 },
  expDesc: { fontSize: 8.5, color: '#6b7280', lineHeight: 1.4, paddingLeft: 8, borderLeftWidth: 1.5, borderLeftColor: '#f3f4f6' },
  customItem: { marginBottom: 10 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  customTitle: { fontSize: 9.5, fontWeight: 'bold', textTransform: 'uppercase', color: '#0d0d0d' },
  customDate: { fontSize: 7, color: '#9ca3af' },
  customSubtitle: { fontSize: 7.5, fontWeight: 'bold', color: '#16a34a', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 1 },
  customDesc: { fontSize: 8.5, color: '#6b7280', lineHeight: 1.4, paddingLeft: 8, borderLeftWidth: 1.5, borderLeftColor: '#f3f4f6' },
  eduItem: { marginBottom: 10 },
  eduInst: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', color: '#0d0d0d', lineHeight: 1.2 },
  eduDegree: { fontSize: 7.5, fontStyle: 'italic', color: '#6b7280', marginTop: 1 },
  eduYear: { fontSize: 7, fontWeight: 'bold', color: '#16a34a', marginTop: 1 },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBadge: { fontSize: 7, fontWeight: 'bold', color: '#374151', backgroundColor: '#f4f4f0', borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 4, paddingVertical: 1.5, marginRight: 3, marginBottom: 3 },
});

const CompactDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  const CompactLabel = ({ text }: { text: string }) => (
    <Text style={compactStyles.sectionLabel}>{text}</Text>
  );

  return (
    <Page size="A4" style={compactStyles.page}>
      <ConditionalMargin />

      {/* Dark header */}
      <View style={compactStyles.headerBg}>
        <View style={compactStyles.headerLeft}>
          <Text style={compactStyles.name}>{personal.name || 'YOUR NAME'}</Text>
          {personal.title && <Text style={compactStyles.headerTitle}>{personal.title}</Text>}
        </View>
        <View style={compactStyles.headerRight}>
          {personal.email && <Text style={compactStyles.headerContact}>{personal.email}</Text>}
          {personal.phone && <Text style={compactStyles.headerContact}>{personal.phone}</Text>}
          {personal.location && <Text style={compactStyles.headerContact}>{personal.location}</Text>}
        </View>
      </View>

      {/* Terminal bar */}
      <View style={compactStyles.terminalBar}>
        <Text style={compactStyles.terminalText}>$ resume --show-all</Text>
        <View style={compactStyles.terminalCursor} />
      </View>

      {/* Two-column body */}
      <View style={compactStyles.body}>

        {/* LEFT: Summary → Experience → Custom */}
        <View style={compactStyles.main}>
          <ConditionalMargin />
          {summary && (
            <View style={compactStyles.mainSection}>
              <CompactLabel text="// summary" />
              <Text style={compactStyles.summaryText}>{summary}</Text>
            </View>
          )}

          {experience.length > 0 && (
            <View style={compactStyles.mainSection}>
              <CompactLabel text="// experience" />
              {experience.map((exp) => (
                <View key={exp.id} style={compactStyles.expItem} wrap={false}>
                  <View style={compactStyles.expHeader}>
                    <Text style={compactStyles.expRole}>{exp.role || 'Role Name'}</Text>
                    <Text style={compactStyles.expDate}>[{exp.startDate} - {exp.endDate}]</Text>
                  </View>
                  <Text style={compactStyles.expCompany}>{exp.company || 'Company'}</Text>
                  {exp.description && <Text style={compactStyles.expDesc}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {customSections?.map((section) => (
            <View key={section.id} style={compactStyles.mainSection}>
              <CompactLabel text={`// ${section.title.toLowerCase()}`} />
              {section.items.map((item) => (
                <View key={item.id} style={compactStyles.customItem} wrap={false}>
                  <View style={compactStyles.customHeader}>
                    <Text style={compactStyles.customTitle}>{item.title || 'Title'}</Text>
                    {item.date && <Text style={compactStyles.customDate}>[{item.date}]</Text>}
                  </View>
                  {item.subtitle && <Text style={compactStyles.customSubtitle}>{item.subtitle}</Text>}
                  {item.description && <Text style={compactStyles.customDesc}>{item.description}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* RIGHT SIDEBAR: Education → Skills */}
        <View style={compactStyles.sidebar}>
          <ConditionalMargin />
          {education.length > 0 && (
            <View style={{ marginBottom: 18 }}>
              <CompactLabel text="// education" />
              {education.map((edu) => (
                <View key={edu.id} style={compactStyles.eduItem} wrap={false}>
                  <Text style={compactStyles.eduInst}>{edu.institution || 'Institution'}</Text>
                  <Text style={compactStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={compactStyles.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}

          {skills.length > 0 && (
            <View>
              <CompactLabel text="// skills" />
              <View style={compactStyles.skillsWrap}>
                {skills.map((skill) => (
                  <Text key={skill} style={compactStyles.skillBadge}>{skill}</Text>
                ))}
              </View>
            </View>
          )}
        </View>

      </View>
    </Page>
  );
};
const editorialStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#f5f0eb', fontFamily: 'Times-Roman', color: '#000000', paddingBottom: 0, paddingTop: 20 },
  header: { paddingHorizontal: 30, paddingTop: 20, paddingBottom: 0, borderBottomWidth: 4, borderBottomColor: '#000000', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  headerLeft: { flex: 1 },
  headerRight: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: 6 },
  documentType: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 4 },
  nameLine: { fontSize: 22, fontFamily: 'Times-Roman', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: -0.3, lineHeight: 0.9, marginBottom: 2 },
  contactLine: { fontSize: 7.5, fontWeight: 'bold', color: '#6b7280', marginBottom: 1 },
  body: { paddingHorizontal: 30, paddingTop: 18, paddingBottom: 25, flex: 1, flexDirection: 'column' },
  summaryBlock: { borderLeftWidth: 3, borderLeftColor: '#e63946', paddingLeft: 12, paddingTop: 3, paddingBottom: 3, marginBottom: 15, width: '100%' },
  summaryText: { fontFamily: 'Times-Roman', fontSize: 10.5, lineHeight: 1.45, color: '#1a1a1a', fontStyle: 'italic' },
  columns: { flexDirection: 'row', alignItems: 'flex-start', width: '100%' },
  mainCol: { width: '63%', paddingRight: 24 },
  sideCol: { width: '37%', borderLeftWidth: 2, borderLeftColor: '#000000', paddingLeft: 16, marginLeft: 'auto' },
  sectionLabelText: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, color: '#000000', marginBottom: 4 },
  sectionLabelLine: { borderBottomWidth: 1, borderBottomColor: '#000000', marginBottom: 10 },
  expItem: { marginBottom: 12 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  expRole: { fontFamily: 'Times-Roman', fontSize: 11.5, fontWeight: 'bold', fontStyle: 'italic', color: '#000000', flexShrink: 1, paddingRight: 8 },
  expDate: { fontSize: 6.5, fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, flexShrink: 0 },
  expCompany: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.2, color: '#e63946', marginBottom: 2 },
  expDesc: { fontSize: 9, color: '#4b5563', lineHeight: 1.4 },
  expDivider: { borderBottomWidth: 0.5, borderBottomColor: '#d1d5db', marginTop: 6 },
  customSection: { marginTop: 14 },
  customItem: { marginBottom: 10 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  customTitle: { fontFamily: 'Times-Roman', fontSize: 10.5, fontWeight: 'bold', fontStyle: 'italic', color: '#000000', flexShrink: 1, paddingRight: 8 },
  customDate: { fontSize: 6.5, fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, flexShrink: 0 },
  customSubtitle: { fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.2, color: '#e63946', marginBottom: 2 },
  customDesc: { fontSize: 9, color: '#4b5563', lineHeight: 1.4 },
  eduItem: { marginBottom: 10, paddingBottom: 8, borderBottomWidth: 0.5, borderBottomColor: '#d1d5db' },
  eduInst: { fontFamily: 'Times-Roman', fontSize: 9.5, fontWeight: 'bold', fontStyle: 'italic', color: '#000000', marginBottom: 1 },
  eduDegree: { fontSize: 7.5, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 },
  eduYear: { fontSize: 6, fontWeight: 'bold', color: '#e63946', textTransform: 'uppercase', letterSpacing: 1 },
  skillsSection: { marginTop: 14 },
  skillItem: { fontSize: 8.5, fontWeight: 'bold', color: '#1f2937', paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#d1d5db' },
});

const EditorialDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  const nameWords = (personal.name || 'YOUR NAME').split(' ');

  const EditorialLabel = ({ text }: { text: string }) => (
    <View style={{ marginBottom: 4 }}>
      <Text style={editorialStyles.sectionLabelText}>{text}</Text>
      <View style={editorialStyles.sectionLabelLine} />
    </View>
  );

  return (
    <Page size="A4" style={editorialStyles.page}>
      <ConditionalMargin />
      {/* ── Giant editorial header ── */}
      <View style={editorialStyles.header}>
        <View style={editorialStyles.headerLeft}>
          <Text style={editorialStyles.documentType}>Curriculum Vitae · {personal.title || 'Professional Title'}</Text>
          <View>
            {nameWords.map((word, i) => (
              <Text key={i} style={[editorialStyles.nameLine, { color: i % 2 === 1 ? '#e63946' : '#000000', paddingLeft: i % 2 === 1 ? 22 : 0 }]}>
                {word}
              </Text>
            ))}
          </View>
        </View>
        <View style={editorialStyles.headerRight}>
          {personal.email && <Text style={editorialStyles.contactLine}>{personal.email}</Text>}
          {personal.phone && <Text style={editorialStyles.contactLine}>{personal.phone}</Text>}
          {personal.location && <Text style={editorialStyles.contactLine}>{personal.location}</Text>}
        </View>
      </View>

      {/* ── Body ── */}
      <View style={editorialStyles.body}>
        <ConditionalMargin />
        {/* Summary — magazine pull-quote */}
        {summary && (
          <View style={editorialStyles.summaryBlock} wrap={false}>
            <Text style={editorialStyles.summaryText}>"{summary}"</Text>
          </View>
        )}

        {/* ── Two-column body ── */}
        <View style={editorialStyles.columns}>

          {/* ════ LEFT — Experience + Custom ════ */}
          <View style={editorialStyles.mainCol}>
            {experience.length > 0 && (
              <View>
                <EditorialLabel text="Experience" />
                <View>
                  {experience.map((exp, i) => (
                    <View key={exp.id} style={editorialStyles.expItem} wrap={false}>
                      <View style={editorialStyles.expHeader}>
                        <Text style={editorialStyles.expRole}>{exp.role || 'Role Name'}</Text>
                        <Text style={editorialStyles.expDate}>{exp.startDate} – {exp.endDate}</Text>
                      </View>
                      <Text style={editorialStyles.expCompany}>{exp.company || 'Company'}</Text>
                      {exp.description && <Text style={editorialStyles.expDesc}>{exp.description}</Text>}
                      {i < experience.length - 1 && <View style={editorialStyles.expDivider} />}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Custom sections */}
            {customSections?.map((section) => (
              <View key={section.id} style={editorialStyles.customSection}>
                <EditorialLabel text={section.title} />
                <View>
                  {section.items.map((item) => (
                    <View key={item.id} style={editorialStyles.customItem} wrap={false}>
                      <View style={editorialStyles.customHeader}>
                        <Text style={editorialStyles.customTitle}>{item.title || 'Title'}</Text>
                        {item.date && <Text style={editorialStyles.customDate}>{item.date}</Text>}
                      </View>
                      {item.subtitle && <Text style={editorialStyles.customSubtitle}>{item.subtitle}</Text>}
                      {item.description && <Text style={editorialStyles.customDesc}>{item.description}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* ════ RIGHT SIDEBAR — Education + Skills ════ */}
          <View style={editorialStyles.sideCol}>
            <ConditionalMargin />
            {education.length > 0 && (
              <View>
                <EditorialLabel text="Education" />
                <View>
                  {education.map((edu) => (
                    <View key={edu.id} style={editorialStyles.eduItem} wrap={false}>
                      <Text style={editorialStyles.eduInst}>{edu.institution || 'Institution'}</Text>
                      <Text style={editorialStyles.eduDegree}>{edu.degree}</Text>
                      <Text style={editorialStyles.eduYear}>{edu.year}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {skills.length > 0 && (
              <View style={editorialStyles.skillsSection}>
                <EditorialLabel text="Skills" />
                <View>
                  {skills.map((skill) => (
                    <Text key={skill} style={editorialStyles.skillItem}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Page>
  );
};

const nordicStyles = StyleSheet.create({
  page: { backgroundColor: '#fafaf8', fontFamily: 'Helvetica', color: '#1c1c1a', paddingBottom: 0, paddingTop: 20 },
  topAccent: { height: 2, backgroundColor: '#c8a96e', width: '100%', flexShrink: 0 },
  container: { paddingVertical: 32, paddingHorizontal: 40, flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: '#e8e6e1', paddingBottom: 16, marginBottom: 24 },
  name: { fontFamily: 'Times-Roman', fontSize: 28, fontWeight: 'normal', color: '#1c1c1a', letterSpacing: -0.3, lineHeight: 1 },
  headerTitle: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#c8a96e', marginTop: 6 },
  contact: { textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 3, fontSize: 9, color: '#8a8880' },
  labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  labelText: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.3, color: '#1c1c1a' },
  labelLine: { flex: 1, height: 1, backgroundColor: '#e8e6e1' },
  summarySection: { marginBottom: 24, maxWidth: 420 },
  summaryText: { fontFamily: 'Times-Italic', fontSize: 11, lineHeight: 1.6, color: '#4a4a46' },
  expItem: { flexDirection: 'row', gap: 18, marginBottom: 15 },
  dateCol: { width: 85, textAlign: 'right', paddingTop: 2 },
  startDate: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: '#c8a96e', marginBottom: 1 },
  endDate: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(200,169,110,0.5)' },
  expContent: { borderLeftWidth: 1, borderLeftColor: '#e8e6e1', paddingLeft: 18, flex: 1 },
  expHeader: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 3 },
  expRole: { fontSize: 11.5, fontWeight: 'bold', color: '#1c1c1a' },
  expSeparator: { fontSize: 10, color: '#8a8880' },
  expCompany: { fontSize: 10, color: '#8a8880' },
  text: { fontSize: 9.5, lineHeight: 1.5, color: '#5a5a56' },
  lowerSection: { flexDirection: 'row', gap: 30 },
  lowerLeft: { flex: 1 },
  lowerRight: { width: 150, flexShrink: 0 },
  eduItem: { marginBottom: 10 },
  eduInst: { fontSize: 10.5, fontWeight: 'bold', color: '#1c1c1a' },
  eduDegree: { fontFamily: 'Times-Italic', fontSize: 9.5, color: '#6a6a66', marginTop: 1 },
  eduYear: { fontSize: 8, fontWeight: 'bold', color: '#c8a96e', letterSpacing: 1, textTransform: 'uppercase', marginTop: 1 },
  customItem: { marginBottom: 10 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  customTitle: { fontSize: 10.5, fontWeight: 'bold', color: '#1c1c1a' },
  customDate: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: '#c8a96e' },
  customSubtitle: { fontSize: 9, color: '#8a8880' },
  skillItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  skillLine: { width: 12, height: 1, backgroundColor: '#c8a96e' },
  skillText: { fontSize: 9.5, color: '#4a4a46' },
});

const NordicDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  const NordicLabel = ({ text }: { text: string }) => (
    <View style={nordicStyles.labelContainer}>
      <Text style={nordicStyles.labelText}>{text}</Text>
      <View style={nordicStyles.labelLine} />
    </View>
  );

  return (
    <Page size="A4" style={nordicStyles.page}>
      <View style={nordicStyles.topAccent} />
      <View style={nordicStyles.container}>
        <ConditionalMargin />
        {/* Header */}
        <View style={nordicStyles.header}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            <Text style={nordicStyles.name}>{personal.name || 'YOUR NAME'}</Text>
            <Text style={nordicStyles.headerTitle}>{personal.title || 'Professional Title'}</Text>
          </View>
          <View style={nordicStyles.contact}>
            {personal.email && <Text>{personal.email}</Text>}
            {personal.phone && <Text>{personal.phone}</Text>}
            {personal.location && <Text>{personal.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={nordicStyles.summarySection}>
            <NordicLabel text="About" />
            <Text style={nordicStyles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={{ marginBottom: 32 }}>
            <NordicLabel text="Experience" />
            {experience.map((exp) => (
              <View key={exp.id} style={nordicStyles.expItem} wrap={false}>
                <View style={nordicStyles.dateCol}>
                  <Text style={nordicStyles.startDate}>{exp.startDate}</Text>
                  <Text style={nordicStyles.endDate}>{exp.endDate}</Text>
                </View>
                <View style={nordicStyles.expContent}>
                  <View style={nordicStyles.expHeader}>
                    <Text style={nordicStyles.expRole}>{exp.role}</Text>
                    <Text style={nordicStyles.expSeparator}>·</Text>
                    <Text style={nordicStyles.expCompany}>{exp.company}</Text>
                  </View>
                  {exp.description && <Text style={nordicStyles.text}>{exp.description}</Text>}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Lower Section Columns */}
        <View style={nordicStyles.lowerSection}>
          {/* Left Column */}
          <View style={nordicStyles.lowerLeft}>
            {education.length > 0 && (
              <View style={{ marginBottom: 32 }}>
                <NordicLabel text="Education" />
                {education.map((edu) => (
                  <View key={edu.id} style={nordicStyles.eduItem} wrap={false}>
                    <Text style={nordicStyles.eduInst}>{edu.institution}</Text>
                    <Text style={nordicStyles.eduDegree}>{edu.degree}</Text>
                    <Text style={nordicStyles.eduYear}>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}

            {customSections?.map((section) => (
              <View key={section.id} style={{ marginBottom: 32 }}>
                <NordicLabel text={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={nordicStyles.customItem} wrap={false}>
                    <View style={nordicStyles.customHeader}>
                      <Text style={nordicStyles.customTitle}>{item.title}</Text>
                      {item.date && <Text style={nordicStyles.customDate}>{item.date}</Text>}
                    </View>
                    {item.subtitle && <Text style={nordicStyles.customSubtitle}>{item.subtitle}</Text>}
                    {item.description && <Text style={nordicStyles.text}>{item.description}</Text>}
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Right Column (Skills) */}
          {skills.length > 0 && (
            <View style={nordicStyles.lowerRight}>
              <NordicLabel text="Skills" />
              {skills.map((skill) => (
                <View key={skill} style={nordicStyles.skillItem} wrap={false}>
                  <View style={nordicStyles.skillLine} />
                  <Text style={nordicStyles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};

const timelineStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#ffffff', fontFamily: 'Helvetica', paddingBottom: 0, paddingTop: 0 },
  header: { 
    backgroundColor: '#5b21b6', color: '#ffffff', 
    paddingTop: 24, paddingBottom: 20, paddingHorizontal: 36,
    flexDirection: 'column', gap: 4
  },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: -0.3, lineHeight: 1 },
  headerTitle: { fontSize: 8, fontWeight: 'bold', color: '#ddd6fe', textTransform: 'uppercase', letterSpacing: 2 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 5, fontSize: 9, color: '#c4b5fd' },
  content: { flexDirection: 'row', flex: 1 },
  main: { flex: 1, paddingVertical: 20, paddingLeft: 36, paddingRight: 24 },
  sidebar: { width: 170, backgroundColor: '#f9fafb', borderLeftWidth: 1, borderLeftColor: '#f3f4f6', paddingVertical: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', color: '#6d28d9', borderBottomWidth: 1.5, borderBottomColor: '#ede9fe', paddingBottom: 4, marginBottom: 10, letterSpacing: 2 },
  sidebarTitle: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 4, marginBottom: 10, letterSpacing: 2 },
  summaryText: { fontSize: 10, color: '#4b5563', fontStyle: 'italic', lineHeight: 1.6 },
  timelineContainer: { position: 'relative', marginTop: 3 },
  timelineLine: { position: 'absolute', left: 6, top: 6, bottom: 6, width: 1.5, backgroundColor: '#ede9fe' },
  timelineItem: { position: 'relative', paddingLeft: 24, paddingBottom: 12 },
  timelineDot: { position: 'absolute', left: 0, top: 4, width: 12, height: 12, borderRadius: 6, backgroundColor: '#7c3aed', borderWidth: 2, borderColor: '#ede9fe' },
  customDot: { position: 'absolute', left: 0, top: 4, width: 12, height: 12, borderRadius: 6, backgroundColor: '#a78bfa', borderWidth: 2, borderColor: '#f5f3ff' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  itemRole: { fontSize: 11, fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', letterSpacing: -0.1 },
  itemDate: { fontSize: 8, fontWeight: 'bold', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 0.6 },
  itemCompany: { fontSize: 8, fontWeight: 'bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.2 },
  text: { fontSize: 9.5, color: '#6b7280', lineHeight: 1.55, marginTop: 1 },
  eduItem: { borderBottomWidth: 1, borderBottomColor: '#f3f4f6', paddingBottom: 6, marginBottom: 6 },
  eduInst: { fontSize: 10.5, fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', letterSpacing: 0.1 },
  eduDegree: { fontSize: 9.5, color: '#6b7280', fontStyle: 'italic' },
  eduYear: { fontSize: 8, fontWeight: 'bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 0.8 },
  skillItem: { marginBottom: 8 },
  skillLabel: { fontSize: 9.5, fontWeight: 'bold', color: '#374151', marginBottom: 2 },
  progressBar: { height: 2, borderRadius: 1, backgroundColor: '#ede9fe', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#7c3aed', borderRadius: 1 },
});

const TimelineDocument = ({ resume }: { resume: Resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;
  return (
    <Page size="A4" style={timelineStyles.page}>
      {/* Header */}
      <View style={timelineStyles.header}>
        <Text style={timelineStyles.name}>{personal.name || 'YOUR NAME'}</Text>
        <Text style={timelineStyles.headerTitle}>{personal.title || 'Professional Title'}</Text>
        <View style={timelineStyles.contact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>

      <View style={timelineStyles.content}>
        <View style={timelineStyles.main}>
          <ConditionalMargin />
          {summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={timelineStyles.sectionTitle}>Profile</Text>
              <Text style={timelineStyles.summaryText}>{summary}</Text>
            </View>
          )}

          {education.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={timelineStyles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={timelineStyles.eduItem} wrap={false}>
                  <Text style={timelineStyles.eduInst}>{edu.institution}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={[timelineStyles.eduDegree, { flex: 1, paddingRight: 10 }]}>{edu.degree}</Text>
                    <Text style={timelineStyles.eduYear}>{edu.year}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {experience.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={timelineStyles.sectionTitle}>Career Timeline</Text>
              <View style={timelineStyles.timelineContainer}>
                <View style={timelineStyles.timelineLine} />
                <View>
                  {experience.map((exp) => (
                    <View key={exp.id} style={timelineStyles.timelineItem} wrap={false}>
                      <View style={timelineStyles.timelineDot} />
                      <View style={timelineStyles.itemHeader}>
                        <Text style={timelineStyles.itemRole}>{exp.role}</Text>
                        <Text style={timelineStyles.itemDate}>{exp.startDate} — {exp.endDate}</Text>
                      </View>
                      <Text style={timelineStyles.itemCompany}>{exp.company}</Text>
                      {exp.description && <Text style={timelineStyles.text}>{exp.description}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {customSections?.map((section) => (
            <View key={section.id} style={{ marginBottom: 20 }}>
              <Text style={timelineStyles.sectionTitle}>{section.title}</Text>
              <View style={timelineStyles.timelineContainer}>
                <View style={timelineStyles.timelineLine} />
                <View>
                  {section.items.map((item) => (
                    <View key={item.id} style={timelineStyles.timelineItem} wrap={false}>
                      <View style={timelineStyles.customDot} />
                      <View style={timelineStyles.itemHeader}>
                        <Text style={timelineStyles.itemRole}>{item.title}</Text>
                        {item.date && <Text style={timelineStyles.itemDate}>{item.date}</Text>}
                      </View>
                      {item.subtitle && <Text style={timelineStyles.itemCompany}>{item.subtitle}</Text>}
                      {item.description && <Text style={timelineStyles.text}>{item.description}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={timelineStyles.sidebar}>
          <ConditionalMargin />
          <Text style={timelineStyles.sidebarTitle}>Skills</Text>
          <View>
            {skills.map((skill) => (
              <View key={skill} style={timelineStyles.skillItem}>
                <Text style={timelineStyles.skillLabel}>{skill}</Text>
                <View style={timelineStyles.progressBar}>
                  <View style={[timelineStyles.progressFill, { width: '80%' }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  );
};

// --- PDF Sanitization & Switcher ---


const sanitizeResume = (resume: Resume): Resume => ({
  ...resume,
  sections: {
    ...resume.sections,
    skills: (resume.sections.skills || []).slice(0, 15),
  },
});

const ResumeDocument: React.FC<{ resume: Resume }> = ({ resume: rawResume }) => {
  const resume = useMemo(() => sanitizeResume(rawResume), [rawResume]);
  const { template } = resume;

  switch (template) {
    case 'modern':       return <Document><ModernDocument       resume={resume} /></Document>;
    case 'classic':      return <Document><ClassicDocument      resume={resume} /></Document>;
    case 'ats':          return <Document><ATSDocument          resume={resume} /></Document>;
    case 'executive':    return <Document><ExecutiveDocument    resume={resume} /></Document>;
    case 'minimalist':   return <Document><MinimalistDocument   resume={resume} /></Document>;
    case 'creative':     return <Document><CreativeDocument     resume={resume} /></Document>;
    case 'elegant':      return <Document><ElegantDocument      resume={resume} /></Document>;
    case 'professional': return <Document><ProfessionalDocument resume={resume} /></Document>;
    case 'academia':     return <Document><AcademiaDocument     resume={resume} /></Document>;
    case 'compact':      return <Document><CompactDocument      resume={resume} /></Document>;
    case 'editorial':    return <Document><EditorialDocument    resume={resume} /></Document>;
    case 'nordic':       return <Document><NordicDocument       resume={resume} /></Document>;
    case 'timeline':     return <Document><TimelineDocument     resume={resume} /></Document>;
    default:             return <Document><ModernDocument       resume={resume} /></Document>;
  }
};

export const DownloadPDF: React.FC = () => {
  const { resume } = useResumeStore();
  const [instance, update] = usePDF({ document: <ResumeDocument resume={resume} /> });

  // Update PDF whenever resume changes
  useEffect(() => {
    update(<ResumeDocument resume={resume} />);
  }, [resume, update]);

  const handleDownload = () => {
    if (instance.blob) {
      saveAs(instance.blob, `${resume.sections.personal.name || 'Resume'}.pdf`);
    } else if (instance.error) {
      console.error("PDF Blob generation error:", instance.error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={instance.loading}
      className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all font-medium group w-full ${instance.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {instance.loading ? (
        <Loader2 className="animate-spin text-blue-500" size={18} />
      ) : (
        <FileText className="text-gray-400 group-hover:text-blue-500 transition-colors" size={18} />
      )}
      <span>{instance.loading ? 'Preparing PDF...' : 'Download PDF'}</span>
    </button>
  );
};
