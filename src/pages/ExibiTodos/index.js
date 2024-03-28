import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput, Modal, Button } from 'react-native';
import { DatabaseConnection } from '../../database/database'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


export default function App() {
    const db = new DatabaseConnection.getConnection;
    const [todos, setTodos] = useState([]);
    const [filme, setFilme] = useState('')
    const [genero, setGenero] = useState('')
    const [clas, setClas] = useState('')
    const [id, setId] = useState('')
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        atualizaRegistros();
    }, []);


    const atualizaRegistros = () => {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM filmes',
                    [], (_, { rows }) =>
                    setTodos(rows._array),
                );
            });
        } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
        }
    };

    const handleButtonPress = (nomeFilm) => {
        setFilme(nomeFilm);
    };



    const excluirFilme = id => {
        db.transaction(
            tx => {
                tx.executeSql(
                    'DELETE FROM filmes WHERE id = ?',
                    [id], (_, { rowsAffected }) => {
                        if (rowsAffected > 0) {
                            atualizaRegistros();
                            Alert.alert('Sucesso', 'Registro excluído com sucesso.');
                        } else {
                            Alert.alert('Erro', 'Nenhum registro foi excluído, vertifique e tente novamente!');
                        }
                    },
                    (_, error) => {
                        console.error('Erro ao excluir o filme:', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao excluir o filme.');
                    }
                );
            }
        );
    };

    const handleEditPress = (nomeFilm, id,genero,clas) => {
        setFilme(nomeFilm);
        setId(id);
        setGenero(genero);
        setClas(clas);
        setModalVisible(true);
    };



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.containerScroll}>
                    {todos.map(filmes => (
                        <View key={filmes.id} style={styles.filmeItem}>
                            <Text>{filmes.id}</Text>
                            <Text>{filmes.nome_filme}</Text>
                            <Text>{filmes.genero}</Text>
                            <Text>{filmes.classificacao}</Text>
                            <Text>{filmes.data_cad}</Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    "Atenção!",
                                    'Deseja excluir o registro selecionado?',
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => excluirFilme(filmes.id)
                                        },
                                        {
                                            text: 'Cancelar',
                                            onPress: () => { return },
                                            style: 'cancel',
                                        }
                                    ],
                                )
                            }}>
                                <FontAwesome6 name='trash-can' color={'red'} size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEditPress(filmes.nome_filme, filmes.id,filmes.genero,filmes.classificacao)}>
                                <FontAwesome6 name='pen-to-square' color={'green'} size={24} />
                            </TouchableOpacity>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <Text>Editando Filme</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={filme}
                                            onChangeText={setFilme}
                                            placeholder="Nome do Filme"
                                        />
                                        <TextInput
                                            style={styles.input}
                                            value={clas}
                                            onChangeText={setClas}
                                            placeholder="Nome do Filme"
                                        />
                                        <TextInput
                                            style={styles.input}
                                            value={genero}
                                            onChangeText={setGenero}
                                            placeholder="Nome do Filme"
                                        />
                                        <Button title="Salvar" onPress={() => {
                                            // Função para salvar as alterações no filme
                                            setModalVisible(false);
                                        }} />
                                        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                                    </View>
                                </View>
                            </Modal>


                        </View>
                    ))}
                </View>
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fundo escuro semi-transparente
    },
    modalContent: {
        backgroundColor: '#fff', // Fundo branco
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
});
