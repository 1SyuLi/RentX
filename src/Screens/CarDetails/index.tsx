import React from 'react';
import { StatusBar } from 'react-native';

import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import { Accessory } from '../../Components/Accessory';
import { Button } from '../../Components/Button';
import { carDTO } from '../../dtos/carDto';

import { getAcessoryIcon } from '../../utils/getAcessoryIcon';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
    Container,
    Header,
    Content,
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

export interface ParamsProps {
    car: carDTO
}

export function CarDetails() {

    const navigation = useNavigation<any>();
    const route = useRoute();
    const { car } = route.params as ParamsProps;

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


            <Header>
                <BackButton onPress={() => navigation.goBack()} />
            </Header>


            <ImageSlider
                imagesUrl={car.photos}
            />

            <Content>
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

                <About>{car.about}</About>
            </Content>

            <Footer>
                <Button title='Escolha período do aluguel' onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}