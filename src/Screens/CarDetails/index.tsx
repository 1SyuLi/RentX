import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';

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
} from './styles';

export function CarDetails(){
   return(
     <Container>
         <StatusBar 
            barStyle="dark-content" 
            backgroundColor="transparent" 
         />


         <Header>
             <BackButton onPress={() => {}}/>
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

            <About>
               Este é automóvel desportivo. Surgiu do lendário touro de lide indultado 
               na praça Real Maestranza de Sevilla. 
               É um belíssimo carro para quem gosta de acelerar.
            </About>

            
         </Content>
     </Container>
   );
}