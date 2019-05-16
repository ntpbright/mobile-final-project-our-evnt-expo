import React from 'react';
import styled from 'styled-components'

import {
  View,
} from 'react-native';

import Color from '../constants/Colors'
import { ScrollView, MapView } from 'expo';
import { Container, Header, Content, Button, Text, Title, Body, Icon } from 'native-base';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as firebase from 'firebase';

export default class EvenCancelView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      navigate: props.navigate
    };
  }

  _deleteEvent(){
    firebase.database().ref('/Event/').child(this.props.EventKey).remove()
  }

  render() {
    // console.log(this.props.EventKey)
    return (
      <EventView>
        <NameOfEventText>
          {this.props.name}
        </NameOfEventText>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <View style={{flex: 5}}>
            <DetailContainer>
              <DetailView>
                <IconStyle type="EvilIcons" name='calendar'/>
                <DetailTextStyle>
                  {this.props.data}
                </DetailTextStyle>
              </DetailView>
              <DetailView>
                <IconStyle type="EvilIcons" name='clock'/>
                <DetailTextStyle>
                  {this.props.time}
                </DetailTextStyle>
              </DetailView>
              <DetailView>
                <IconStyle type="EvilIcons" name='user'/>
                <DetailTextStyle>
                  {this.props.participant}
                </DetailTextStyle>
              </DetailView>
              <DetailView>
                <IconStyle type="EvilIcons" name='location'/>
                <DetailTextStyle>
                  {this.props.location}
                </DetailTextStyle>
              </DetailView>
              <DetailView>
                <IconStyle type="EvilIcons" name='tag'/>
                <DetailTextStyle>
                  {this.props.TypeOfEvent}
                </DetailTextStyle>
              </DetailView>
            </DetailContainer>
            <DescriptionView>
              <DetailView>
                <IconStyle type="EvilIcons" name='comment'/>
                <DescriptionTitle>
                  Description
                </DescriptionTitle>
              </DetailView>
              <DescriptionText numberOfLines={3}>
                {this.props.detail}
              </DescriptionText>
            </DescriptionView>
          </View>
          <View style={{
            flex: 2,
          }}>
            <InfoBtnStyle onPress={() => this._deleteEvent()}>
              <Text>{this.props.BtnName}</Text>
            </InfoBtnStyle>
          </View>
        </View>
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
            title={this.props.location}
          />
        </MapView>
      </EventView>
    );
  }
}

const EventView = styled.View`
  border-color: #fff;
  border-bottom-color: #d4d4d6;
  border-width: 1;
  padding-top: ${wp('4%')};
  padding-bottom: ${wp('4%')};
  padding-right: ${wp('5%')};
  padding-left: ${wp('5%')};
`;

const NameOfEventText = styled.Text`
 font-size: ${wp('5%')};
 margin-bottom: ${wp('1.5%')};
`;

const DetailContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const DetailView = styled.View`
  align-items: center;
  flex-direction: row;
  margin-right: ${wp('3%')};
  margin-bottom: ${wp('0.35%')};
`;

const TypeOfEventStyle = styled.View`
  align-items: center;
  flex-direction: row;
  margin-right: ${wp('3%')};
  margin-bottom: ${wp('0.35%')};
  padding-top: ${wp('1%')};
  padding-bottom: ${wp('1%')};
  padding-right: ${wp('1.5%')};
  padding-left: ${wp('1.5%')};
  border-color: gray;
  border-width: ${wp('0.3%')};
  border-radius: ${wp('3%')};
`;

const DetailTextStyle = styled(Text)`
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
  font-size: ${wp('4%')};
  margin-left: ${wp('1%')};
`;

const IconStyle = styled(Icon)`
  font-size: ${wp('8%')};
  margin-left: 0;
  margin-right: 0;
  padding-right: 0;
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
`;

const InfoBtnStyle = styled(Button)`
  align-self: center;
  color: ${Color.tintColor};
  background-color: ${Color.tintColor};
`;

const DescriptionView = styled.View`
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: ${wp('1%')};
`;

const DescriptionTitle = styled(Text)`
  margin-top: ${wp('0%')};
  padding-top: ${wp('0%')};
`

const DescriptionText = styled.Text`
  flex-wrap: wrap;
  padding-top: ${wp('0.5%')};
  font-size: ${wp('4%')};
`;