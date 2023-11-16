import { StyleSheet } from "react-native";
import theme from "./theme";

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
  },
  button:{
    color: 'white',
    fontStyle: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  separator: {
    height: 10
  }
})

export default styles;