import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, Image, TouchableOpacity } from "react-native";
import appBackground from "../assets/image.png";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');     // initialize state variable named 'name' and function named 'setName' with initial value of an empty string
  const [color, setColor] = useState('');   // users can change background color with TouchableOpacity
  const colorOption = [ '#d2b0fe', '#b0befe', '#fed1b0', '#bcfeb0' ]

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
      <View>
        <Text style={styles.text}>Choose a background color</Text>
        <View style={styles.colorContainer}>
          {colorOption.map((colorItem, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorOption, { backgroundColor: colorItem }]}
              onPress={() => setColor(colorItem)}
            />
          ))}
        </View>
      </View>

      <Button
      title="Enter chat room"
      onPress={() => navigation.navigate('Chat', { name: name, color: color })} // object as a second parameter representing the data we want to use in the screen we're transitioning to
      color="whitesmoke"
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
  text: {
    textAlign: 'center',
    padding: 5
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
  image: {
    position: 'absolute',
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5
  }
});

export default Start;