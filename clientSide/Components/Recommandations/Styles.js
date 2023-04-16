import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  intro: {
    padding: 10,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  imageView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});