import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { getlanguages, saveUser } from "../../App";
import { Header } from "react-native-elements";
import Navbar from "./Navbar";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Register"
  };

  onRegisterPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.props.userInfo.email,
        this.props.userInfo.password
      )
      .then(
        () => {
          saveUser(this.props.userInfo);
          this.props.setLoginUsername({ username: this.props.userInfo.email });
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"First Name"}
            style={styles.input}
            onChangeText={firstName => this.props.setFirstName({ firstName })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Last Name"}
            style={styles.input}
            onChangeText={lastName => this.props.setLastName({ lastName })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Email Address"}
            style={styles.input}
            onChangeText={email => this.props.setEmail({ email })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Phone Number"}
            style={styles.input}
            onChangeText={phoneNumber =>
              this.props.setPhoneNumber({ phoneNumber })
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"User name"}
            style={styles.input}
            onChangeText={username => this.props.setUsername({ username })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Password"}
            value={this.props.password}
            onChangeText={password => this.props.setPassword({ password })}
            style={styles.input}
          />
        </View>
        <Button
          title={"Register"}
          style={styles.input}
          onPress={() => {
            this.onRegisterPress();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC107"
  },
  input: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFirstName: data =>
      dispatch({
        type: "SET_FIRSTNAME",
        value: data.firstName
      }),
    setLastName: data =>
      dispatch({
        type: "SET_LASTNAME",
        value: data.lastName
      }),
    setEmail: data =>
      dispatch({
        type: "SET_EMAIL",
        value: data.email
      }),
    setPhoneNumber: data =>
      dispatch({
        type: "SET_PHONENUMBER",
        value: data.phoneNumber
      }),
    setPassword: data =>
      dispatch({
        type: "SET_PASSWORD",
        value: data.password
      }),
    setUsername: data => {
      dispatch({
        type: "SET_USERNAME",
        value: data.username
      });
    },
    setLoginUsername: data => {
      dispatch({
        type: "SET_LOGIN_USERNAME",
        value: data.username
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
