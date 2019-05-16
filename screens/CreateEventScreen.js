import React from 'react';
import styled from 'styled-components'
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Button, Title, Body, Icon, Text, Form, Item, Label, Input, Textarea} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SegmentedControl from '../components/SegmentedControl'
import EventView from '../components/EventView'

import DatePicker from 'react-native-datepicker'
import Color from '../constants/Colors'

import * as firebase from 'firebase';

import {inject, observer} from "mobx-react/native";

@inject('store') @observer
export default class CreateEventScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      chosenDate: new Date(),
      datetime1: new Date().now,
      date: null,
      time: null,
      EventName: null,
      Description: null,
      MaxPerson: null,
      TypeOfEvent: null,
      Location: null,
    };
    // this.setDate = this.setDate.bind(this);
  }

  static navigationOptions = {
    title: 'Create Event',
  };

  _showAlert = () => {
    Alert.alert(
      'Are you sure?',
      'Did you sure to create this event?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this._createEvent()},
      ],
      { cancelable: false }
    )
  }

  async _createEvent(){
    const { navigate } = this.props.navigation;
    const leadsRef = firebase.database().ref('/Event/')
    const userRef = firebase.database().ref('/user/')
    const postKey = leadsRef.push({
      date: this.state.date,
      time: this.state.time,
      EventName: this.state.EventName,
      MaxPerson: this.state.MaxPerson,
      TypeOfEvent: this.state.TypeOfEvent,
      Location: this.state.Location,
      Description: this.state.Description,
    }).key;
    userRef.child(this.props.store.UID).child('Events').push({
      EventID: postKey
    })
    // console.log(this.props.store.UserName)
    leadsRef.child(postKey).child('participant').push().set({
      name: this.props.store.UserName,
      photoURL: this.props.store.PhotoURL,
    })
    navigate('Home')
  }

  setDateTime(datetime) {
    // console.log(datetime.split(" "))
    date = datetime.split(" ")[0]
    time = datetime.split(" ")[1]
    this.setState({
      datetime1: datetime,
      date: date,
      time: time,
    })
  }

  render() {
    return (
      <Container>
        <ContentStyle>
          <Form>
            <Item floatingLabel>
              <Label>Event name</Label>
              <Input onChangeText={ (text) => this.setState({ EventName: text }) } />
            </Item>
            <TextareaStyle rowSpan={5} bordered placeholder="Description" onChangeText={ (text) => this.setState({ Description: text }) }/>
            <Item floatingLabel>
              <Label>Maximum person</Label>
              <Input keyboardType="numeric" onChangeText={ (text) => this.setState({ MaxPerson: text }) }/>
            </Item>
            <Item floatingLabel>
              <Label>Type of event</Label>
              <Input onChangeText={ (text) => this.setState({ TypeOfEvent: text }) }/>
            </Item>
            <Item floatingLabel>
              <Label>Location</Label>
              <Input onChangeText={ (text) => this.setState({ Location: text }) }/>
            </Item>
            <DateView>
              <DatePicker
                style={{width:  wp('88%')}}
                date={this.state.datetime1}
                mode="datetime"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                minuteInterval={10}
                onDateChange={(datetime) => this.setDateTime(datetime)}
              />
            </DateView>
          </Form>
          <JoinBtnStyle full light onPress={this._showAlert}>
            <JoinBtnText>Create</JoinBtnText>
          </JoinBtnStyle>
        </ContentStyle>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});


const ContentStyle = styled(Content)`
  padding-top: ${wp('2%')};
  padding-right: ${wp('5%')};
  padding-left: ${wp('5%')};
`;

const DateView = styled.View`
  margin-left: ${wp('1%')};
  margin-top: ${wp('6%')};
`;

const DateText = styled(Text)`
  margin-left: ${wp('3%')};
  font-size: ${wp('4.25%')};
`;

const TextareaStyle = styled(Textarea)`
  padding-left: ${wp('5%')};
  margin-top: ${wp('7%')};
  margin-bottom: ${wp('0%')};
`;

const JoinBtnStyle = styled(Button)`
  margin-top: ${wp('7%')};
  background-color: ${Color.tintColor};
`
const JoinBtnText = styled.Text`
  color: #fff;
  font-size: ${wp('4%')};
`;