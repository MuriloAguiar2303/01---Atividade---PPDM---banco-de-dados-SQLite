import * as SQLite from 'expo-sqlite';

export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase("database.db"),
};

export const salvaFilme = (filme, categoria, clas) => {
    const db = new DatabaseConnection.getConnection;
    const dataAtual = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    db.transaction(
        tx => {
            tx.executeSql(
                'INSERT INTO filmes (nome_filme, genero, classificacao, data_cad) VALUES (?, ?, ?, ?)',
                [filme, categoria, clas, dataAtual],
                (_, { rowsAffected }) => {
                    console.log(rowsAffected);
                },
                (_, error) => {
                    console.error('Erro ao adicionar o filme:', error);
                }
            );
        }
    );
};

