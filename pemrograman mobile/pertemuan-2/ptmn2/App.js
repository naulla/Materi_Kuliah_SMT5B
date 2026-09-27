const pluckDeep = key => obj =>
  key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res =>
  fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  // LANGKAH 1: Import semua yang dibutuhkan
}

// import library
import React, { useState, useRef, useEffect } from "react";

// import components
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Animated,   // API animasi React Native
} from 'react-native';

const go = (f, seed, acc) => {
  const res = f(seed);
  return res ? go(f, res[1], acc.concat([res[0]])) : acc
};

const PROFILE = {
  name: 'Naula Alfiyatul Fauziyyah',
  title: 'Web Development',
  email: 'naulaalfiyatull@gmail.com',
  phone: '085797275590',
  location: 'Kuningan, Jawa Barat',
  bio: 'Sedang menempuh pendidikan S1 Informatika',
  avatar: 'https://photos.app.goo.gl/WHxjF5y1qpYc8exS6',
  avataroffline: 'assets/photo.jpg'
};

const SKILLS = [
  { id: '1', name: 'MySQL', level: 70, color: '#ab5375' },
  { id: '2', name: 'Figma', level: 79, color: '#96a0d8' },
  { id: '3', name: 'PHP', level: 75, color: '#4e4ead' },
  { id: '4', name: 'HTML & CSS', level: 65, color: '#cd54bb' },
];

const SECTIONS = [
  {
    title: '📋 Pengalaman Organisasi',
    data: [
      {
        id: 'e1',
        role: 'Publikasi, Dekorasi, dan Dokumentasi',
        company: 'Bakti Desa IKMAWATI 2026',
        period: '18 Juni 2026 - 14 September 2026',
        desc: 'Membuat desain proposal, id card & lanyard, sertifikat pemateri & volunteer, bingkai live report, dokumentasi kegiatan, dan membuat live report selama kegiatan berlangsung. Serta berkontribusi dalam kegiatan mengajar mengaji, mengajar tari untuk anak-anak, dan menjaga lapak berbagi.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'Siswa',
        company: 'SMA Negeri 1 Mandirancan',
        period: '2021 - 2024',
        desc: 'Mengikuti eskul PMR pada kelas 1 SMA',
      },
      {
        id: 'd1',
        role: 'Mahasiswa',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - Sekarang',
        desc: 'Semester 5',
      },
    ],
  },
];

// ===================================================
// DATA SOSIAL MEDIA
// ===================================================

const SOCIAL = [
  { id: 's1', label: 'GitHub', icon: '👨‍💻', url: 'github.com/naulla' },
  { id: 's2', label: 'Instagram', icon: '💼', url: 'instagram.com/naulaalfy' },
  { id: 's3', label: 'Portfolio', icon: '🌐', url: 'naula.dev' },
];

// ================================
// SUB-COMPONENT: SkillCard
// Dipakai oleh FlatList untuk render tiap skill
// Props: item → { name, level, color }
// ================================

