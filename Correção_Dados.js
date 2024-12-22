const fs = require('fs');


function lerArquivo(filePath) { //Parametro para caminho do banco, no meu caso usei um caminho local na minha máquina
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (erro) {
        console.error(`Erro ao ler o arquivo ${filePath}:`, erro);
        throw erro;
    }
}


function corrigirDados(dados) {
    return dados.map(item => {
       
        if (item.marca) item.marca = item.marca.replace(/æ/g, 'a').replace(/ø/g, 'o');
        if (item.nome) item.nome = item.nome.replace(/æ/g, 'a').replace(/ø/g, 'o');

      
        if (item.vendas && typeof item.vendas === 'string') {
            item.vendas = parseInt(item.vendas, 10);
        }

        return item;
    });
}


function salvarArquivo(filePath, dados) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(dados, null, 4), 'utf-8');
        console.log(`Arquivo corrigido salvo em: ${filePath}`);
    } catch (erro) {
        console.error(`Erro ao salvar o arquivo ${filePath}:`, erro);
        throw erro;
    }
}


const caminhoArquivo1 = './broken_database_1.json';
const caminhoArquivo2 = './broken_database_2.json';
const saidaArquivo1 = './corrigido_database_1.json';
const saidaArquivo2 = './corrigido_database_2.json';


try {
    const dados1 = lerArquivo(caminhoArquivo1);
    const dadosCorrigidos1 = corrigirDados(dados1);
    salvarArquivo(saidaArquivo1, dadosCorrigidos1);

    const dados2 = lerArquivo(caminhoArquivo2);
    const dadosCorrigidos2 = corrigirDados(dados2);
    salvarArquivo(saidaArquivo2, dadosCorrigidos2);

    console.log('Processamento concluído com sucesso!');
} catch (erro) {
    console.error('Erro durante o processamento:', erro);
}
