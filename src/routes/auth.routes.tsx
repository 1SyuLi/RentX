import React from 'react';



import { Splash } from '../Screens/Splash';
import { SignIn } from '../Screens/SignIn';
import { SignUpFirstStep } from '../Screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../Screens/SignUp/SignUpSecondStep';
import { Confirmation } from '../Screens/Confirmation';

import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();



export function AuthRoutes() {


    return (
        <Navigator
            initialRouteName='Splash'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name='Splash'
                component={Splash}
            />

            <Screen
                name='SignIn'
                component={SignIn}
            />

            <Screen
                name='SignUpFirstStep'
                component={SignUpFirstStep}
            />

            <Screen
                name='SignUpSecondStep'
                component={SignUpSecondStep}
            />


            <Screen
                name="Confirmation"
                component={Confirmation}
            />


        </Navigator>
    )
}