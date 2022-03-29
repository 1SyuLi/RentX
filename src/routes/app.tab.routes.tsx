import React from 'react';

import { Home } from '../Screens/Home';
import { Mycars } from '../Screens/Mycars';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { Navigator, Screen } = createBottomTabNavigator();

import { AppStackRoutes } from './app.stack.routes';


export function AppTabRoutes() {


    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen
                name="Home"
                component={AppStackRoutes}
            />

            <Screen
                name="Profile"
                component={Home}
            />

            <Screen
                name='Mycars'
                component={Mycars}
            />

        </Navigator>
    )
}