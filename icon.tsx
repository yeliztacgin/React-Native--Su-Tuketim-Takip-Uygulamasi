import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IconsProps {
    showOnly?: string;
    onIconPress?: (iconName: string) => void; // İkon basıldığında tetiklenecek fonksiyonu tanımla
}

const Icons: React.FC<IconsProps> = ({ showOnly, onIconPress }) => {
    const iconData = [
        { name: "home", size: 40, color: "blue" },
        { name: "user", size: 40, color: "green" },
        { name: "cog", size: 40, color: "orange" },
        { name: "bell", size: 40, color: "purple" },
        { name: "envelope", size: 40, color: "red" },
        { name: "arrow-left", size: 40, color: "green" },
        { name: "arrow-right", size: 40, color: "green" },
    ];

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            {iconData
                .filter(icon => !showOnly || icon.name === showOnly)
                .map((icon, index) => (
                    <TouchableOpacity key={index} onPress={() => onIconPress && onIconPress(icon.name)}>
                        <Icon name={icon.name} size={icon.size} color={icon.color} />
                    </TouchableOpacity>
                ))}
        </View>
    );
};

export default Icons;
