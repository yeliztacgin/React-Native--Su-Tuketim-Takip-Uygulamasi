import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Router'ı kullan

export default function GenderSelection() {
    const router = useRouter(); // Router'ı al
    const [selectedGender, setSelectedGender] = useState<string | null>(null); // Seçilen cinsiyet durumu

    const handleGenderSelect = (gender: string) => { // 'gender' parametresinin tipi 'string'
        setSelectedGender(gender); // Seçilen cinsiyeti ayarla
    };

    const navigate = () => {
        if (selectedGender === 'Kadın') {
            router.replace('/water'); // Kadın için su sayfasına yönlendir
        } else if (selectedGender === 'Erkek') {
            router.replace('/water'); // Erkek için ana sayfaya yönlendir
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seçim Yapınız</Text>

            {/* Kadın seçeneği */}
            <TouchableOpacity
                style={[styles.button, selectedGender === 'Kadın' && styles.selectedButton]} // Seçilen cinsiyet kontrolü
                onPress={() => handleGenderSelect('Kadın')}
            >
                <Text style={styles.buttonText}>Kadın</Text>
            </TouchableOpacity>

            {/* Erkek seçeneği */}
            <TouchableOpacity
                style={[styles.button, selectedGender === 'Erkek' && styles.selectedButton]} // Seçilen cinsiyet kontrolü
                onPress={() => handleGenderSelect('Erkek')}
            >
                <Text style={styles.buttonText}>Erkek</Text>
            </TouchableOpacity>

            {/* Yönlendirme Butonu */}
            <TouchableOpacity
                style={styles.navigateButton}
                onPress={navigate} // Yönlendirme fonksiyonunu çağır
                disabled={!selectedGender} // Seçim yapılmadıysa butonu devre dışı bırak
            >
                <Text style={styles.navigateButtonText}>Devam Et</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // İsteğe bağlı arka plan rengi
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF', // Buton arka plan rengi
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        width: '80%', // Butonlar ekranın bir kısmını kaplasın
        alignItems: 'center', // Metni ortala
    },
    buttonText: {
        color: '#FFFFFF', // Metin rengi
        fontSize: 20,
        textAlign: 'center',
    },
    selectedButton: {
        backgroundColor: '#FFD700', // Seçilen buton için sarı renk
    },
    navigateButton: {
        backgroundColor: '#28A745', // Yönlendirme butonu için yeşil arka plan rengi
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        width: '80%', // Ekranın bir kısmını kaplasın
        alignItems: 'center',
    },
    navigateButtonText: {
        color: '#FFFFFF', // Metin rengi
        fontSize: 20,
        textAlign: 'center',
    },
});
