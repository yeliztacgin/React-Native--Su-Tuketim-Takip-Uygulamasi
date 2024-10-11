import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WaterTrackerScreen() {
  const [waterGoal, setWaterGoal] = useState<number>(2000);
  const [currentIntake, setCurrentIntake] = useState<number>(0);
  const [removeAmount, setRemoveAmount] = useState<string>(''); // Su çıkarma miktarı için state

  useEffect(() => {
    const loadWaterData = async () => {
      try {
        const savedIntake = await AsyncStorage.getItem('currentIntake');
        if (savedIntake !== null) {
          setCurrentIntake(JSON.parse(savedIntake));
        }
      } catch (e) {
        console.error("Veri yüklenirken bir hata oluştu", e);
      }
    };
    loadWaterData();
  }, []);

  const addWaterIntake = async (amount: number) => {
    try {
      const newIntake = currentIntake + amount;
      setCurrentIntake(newIntake);
      await AsyncStorage.setItem('currentIntake', JSON.stringify(newIntake));

      if (newIntake >= waterGoal) {
        Alert.alert('Tebrikler!', 'Günlük su hedefinize ulaştınız.');
      }
    } catch (e) {
      console.error("Su miktarı kaydedilemedi", e);
    }
  };

  const removeWaterIntake = async () => {
    const amountToRemove = parseInt(removeAmount, 10);
    
    if (isNaN(amountToRemove) || amountToRemove <= 0) {
      Alert.alert('Hata!', 'Lütfen geçerli bir miktar girin.');
      return;
    }

    try {
      const newIntake = Math.max(0, currentIntake - amountToRemove); // Su miktarını sıfırdan küçük olmaması için kontrol et
      setCurrentIntake(newIntake);
      await AsyncStorage.setItem('currentIntake', JSON.stringify(newIntake));
      setRemoveAmount(''); // Giriş alanını sıfırla
      Alert.alert('Başarılı!', `${amountToRemove} ml su çıkarıldı.`);
    } catch (e) {
      console.error("Su miktarı çıkarılamadı", e);
    }
  };

  return (
    <View style={styles.container}>
        <Image style={{width:350,height:350,marginBottom:50}} source={require('../assets/7664319.jpg')}></Image>
      <Text style={styles.header}>Su Tüketimi Takip</Text>
      <Text style={styles.text}>Günlük Hedef: {waterGoal} ml</Text>
      <Text style={styles.text}>İçilen Su: {currentIntake} ml</Text>

      <View style={styles.buttonContainer}>
  <Button title="200 ml Su Ekle" onPress={() => addWaterIntake(200)} />
  <View style={styles.buttonSpacer} />
  <Button title="500 ml Su Ekle" onPress={() => addWaterIntake(500)} />
</View>


      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Çıkarılacak Su Miktarı (ml)"
        value={removeAmount}
        onChangeText={setRemoveAmount}
      />
      <Button title="Yanlış girilen su miktarı çıkart" onPress={removeWaterIntake} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    color:'pink',
  },
  buttonSpacer: {
    height: 10, // Burada istediğiniz boşluk miktarını ayarlayabilirsiniz
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    marginTop:20,
    padding: 10,
    width: '80%',
  },
});
