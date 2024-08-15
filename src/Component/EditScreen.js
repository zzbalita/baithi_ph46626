import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateXeMay } from '../redux/actions/motoActions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updateBaiThi } from '../redux/actions/baithiActions';

const EditScreen = ({ route, navigation }) => {
    const { thi } = route.params;
    const dispatch = useDispatch();
    const [hoTen, setHoTen] = useState(thi.hoten_ph46626);
    const [monThi, setMonThi] = useState(thi.mon_thi_ph46626);
    const [hinhAnh, setHinhAnh] = useState(thi.hinh_anh_ph46626);
    const [ngayThi, setNgayThi] = useState(thi.ngay_thi_ph46626);
    const [caThi, setCaThi] = useState(thi.ca_thi_ph46626);


    const handleUpdate = () => {
        if (!hoTen || !monThi || !ngayThi || !caThi) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }

        const caThiValue = Number(caThi);
        if (isNaN(caThiValue) || caThiValue <= 0) {
            Alert.alert('Thông báo', 'Giá bán phải lớn hơn 0.');
            return;
        }

        dispatch(updateBaiThi({
            id: thi.id,
            hoten_ph46626: hoTen,
            mon_thi_ph46626: monThi,
            hinh_anh_ph46626: hinhAnh,
            ngay_thi_ph46626: ngayThi,
            ca_thi_ph46626: caThiValue,
            
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
                value={moTa}
                onChangeText={setCaThi}
                keyboardType='numeric'
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
            <Pressable onPress={handleUpdate} style={{ backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', borderRadius: 10, paddingVertical: 10, marginHorizontal: 2 }} >
                <Text>Cập nhật</Text>
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

export default EditScreen;