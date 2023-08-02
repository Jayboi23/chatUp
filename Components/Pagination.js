import React from "react";
import { View,Animated, StyleSheet, Dimensions } from "react-native";

const  {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, index}) => {
    return (
        <View style={styles.container}>
            {data.map((_, idx) =>{
                const inputRange = [(idx-1) * width, idx * width, (idx + 1) *width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10,20,10],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2,1,0.2],
                    extrapolate: 'clamp',
                })
                return <Animated.View key={idx.toString()} style=
                {[styles.dot, {width: dotWidth, opacity}, idx === index && styles.dotActive]}/>;
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 150,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
  dot:{
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  } ,
  dotActive:{
    backgroundColor: 'royalblue'
  } 
})
