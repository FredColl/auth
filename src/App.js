import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = {
        loggedIn: null
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDubXSI1YaH3dxWqvMTyXSwKXVAw5Hav2I",
            authDomain: "auth-fca58.firebaseapp.com",
            databaseURL: "https://auth-fca58.firebaseio.com",
            projectId: "auth-fca58",
            storageBucket: "auth-fca58.appspot.com",
            messagingSenderId: "427299613848"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        
        switch (this.state.loggedIn) {
            case true: 
                return (
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log out
                    </Button>
                );
            case false: 
                return <LoginForm />;
            default: 
                return <Spinner />
        }   
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;