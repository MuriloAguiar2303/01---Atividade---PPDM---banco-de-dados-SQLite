import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import { DatabaseConnection } from '../../database/database';
import { Picker } from '@react-native-picker/picker';
import { salvaFilme } from '../../database/database'


export default function App() {
    const [filme, setFilme] = useState('');
    const [clas, setClas] = useState('');
    const [categoria, setCate] = useState('');

    const handleSalvaFilme = () => {
        if (filme.trim() === '' || filme === null) {
            Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o nome do filme');
            return;
        }
        if (clas.trim() === '' || clas === null) {
            Alert.alert('Erro', 'Por favor, selecione uma classificação para o filme');
            return;
        }
        if (categoria.trim() === '' || categoria === null) {
            Alert.alert('Erro', 'Por favor, selecione uma categoria para o filme');
            return;
        }

        salvaFilme(filme, categoria, clas);
        setFilme('');
        setCate('');
        setClas('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastre aqui o seu lindo filme</Text>

            <TextInput
                style={styles.input}
                value={filme}
                onChangeText={setFilme}
                placeholder="Digite um novo Filme"
            />

            <Picker
                selectedValue={categoria}
                style={styles.input}
                onValueChange={(itemValue) => setCate(itemValue)}
            >
                <Picker.Item label="Selecione a Categoria" value="" />
                <Picker.Item label="Ação" value="Ação" />
                <Picker.Item label="Comédia" value="Comédia" />
                <Picker.Item label="Drama" value="Drama" />
                <Picker.Item label="Terror" value="Terror" />
            </Picker>

            <Picker
                selectedValue={clas}
                style={styles.input}
                onValueChange={(itemValue) => setClas(itemValue)}
            >
                <Picker.Item label="Selecione a Classificação" value="" />
                <Picker.Item label="Livre" value="Livre" />
                <Picker.Item label="10 anos" value="10 anos" />
                <Picker.Item label="12 anos" value="12 anos" />
                <Picker.Item label="14 anos" value="14 anos" />
                <Picker.Item label="16 anos" value="16 anos" />
                <Picker.Item label="18 anos" value="18 anos" />
            </Picker>

            <Button title="Adicionar" onPress={handleSalvaFilme} />

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
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
});
