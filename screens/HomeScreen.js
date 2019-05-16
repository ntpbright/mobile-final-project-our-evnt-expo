import React from 'react';
import styled from 'styled-components'
import {
  AsyncStorage,
  View,
} from 'react-native';
import * as firebase from 'firebase';
import { Container, Header, Content, Button, Text, Title, Body, Icon } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EventView from '../components/EventView'
import {inject, observer} from "mobx-react/native";
const _ = require('lodash');

@inject('store') @observer
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      EventsData: null,
      EventComponent: null,
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this._setUserDetail()
    firebase.database().ref('/Event').on('value', (snapshot) => {
      this.setState({
        EventsData: snapshot.val()
      },
      () => {
      this.props.store.EventListIsLoadded(snapshot.val())
      if(this.state.EventsData){
        this._PrepareEventList()
      }})
    });
  }

  async _logout() {
    const { navigate } = this.props.navigation;
    await firebase.auth().signOut().then(function() {
      AsyncStorage.removeItem('userToken')
      navigate('Login')
    }).catch(function(error) {
      console.log(error)
    });
  }

  _setUserDetail(){
    firebase.database().ref('/user/').child(this.props.store.UID).on('value',  (snapshot) => {
      this.props.store.UserNameLoaded(snapshot.val().name)
      this.props.store.PhotoURLLoaded(snapshot.val().photoURL)
    });
  }

  async _PrepareEventList(){
    console.log('_PrepareEventList')
    const { navigate } = this.props.navigation;
    const obj = this.state.EventsData
    const key = Object.keys(obj)
    let n = 0
    console.log(key[n])
    const EventComponent = []
    _.map(obj, (e, i) => {
      EventComponent.push(
        <EventView
          name={e.EventName}
          data={e.date}
          time={e.time}
          location={e.Location}
          detail={e.Description}
          participant={Object.keys(e.participant).length}
          TypeOfEvent={e.TypeOfEvent}
          BtnName='Join'
          EventKey={key[n]}
          navigate={() => navigate('EventDetail',
            {
              EventKey: key[n]
            }
          )}
        />
      )
      n++
    })
    await this.setState({
      EventComponent: EventComponent
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <CreateEventBtnStyle full light onPress={() => navigate('CreateEvent')}>
            <Text>Create Event</Text>
            <Icon name='arrow-forward' />
          </CreateEventBtnStyle>
          {/* <CreateEventBtnStyle full light onPress={() => this._logout()}>
            <Text>Create Event</Text>
            <Icon name='arrow-forward' />
          </CreateEventBtnStyle> */}
          {this.state.EventComponent}
        </Content>
      </Container>
    );
  }
}

const CreateEventBtnStyle = styled(Button)`
  justify-content: space-between;
  color: white;
  background-color: white;
  border-color: #fff;
  border-bottom-color: #d4d4d6;
  border-width: 1;
`


