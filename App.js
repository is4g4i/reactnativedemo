import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Import Drawer Menu
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//TODO -> Create structure folder for these screens
function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Inicio</Text>
      </View>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Perfil</Text>
      </View>
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Contactenos</Text>
      </View>
    </View>
  );
}

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  // Utilizar el prop navigation para navegar entre rutas
  function SignInScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function validateLogin() {
      return email.length > 0 && password.length > 0;
    }

    const submitLogin = () => {
      setIsSignedIn(true);
      navigation.navigate("Inicio");
    };

    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder='Email'
            placeholderTextColor='#FFFFFF'
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder='Contraseña'
            placeholderTextColor='#FFFFFF'
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={
            !validateLogin() ? styles.disabledLoginButton : styles.loginButton
          }
          onPress={submitLogin}
          disabled={!validateLogin()}
        >
          <Text style={styles.loginButtonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <NavigationContainer>
        {isSignedIn ? (
          <Drawer.Navigator initialRouteName='Inicio' drawerPosition='left'>
            <Drawer.Screen
              name='Inicio'
              component={HomeScreen}
              options={{ title: "Inicio" }}
            />
            <Drawer.Screen
              name='Perfil'
              component={ProfileScreen}
              options={{ title: "Perfil" }}
            />
            <Drawer.Screen
              name='Contacto'
              component={ContactScreen}
              options={{ title: "Contacto" }}
            />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name='SignIn'
              component={SignInScreen}
              options={{ title: "Iniciar Sesion" }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#0F5583",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "#ffffff",
  },
  loginButton: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#6699cc",
  },
  disabledLoginButton: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#DDDDDD",
  },
  loginButtonText: {
    color: "#ffffff",
  },
});

