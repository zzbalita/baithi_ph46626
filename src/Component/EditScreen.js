import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updateQLDiem } from '../redux/actions/baithiActions';

const EditScreen = ({ route, navigation }) => {
    const { diem } = route.params;
    const dispatch = useDispatch();
    const [diemQuaTrinh, setDiemQuaTrinh] = useState(diem.diem_qua_trinh_ph46626.toString());
    const [diemThi, setDiemThi] = useState(diem.diem_thi_ph46626.toString());
    const [tongKet, setTongKet] = useState(diem.tong_ket_ph46626);

    const handleUpdate = () => {
        if (!diemQuaTrinh || !diemThi) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }

        const diemQuaTrinhValue = Number(diemQuaTrinh);
        if (isNaN(diemQuaTrinhValue) || diemQuaTrinhValue < 0 || diemQuaTrinhValue > 10) {
            Alert.alert('Thông báo', 'Điểm quá trình phải là một số từ 0 đến 10.');
            return;
        }

        const diemThiValue = Number(diemThi);
        if (isNaN(diemThiValue) || diemThiValue < 0 || diemThiValue > 10) {
            Alert.alert('Thông báo', 'Điểm thi phải là một số từ 0 đến 10.');
            return;
        }
        const tongKetValue = diemQuaTrinhValue * 0.6 + diemThiValue * 0.4;
        setTongKet(tongKetValue); 

        dispatch(updateQLDiem({
            id: diem.id,
            masv_ph46626: diem.masv_ph46626,
            ho_ten_ph46626: diem.ho_ten_ph46626,
            hinh_anh_ph46626: diem.hinh_anh_ph46626,
            ma_mon_ph46626: diem.ma_mon_ph46626,
            diem_qua_trinh_ph46626: diemQuaTrinhValue,
            diem_thi_ph46626: diemThiValue,
            tong_ket_ph46626: tongKetValue,
        }));

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Mã sinh viên: {diem.masv_ph46626}</Text>
            <Text style={styles.label}>Họ tên: {diem.ho_ten_ph46626}</Text>
            <Text style={styles.label}>Mã môn: {diem.ma_mon_ph46626}</Text>
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
                {diem.hinh_anh_ph46626 ? <Image source={{ uri: diem.hinh_anh_ph46626 }} style={styles.image} /> : null}
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Điểm tổng kết: {tongKet.toFixed(2)}</Text>
            </View>
            <Pressable onPress={handleUpdate} style={styles.button} >
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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
    resultContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
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

export default EditScreen;
