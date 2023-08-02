import React from "react";
import { Image,Text, View, StyleSheet,Animated, Dimensions, Easing, TouchableOpacity} from "react-native";


const {width,height} = Dimensions.get('screen')

const Slider = ({item}) => {
const translateYImage = new Animated.Value(40);

Animated.timing(translateYImage,{
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
}).start();
    return (
        <View style={styles.container}>
            <Animated.Image style={[styles.image, {transform:[{translateY: translateYImage}]}]} source={{uri: item.image}}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({
    container:{
        width,
        height,
        alignItems: 'center',
        alignSelf: 'center'
    },
    image:{
        marginTop:90,
        flex: 0.6,
        width: "100%",
        // height: "100%",
        resizeMode:'contain'
},
title:{
    fontSize: 35,
    color: 'royalblue',
    fontWeight: 'bold',
},
description:{
    color: "#ccc",
    marginVertical: 12,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center'
},
})
