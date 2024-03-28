import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { DatabaseConnection } from '../../database/database'

export default function App() {
  const db = new DatabaseConnection.getConnection;
  const [input, setInput] = useState('')
  const [resultado, setResultado] = useState([])

  const procurarFilme = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM filmes WHERE id = ? OR nome_filme LIKE ?',
        [input, `%${input}%`],
        (_, { rows }) => {
          setResultado(rows._array);
        }
      );
    });
  };


  return (
    <View>
      <TextInput
        placeholder="Entre com nome do filme ou ID"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Procurar" onPress={procurarFilme} />
      {resultado.map(filmes => (
        <View key={filmes.id} style={styles.filmeItem}>
          <Text>{filmes.id}</Text>
          <Text>{filmes.nome_filme}</Text>
          <Text>{filmes.genero}</Text>
          <Text>{filmes.classificacao}</Text>
          <Text>{filmes.data_cad}</Text>

        </View>
      ))}
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
