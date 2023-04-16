import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { TextInput, List, IconButton, Divider } from 'react-native-paper';
import axios from 'axios';
import { Linking } from 'react-native';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';


const ImprtntNum = () => {
    
    const [phonebook, setPhonebook] = useState([]);
    const [newPhone, setNewPhone] = useState('009756841');
    const [newTitle, setNewTitle] = useState('Hotel');
    const [newNotes, setNewNotes] = useState('blah blah');
    const { simulatorAPI } = useAPI();
    const { currentUser } = useUser();

    const fetchPhonebook = async () => {
        const response = await axios.get(`${simulatorAPI}/api/Phones/groupId/${currentUser.groupId}`);
        setPhonebook(response.data);
    };

    useEffect(() => {
        fetchPhonebook();
    }, []);

    const deletePhonebookEntry = async (id) => {
        await axios.delete(`${simulatorAPI}/api/Phones/id/${id}`);
        fetchPhonebook();
    };

    const addPhonebookEntry = async () => {
        if (!newPhone || !newTitle || !newNotes) {
            Alert.alert('Error', 'All fields are required')
            return;
        }
        const newEntry = {
            id: 0,
            phone: newPhone,
            title: newTitle,
            notes: newNotes,
            groupId: currentUser.groupId
        };
        await axios.post(`${simulatorAPI}/api/Phones`, newEntry);
        setNewPhone('');
        setNewTitle('');
        setNewNotes('');
        fetchPhonebook();
    };

    const renderItem = ({ item }) => {
        return (
            <List.Item
                style={{ borderWidth: 0.5 }}
                title={item.title}
                description={item.notes}
                onPress={() => {
                    Linking.openURL(`tel:${item.phone}`);
                }}
                right={() => (
                    <View style={{ flexDirection: 'row' }}>
                        <>
                            {item.groupId !== 0 && (<IconButton icon="delete" onPress={() => deletePhonebookEntry(item.id)} />)}
                            <IconButton icon="phone" style={{ marginRight: '-5%' }} />
                        </>
                    </View>
                )}
            />
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ backgroundColor: 'white' }}
                data={phonebook}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
            />
            <Divider bold={true} />
            <Text style={{ fontSize: 20, paddingLeft: 15 }}>Add new number:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                <TextInput
                    style={{ flex: 1, marginRight: 8, backgroundColor: 'white' }}
                    label="Phone"
                    value={newPhone}
                    onChangeText={setNewPhone}
                />
                <TextInput
                    style={{ flex: 1, marginRight: 8, backgroundColor: 'white' }}
                    label="Title"
                    value={newTitle}
                    onChangeText={setNewTitle}
                />
                <TextInput
                    style={{ flex: 1, backgroundColor: 'white' }}
                    label="Notes"
                    value={newNotes}
                    onChangeText={setNewNotes}
                />
                <IconButton mode='contained' icon="plus" onPress={addPhonebookEntry} />
            </View>
        </View>
    );
};

export default ImprtntNum;