const SkillCard = ({ item }) => (
  // 1. View → container kartu
  <View style={styles.skillCard}>
    {/* Baris atas: nama + persentase */}
    <View style={styles.skillHeader}>
      {/* 2. Text → nama skill */}
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>

    {/* Progress bar: View berlapis */}
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          // width dinamis dari data, warna dari data
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

// ================================================
// SUB-COMPONENT: TimelineCard
// Dipakai oleh SectionList
// Props: item = { role, company, period }, onPress
// ================================================

const TimelineCard = ({ item, onPress }) => (
  // 9. TouchableOpacity → tekan untuk buka Modal
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}  // opacity saat ditekan (0–1)
  >
    {/* Titik bulat di sebelah kiri (dekorasi timeline) */}
    <View style={styles.timelineDot} />

    {/* Konten teks */}
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {

  // — STATE
  // 11. Switch: apakah user "Open to Work"?
  const [openToWork, setOpenToWork] = useState(true);

  // Membuat nilai animasi untuk avatar
  // Nilai awal 1 = ukuran normal
  const avatarScale = useRef(new Animated.Value(1)).current;

  // LANGKAH 3: Menjalankan animasi avatar
  useEffect(() => {

    // Animasi membesar dan mengecil secara terus-menerus
    Animated.loop(
      Animated.sequence([

        // Avatar membesar dari ukuran 1 menjadi 1.08
        Animated.timing(avatarScale, {
          toValue: 1.08,
          duration: 800,
          useNativeDriver: true,
        }),

        // Avatar kembali ke ukuran normal
        Animated.timing(avatarScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),

      ])
    ).start();

  }, []);


  // state untuk menentukan tab yang sedang aktif
  const [activeTab, setActiveTab] = useState('Info');

  // 12. Modal: item yang dipilih & visibilitas modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 7. TextInput: nilai input form kontak
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // 13. ActivityIndicator: status loading
  const [sending, setSending] = useState(false);

  // 10. Pressable: status sedang ditekan
  const [pressing, setPressing] = useState(false);

  const [downloading, setDownloading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleDownloadCV = () => {
    setDownloading(true);

    setTimeout(() => {
      setDownloading(false);

      showAlert(
        '✅ Berhasil',
        'CV sudah di-download'
      );
    }, 3000);
  };

  // — HANDLER FUNCTIONS
  // Dipanggil saat kartu timeline ditekan
  const handleCardPress = (item) => {
    setSelectedItem(item); // simpan item yang dipilih
    setModalVisible(true); // tampilkan modal
  };

  // Dipanggil saat tombol "Kirim Pesan" ditekan
  const handleSend = () => {
    // Validasi input tidak boleh kosong
    if (!senderName.trim() || !message.trim()) {
      showAlert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true); // tampilkan ActivityIndicator

    // Simulasi delay 2 detik (misal: request ke server)
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      showAlert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim`);
    }, 2000);
  };

  return (
    // 15. SafeAreaView → area aman dari notch & home bar
    <SafeAreaView style={styles.safeArea}>
      {/* 14. StatusBar → warna latar status bar & style teks ikon */}
      <StatusBar
        backgroundColor="#1a1a2e" // warna latar (Android)
        barStyle="light-content" // ikon putih (iOS & Android)
      />

      {/* — HEADER BAR — */}
      {/* 1. View → container header dengan flexDirection row */}
      <View style={styles.headerBar}>

        <Text style={styles.headerTitle}>
          📄 Curriculum Vitae
        </Text>

        {/* Toggle “Open to Work” */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>

          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: '#555', true: '#4ade80' }}
            thumbColor={openToWork ? '#fff' : '#aaa'}
          />
        </View>

      </View>

      {/* TAB NAVIGASI */}
      {/* TouchableOpacity digunakan sebagai tombol untuk berpindah tab */}
      <View style={styles.tabContainer}>

        {/* TAB INFO */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            // Jika tab Info aktif, gunakan style aktif
            activeTab === 'Info' && styles.tabButtonActive,
          ]}
          // Saat ditekan, ubah tab aktif menjadi Info
          onPress={() => setActiveTab('Info')}
        >
          <Text
            style={[
              styles.tabText,
              // Jika tab Info aktif, gunakan warna teks aktif
              activeTab === 'Info' && styles.tabTextActive,
            ]}
          >
            Info
          </Text>
        </TouchableOpacity>

        {/* TAB SKILLS */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            // Jika tab Skills aktif, gunakan style aktif
            activeTab === 'Skills' && styles.tabButtonActive,
          ]}
          // Saat ditekan, ubah tab aktif menjadi Skills
          onPress={() => setActiveTab('Skills')}
        >
          <Text
            style={[
              styles.tabText,
              // Jika tab Skills aktif, gunakan warna teks aktif
              activeTab === 'Skills' && styles.tabTextActive,
            ]}
          >
            Skills
          </Text>
        </TouchableOpacity>

        {/* TAB KONTAK */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            // Jika tab Kontak aktif, gunakan style aktif
            activeTab === 'Kontak' && styles.tabButtonActive,
          ]}
          // Saat ditekan, ubah tab aktif menjadi Kontak
          onPress={() => setActiveTab('Kontak')}
        >
          <Text
            style={[
              styles.tabText,
              // Jika tab Kontak aktif, gunakan warna teks aktif
              activeTab === 'Kontak' && styles.tabTextActive,
            ]}
          >
            Kontak
          </Text>
        </TouchableOpacity>

      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          /* ____________________________________________
          SECTION PROFIL
          Komponen: View, Text, Image
          ____________________________________________ */
          {/* TAB INFO */}
          {activeTab === 'Info' && (
            <>
              {/* SECTION PROFIL */}
              {/* Komponen: View, Text, Image */}
              <View style={styles.profileSection}>
                
                {/* Animated.Image digunakan untuk memberikan animasi pada avatar */}
                <Animated.Image
                  source={require('./assets/photo.jpg')}
                  style={[
                    styles.avatar,
                    {
                      // Animasi scale membuat avatar membesar dan mengecil
                      transform: [
                        {
                          scale: avatarScale,
                        },
                      ],
                    },
                  ]}
                />

                {/* Conditional rendering: badge hanya tampil jika openToWork = true */}
                {openToWork && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>🟩 Open to Work</Text>
                  </View>
                )}

                {/* 2. Text = berbagai ukuran & weight */}
                <Text style={styles.profileName}>{PROFILE.name}</Text>
                <Text style={styles.profileTitle}>{PROFILE.title}</Text>
                <Text style={styles.profileBio}>{PROFILE.bio}</Text>

                {/* Info kontak dalam baris horizontal */}
                <View style={styles.contactRow}>
                  <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
                  <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
                </View>

                <Text style={styles.contactItem}>📞 {PROFILE.phone}</Text>

                {/* 9. TouchableOpacity - tombol sosial media */}
                <View style={styles.socialRow}>
                  {SOCIAL.map((s) => (
                    <TouchableOpacity
                      key={s.id}
                      style={styles.socialBtn}
                      onPress={() => showAlert('Link Sosial Media', s.url)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.socialIcon}>{s.icon}</Text>
                      <Text style={styles.socialLabel}>{s.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 10. Pressable - tombol dengan efek saat ditekan */}
                <Pressable
                  // style bisa berupa fungsi yang menerima { pressed }
                  style={({ pressed }) => [
                    styles.downloadBtn,
                    pressed && styles.downloadBtnPressed,
                  ]}
                  onPress={handleDownloadCV}
                  disabled={downloading}
                >
                  {downloading ? (
                    <View style={styles.downloadLoading}>
                      <ActivityIndicator
                        size="small"
                        color="#ffffff"
                      />

                      <Text style={styles.downloadBtnText}>
                        Mengunduh CV...
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.downloadBtnText}>
                      📄 Download CV (PDF)
                    </Text>
                  )}
                </Pressable>

              </View>

              {/* 12. SectionList - menampilkan data per kategori */}
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Riwayat</Text>

                <Text style={styles.sectionSubtitle}>
                  SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
                </Text>

                <SectionList
                  sections={SECTIONS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TimelineCard
                      item={item}
                      onPress={() => handleCardPress(item)}
                    />
                  )}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                  )}

                  scrollEnabled={false}
                  ItemSeparatorComponent={() => (
                    <View style={{ height: 8 }} />
                  )}
                  SectionSeparatorComponent={() => (
                    <View style={{ height: 16 }} />
                  )}
                />
              </View>

            </>
          )}

          {/* TAB SKILLS */}
          {/* 11. FlatList - menampilkan daftar data secara efisien */}
          {activeTab === 'Skills' && (
            <View style={styles.sectionBox}>

              <Text style={styles.sectionTitle}>
                Keahlian
              </Text>

              <Text style={styles.sectionSubtitle}>
                FlatList digunakan untuk menampilkan daftar data secara efisien
              </Text>

              {/* FlatList menampilkan daftar skill dari data SKILLS */}
              <FlatList
                data={SKILLS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <SkillCard item={item} />
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 8 }} />
                )}
              />

            </View>
          )}
          

          {/* TAB KONTAK */}
          {activeTab === 'Kontak' && (
            <View style={styles.sectionBox}>

              <Text style={styles.sectionTitle}>
                ▸ Hubungi Saya
              </Text>

              <Text style={styles.sectionSubtitle}>
                ↳ TextInput, Button, ActivityIndicator
              </Text>

              {/* 7. TextInput → input nama (single line) */}
              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#888"
                value={senderName}
                onChangeText={setSenderName}
                keyboardType="default"
              />

              {/* 7. TextInput → input pesan (multiline = seperti textarea) */}
                <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />

              /* Kondisi: tampilkan loading atau tombol kirim */
              {sending ? (
                // 13. ActivityIndicator → spinner saat proses
                <View style={styles.loadingRow}>
                  <ActivityIndicator
                    size="large"
                    color="#7c3aed"
                  />

                  <Text style={styles.loadingText}>
                    Mengirim pesan...
                  </Text>
                </View>

              ) : (

                // 8. Button → tombol standar React Native
                <Button
                  title="Kirim Pesan"
                  color="#7c3aed"         // warna tombol
                  onPress={handleSend}      // handler saat ditekan
                />

              )}

            </View>
          )}          

        </ScrollView>

      </KeyboardAvoidingView>

      {/* 14. Modal - dialog pop-up */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>{selectedItem.period}</Text>
                <Text style={styles.modalDivider}>────────────</Text>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCloseText}>Tutup</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={alertVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.alertOverlay}>

          <View style={styles.alertBox}>

            <Text style={styles.alertTitle}>
              {alertTitle}
            </Text>

            <Text style={styles.alertMessage}>
              {alertMessage}
            </Text>

            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.alertButtonText}>
                OK
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>

    </SafeAreaView>
  );

}

const COLORS = {
  bg: '#0f0f1a',        // latar belakang
  gecard: '#1a1a2e',    // kartu/panel
  cardBorder: '#2d2d44',// border kartu
  accent: '#7c3aed',    // ungu utama
  accentLight: '#a78bfa',// ungu muda
  accentGold: '#f59e0b',// emas
  text: '#f0f0f0',      // teks utama
  textMuted: '#9ca3af', // teks redup
  textDim: '#6b7280',   // teks sangat redup
  success: '#4ade80',   // hijau
  white: '#ffffff',
};

const styles = StyleSheet.create({
  // — LAYOUT DASAR ————————————————
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg, // isi penuh layar
  },
  scroll: {
    flex: 1,
  },

  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',              // anak tersusun
    justifyContent: 'space-between',   // ujung kiri & kanan
    alignItems: 'center',              // rata tengah vertikal
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,                      // bayangan (Android)
    shadowColor: '#000',               // bayangan (iOS)
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                            // jarak antar anak
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // LANGKAH 8: STYLE TAB NAVIGASI
  // Container untuk menampung 3 tombol tab
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },

  // Style dasar setiap tombol tab
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',

    // Border bawah transparan digunakan sebagai tempat
    // indikator tab aktif
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },

  // Style ketika tab sedang aktif
  tabButtonActive: {
    borderBottomColor: COLORS.accent,
  },

  // Style teks tab yang tidak aktif
  tabText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },

  // Style teks tab yang sedang aktif
  tabTextActive: {
    color: COLORS.accentLight,
    fontWeight: '700',
  },

  profileSection: {
    alignItems: 'center', // rata tengah horizontal
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24, // sudut kiri bawah melengkung
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55, // lingkaran (width/2)
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,          // tinggi tiap baris teks
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',        // bungkus ke baris baru jika tidak muat
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },

  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },

  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,              // pill shape
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',    // lebih gelap saat ditekan
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  downloadLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },

  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden', // clip anak yang melampaui batas
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
    // width & backgroundColor diset secara inline (dinamis dari data)
  },

  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
  timelinePeriod: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint: { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },

  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    // Platform.OS membedakan iOS dan Android
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // teks mulai dari atas
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)', // hitam transparan
    justifyContent: 'flex-end', // konten di bawah
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod: { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc: { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  alertBox: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#1e1b4b',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.accent,

    elevation: 10,

    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
  },

  alertTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },

  alertMessage: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 22,
  },

  alertButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  alertButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

});