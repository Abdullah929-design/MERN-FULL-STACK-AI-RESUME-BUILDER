import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import type { Resume } from '../../types/resume';

const styles = StyleSheet.create({
  // Shared
  page: { backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  paragraph: { fontSize: 11, lineHeight: 1.6, marginBottom: 15, color: '#334155' },
  date: { fontSize: 10, color: '#64748b', marginBottom: 20 },
  signOff: { fontSize: 11, color: '#334155', marginTop: 10 },
  signature: { fontSize: 14, fontWeight: 'bold', color: '#0f172a', marginTop: 30 },

  // Classic
  cPage: { padding: 50, fontFamily: 'Times-Roman' },
  cHeader: { alignItems: 'center', borderBottom: '2px double #e2e8f0', paddingBottom: 20, marginBottom: 30 },
  cName: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
  cTitle: { fontSize: 12, color: '#475569', fontStyle: 'italic', marginBottom: 10 },
  cContact: { flexDirection: 'row', gap: 10, fontSize: 10, color: '#64748b' },

  // Modern
  mPage: { padding: 0 },
  mHeader: { backgroundColor: '#0f172a', padding: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mName: { fontSize: 32, fontWeight: 'heavy', color: '#ffffff', textTransform: 'uppercase' },
  mTitle: { fontSize: 12, color: '#94a3b8', marginTop: 5, letterSpacing: 2, textTransform: 'uppercase' },
  mContact: { alignItems: 'flex-end', fontSize: 10, color: '#cbd5e1', gap: 4 },
  mContent: { padding: 40 },

  // Executive
  ePage: { flexDirection: 'row', padding: 0 },
  eSidebar: { width: '25%', backgroundColor: '#0f172a', padding: 25, alignItems: 'center' },
  ePhoto: { width: 80, height: 80, borderRadius: 40, border: '2px solid #334155', marginBottom: 20 },
  eMain: { width: '75%', padding: 40 },
  eHeader: { borderBottom: '1px solid #0f172a', paddingBottom: 20, marginBottom: 30, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 15 },
  eNameContainer: { flex: 1, minWidth: 150, paddingRight: 10 },
  eName: { fontSize: 24, textTransform: 'uppercase', letterSpacing: 2, color: '#0f172a' },
  eTitle: { fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: 2, marginTop: 5 },
  eContact: { backgroundColor: '#f8fafc', padding: 10, borderRadius: 5, fontSize: 9, color: '#64748b', gap: 3, alignItems: 'flex-end', flexBasis: 'auto', maxWidth: '100%' },
});

interface CoverLetterPDFProps {
  paragraphs: string[];
  personal: Resume['sections']['personal'];
  template: 'classic' | 'modern' | 'executive';
}

const currentDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date());

const ClassicPDF = ({ paragraphs, personal }: Omit<CoverLetterPDFProps, 'template'>) => (
  <Page size="A4" style={styles.cPage}>
    <View style={styles.cHeader}>
      <Text style={styles.cName}>{personal.name}</Text>
      <Text style={styles.cTitle}>{personal.title}</Text>
      <View style={styles.cContact}>
        {personal.email && <Text>{personal.email}</Text>}
        {personal.phone && <Text>{personal.phone}</Text>}
        {personal.location && <Text>{personal.location}</Text>}
      </View>
    </View>
    <Text style={styles.date}>{currentDate}</Text>
    <View>
      {paragraphs.map((p, i) => <Text key={i} style={styles.paragraph}>{p}</Text>)}
    </View>
    <Text style={styles.signOff}>Sincerely,</Text>
    <Text style={styles.signature}>{personal.name}</Text>
  </Page>
);

const ModernPDF = ({ paragraphs, personal }: Omit<CoverLetterPDFProps, 'template'>) => (
  <Page size="A4" style={[styles.page, styles.mPage]}>
    <View style={styles.mHeader}>
      <View>
        <Text style={styles.mName}>{personal.name}</Text>
        <Text style={styles.mTitle}>{personal.title}</Text>
      </View>
      <View style={styles.mContact}>
        {personal.email && <Text>{personal.email}</Text>}
        {personal.phone && <Text>{personal.phone}</Text>}
        {personal.location && <Text>{personal.location}</Text>}
      </View>
    </View>
    <View style={styles.mContent}>
      <Text style={[styles.date, { color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }]}>{currentDate}</Text>
      <View>
        {paragraphs.map((p, i) => <Text key={i} style={styles.paragraph}>{p}</Text>)}
      </View>
      <Text style={styles.signOff}>Best regards,</Text>
      <Text style={[styles.signature, { borderTop: '2px solid #0f172a', width: 150, paddingTop: 10 }]}>{personal.name}</Text>
    </View>
  </Page>
);

const ExecutivePDF = ({ paragraphs, personal }: Omit<CoverLetterPDFProps, 'template'>) => (
  <Page size="A4" style={[styles.page, styles.ePage]}>
    <View style={styles.eSidebar}>
      {personal.photoUrl && <Image src={personal.photoUrl} style={styles.ePhoto} />}
    </View>
    <View style={styles.eMain}>
      <View style={styles.eHeader}>
        <View style={styles.eNameContainer}>
          <Text style={styles.eName}>{personal.name}</Text>
          <Text style={styles.eTitle}>{personal.title}</Text>
        </View>
        <View style={styles.eContact}>
          {personal.email && <Text>{personal.email}</Text>}
          {personal.phone && <Text>{personal.phone}</Text>}
          {personal.location && <Text>{personal.location}</Text>}
        </View>
      </View>
      <Text style={styles.date}>Date: {currentDate}</Text>
      <View>
        {paragraphs.map((p, i) => <Text key={i} style={styles.paragraph}>{p}</Text>)}
      </View>
      <Text style={styles.signOff}>Respectfully,</Text>
      <Text style={styles.signature}>{personal.name}</Text>
    </View>
  </Page>
);

export const CoverLetterDocument: React.FC<CoverLetterPDFProps> = (props) => {
  switch (props.template) {
    case 'classic': return <Document><ClassicPDF {...props} /></Document>;
    case 'modern': return <Document><ModernPDF {...props} /></Document>;
    case 'executive': return <Document><ExecutivePDF {...props} /></Document>;
    default: return <Document><ModernPDF {...props} /></Document>;
  }
};
