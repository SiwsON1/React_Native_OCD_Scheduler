import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
  Modal,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import ChecklistItem from '../components/CheckListItem';
import ScreenHeaderBtn from '../components/ScreenHeaderBtn';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const storedItems = await SecureStore.getItemAsync('items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (newItem && roomName) {
      const newItems = [...items, { item: newItem, room: roomName }];
      setItems(newItems);
      setNewItem('');
      setRoomName('');
      await SecureStore.setItemAsync('items', JSON.stringify(newItems));
      setModalVisible(false);
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6f7ff' }}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <ChecklistItem key={index} item={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => (
          <View style={{ padding: 20 }}>
            <Button title="Dodaj" onPress={() => setModalVisible(true)} />
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10, width: '80%', height: '60%' }}>
            <TextInput
              placeholder="Nazwa przedmiotu"
              value={newItem}
              onChangeText={(text) => setNewItem(text)}
              style={{ marginBottom: 20 }}
            />
            <TextInput
              placeholder="Nazwa pokoju"
              value={roomName}
              onChangeText={(text) => setRoomName(text)}
              style={{ marginBottom: 20 }}
            />
            <View style={{ marginBottom: 20 }}>
              <Button title="Dodaj" onPress={handleAddItem} />
            </View>
            <Button title="Anuluj" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;