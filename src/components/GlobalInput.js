import React from 'react';
import {View, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';

export default class GlobalInput extends React.Component {
  state = {secureTextEntry: true};
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: this.props.width ? this.props.width : '90%',
          height: this.props.height ? this.props.height : 40,
          marginTop: this.props.marginTop ? this.props.marginTop : 10,
        }}>
        <TextInput
          style={{
            width: '100%',
            marginRight: this.props.marginRight ? this.props.marginRight : 0,
            borderBottomWidth: 0.5,
            borderColor: 'white',
            color: 'white',
            padding: this.props.padding ? this.props.padding : 10,
            paddingRight: this.props.paddingRight
              ? this.props.paddingRight
              : 10,
            fontSize: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingLeft: this.props.paddingLeft ? this.props.paddingLeft : 10,
          }}
          placeholder={this.props.placeholder}
          secureTextEntry={
            this.props.secureTextEntry && this.state.secureTextEntry
          }
          keyboardType={
            this.props.keyboardType ? this.props.keyboardType : null
          }
          placeholderTextColor="white"
          onChangeText={text => {
            this.props.changeText(text);
          }}
          value={this.props.value ? this.props.value : null}
        />
        {this.props.password ? (
          this.state.secureTextEntry === false ? (
            <Feather
              name="eye-off"
              style={{position: 'absolute', right: 10, top: 10}}
              size={20}
              color="white"
              onPress={() => {
                this.setState({secureTextEntry: true});
              }}
            />
          ) : (
            <Feather
              name="eye"
              style={{position: 'absolute', right: 10, top: 10}}
              size={20}
              color="white"
              onPress={() => {
                this.setState({secureTextEntry: false});
              }}
            />
          )
        ) : null}
      </View>
    );
  }
}
