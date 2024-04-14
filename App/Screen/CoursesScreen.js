import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

export default class CoursesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0, 
    };
  }

  renderContent = () => {
    const { selectedIndex } = this.state;
    if (selectedIndex === 0) {
      return <Text>目前是空的唷~</Text>;
    } else if (selectedIndex === 1) {
      return <Text >目前是空的唷~</Text>;
    } else {
      return <Text>目前是空的唷~</Text>;
    }
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <SegmentedControl
          values={['全部課程', '已購課程', '收藏課程']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
          }}
          style={styles.segmentedControl}
        />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  segmentedControl: {
    marginBottom: 20,
  },
});
