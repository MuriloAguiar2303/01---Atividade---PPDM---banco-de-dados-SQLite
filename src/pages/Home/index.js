import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();

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
