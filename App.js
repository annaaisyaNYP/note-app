import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase(notes.db);
const samplenotes = [
  { title: "Walk teh cat", id: "0", done: false },
  { title: "Buy milk", id: "", done: false },
  { title: "Cook lunch", id: "2", done: false },
  { title: "Water the plants", id: "3", done: false },
];

function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState(samplenotes);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <Entypo
            name="new-message"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>;
      },
    });
  });

  function renderItem({ item }) {
    return (
      <View style={styles.listItem}>
        <Text>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={samplenotes}
        renderItem={renderItem}
      />
    </View>
  );
}

function addScreen() {
  return <Text>new screen created</Text>;
}

const Stack = createStackNavigator();
const NotesStack = createStackNavigator();

function NotesStackScreen() {
  return (
    <NotesStack.Navigator>
      <NotesStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headerTitle: "Notes App",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
        }}
      />
    </NotesStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="NoteStack"
          component={NotesStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add" component={addScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 30,
  },
  headerStyle: {
    height: 120,
    backgroundColor: "yellow",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  list: {
    width: "100%",
    padding: 10,
  },
  listItem: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
