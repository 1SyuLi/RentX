import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.colors.header};
  
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    margin-top: -50px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_600};

    margin-top: 20px;
`;

export const Message = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text_detail};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    line-height: ${RFValue(25)}px;

    text-align: center;
    margin-top: 8px;
`;


export const Footer = styled.View`
    width: 100%;
    align-items: center;
    margin: 30px 0;
`;
