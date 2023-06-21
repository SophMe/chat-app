import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, onSnapshot, addDoc, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
 
const Chat = ({ route, navigation, db, storage, isConnected }) => {
  const [messages, setMessages] = useState([]);     // the 'messages' state is used to store an array of chat messages, setMessages is a function
  const { name, color, userID } = route.params;     // extracts value of 'name' and 'color' parameters from route prop, 
                                                    // params is an object that holds the parameters or data passed to the component during navigation
  
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }                                                 
  
  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
  
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          const data = doc.data();
          newMessages.push({
            ...doc.data(),
            id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
              id: data.user.id,
              name: data.user.name,
            },
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }
  
    return () => {
      if (unsubMessages) unsubMessages(); // clean the listener when the component unmounts
    };
  }, [isConnected]);
        
  const onSend = (newMessages) => {
  addDoc(collection(db, "messages"), newMessages[0]); // send new messages to Firestore
  }

  // customize some rendering behavior on Gifted Chat
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

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props}/>;
    else return null;
  }

  const renderCustomActions = (props) => {     // props object contains Gifted Chat’s onSend() method
    return <CustomActions onSend={onSend} storage={storage} {...props} />;
  }

  const renderCustomView = (props) => {
    const { currentMessage } = props;       // extract currentMessage property from props object
    if (currentMessage.location) {
      return (
        <MapView
          style={{width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3}}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          onSend={(messages) => onSend(messages)}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          user={{
            id: String(userID),
            name: name
          }}
        />
        { Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Chat;