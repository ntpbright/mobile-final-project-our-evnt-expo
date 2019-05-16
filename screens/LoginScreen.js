import React from 'react';
import styled from 'styled-components'

import {
  AsyncStorage,
  Image,
  View,
} from 'react-native';

import * as firebase from 'firebase';
import { firebaseConfig } from '../assets/firebaseConfig';
import {inject, observer} from "mobx-react/native";

import { Container, Header, Content, Button, Text, Icon, } from 'native-base';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import API from '../constants/API'

firebase.initializeApp(firebaseConfig);

@inject('store') @observer
export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  static navigationOptions = { header: null }

  _loginWithGoogle = async () => {
    console.log("Google")
    try {
      const result = await Expo.Google.logInAsync({
        behavior: "web",
        webClientId: API.webClientId,
        iosClientId:  API.iosClientId,
        androidClientId:  API.androidClientId,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = new firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
        .auth()
        .signInWithCredential(credential)
        .then( res => {
          // console.log(res)
          if (res.additionalUserInfo.isNewUser) {
            console.log('new user');
            firebase
              .database()
              .ref('/user/' + res.user.uid)
              .set({
                name: res.user.displayName,
                mail: res.user.email,
                photoURL: res.user.photoURL.substr(0,res.user.photoURL.lastIndexOf('/') - 5) + 's1000-c',
                last_logged_in: Date.now(),
              });
              AsyncStorage.setItem('userToken', idToken);
              this.props.store.userUIDIsLoaded(res.user.uid)
              this.props.navigation.navigate('App');
          } else {
            console.log('old user');
            firebase
              .database()
              .ref('/user/' + res.user.uid)
              .update({
                photoURL: res.user.photoURL.substr(0,res.user.photoURL.lastIndexOf('/') - 5) + 's1000-c',
                last_logged_in: Date.now(),
                name: res.user.displayName,
                mail: res.user.email,
          });
          AsyncStorage.setItem('userToken', idToken);
          this.props.store.userUIDIsLoaded(res.user.uid)
          this.props.navigation.navigate('App');
         }
        }
       )
       .catch( error => {
        console.log("Google firebase cred err:", error);
       })
      } else {
        console.log("Bug")
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  _loginWithFacebook = async () => {
    console.log('facebook')
    //ENTER YOUR APP ID
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(API.Facebook, { permissions: ['email', 'public_profile'] } , { behavior: "web" },)

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase
       .auth()
       .signInWithCredential(credential)
       .then( res => {
        //  console.log(res)
         if (res.additionalUserInfo.isNewUser) {
           console.log('new users');
           firebase
            .database()
            .ref('/user/' + res.user.uid)
            .set({
              name: res.user.displayName,
              mail: res.user.email,
              photoURL: res.user.photoURL+"/picture?height=1000",
              last_logged_in: Date.now(),
              books: 0,
              follower: 1,
              following: 2,
            });
            AsyncStorage.setItem('userToken', token);
            this.props.store.userUIDIsLoaded(res.user.uid)
            this.props.navigation.navigate('App');
         } else {
           console.log('old user');
           firebase
            .database()
            .ref('/user/' + res.user.uid)
            .update({
              name: res.user.displayName,
              mail: res.user.email,
              photoURL: res.user.photoURL+"/picture?height=1000",
              last_logged_in: Date.now(),
            });
            AsyncStorage.setItem('userToken', token);
            this.props.store.userUIDIsLoaded(res.user.uid)
            this.props.navigation.navigate('App');
         }
         }
       )
       .catch( error => {
        console.log("Facebook firebase cred err:", error);
       })
    }
  };

  render() {
    return (
      <ContainerStyle>
        <Content contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
          <LogogImageView>
            <LogoImage
              source={require('../assets/images/logo.png')}
            />
            <AppNameText>OUR EVENT</AppNameText>
          </LogogImageView>
          <Content>
            <LoginButtonStyle rounded primary onPress={() => this._loginWithFacebook()}>
              <SocialIcon type="EvilIcons" name='sc-facebook' />
              <Text>LOGIN WITH FACEBOOK</Text>
            </LoginButtonStyle>
            <LoginButtonStyle rounded danger onPress={() => this._loginWithGoogle()} >
              <SocialIcon type="EvilIcons" name='sc-google-plus' />
              <Text>LOGIN WITH GOOGLE</Text>
            </LoginButtonStyle>
          </Content>
        </Content>
      </ContainerStyle>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const ContainerStyle = styled(Container)`
  align-content: center;
  text-align: center;
  justify-content: center;
`


const LoginButtonStyle = styled(Button)`
  margin-top: ${hp('2.5%')};
  height: ${hp('7%')};
  width: ${wp('70%')};
  text-align: center;
  justify-content: center;
`

const SocialIcon = styled(Icon)`
  font-size: ${wp('7.5%')};
  margin-left: 0;
  margin-right: 0;
  padding-right: 0;
`;

const LogogImageView = styled.View`
  margin-top: ${hp('20%')};
  margin-bottom: ${hp('17.5%')};
  align-items: center;
  text-align: center;
`

const AppNameText = styled.Text`
  margin-top: ${hp('2.5%')};
  font-size: ${wp('7.5%')};
`

const LogoImage = styled.Image`
  height: ${wp('40%')};
  width: ${wp('40%')};
  borderRadius: ${wp('20%')};
  resize-mode: contain;
  overflow: hidden;
`