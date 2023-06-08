import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState(); // the 'messages' state is used to store an array of chat messages, setMessages is a function
  const { name, color } = route.params;       // extracts value of 'name' and 'color' parameters from route prop, 
                                              // params is an object that holds the parameters or data passed to the component during navigation

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages)) // 'previousMessages' accesses the previous state of 'messages'
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://cataas.com/cat/says/hello%20world!"
        },
      },
    ]);
    navigation.setOptions({ title: name });   // update navigation title to the value of the 'name' state variable when the component mounts
  }, []);                                     // empty dependency array [] ensures that it runs only once, simulating the behavior of componentDidMount

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Chat;