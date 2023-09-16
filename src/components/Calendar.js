import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import PushNotification from "react-native-push-notification";

const CalendarScreen = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reminderText, setReminderText] = useState('');

  const setReminder = () => {
    const scheduledDate = new Date(date + 'T' + time);

    PushNotification.localNotificationSchedule({
      message: reminderText,
      date: scheduledDate,
      allowWhileIdle: true,
    });
  };

  return (
    <View>
      <Text>Ustal przypomnienie</Text>
      <TextInput placeholder="Data (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <TextInput placeholder="Czas (HH:MM:SS)" value={time} onChangeText={setTime} />
      <TextInput placeholder="Treść przypomnienia" value={reminderText} onChangeText={setReminderText} />
      <Button title="Ustaw przypomnienie" onPress={setReminder} />
    </View>
  );
};

export default CalendarScreen;