import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Touchable} from '../../components';
import {AppParamList} from '../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface IProps {
  navigation: NativeStackNavigationProp<AppParamList>;
}

export const UserInformationScreen: React.FC<IProps> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('b3406df32e524b3c8d002c527173d55f');
  const [token, setToken] = useState(
    '006b3406df32e524b3c8d002c527173d55fIADGFeIp3p0+R7uZejPKx1bqzoeZq3YEefUNX2zvvYP3AuAS44q379yDEAC7Yc4AHEAQZAEAAQCs/A5k',
  );
  const [channelName, setChannelName] = useState('MyChannel');
  const [userId, setUserId] = useState('1');

  const onJoinChannel = async () => {
    setLoading(true);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(
      `https://agora-token-service-production-11a3.up.railway.app/rtc/${channelName}/1/uid/${userId}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result));
        const resp: {rtcToken: string} = JSON.parse(result);
        navigation.navigate('call', {
          appId,
          token: resp.rtcToken,
          channelName,
          userId: parseInt(userId),
        });
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={appId}
        onChangeText={setAppId}
        placeholder="Enter the appid"
        description="You find your APP ID in the Agora Console"
        title="APP ID"
      />
      <TextInput
        value={token}
        onChangeText={setToken}
        placeholder="Enter the app token"
        description="To create a temporary token, edit your project in Agora Console."
        title="Token"
      />
      <TextInput
        value={channelName}
        onChangeText={setChannelName}
        placeholder="Enter the channel name"
        description="You create a channel when you create a temporary token. You guessed it, in Agora Console"
        title="Channel Name"
      />
      <TextInput
        value={userId}
        onChangeText={setUserId}
        placeholder="Enter the user ID"
        description=""
        title="User ID"
        keyboardType="numeric"
      />
      <Touchable
        title="Join Channel"
        onPress={onJoinChannel}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
