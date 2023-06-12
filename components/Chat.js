import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, onSnapshot, addDoc, query, orderBy  } from "firebase/firestore";
 
const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState();       // the 'messages' state is used to store an array of chat messages, setMessages is a function
  const { name, color, userID } = route.params;     // extracts value of 'name' and 'color' parameters from route prop, 
                                                    // params is an object that holds the parameters or data passed to the component during navigation

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
          };
        });
  
        setMessages(newMessages);
      }
    );
  
    navigation.setOptions({ title: name });
  
    return () => {
      unsubscribe();  // Clean the listener when the component unmounts
    };
  }, []);             // empty dependency array [] ensures that it runs only once, simulating the behavior of componentDidMount
  
  const onSend = (newMessages) => {
  addDoc(collection(db, "messages"), newMessages[0]);
  }

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
          _id: userID,
          name: name
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