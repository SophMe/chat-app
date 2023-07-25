## chat-app

### Description
This React Native app provides users with a chat interface and options to share images and their location. Data is stored in Firebase.

### Key Features
* Start page - Users can enter their name and choose a background color for the chat screen before joining the chat.
* Chat view - Shows the conversation, as well as an input field, submit button and a button for custom actions.
* Custom actions - Option to choose an image from the user's library, taking a photo and sending those images as well as location data.
* Data storage - Data gets stored online and offline.

### User stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

### Tech Stack
* React Native
  * Gifted Chat
  * Net Info
  * Async Storage
  * Maps
* Expo
* Firebase

### Setting up the app
#### Prerequisites
* Node.js version 16.19.0 (At the time of writing, Expo only supports Node 16)
* Firebase account

#### Installation
* Clone the Repository
* Navigate to the project in the terminal
* Run `npm install` to install dependencies from package.json
* Create an account on Firebase and create a project
* Copy the configuration object and paste it in the firebaseConfig object in the code.
* Install Expo `npm install -g expo-cli`
* Install the Expo Go app on your phone to run the app on it
* Run `npx expo start` in your terminal so you can open it in Expo Go
