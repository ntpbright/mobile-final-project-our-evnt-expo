import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Color from '../constants/Colors'

export default class SegmentedControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    };
    this.handleIndexChange = this.handleIndexChange.bind(this)
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
    this.props.getLayoutPattern(index)
  };

  render() {
    return (
      <View>
        <SegmentedControlTab
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          firstTabStyle={styles.firstTabStyle}
          lastTabStyle={styles.lastTabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          allowFontScaling={false}
          values={["Joining", "Created"]}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabsContainerStyle: {
    marginTop: wp('3%'),
    height: wp('8%'),
  },
  tabStyle: {
    //custom styles
    color: Color.tintColor,
    borderColor: Color.tintColor,
  },
  firstTabStyle: {
    //custom styles
  },
  lastTabStyle: {
    //custom styles
  },
  tabTextStyle: {
    //custom styles
    color: Color.tintColor,
  },
  activeTabStyle: {
    //custom styles
    backgroundColor: Color.tintColor,
    borderColor: Color.tintColor,
  },
  activeTabTextStyle: {
    //custom styles
  },
  tabBadgeContainerStyle: {
    //custom styles
  },
  activeTabBadgeContainerStyle: {
    //custom styles
  },
  tabBadgeStyle: {
    //custom styles
  },
  activeTabBadgeStyle: {
    //custom styles
  }
});