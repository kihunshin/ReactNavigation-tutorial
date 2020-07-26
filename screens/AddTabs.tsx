import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center } from "./Center";
import { AppParamList } from "./AppParamList";
import { Text, Button } from "react-native";
import { AuthContext } from "./AuthProvider";
interface AddTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

function Home() {
  const { logout } = useContext(AuthContext);
  return (
    <Center>
      <Text>Home</Text>
      <Button title="로그아웃" onPress={() => logout()} />
    </Center>
  );
}

function Search() {
  return (
    <Center>
      <Text>search</Text>
    </Center>
  );
}

export const AddTabs: React.FC<AddTabsProps> = ({}) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
    </Tabs.Navigator>
  );
};
