import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 40,
    marginBottom: 40,
    marginTop: -10,
  },
  inputContainer: {
    backgroundColor: "#fff3ff",
    borderRadius: 17,
    width: 250,
    height: 43,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  inputIcon: {
    width: 22,
    height: 22,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
  },

  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    borderRadius: 15,
    backgroundColor: "#00a8cc",
    marginVertical: 5,
  },

  toast: {
    color: "#a00",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default globalStyles;
