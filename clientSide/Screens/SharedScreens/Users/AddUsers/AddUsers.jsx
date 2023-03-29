import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Styles } from "./Styles"

const AddUsers = () => {

  const [fileUri, setFileUri] = useState('');

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      copyToCacheDirectory: false,
    });

    if (result.type === 'success') {
      setFileUri(result.uri);
    }
  };

  const uploadFile = async () => {
    let formData = new FormData();
    let file = {
      uri: fileUri,
      name: 'file.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    formData.append('file', file);

    await fetch('http://your-server-url.com/upload', {
      method: 'POST',
      body: formData,
    });

    setFileUri('');
  };

  return (
    <>
      {fileUri ? (
        <Text>Selected file: {fileUri}</Text>
      ) : (
        <Button title="Pick an Excel file" onPress={pickDocument} />
      )}

      {fileUri && <Button title="Upload file" onPress={uploadFile} />}
    </>
  );
};


export default AddUsers;