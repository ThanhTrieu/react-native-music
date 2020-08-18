import * as React from 'react';
import { Button } from 'react-native-paper';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { navigationRef } from './NavigationService';
import Home from 'app/screens/Home';
import Category from 'app/screens/Category';
import Composer from 'app/screens/Composer';
import Singer from 'app/screens/Singer';
import Song from 'app/screens/Song';
import Sound from 'app/screens/Player';
import Search from 'app/screens/Search';
import AuthorInformation from 'app/components/drawer/Author';

const HomeStack     = createStackNavigator();
const CategoryStack = createStackNavigator();
const ComposerStack = createStackNavigator();
const SingerStack   = createStackNavigator();
const SongStack     = createStackNavigator();

// tab navigation
const Tab = createBottomTabNavigator();
// drawer navigation
const Drawer = createDrawerNavigator();

const headerOptions = ({navigation}) => {
  return {
    title: 'My music style',
    headerStyle: {
      //backgroundColor: '#f4511e',
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: () => (
      <Button 
        icon="reorder-horizontal"
        labelStyle={{ fontSize: 28 }}
        color="gray"
        onPress={() => navigation.openDrawer()}
      >
      </Button>
    ),
    headerRight: () => (
      <Button 
        icon="magnify"
        labelStyle={{ fontSize: 28 }}
        color="gray"
        onPress={() => navigation.navigate('SearchData')}
      >
      </Button>
    )
  }
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeRoute"
        component={Home}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <HomeStack.Screen 
        name="SearchData"
        component={Search}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
    </HomeStack.Navigator>
  );
}

function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="CategoryRoute"
        component={Category}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <CategoryStack.Screen 
        name="SongRoute"
        component={Song}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <CategoryStack.Screen   
        name="SoundRoute"
        component={Sound}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <CategoryStack.Screen 
        name="SearchData"
        component={Search}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
    </CategoryStack.Navigator>
  )
}

function ComposerStackScreen() {
  return (
    <ComposerStack.Navigator>
      <ComposerStack.Screen 
        name="ComposerRoute"
        component={Composer}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <ComposerStack.Screen 
        name="SongRoute"
        component={Song}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <ComposerStack.Screen   
        name="SoundRoute"
        component={Sound}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <ComposerStack.Screen 
        name="SearchData"
        component={Search}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
    </ComposerStack.Navigator>
  )
}

function SingerStackScreen () {
  return (
    <SingerStack.Navigator>
      <SingerStack.Screen 
        name="SingerRoute"
        component={Singer}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <SingerStack.Screen 
        name="SongRoute"
        component={Song}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <SingerStack.Screen   
        name="SoundRoute"
        component={Sound}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <SingerStack.Screen 
        name="SearchData"
        component={Search}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
    </SingerStack.Navigator>
  )
}

function SongStackScreen () {
  return (
    <SongStack.Navigator>
      <SongStack.Screen 
        name="SongRoute"
        component={Song}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
      <SongStack.Screen   
        name="SoundRoute"
        component={Sound}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
       <SongStack.Screen 
        name="SearchData"
        component={Search}
        options = {({ navigation }) => headerOptions({ navigation })}
      />
    </SongStack.Navigator>
  )
}

function MyCustomTabNavigator () {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Category') {
            iconName = focused ? 'ballot' : 'ballot-outline';
          } else if (route.name === 'Singer') {
            iconName = focused ? 'account-star' : 'account-star-outline'
          } else if (route.name === 'Composer') {
            iconName = focused ? 'account-music' : 'account-music-outline'
          } else if (route.name === 'Song') {
            iconName = focused ? 'music-circle' : 'music-circle-outline'
          }
          // You can return any component that you like here!
          return(
            <Button
              icon={iconName}
              size={size}
              color={color}
              labelStyle={{ fontSize: 32 }}
            >
            </Button>
          )
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        showLabel: false,
        showIcon: true,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Category" component={CategoryStackScreen} />
      <Tab.Screen name="Singer" component={SingerStackScreen} />
      <Tab.Screen name="Composer" component={ComposerStackScreen} />
      <Tab.Screen name="Song" component={SongStackScreen} />
    </Tab.Navigator>
  )
}

function AuthorInformationDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <AuthorInformation {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={MyCustomTabNavigator} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthorInformationDrawer/>
    </NavigationContainer>
  );
}

export default App;
