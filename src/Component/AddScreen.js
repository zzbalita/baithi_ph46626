import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addQLDiem } from '../redux/actions/baithiActions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [maSV, setMaSV] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');
    const [maMon, setMaMon] = useState('');
    const [diemQuaTrinh, setDiemQuaTrinh] = useState('');
    const [diemThi, setDiemThi] = useState('');

    const handleAdd = () => {
        if (!maSV || !hoTen || !maMon || !diemQuaTrinh || !diemThi) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }
        const diemQuaTrinhValue = Number(diemQuaTrinh);
        if (isNaN(diemQuaTrinhValue) || diemQuaTrinhValue <= 0 || diemQuaTrinhValue > 10) {
            Alert.alert('Thông báo', 'Điểm quá trình phải lớn hơn 0 và nhỏ hơn hoặc bằng 10.');
            return;
        }
        const diemThiValue = Number(diemThi);
        if (isNaN(diemThiValue) || diemThiValue <= 0 || diemThiValue > 10) {
            Alert.alert('Thông báo', 'Điểm thi phải lớn hơn 0 và nhỏ hơn hoặc bằng 10.');
            return;
        }
        const tongKetValue = diemQuaTrinhValue * 0.6 + diemThiValue * 0.4;

        dispatch(addQLDiem({
            masv_ph46626: maSV,
            ho_ten_ph46626: hoTen,
            hinh_anh_ph46626: hinhAnh,
            ma_mon_ph46626: maMon,
            diem_qua_trinh_ph46626: diemQuaTrinhValue,
            diem_thi_ph46626: diemThiValue,
            tong_ket_ph46626: tongKetValue,
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
                placeholder="Mã sinh viên"
                value={maSV}
                onChangeText={setMaSV}
                style={styles.input}
            />
            <TextInput
                placeholder="Họ tên"
                value={hoTen}
                onChangeText={setHoTen}
                style={styles.input}
            />
            <TextInput
                placeholder="Mã môn"
                value={maMon}
                onChangeText={setMaMon}
                style={styles.input}
            />
            <TextInput
                placeholder="Điểm quá trình"
                value={diemQuaTrinh}
                onChangeText={setDiemQuaTrinh}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Điểm thi"
                value={diemThi}
                onChangeText={setDiemThi}
                keyboardType="numeric"
                style={styles.input}
            />
            <View style={styles.imageContainer}>
                {hinhAnh ? <Image source={{ uri: hinhAnh }} style={styles.image} /> : null}
            </View>
            <View style={styles.imagePickerContainer}>
                <Pressable onPress={handleCamera} style={styles.button}>
                    <Text>Chụp ảnh</Text>
                </Pressable>
                <Pressable onPress={handleGallery} style={styles.button}>
                    <Text>Chọn ảnh</Text>
                </Pressable>
            </View>
            <Pressable onPress={handleAdd} style={styles.button}>
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
    imagePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 2,
    },
});

export default AddScreen;
