import { question } from "readline-sync";

function main(){
    const valor_bem = Number(question('Valor do bem(R$): '))
    const prazo = Number(question('Prazo em meses: '))
    const taxa_administracao = Number(question('Taxa de administração em %:'))
    const valor_lance_prosposto = Number(question('Valor do lance proposto: '))
    const prazo_parcela = question('Prazo ou parcela: ')
    const renda_mensal = Number(question('Renda mensal: ')) 
    
    //calcular o valor total com a taxa de administraçao e o valor das parcelas
    calcular_valor_parcelas(prazo,valor_bem,taxa_administracao)


    //calcular o valor da taxa de administração
    const total_administracao = calcular_administracao(valor_bem,taxa_administracao)
    console.log(`O valor total da taxa de adminsitração é de R$${total_administracao.toFixed(2)}`)


    //se aprovado ou nao dependendo da renda
    const aprovado_reprovado = renda_parcela(prazo,valor_bem,taxa_administracao,renda_mensal)
    console.log(`Renda ${aprovado_reprovado} o resgate! `)


    //opçao do prazo reduzido
    const opcao_prazo_reduzido = prazo_reducao(valor_lance_prosposto, prazo,valor_bem,taxa_administracao)
    console.log(`Se optar pela redução do prazo, será reduzido em ${opcao_prazo_reduzido} meses!`)
    //opcao da parcela reduzida
    const opcao_parcela_reduzida = parcela_reducao(valor_lance_prosposto,prazo,valor_bem,taxa_administracao)
    console.log(`Se optar pela redução da parcela, será reduzida para R$${opcao_parcela_reduzida.toFixed(2)}!`)

    //calcular renda mínima com o novo valor
    const nova_renda_minima = calcular_renda_minima(valor_lance_prosposto,prazo,valor_bem,taxa_administracao)
    console.log(`A renda mínima para pagamento da parcela deve ser de R$${nova_renda_minima.toFixed(2)}`)

    //verificar se a ultima parcela será menor
    const ultima_parcela = resto_do_lance(valor_lance_prosposto, prazo,valor_bem,taxa_administracao)
    




}

function calcular_valor_parcelas(prazo,valor_bem,taxa_administracao){
    let total
    let parcelas

    total = (valor_bem * (taxa_administracao/100)) + valor_bem
    parcelas = total / prazo

    console.log(`O total a ser pago é de R$${total.toFixed(2)}`)
    console.log(`O valor das parcelas será de R$${parcelas.toFixed(2)}`)

}

function calcular_administracao(valor_bem,taxa_administracao){
    let total
    total = valor_bem * (taxa_administracao/100)

    return total
}

function renda_parcela(prazo,valor_bem,taxa_administracao,renda_mensal){
    let total
    let parcelas
    let resultado

    total = (valor_bem * taxa_administracao) + valor_bem
    parcelas = total / prazo

    if((30/100) * parcelas < renda_mensal){
        resultado = 'PERMITE'
    }else{
        resultado = 'NÃO PERMITE'
    }
    return resultado
}
    

function prazo_reducao(valor_lance_prosposto, prazo,valor_bem,taxa_administracao){
    let total
    let parcelas
    let reducao

    total = (valor_bem * (taxa_administracao/100)) + valor_bem
    parcelas = total / prazo

    reducao = Math.floor(valor_lance_prosposto / parcelas)
    return reducao
}

function parcela_reducao(valor_lance_prosposto,prazo,valor_bem,taxa_administracao){
    let total
    let novo_total
    let parcela

    total = (valor_bem * (taxa_administracao/100)) + valor_bem
    novo_total = total - valor_lance_prosposto
    parcela = novo_total / prazo
    return parcela
}

function calcular_renda_minima(valor_lance_prosposto,prazo,valor_bem,taxa_administracao){
    let total
    let novo_total
    let parcela
    let renda_minima

    total = (valor_bem * (taxa_administracao/100)) + valor_bem
    novo_total = total - valor_lance_prosposto
    parcela = novo_total / prazo

    renda_minima = 3.33 * parcela
    return renda_minima


}

function resto_do_lance(valor_lance_prosposto, prazo,valor_bem,taxa_administracao){
    let total
    let parcelas
    let reducao
    let resultado

    total = (valor_bem * (taxa_administracao/100)) + valor_bem
    parcelas = total / prazo
    reducao = valor_lance_prosposto % parcelas

    if (reducao === 0){
        console.log(`Não haverá redução na última parcela!`)
    }else{
        console.log('A ultima parcela será menor!')
    }
}

main()