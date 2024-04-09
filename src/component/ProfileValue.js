import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from "../../theme";


const ProfileValue = ({ onPress, label, value, icon }) => {
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
                backgroundColor: COLORS.white,
                marginRight: 20,
                borderRadius: 20,
            }}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary,
                    }}
                />
            </View>

            {/* Label & Value */}
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18,  marginTop: 20 }}>{label}</Text>
                <Text>{value}</Text>
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
