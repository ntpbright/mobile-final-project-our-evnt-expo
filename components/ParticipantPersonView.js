import React from 'react';
import styled from 'styled-components'

import {
  View,
  Image,
} from 'react-native';


import { Container, Header, Content, Button, Text, Title, Body, Icon } from 'native-base';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class ParticipantPersonView extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ParticipantPerson>
        <PersonImage source={{uri: this.props.PhotoURL}}/>
        <PersonName numberOfLines={1}>{this.props.Name}</PersonName>
      </ParticipantPerson>
    );
  }
}

const ParticipantPerson = styled.View`
  align-items: center;
  flex-wrap: nowrap;
  margin-right: ${wp('3%')};
  padding-top: ${wp('3%')};
`

const PersonImage = styled.Image`
  height: ${wp('20%')};
  width: ${wp('20%')};
  borderRadius: ${wp('10%')};
  resize-mode: contain;
  overflow: hidden;
`

const PersonName = styled.Text`
  width: ${wp('20%')};
  text-align: center;
`