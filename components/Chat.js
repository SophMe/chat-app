import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;       // extracts value of 'name' and 'color' parameters from route prop, 
                                              // params is an object that holds the parameters or data passed to the component during navigation
  useEffect(() => {
    navigation.setOptions({ title: name });   // update navigation title to the value of the 'name' state variable when the component mounts
  }, []);                                     // empty dependency array [] ensures that it runs only once

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>Hello Chat!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Chat;