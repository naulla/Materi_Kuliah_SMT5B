# Laporan Praktikum 4: React Native Navigation #

## Tujuan Pembelajaran ##
Mahasiswa mampu:
1. Merancang dan merapikan navigasi antar layar (screen) pada aplikasi React Native.
2. Menggunakan library React Navigation (Stack Navigator, Tab Navigation, Drawr Navigation).

## Alur Praktikum 1 ##

### Langkah 1: Instalisasi Proyek dan Instalasi Dependencies React Native ###
1. Buka terminal atau commad prompt
2. Ubah directory ke Folder Pertemuan 4 (cd "pemrograman mobile\pertemuan-4")
3. Buat proyek baru menggunakan perintah berikut : 'npx create-expo-app ptmn4 --template blank'
4. Masuk ke dalam folder proyek menggunakan perintah berikut ; 'cd ptmn4'
5. Install core navigation library (npm install @react-navigation/native)
6. Install dependensi pendukung (wajib untuk Expo) 'npx expo install react-native-screensreact-native-safe-area-context react native-gesture-handler react-native-reanimated

### Langkah 2: Membuat Stack Navigator ###
1. Instalasi Pustaka Stack : npm install @react-navigation/native-stack
2. Buat Folder didalam projek dengan nama screens
3. didalam folder screens buat 2 file dengan nama login.js dan Sigup.js
4. Masukkan kode sesuai pada Modul Praktikum 4
5. Sesuaikan file App.js dengan kode yang ada pada modul.
6. Simpan dan Install depedensi untuk web "npx expo install react-dom react-native-web"
7. Jalankan perintah npx expo start --web
8. Konfirmasi Bukti

![alt text](<Screen Recording 2026-10-03 194111.gif>)


## Alur Praktikum 2 ##

### Langkah 1: Instalasi Pustaka Bottom Tabs ###
1. instal "npm install @react-navigation/bottom-tabs"

### Langkah 2: Membuat Layar Baru ###
1. Buat file `HomeScreen.js` dan `ProfileScreen.js` di dalam folder `screens`.
2. Konfirmasi Bukti

<img src=image.png width="50%">

<img src=image-1.png width="50%">

### Langkah 3: Konfigurasi Tab di `App.js` ###
1. Mengubah isi `App.js`
2. Konfirmasi Bukti

<img src=image-2.png width="50%">


## Alur Praktikum 3 ##

### Langkah 1: Instalasi Pustaka Drawer ###
1. install 'npm install @react-navigation/drawer'

### Langkah 2: Konfigurasi Drawer di `App.js` ###
1. Mengubah kembali file `App.js` untuk mencoba Drawer Navigation menggunakan layar Home dan Profile yang sudah dibuat sebelumnya.
2. Konfirmasi Bukti

<img src=image-3.png width="50%">

![alt text](<Screen Recording 2026-10-03 202153.gif>)