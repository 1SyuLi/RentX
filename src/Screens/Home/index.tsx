import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, } from '@react-navigation/native';
import { StatusBar, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.svg';

import { Car } from '../../Components/Car';
import { Load } from '../../Components/Load';

import { api } from '../../services/api';
import { carDTO } from '../../dtos/carDto';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CardList,
} from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);


export function Home() {

    const [cars, setCars] = useState<carDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    useEffect(() => {
        async function fetchCars() {

            try {
                const response = await api.get('/cars');
                setCars(response.data);

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);

            }
        }


        fetchCars();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
    }, [])

    const navigation = useNavigation<any>();


    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },

        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },

        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        },
    });

    function handleCarDetails(car: carDTO) {
        navigation.navigate('CarDetails', { car });
    };

    function handleOpenMycars() {
        navigation.navigate('Mycars');
    };


    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />

                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }

                </HeaderContent>
            </Header>


            {
                loading === true ? <Load /> :
                    <CardList data={cars} keyExtractor={item => item.id}
                        renderItem={
                            ({ item }) => <Car onPress={() => handleCarDetails(item)} data={item} />
                        }
                    />
            }

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22,
                        }
                    ]}
                >
                    <ButtonAnimated
                        activeOpacity={0.5}
                        onPress={handleOpenMycars}
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons
                            name='ios-car-sport'
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}


const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})