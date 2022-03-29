import React from 'react';

import { Home } from '../Screens/Home';
import { CarDetails } from '../Screens/CarDetails';
import { Scheduling } from '../Screens/Scheduling';
import { Confirmation } from '../Screens/Confirmation';
import { SchedulingDetails } from '../Screens/SchedulingDetails';
import { Mycars } from '../Screens/Mycars';
import { Splash } from '../Screens/Splash';
import { SignIn } from '../Screens/SignIn';
import { SignUpFirstStep } from '../Screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../Screens/SignUp/SignUpSecondStep';

import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();



export function AppStackRoutes() {


    return (
        <Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="HomeStack"
                component={Home}
                options={{
                    gestureEnabled: false,
                }}
            />

            <Screen
                name="CarDetails"
                component={CarDetails}
            />

            <Screen
                name="Scheduling"
                component={Scheduling}
            />

            <Screen
                name="Confirmation"
                component={Confirmation}
            />

            <Screen
                name="SchedulingDetails"
                component={SchedulingDetails}
            />

            <Screen
                name='Mycars'
                component={Mycars}
            />


        </Navigator>
    )
}