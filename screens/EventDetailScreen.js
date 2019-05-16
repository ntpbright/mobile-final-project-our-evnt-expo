import React from 'react';
import styled from 'styled-components'
import { View, Alert } from 'react-native';
import { ScrollView, MapView } from 'expo';
import { Container, Header, Content, Button, Title, Body, Icon, Text } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ParticipantPersonView from '../components/ParticipantPersonView';

import * as firebase from 'firebase';
import Color from '../constants/Colors'
const _ = require('lodash');

export default class EventDetailScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.props.navigation.getParam('Event'),
      ParticipantPersonList: null,
    };
  }

  static navigationOptions = {
    title: 'Event Detail',
    headerTintColor: {
      color: Color.tintColor,
      backgroundColor: Color.tintColor,
    },
    headerBackTitleStyle: {
      color: Color.tintColor,
    },
    headerLeftContainerStyle: {
      color: Color.tintColor,
    }
  };

  componentDidMount(){
    console.log('ID Event Key : ',this.props.navigation.getParam('EventKey', 'No-EventKey'))
    this._PrepareParticipant()
  }

  _JoinEvent(){
    const leadsRef = firebase.database().ref('/Event/')
    leadsRef.child(this.props.navigation.getParam('EventKey')).child('participant').push().set({
      name: this.props.store.UserName,
      photoURL: this.props.store.PhotoURL,
    })
  }

  async _PrepareParticipant(){
    const obj = this.state.participant
    const ParticipantPersonList = []
    _.map(obj, (p, i) => {
      console.log(p.photoURL)
      ParticipantPersonList.push(
        <ParticipantPersonView
          Name={p.name.split(" ")[0]}
          PhotoURL={p.photoURL}
        />
      )
    })
    await this.setState({
      ParticipantPersonList: ParticipantPersonList
    })
  }

  _showAlert = () => {
    Alert.alert(
      'Are you sure?',
      'Did you sure to join this event?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this._JoinEvent()},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <Container>
        <ContentStyle>
          <EventNameTextStyle>
            {this.state.EventName}
          </EventNameTextStyle>
          <EventDesTextStyle>
            {this.state.Description}
          </EventDesTextStyle>
          <DetailContainer>
            <DetailView>
              <IconStyle type="EvilIcons" name='calendar'/>
              <DetailTextStyle>
                {this.state.date}
              </DetailTextStyle>
            </DetailView>
            <DetailView>
              <IconStyle type="EvilIcons" name='clock'/>
              <DetailTextStyle>
                {this.state.time}
              </DetailTextStyle>
            </DetailView>
          </DetailContainer>
          <ParticipantContainer>
            <ParticipantTitle>
              <IconStyle type="EvilIcons" name='user'/>
              <Text>
                Participant
              </Text>
              <Text>
                {Object.keys(this.state.participant).length}/{this.state.MaxPerson}
              </Text>
            </ParticipantTitle>
            <PaticipantRowView horizontal='true'>
              {this.state.ParticipantPersonList}
            </PaticipantRowView>
          </ParticipantContainer>
          <MapContainer>
            <MapTitle>
              <IconStyle type="EvilIcons" name='location'/>
              <Text>
                Loaction : {this.state.Location}
              </Text>
            </MapTitle>
            <MapRowView>
              <MapView
                style={{ alignSelf: 'stretch', height: wp('30%')} }
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
              >
                <MapView.Marker
                  coordinate={{latitude: 37.78825,
                    longitude: -122.4324,}}
                  title={this.state.Location}
                />
              </MapView>
            </MapRowView>
          </MapContainer>
          <JoinBtnStyle full light onPress={this._showAlert}>
            <JoinBtnText>Join</JoinBtnText>
          </JoinBtnStyle>
        </ContentStyle>
      </Container>
    );
  }
}

const EventNameTextStyle = styled.Text`
  margin-top: ${wp('6%')};
  font-size: ${wp('8%')};
  text-align: center;
`;

const EventDesTextStyle = styled.Text`
  margin-top: ${wp('4%')};
  color: #8190A5;
`

const ContentStyle = styled(Content)`
  padding-top: ${wp('4%')};
  padding-right: ${wp('5%')};
  padding-left: ${wp('5%')};
`

const DetailContainer = styled.View`
  justify-content: center;
  margin-top: ${wp('4%')};
  flex-direction: row;
  flex-wrap: wrap;
`;

const DetailView = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-right: ${wp('3%')};
`;

const DetailTextStyle = styled(Text)`
  font-size: ${wp('4%')};
  margin-left: ${wp('1%')};
`;

const IconStyle = styled(Icon)`
  /* font-size: ${wp('4%')}; */
  margin-left: 0;
  margin-right: 0;
  padding-right: 0;
`;

const ParticipantContainer = styled.View`
  margin-top: ${wp('4%')};
`;

const ParticipantTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PaticipantRowView = styled.ScrollView`
  flex-direction: row;
`;

const MapContainer = styled.View`
  margin-top: ${wp('4%')};
`;

const MapTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MapRowView = styled.ScrollView`
  margin-top: ${wp('4%')};
`;

const JoinBtnStyle = styled(Button)`
  margin-top: ${wp('4%')};
  background-color: ${Color.tintColor};
`
const JoinBtnText = styled.Text`
  color: #fff;
  font-size: ${wp('4%')};
`;