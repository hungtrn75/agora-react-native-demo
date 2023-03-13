import {
  StyleSheet,
  Text,
  View,
  TextInput as RNTextInput,
  KeyboardTypeOptions,
} from 'react-native';
import React from 'react';

interface IProps {
  title: string;
  placeholder: string;
  description: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export const TextInput: React.FC<IProps> = ({
  title,
  placeholder,
  description,
  value,
  onChangeText,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        keyboardType={keyboardType}
      />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    height: 46,
    paddingVertical: 0,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  description: {
    fontSize: 13,
  },
});
