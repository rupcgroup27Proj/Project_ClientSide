import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  newPostImage: {
    width: 350,
    height: 350,
    marginTop: 35,
    marginBottom: 35,
    marginLeft: 25,
    marginRight: 35,
    resizeMode: "contain",
  },
  newPostContainer: {
    backgroundColor: "#666",
    height: "100%",
  },
  iconCamera: {
    backgroundColor: "#000",
    marginTop: 50,
    marginLeft: 85,
    marginRight: 85,
  },
});
