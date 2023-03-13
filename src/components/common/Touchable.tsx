import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

interface IProps {
  loading: boolean;
  title: string;
  onPress?: () => void;
}

export const Touchable: React.FC<IProps> = ({loading, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={'white'} size="small"/>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 46,
    backgroundColor: '#007BFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    textTransform: 'uppercase',
  },
});
