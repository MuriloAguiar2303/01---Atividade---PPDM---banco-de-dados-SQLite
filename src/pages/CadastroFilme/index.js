import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import { DatabaseConnection } from '../../database/database'


export default function App() {
    const db = new DatabaseConnection.getConnection;
    const [filme, setFilme] = useState('');
    const [clas, setClas] = useState('');
    const [categoria, setCate] = useState('');
    //Todos precisa aqui ? n sei ainda
    const salvaFilme = () => {
        // if (filme.trim() === '' || filme === null) {
        //     Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o filme');
        //     return;
        // }
        db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO filmes (nome_filme, genero, classificacao, data_cad) VALUES (?, ?, ?, datetime("now")) ',
                    [filme, categoria, clas],
                    (_, { rowsAffected }) => {
                        console.log(rowsAffected);
                        setFilme('');
                        setCate('');
                        setClas('');
                    },
                    (_, error) => {
                        console.error('Erro ao adicionar o filme:', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao adicionar o filme.');
                    }
                );
            }
        );
    }





    return (
        <View style={styles.container}>
            {/* titulo */}
            <Text>Cadastre aqui o seu lindo filme (de terror)</Text>
            {/* ID e Data tem q entrar mas n tem que digitar */}

            <TextInput
                style={styles.input}
                value={filme}
                onChangeText={setFilme}
                placeholder="Digite um novo Filme"></TextInput>

            <TextInput
                style={styles.input}
                value={categoria}
                onChangeText={setCate}
                placeholder="Digite sua categoria"></TextInput>

            <TextInput
                style={styles.input}
                value={clas}
                onChangeText={setClas}
                placeholder="Digite a clascificação"></TextInput>

            <Button title="Adicionar" onPress={salvaFilme} />

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
    }, input: {
        width: '70%',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
});
