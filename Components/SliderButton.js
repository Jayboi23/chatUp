import React from "react";
import { TouchableOpacity,StyleSheet,Text } from "react-native";

const SliderButton = ({navigation}) => {
    return (
        <TouchableOpacity onPress={navigation} style={styles.button}>
        <Text style={{color: 'whitesmoke', fontWeight: 'bold', fontSize: 20}}>Continue</Text>
    </TouchableOpacity>
    );
};

export default SliderButton;

const styles = StyleSheet.create({
    button:{
        marginVertical: 40,
        alignSelf: 'center',
        backgroundColor: 'royalblue',
        width: '70%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center'
        }
})