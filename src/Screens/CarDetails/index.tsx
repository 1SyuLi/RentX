import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';

import {
   Container,
   Header
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
     </Container>
   );
}