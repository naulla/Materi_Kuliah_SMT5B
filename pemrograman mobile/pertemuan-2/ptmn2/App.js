import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>Naula</Text>
          </View>

          <Text style={styles.title}>CURRICULUM VITAE</Text>
          <Text style={styles.subtitle}>
            Personal Information
          </Text>
        </View>

        {/* Biodata Card */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>Data Diri</Text>

          <View style={styles.item}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <Text style={styles.value}>Naula Alfiyatul Fauziyyah</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>NIM</Text>
            <Text style={styles.value}>[2488010063]</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Asal Sekolah</Text>
            <Text style={styles.value}>SMA NEGERI 1 MANDIRANCAN</Text>
          </View>

        </View>

        {/* Cita-cita Card */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>Cita-cita</Text>

          <View style={styles.citaContainer}>
            <Text style={styles.cita}>Menjadi Web Developer</Text>
          </View>

          <Text style={styles.sectionTitle}>
            Rencana Menggapai Cita-cita
          </Text>

          <Text style={styles.description}>
            Saya akan memperdalam kemampuan dalam membuat website 
            dan membuat berbagai project website untuk melatih 
            kemampuan saya serta memahami lebih dalam cara kerja 
            sebuah website. Dari project tersebut, saya juga ingin 
            menambah pengalaman dan mengembangkan kemampuan saya 
            agar dapat menjadi Web Developer.
          </Text>

        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2026 • Curriculum Vitae
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f7',
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  // HEADER
  header: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 15,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 5,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#172033',
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 5,
  },

  // CARD
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,

    elevation: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172033',
    marginBottom: 15,
  },

  // BIODATA
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#edf0f4',
    paddingBottom: 12,
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },

  // CITA-CITA
  citaContainer: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 22,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },

  cita: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  description: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 25,
    textAlign: 'justify',
  },

  // FOOTER
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 5,
  },
});