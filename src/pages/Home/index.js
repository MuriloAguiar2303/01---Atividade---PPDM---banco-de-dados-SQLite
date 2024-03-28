import React, { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DatabaseConnection } from '../../database/database'
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const db = new DatabaseConnection.getConnection; 
    const navigation = useNavigation();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_filme TEXT NOT NULL, genero TEXT NOT NULL, classificacao TEXT NOT NULL, data_cad TEXT NOT NULL)',
            [], 
            () => console.log('Tabela criada 👍'),
            (_, error) => console.error(error) 
          );
        });
      }, [todos]);



    function Cadastro() {
        navigation.navigate('CadastroFilme')
    }
    function Exibir() {
        navigation.navigate('ExibiTodos')
    }
    function Pesquisa() {
        navigation.navigate('PesquisaFilme')
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text>Catalogo de filmes bons</Text>
                <View>
                    <Button title='Cadastro de filmes' onPress={() => Cadastro()}></Button>
                </View>
                <View>
                    <Button title='Olhar catalogo' onPress={() => Exibir()}></Button>
                </View>
                <View>
                    <Button title='Procurar filme expecifico' onPress={() => Pesquisa()}></Button>
                </View>
            </SafeAreaView>
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
