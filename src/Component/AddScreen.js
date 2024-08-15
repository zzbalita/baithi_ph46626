import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addBaiThi} from '../redux/actions/baithiActions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [hoTen, setHoTen] = useState('');
    const [monThi, setMonThi] = useState('');
    const [ngayThi, setNgayThi] = useState('');
    const [caThi, setCaThi] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');

    const handleAdd = () => {
        if (!hoTen || !monThi || !ngayThi || !caThi) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }
        const caThiValue = Number(caThi);
        if (isNaN(caThiValue) || caThiValue <= 0) {
            Alert.alert('Thông báo', 'Giá bán phải lớn hơn 0.');
            return;
        }

        dispatch(addBaiThi({
            hoten_ph46626: hoTen,
            mon_thi_ph46626: monThi,
            ngay_thi_ph46626: ngayThi,
            ca_thi_ph46626: caThiValue,
            hinh_anh_ph46626: hinhAnh,
        }));

        navigation.goBack();
    };

    const handleCamera = () => {
        launchCamera({ mediaType: 'photo' }, response => {
            if (response.assets) {
                setHinhAnh(response.assets[0].uri);
            }
        });
    };

    const handleGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets) {
                setHinhAnh(response.assets[0].uri);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Họ tên"
                value={hoTen}
                onChangeText={setHoTen}
                style={styles.input}
            />
            <TextInput
                placeholder="Môn thi"
                value={monThi}
                onChangeText={setMonThi}
                style={styles.input}
            />
            <TextInput
                placeholder="Ngày thi"
                value={ngayThi}
                onChangeText={setNgayThi}
                style={styles.input}
            />
            <TextInput
                placeholder="Ca Thi"
                value={caThi}
                onChangeText={setCaThi}
                keyboardType="numeric"
                style={styles.input}
            />
            <View style={styles.imageContainer}>
                {hinhAnh ? <Image source={{ uri: hinhAnh }} style={styles.image} /> : null}
                <View style={{ flexDirection: 'row', }}>
                    <Pressable onPress={handleCamera} style={{ backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', flex: 1, borderRadius: 10, paddingVertical: 10, marginHorizontal: 2 }} >
                        <Text>Chụp ảnh</Text>
                    </Pressable>
                    <Pressable onPress={handleGallery} style={{ backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', flex: 1, borderRadius: 10, paddingVertical: 10, marginHorizontal: 2 }} >
                        <Text>Chọn ảnh từ thư viện</Text>
                    </Pressable>
                </View>
            </View>
            <Pressable onPress={handleAdd} style={{ backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', borderRadius: 10, paddingVertical: 10, marginHorizontal: 2 }} >
                <Text>Thêm</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});

export default AddScreen;
