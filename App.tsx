import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Bildirim ayarlarını yapılandırma
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function WaterTrackerApp() {
  const [waterGoal, setWaterGoal] = useState<number>(2000); // Günlük su hedefi (ml)
  const [currentIntake, setCurrentIntake] = useState<number>(0); // İçilen su miktarı (ml)

  // Su verilerini AsyncStorage'dan yükleme
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

  // Su içme miktarını ekleme ve kaydetme
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

  // Bildirim zamanlayıcı ayarlama (saatlik)
  const scheduleReminder = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Su İçme Zamanı!",
          body: "Bir bardak su içmeyi unutmayın.",
        },
        trigger: { seconds: 10, repeats: true }, 
      });
      Alert.alert('Hatırlatma ayarlandı', 'Her saat başı su içmeniz hatırlatılacak.');
    } catch (e) {
      console.error("Hatırlatma ayarlanırken bir hata oluştu", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Su Tüketimi Takip</Text>
      <Text style={styles.text}>Günlük Hedef: {waterGoal} ml</Text>
      <Text style={styles.text}>İçilen Su: {currentIntake} ml</Text>

      <View style={styles.buttonContainer}>
        <Button title="200 ml Su Ekle" onPress={() => addWaterIntake(200)} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="500 ml Su Ekle" onPress={() => addWaterIntake(500)} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Hatırlatma Ayarla" onPress={scheduleReminder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
