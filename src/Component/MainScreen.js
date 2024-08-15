import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBaiThi, deleteBaiThi } from '../redux/actions/baithiActions';
import ListItem from '../Component/ListItem';
import Banner from '../Component/Banner';

const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const baiThis = useSelector(state => state.baiThi.items);
    const loading = useSelector(state => state.baiThi.loading);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedThi, setSelectedThi] = useState(null);

    useEffect(() => {
        dispatch(fetchBaiThi());
    }, [dispatch]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchBaiThi());
        setRefreshing(false);
    };

    const handleDelete = id => {
        dispatch(deleteBaiThi(id));
    };

    const handleEdit = thi => {
        navigation.navigate('EditScreen', { thi });
    };

    const handleItemPress = (thi) => {
        setSelectedThi(thi);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedXe(null);
    };

    return (
        <View style={styles.container}>
            <Banner />
            <FlatList
                data={baiThis}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem xe={item} onDelete={handleDelete} onEdit={handleEdit} onPress={() => handleItemPress(item)} />
                )}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={<Text style={{flex:1,textAlign:'center'}}>Không có dữ liệu</Text>}
                ListFooterComponent={loading && 
                <Text style={{flex:1,textAlign:'center'}}>Đang tải dữ liệu...</Text>}
            />
            <View style={{ position: 'absolute', backgroundColor: 'lightblue', padding: 20, bottom: 10, right: 10, borderRadius: 100, width: 80, height: 80, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddScreen')} >
                    <Text>Thêm</Text>
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
                            <Text style={styles.modalTitle}>Chi tiết thi</Text>
                            <Text>Họ Tên: {selectedThi.hoten_ph46626}</Text>
                            <Text>Môn Thi: {selectedThi.mon_thi_ph46626}</Text>
                            <Text>Ngày thi: {selectedThi.ngay_thi_ph46626}</Text>
                            <Text>Ca Thi: {selectedThi.ca_thi_ph46626}</Text>
                            {selectedThi.hinh_anh_ph46626 && (
                                <Image source={{ uri: selectedThi.hinh_anh_ph46626 }} style={styles.modalImage} />
                            )}
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
        padding: 10,
        backgroundColor: '#f5f5f5',
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
