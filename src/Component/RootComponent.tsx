import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import MainScreen from './MainScreen';
import AddScreen from './AddScreen';
import EditScreen from './EditScreen';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const RootComponent = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar
                    backgroundColor={'transparent'}
                    translucent
                    barStyle={'dark-content'}
                />
                <Stack.Navigator
                    initialRouteName="MainScreen"
                    screenOptions={{
                        gestureEnabled: true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, 
                        transitionSpec: {
                            open: { animation: 'timing', config: { duration: 300 } },
                            close: { animation: 'timing', config: { duration: 300 } },
                        },
                    }}>
                    <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Home' }} />
                    <Stack.Screen name="AddScreen" component={AddScreen} />
                    <Stack.Screen name="EditScreen" component={EditScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default RootComponent;

const styles = StyleSheet.create({});
