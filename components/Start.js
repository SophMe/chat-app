import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image.png")}
        resizeMode="cover"
        style={styles.image} 
        />
      <Text>Hello Start Screen!</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Type your name here"
      />
      <Button
      title="Enter chat room"
      onPress={() => navigation.navigate('Chat', { name: name })} // object as a second parameter representing the data we want to use in the screen we're transitioning to
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom:15
  }
});

export default Start;