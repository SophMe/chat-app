import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
// import * as MediaLibrary from 'expo-media-library';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
  const actionSheet = useActionSheet();
  // display action menu
  const onActionPress = () => {
    const options = ["Choose from library", "Take photo", "Send location", "Cancel"];
    const cancelButtonIndex = options.length - 1;   // -1 is cancel option (cancel has index 3 out of 4 options)
    // ActionSheet
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            console.log("user wants to pick and image");
            return;
          case 1:
            takePhoto();
            console.log("user wants to take a photo");
            return;
          case 2:
            getLocation();
            console.log("user want to get their location");
            default:
        }
      },
    );
  };

  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  }

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const response = await fetch(imageURI);
    const blob = await response.blob();       // convert image into binary larger object
    const newUploadRef = ref(storage, uniqueRefString);
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      console.log("File upload successfull");
      // send image as message so it shows up in message bubble
      const imageURL = await getDownloadURL(snapshot.ref)
      onSend({ image: imageURL})
    });
  }

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {                             //  ?. checks if permissions object is not null or undefined before accessing its granted property
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
      console.log('uploading and uploading the image occurs here');
    }
  }

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
      console.log('uploading and uploading the image occurs here'); 
    }
  }

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions to read location not granted");
  }

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onActionPress}>
      {/* [] : array of styles within JSX component */}
        <View style={[styles.wrapper, wrapperStyle]}>
          <Text style={[styles.iconText, iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;