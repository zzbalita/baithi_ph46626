import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Modal, Pressable, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQLDiem } from '../redux/actions/baithiActions';
import ListItem from '../Component/ListItem';
import Banner from '../Component/Banner';

const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const Diems = useSelector(state => state.qlDiem.items);
    const loading = useSelector(state => state.qlDiem.loading);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedThi, setSelectedThi] = useState(null);

    const [maSV, setMaSV] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');
    const [maMon, setMaMon] = useState('');
    const [diemQuaTrinh, setDiemQuaTrinh] = useState('');
    const [diemThi, setDiemThi] = useState('');

    useEffect(() => {
        dispatch(fetchQLDiem());
    }, [dispatch]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchQLDiem());
        setRefreshing(false);
    };


    const handleEdit = diem => {
        navigation.navigate('EditScreen', { diem });
    };

    const handleItemPress = (diem) => {
        setSelectedThi(diem);
        setMaSV(diem.masv_ph46626);
        setHoTen(diem.ho_ten_ph46626);
        setHinhAnh(diem.hinh_anh_ph46626);
        setMaMon(diem.ma_mon_ph46626);
        setDiemQuaTrinh(diem.diem_qua_trinh_ph46626.toString());
        setDiemThi(diem.diem_thi_ph46626.toString());
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedThi(null);
        setMaSV('');
        setHoTen('');
        setHinhAnh('');
        setMaMon('');
        setDiemQuaTrinh('');
        setDiemThi('');
    };

    return (
        <View style={styles.container}>
            <Banner />
            <FlatList
                data={Diems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem diem={item} onDelete={handleDelete} onEdit={handleEdit} onPress={() => handleItemPress(item)} />
                )}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={<Text style={styles.emptyText}>Không có dữ liệu</Text>}
                ListFooterComponent={loading && <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>}
            />
            <View style={styles.addButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('AddScreen')} >
                    <Text style={styles.addButtonText}>Thêm</Text>
                </TouchableOpacity>
            </View>

            {selectedThi && (
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Chi tiết diem</Text>
                            <Text>Mã SV: {maSV}</Text>
                            <Text>Họ Tên: {hoTen}</Text>
                            <Text>Mã Môn: {maMon}</Text>
                            <Text>Điểm Quá Trình: {diemQuaTrinh}</Text>
                            <Text>Điểm Thi: {diemThi}</Text>
                            {hinhAnh ? (
                                <Image source={{ uri: hinhAnh }} style={styles.modalImage} />
                            ) : null}
                            <Pressable onPress={handleCloseModal} style={styles.closeButton}>
                                <Text>Đóng</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    emptyText: {
        flex: 1,
        textAlign: 'center',
        color: 'gray',
    },
    loadingText: {
        flex: 1,
        textAlign: 'center',
        color: 'gray',
    },
    addButtonContainer: {
        position: 'absolute',
        backgroundColor: 'lightblue',
        padding: 20,
        bottom: 10,
        right: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalImage: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default MainScreen;
