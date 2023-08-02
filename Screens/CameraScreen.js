import {React, useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Image} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const CameraScreen = () =>{
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

    useEffect(() =>{
        (async() => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === 'granted');
        setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
        })();
    },[]);

    if (hasCameraPermission === undefined){
        return <Text>Requesting Permission...</Text>
    } else if (!hasCameraPermission){
        return <Text>Camera Permission not granted. Please change is settings</Text>
    };
    let takePic = async () =>{
        let options ={
            quality: 1,
            base64: true,
            exif: false,
         };
         let newPhoto = await cameraRef.current.takePictureAsync(options);
         setPhoto(newPhoto);
    };

    if (photo){
        let sharePic = () =>{
        shareAsync(photo.uri).then(()=>{
            setPhoto(undefined)
        });
        };
        let savePhoto = () =>{
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() =>{
            setPhoto(undefined)
        });
        };


        return(
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{uri: "data:image/jpg;base64," + photo.base64}}/>
                <Button title='Share With a Contact' onPress={sharePic}/>
                {hasMediaLibraryPermission ? <Button title='Save to Gallery' onPress={savePhoto}/> : undefined}
                <Button title='Retake Photo' onPress={() => setPhoto(undefined)}/>
            </SafeAreaView>
        )
    };

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      };

      function toggleFlashMode() {
        setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off);
      };

    return (
        <Camera style={styles.container} ref={cameraRef} type={type} flashMode={flash} autoFocus={Camera.Constants.AutoFocus.on} >
            <Ionicons onPress={toggleFlashMode} style={styles.flash} name={flash === Camera.Constants.FlashMode.off ? 'md-flash-off' : 'md-flash'} size={24} color="white" />
            <View style={{flexDirection: 'row', alignItems:'center', marginTop: '145%'}}>
            <View style={styles.buttonContainer}>
            <MaterialIcons onPress={takePic} name="camera" size={60} color="black" />
            </View>
            <View style={styles.buttonContainer2}>
            <Ionicons onPress={toggleCameraType} name="md-camera-reverse" size={30} color="white" />
            </View>
            </View>
        </Camera>
    );
}

export default CameraScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonContainer:{
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    position: 'relative',
    marginLeft: 50
  } ,
  preview:{
    alignSelf: 'stretch',
    flex: 1
  },
  buttonContainer2:{
    alignSelf: 'flex-end',
    marginLeft: 30
  },
  flash:{
    marginRight: '80%'
  }

})