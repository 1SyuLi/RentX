import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import { Accessory } from '../../Components/Accessory';
import { Button } from '../../Components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
import { useNavigation } from '@react-navigation/native';

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

export function CarDetails() {

    const navigation = useNavigation<any>();


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
                imagesUrl={['https://images-ext-2.discordapp.net/external/bwumaL3tGp9p9XiCjbi9BgO_jgrd00BmeKLLv30OaKw/https/www.pngmart.com/files/4/Chevrolet-Camaro-PNG-Image.png']}
            />

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Accessories>
                    <Accessory name="380Km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={forceSvg} />
                    <Accessory name="Gasoline" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="2 Pessoas" icon={peopleSvg} />
                </Accessories>

                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de lide indultado
                    na praça Real Maestranza de Sevilla.
                    É um belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>

            <Footer>
                <Button title='Confirmar' onPress={() => navigation.navigate('Scheduling')} />
            </Footer>
        </Container>
    );
}