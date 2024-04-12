import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from "../../theme";
import { useSelector } from 'react-redux';
import { selectColorMode } from "../../src/redux/counterSlice";

const ProfileValue = ({ onPress, label, value, icon }) => {
    const colorMode = useSelector(selectColorMode);

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 80,
                alignItems: 'center',
                paddingHorizontal: 20,
            }}
            onPress={onPress}
        >
            {/* Icon */}
            <View style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                borderRadius: 20,
            }}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30, 
                        
                        tintColor: colorMode === 'dark' ? COLORS.white : COLORS.primary 
                    
                    }}
                />
            </View>

            {/* Label & Value */}
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, marginTop: 20, color: colorMode === 'dark' ? COLORS.white : COLORS.black }}>{label}</Text>
                <Text style={{ color: colorMode === 'dark' ? COLORS.white : COLORS.black }}>{value}</Text>
            </View>

            {/* Arrow icon */}
            <Image 
                source={require('../../assets/images/arrow.png')}
                style={{
                    width: 15,
                    height: 15,
                }}
            />
        </TouchableOpacity>
    )
}

export default ProfileValue;
