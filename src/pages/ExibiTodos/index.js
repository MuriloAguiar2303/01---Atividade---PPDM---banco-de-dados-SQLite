import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DatabaseConnection } from '../../database/database'
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function App() {
    const db = new DatabaseConnection.getConnection;
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        atualizaRegistros();
    }, []);


    const atualizaRegistros = () => {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM filmes',
                    //'_array' é uma propriedade do objeto rows retornado pela consulta SQL, em rows._array, o '_' não se refere diretamente a rows, mas sim ao objeto retornado pela transação SQL. 
                    [], (_, { rows }) =>
                    // O '_array' é uma propriedade desse objeto que contém os resultados da consulta em forma de array.
                    setTodos(rows._array),
                );
            });
        } catch (error) {
            console.error('Erro ao buscar todos:', error);
        }
    };



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.containerScroll}>
                    {/* A propriedade key é usada pelo React para identificar de forma única cada elemento na lista, o que é crucial para que o React possa otimizar a renderização e o desempenho. */}
                    {todos.map(filmes => (
                        <View key={filmes.id} style={styles.clienteItem}>
                            <Text>{filmes.id}</Text>
                            <Text>{filmes.nome_filme}</Text>
                            <Text>{filmes.data_cad}</Text>
                            {/* Dentro do onPress do botão, colocamos um alert perguntando ao usuário se deseja excluir o registro selecionado */}
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
    },
});
