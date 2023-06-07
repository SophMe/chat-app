import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, Image } from "react-native";
import appBackground from "../assets/image.png";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');     // initialize state variable named 'name' and function named 'setName' with initial value of an empty string

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require("../assets/image.png")}
        resizeMode="cover"
        style={styles.image} 
        /> */}
        <Image source={appBackground} style={styles.image} />
      <Text>Hello Start Screen!</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}               // value of 'name' state changes according to text input from the user
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
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom:15
  },
  image: {
    position: 'absolute',
  }
});

export default Start;