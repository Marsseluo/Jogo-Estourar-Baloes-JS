let timerID =null; // tempo jogo

function iniciaJogo(){
    let url = window.location.search
    let nivel_jogo = url.replace('?',"");
    let tempo_segundos = 0;

    //nivel jogo

    if (nivel_jogo == 1) {
        tempo_segundos = 120;       
    }

    if (nivel_jogo == 2) {
        tempo_segundos = 60;       
    }

    if (nivel_jogo == 3) {
        tempo_segundos = 30;       
    }


    document.getElementById('baloes_inteiros').innerHTML = qte_baloes;

    document.getElementById('baloes_estourados').innerHTML = 0;

    cria_baloes(qte_baloes);

    contagem_tempo(tempo_segundos + 1)

}

//cronometro

function contagem_tempo(segundos){

    segundos = segundos - 1;

    if (segundos== -1){
        clearTimeout(timerID); // parar cronometro
        game_over()
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerID = setTimeout("contagem_tempo("+segundos+")", 1000);
}

//balões

let qte_baloes = 80;

function cria_baloes(qte_baloes){
    for(let i = 1 ; i <=qte_baloes; i++){
        let balao = document.createElement("img");
        balao.src ='img/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b'+i;

        balao.onclick = function(){
            estourar(this);
        }

        document.getElementById('cenario').appendChild(balao);

        }

}

function estourar(e){
    let id_balao=e.id;
    document.getElementById(id_balao).setAttribute("onclick","")
    document.getElementById(id_balao).src = 'img/balao_azul_pequeno_estourado.png';

    pontuacao(-1);

}

function pontuacao(acao){
    let balao_inteiro = document.getElementById('baloes_inteiros').innerHTML;
    let balao_estourado = document.getElementById('baloes_estourados').innerHTML;

    balao_inteiro = parseInt(balao_inteiro);
    balao_estourado = parseInt(balao_estourado);

    balao_inteiro = balao_inteiro + acao;
    balao_estourado = balao_estourado - acao;

    document.getElementById('baloes_inteiros').innerHTML = balao_inteiro;
    document.getElementById('baloes_estourados').innerHTML = balao_estourado;

    situacao_jogo(balao_inteiro, balao_estourado);

    

    function situacao_jogo(baloes_inteiros){
        if (baloes_inteiros == 0) {
            alert('Parabéns!!! Você venceu');

            parar_jogo(timerID);
        }
    }
       
}

function parar_jogo(){
    clearTimeout(timerID);
}

function game_over(){
    alert("Você perdeu");
}

function reiniciar(){
    let restart = document.getElementById('reiniciar').id;
    restart.onclick = iniciaJogo();
}

reiniciar();





