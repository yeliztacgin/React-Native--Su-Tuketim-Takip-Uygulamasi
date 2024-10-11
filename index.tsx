import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icons from '../component/icon';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter(); // useRouter kullan

    const tikla = () => {
        router.replace('/gender'); // pathname kullanmadan yönlendir
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, marginBottom: 40, textAlign: 'center', color: 'green', fontWeight: '700' }}>
                Güne Güzel Başla
            </Text>
            <Image style={{ width: 400, height: 400 }} source={require('../assets/3918943.jpg')} />
            
            {/* Icons bileşenini ekle ve yönlendirme fonksiyonunu geçir */}
            <Icons showOnly="arrow-right" onIconPress={tikla} />
        </View>
    );
}
