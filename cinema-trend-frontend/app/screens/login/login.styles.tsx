import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark.backgroud,
  },
  surface: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: 350,
    backgroundColor: colors.dark.foregound,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 15,
  },
  title: {
    color: colors.dark.text,
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 35,
    borderRadius: 20,
    borderColor: colors.dark.white,
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 40,
    paddingRight: 5,
    color: colors.dark.gray,
    fontSize: 20,
  },
});
