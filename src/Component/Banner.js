import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withSpring } from 'react-native-reanimated';

const Banner = () => {
    const rotate = useSharedValue(0);

    rotate.value = withRepeat(
        withSpring(360, { damping: 2, stiffness: 100, mass: 1 }),
        -1,
        false
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotate.value}deg` }],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bannerWrapper, animatedStyle]}>
                <ImageBackground source={require('./image.png')} style={styles.banner}>
                    <Text style={styles.text}>Banner</Text>
                </ImageBackground>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerWrapper: {
        height: 150,
    },
    banner: {
        height: 150,
        backgroundColor: '#ffa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'pink',
    },
});

export default Banner;
