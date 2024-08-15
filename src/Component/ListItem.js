import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListItem = ({ thi, onDelete, onEdit, onPress }) => {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => onPress(thi)}>
                <Text style={styles.itemText}>{thi.hoten_ph46626}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit(thi)} style={styles.editButton}>
                <Text>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(thi.id)} style={styles.deleteButton}>
                <Text>Xóa</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    editButton: {
        marginLeft: 10,
        backgroundColor: 'lightblue',
        padding: 5,
        borderRadius: 5,
    },
    deleteButton: {
        marginLeft: 10,
        backgroundColor: 'salmon',
        padding: 5,
        borderRadius: 5,
    },
});

export default ListItem;
