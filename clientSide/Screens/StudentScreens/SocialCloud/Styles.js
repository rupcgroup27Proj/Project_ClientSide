import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white'
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
  },
  userNameComment: {
    fontWeight: "bold",
    fontSize: 12,
  },
  image: {
    height: 280,
    width: "100%"
  },
  video: {
    height: 280,
    width: 340,
    marginTop: 5,
  },
  header: {
    backgroundColor: "#fff",
    elevation: 0,
    paddingTop: 2,
  },
  title: {
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadcard: {
    borderRadius: 10,
    overflow: "hidden",
    height: 260,
    width: "90%",
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: "gray",
  },
  commentCard: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 7,
    height: 340,
    marginTop: 7,
    marginBottom: 10,
  },
  container: {
    marginBottom: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
