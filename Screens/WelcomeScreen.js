import React, { useRef, useState } from "react";
import {StyleSheet, FlatList,SafeAreaView, Animated } from "react-native";
import slide from '../Components/slides.json';
import Slider from "../Components/SliderItem";
import Pagination from "../Components/Pagination";
import SliderButton from "../Components/SliderButton";

const WelcomeScreen = ({navigation}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);
    const handleOnScroll = event => {
        Animated.event([
            {
                nativeEvent:{
                    contentOffset:{
                        x: scrollX,
                    }
                }
            }

        ],
        {
            useNativeDriver: false,
        },
        )(event);
    };
    const handleViewableItemsChanged = useRef(({viewableItems})=>{
        // console.log('viewableItems',  viewableItems)
        setIndex(viewableItems[0].index);
    }).current;

    const handlePress = () =>{
        navigation.replace('Login')
    }

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current
    return (
        <SafeAreaView style={{flex:1,         backgroundColor: 'white'}}>
       <FlatList 
       data={slide}
       renderItem={({item}) => <Slider item={item}/>}
       keyExtractor={(item) => item.id} 
       style={styles.container}
       horizontal
       showsHorizontalScrollIndicator = {false}
       pagingEnabled
       snapToAlignment="center"
       onScroll={handleOnScroll}
       onViewableItemsChanged={handleViewableItemsChanged}
       viewabilityConfig={viewabilityConfig}
       />
       <Pagination data={slide} scrollX={scrollX} index={index}/>
       <SliderButton navigation={handlePress}/>
       </SafeAreaView>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
    }
})