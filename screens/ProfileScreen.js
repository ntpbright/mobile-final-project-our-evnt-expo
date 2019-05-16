import React from 'react';
import styled from 'styled-components'
import { View, Alert, AsyncStorage, } from 'react-native';
import { Button as ButtonNative }  from 'react-native';
import { ScrollView, MapView } from 'expo';
import { Container, Header, Content, Button, Title, Body, Icon, Text } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EventHistoryView from '../components/EventHistoryView'
import {inject, observer} from "mobx-react/native";
import Color from '../constants/Colors'
const _ = require('lodash');

import * as firebase from 'firebase';

@inject('store') @observer
export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      EventKeys: null,
      EventComponent: null,
    }
  }

  static navigationOptions = {
    title: 'Profile',
  };

  async _logout() {
    const { navigate } = this.props.navigation;
    await firebase.auth().signOut().then(function() {
      AsyncStorage.removeItem('userToken')
      navigate('Login')
    }).catch(function(error) {
      console.log(error)
    });
  }

  componentDidMount() {
    // firebase.database().ref('/user/').child(this.props.store.UID).child('Events').on('value', (snapshot) => {
    //   console.log(snapshot)
    //   this.setState({
    //     EventKeys: snapshot.val()
    //   })
    //   if(this.state.EventKeys){
    //     this._PrepareEventKey()
    //   }
    // });
    firebase.database().ref('/Event').on('value', (snapshot) => {
      console.log(snapshot.val())
      this.setState({
        EventsData: snapshot.val()
      },
      () => {
      if(this.state.EventsData){
        this._PrepareEventList()
      }} )
    });
  }

  _PrepareEventList(){
    console.log('_PrepareEventList2')
    const { navigate } = this.props.navigation;
    const obj = this.state.EventsData
    const EventComponent = []
    _.map(obj, (e, i) => {
      EventComponent.push(
        <EventHistoryView
          name={e.EventName}
          data={e.date}
          time={e.time} d
          location={e.Location}
          detail={e.Description}
          participant={Object.keys(e.participant).length}
          TypeOfEvent={e.TypeOfEvent}
          BtnName='Cancel'
          navigate={() => navigate('EventDetail',
            {
              Event: e
            }
          )}
        />
      )
    })
    this.setState({
      EventComponent: EventComponent,
    })
  }

  // async _PrepareEventKey(){
  //   console.log('_PrepareEventKey')
  //   const { navigate } = this.props.navigation;
  //   const obj = this.state.EventKeys;
  //   const EventKeys = []
  //   const EventComponent = []
  //   _.map(obj, (e, i) => {
  //     console.log(e)
  //     EventKeys.push(
  //       e.EventID
  //     )
  //   })
  //   console.log(EventKeys)
  //   const HistoryEvent = _.pick(this.props.store.EventList,EventKeys)
  //   console.log(HistoryEvent)
  //   _.map(HistoryEvent, (e, i) => {
  //     console.log(e)
  //     EventComponent.push(
  //       <EventView
  //         name={e.EventName}
  //         data={e.date}
  //         time={e.time}
  //         location={e.Location}
  //         detail={e.Description}
  //         participant={Object.keys(e.participant).length}
  //         TypeOfEvent={e.TypeOfEvent}
  //         navigate={() => navigate('EventDetail',
  //           {
  //             Event: e
  //           }
  //         )}
  //       />
  //     )
  //   })
  //   await this.setState({
  //     EventComponent: EventComponent
  //   })
  // }


  render() {
    console.log()
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <LogoutView>
            <Button transparent primary onPress={() => this._logout()}>
              <IconStyle type="EvilIcons" name='unlock'/>
            </Button>
          </LogoutView>
          <UserView>
            <UserImage
              source={{uri: this.props.store.PhotoURL}}
            />
            <UserName>
              {this.props.store.UserName}
            </UserName>
          </UserView>
          <HistoryView>
            <HistoryTitle>
              History
            </HistoryTitle>
            <Line/>
            {this.state.EventComponent}
          </HistoryView>
        </Content>
      </Container>
    );
  }
}

const UserView = styled.View`
  align-items: center;
  margin-top: ${wp('3%')};
  padding-top: ${wp('2%')};
  padding-right: ${wp('4%')};
  padding-left: ${wp('4%')};
`

const UserImage = styled.Image`
  height: ${wp('30%')};
  width: ${wp('30%')};
  borderRadius: ${wp('15%')};
  resize-mode: contain;
  overflow: hidden;
`

const UserName = styled(Text)`
  margin-top: ${wp('4%')};
  font-size: ${wp('6%')};
`

const HistoryView = styled.View`
  margin-top: ${wp('8%')};
`

const HistoryTitle = styled(Text)`
  padding-left: ${wp('4%')};
  font-size: ${wp('5%')};
`

const Line = styled.View`
  margin-top: ${wp('2.5%')};
  height: 1;
  border-color: #d8d8d8;
  border-width: 1;
`

const LogoutView = styled.View`
  flex-direction: row-reverse;
  margin-top: ${wp('2.5%')};
  margin-left: ${wp('2.5%')};
`

const IconStyle = styled(Icon)`
  font-size: ${wp('10%')};
  margin-left: 0;
  margin-right: 0;
  padding-right: 0;
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
  color: ${Color.tintColor}
`;
