import React from 'react';
import styled from 'styled-components'
import { ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Title, Body, Icon, Text, Segment } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SegmentedControl from '../components/SegmentedControl'
import EventView from '../components/EventView'
import EvenCancelView from '../components/EvenCancelView'
import * as firebase from 'firebase';
import {inject, observer} from "mobx-react/native";
const _ = require('lodash');

@inject('store') @observer
export default class MyEventScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentGuess: null,
      EventsData: null,
      JoinEventComponent: null,
      CreatedEventComponent: null,
      tabSelect: null
    }
  }

  static navigationOptions = {
    title: 'My Event',
  };

  componentDidMount() {
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

  checkLayoutforRender = async (tabSelected) => {
    console.log(tabSelected)
    this.setState({
      tabSelect: tabSelected
    })
  }

  _PrepareEventList(){
    console.log('_PrepareEventList2')
    const { navigate } = this.props.navigation;
    const obj = this.state.EventsData
    const key = Object.keys(obj)
    let n = 0
    const JoinEventComponent = []
    const CreatedEventComponent = []
    _.map(obj, (e, i) => {
      JoinEventComponent.push(
        <EvenCancelView
          name={e.EventName}
          data={e.date}
          time={e.time} d
          location={e.Location}
          detail={e.Description}
          participant={Object.keys(e.participant).length}
          TypeOfEvent={e.TypeOfEvent}
          BtnName='Cancel'
          EventKey={key[n]}
          navigate={() => navigate('EventDetail',
            {
              Event: e
            }
          )}
        />
      )
      n++
    })
    _.map(obj, (e, i) => {
      CreatedEventComponent.push(
        <EventView
          name={e.EventName}
          data={e.date}
          time={e.time} d
          location={e.Location}
          detail={e.Description}
          participant={Object.keys(e.participant).length}
          TypeOfEvent={e.TypeOfEvent}
          BtnName='Edit'
          navigate={() => navigate('EventDetailInMyEvnet',
            {
              Event: e
            }
          )}
        />
      )
    })
    this.setState({
      JoinEventComponent: JoinEventComponent,
      CreatedEventComponent: CreatedEventComponent
    })
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <ContentStyle>
          <SegmentView>
            <SegmentedControl
              getLayoutPattern={this.checkLayoutforRender}
            />
          </SegmentView>
          {!this.state.tabSelect && this.state.JoinEventComponent}
          {!!this.state.tabSelect && this.state.CreatedEventComponent}
        </ContentStyle>
      </Container>
    );
  }
}

const ContentStyle = styled(Content)`
  padding-top: ${wp('2%')};
  /* padding-right: ${wp('5%')};
  padding-left: ${wp('5%')}; */
`;

const SegmentView = styled.View`
  padding-right: ${wp('5%')};
  padding-left: ${wp('5%')};
`;