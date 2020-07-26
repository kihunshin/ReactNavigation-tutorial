import React, { useContext, useEffect, useState } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Center } from "./Center";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { RouteProp } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { AddTabs } from "./AddTabs";
interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>로그인 화면 만들 예정</Text>
      <Button
        title="로그인"
        onPress={() => {
          login();
        }}
      />

      <Button
        title="회원가입"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}

function Register({ navigation, route }: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text> 회원가입 화면 만들 예정{route.name}</Text>
      <Button
        title="돌아가기"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </Center>
  );
}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          login();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <AddTabs />
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{ headerTitle: "아!맞다!" }}
            component={Login}
          />
          <Stack.Screen
            name="Register"
            options={{
              headerTitle: "회원가입",
            }}
            component={Register}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
