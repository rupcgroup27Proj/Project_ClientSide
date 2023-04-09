import React, { useEffect, useState } from 'react';
import { Alert, View, Text, ScrollView } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import axios from 'axios';
import { Styles } from "./Styles"
import { useUser } from '../../../../Components/Contexts/UserContext';
import { useAPI } from '../../../../Components/Contexts/APIContext';

const AllUsers = () => {

  const { currentUser } = useUser()
  const { simulatorAPI } = useAPI();
  const [students, setStudents] = useState([]);
  const [sortDirection, setSortDirection] = useState(null);
  const [sortedField, setSortedField] = useState(null);

  useEffect(() => {
    axios.get(`${simulatorAPI}/api/Students/groupId/${currentUser.groupId}`) // replace with your API endpoint
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        Alert.alert('Error', 'Encounterd an error while fetching students.');
      });
  }, []);

  const handleSort = (field) => {
    if (field === sortedField) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortedField(field);
      setSortDirection('ascending');
    }
  }

  const getSortedData = () => {
    if (sortedField) {
      return [...students].sort((a, b) => {
        if (sortDirection === 'ascending') {
          return a[sortedField] > b[sortedField] ? 1 : -1;
        } else {
          return a[sortedField] < b[sortedField] ? 1 : -1;
        }
      });
    } else {
      return students;
    }
  }

  return (
    <ScrollView>
      <View style={Styles.textView}>
        <Text style={Styles.text}>All students of group {currentUser.groupId}</Text>
      </View>
      <Divider bold={true} />

      <ScrollView horizontal={true}>
        {students.length > 0 ? (
          <DataTable>
            <DataTable.Header style={Styles.header}>
              <DataTable.Title style={Styles.title} sortDirection={sortedField === 'studentId' ? sortDirection : null} onPress={() => handleSort('studentId')} >Student ID</DataTable.Title>
              <DataTable.Title style={Styles.title} sortDirection={sortedField === 'firstName' ? sortDirection : null} onPress={() => handleSort('firstName')}>First Name</DataTable.Title>
              <DataTable.Title style={Styles.title} sortDirection={sortedField === 'lastName' ? sortDirection : null} onPress={() => handleSort('lastName')}>Last Name</DataTable.Title>
              <DataTable.Title style={Styles.title} sortDirection={sortedField === 'email' ? sortDirection : null} onPress={() => handleSort('email')}>Email</DataTable.Title>
              <DataTable.Title style={Styles.title} sortDirection={sortedField === 'phone' ? sortDirection : null} onPress={() => handleSort('phone')}>Phone</DataTable.Title>
              <DataTable.Title style={Styles.title} sortDirection={sortedField === 'parentPhone' ? sortDirection : null} onPress={() => handleSort('parentPhone')}>Parent Phone</DataTable.Title>
            </DataTable.Header>

            {getSortedData().map(student => (
              <DataTable.Row key={student.studentId}>
                <DataTable.Cell style={Styles.cell} numeric>{student.studentId}</DataTable.Cell>
                <DataTable.Cell style={Styles.cell}>{student.firstName}</DataTable.Cell>
                <DataTable.Cell style={Styles.cell}>{student.lastName}</DataTable.Cell>
                <DataTable.Cell style={Styles.cell}>{student.email}</DataTable.Cell>
                <DataTable.Cell style={Styles.cell} numeric>{student.phone}</DataTable.Cell>
                <DataTable.Cell style={Styles.cell} numeric>{student.parentPhone}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <Text style={Styles.text}>No students found.</Text>
        )}
      </ScrollView>
    </ScrollView >
  );
};

export default AllUsers;
