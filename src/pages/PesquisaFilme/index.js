import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';
import { DatabaseConnection } from '../../database/database'

export default function App() {
  const db = new DatabaseConnection.getConnection;
  const [input, setInput] = useState('')
  const [resultado, setResultado] = useState([])

  const procurarFilme = () => {
    if (input.trim() === '' || input === null) {
      Alert.alert('Erro', 'Se você não digitar nada, não tem como procurar o filme.');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM filmes WHERE genero LIKE ? OR nome_filme LIKE ?',
        [`%${input}%`, `%${input}%`],
        (_, { rows }) => {
          setResultado(rows._array);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Entre com o nome do filme ou ID"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Procurar" onPress={procurarFilme} />
      {resultado.map(filmes => (
        <View key={filmes.id} style={styles.filmeItem}>
          <Text>ID: {filmes.id}</Text>
          <Text>Nome: {filmes.nome_filme}</Text>
          <Text>Gênero: {filmes.genero}</Text>
          <Text>Classificação: {filmes.classificacao}</Text>
          <Text>Data de Cadastro: {filmes.data_cad}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  filmeItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});
