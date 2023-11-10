import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import theme from '../utils/theme';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
    marginHorizontal: 10,
  },
  box:{
    fontStyle: theme.fonts.main,
    color: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius:4,
    marginTop: 10,
    marginHorizontal: 10,
    padding:10
  },
  colorBox: {
    borderColor: theme.colors.error
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const boxStyle = [
    styles.box,
    showError && styles.colorBox
  ]
  
  return (
    <>
      <TextInput
        style={boxStyle}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;