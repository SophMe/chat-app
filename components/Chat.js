import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState(); // the 'messages' state is used to store an array of chat messages, setMessages is a function
  const { name, color } = route.params;       // extracts value of 'name' and 'color' parameters from route prop, 
                                              // params is an object that holds the parameters or data passed to the component during navigation

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
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
      { // message with quick reply options
        _id: 3,
        text: "Gifted Chat is amazing. Do you agree?",
        createdAt: new Date(),
        quickReplies: {
          type: "agree",
          keepIt: true,
          values: [
            {
              title: "Yes",
              value: "yes",
            },
            {
              title: "No",
              value: "no",
            },
          ],
          user: {
            _id: 1,
            name: "React Native",
            avatar: "https://cataas.com/cat/says/hello%20world!"
          },
        }
      }
    ]);
    navigation.setOptions({ title: name });   // update navigation title to the value of the 'name' state variable when the component mounts
  }, []);                                     // empty dependency array [] ensures that it runs only once, simulating the behavior of componentDidMount


  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages)) // 'previousMessages' accesses the previous state of 'messages'
  };

  const renderBubble = (props) => {
    return <Bubble 
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#a3e0cc"
        },
        left: {
          backgroundColor: "#e0d4a3"
        }
      }}
    />
  }
  
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      { Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Chat;