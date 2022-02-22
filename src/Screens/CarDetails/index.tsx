import React from 'react';
import { StatusBar } from 'react-native';

import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import { Accessory } from '../../Components/Accessory';
import { Button } from '../../Components/Button';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import { carDTO } from '../../dtos/carDto';
import { getAcessoryIcon } from '../../utils/getAcessoryIcon';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
    Container,
    Header,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
} from './styles';

interface ParamsProps {
    car: carDTO
}

export function CarDetails() {

    const navigation = useNavigation<any>();
    const route = useRoute();
    const { car } = route.params as ParamsProps;


    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
        console.log(event.contentOffset.y);
    })

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    })


    function handleConfirmRental() {
        navigation.navigate('Scheduling', {
            car
        });
    }

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
            />

            <Animated.View
                style={[headerStyleAnimation]}
            >
                <Header>
                    <BackButton onPress={() => navigation.goBack()} />
                </Header>

                <ImageSlider
                    imagesUrl={car.photos}
                />
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight(),
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAcessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button title='Escolha período do aluguel' onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}