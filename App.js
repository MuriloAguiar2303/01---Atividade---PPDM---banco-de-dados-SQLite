import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './src/pages/Home';
import ExibiTodos from './src/pages/ExibiTodos';
import CadastroFilme from './src/pages/CadastroFilme';
import PesquisaFilme from './src/pages/PesquisaFilme';

const Stack = createNativeStackNavigator();


export default function app() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
        />
        <Stack.Screen
          name='ExibiTodos'
          component={ExibiTodos}
        />
        <Stack.Screen
          name='CadastroFilme'
          component={CadastroFilme}
        />
        <Stack.Screen
          name='PesquisaFilme'
          component={PesquisaFilme}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )


}