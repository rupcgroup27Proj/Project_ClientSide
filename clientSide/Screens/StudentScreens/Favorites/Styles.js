import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 7,
    marginTop: 7,
  },
  username: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  image: {
    height: 280,
    width: "100%",
    marginTop:10
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
  card2: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    height: 280,
    width: "90%",
    backgroundColor: "gray",
  },
  container: {
    marginBottom: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
