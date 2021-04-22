/**
 * Consts and state
 */
//creamos la instancia de tabla de participantes en local storago
localStorage.leaderboard = localStorage.leaderboard || JSON.stringify([]);


// Contenedor de instancia del juego
let game;


// Valores constantes
const OPPONENT_HEIGHT = 5,
    OPPONENT_PICTURE = "assets/img/malo.svg",
    OPPONENT_PICTURE_DEAD = "assets/img/malo_muerto.svg",
    BOSS_PICTURE = "assets/img/jefe.svg",
    BOSS_PICTURE_DEAD = "assets/img/jefe_muerto.svg",
    OPPONENT_SPEED = 5,
    BOSS_SPEED = 2*OPPONENT_SPEED,
    OPPONENT_WIDTH = 5,
    GAME_OVER_PICTURE = "assets/img/game_over.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 5,
    PLAYER_PICTURE = "assets/img/bueno.svg",
    PLAYER_PICTURE_DEAD = "assets/img/bueno_muerto.svg",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 5,
    SHOT_HEIGHT = 1.5,
    SHOT_SPEED = 20,
    SHOT_PICTURE_PLAYER = "assets/img/shot1.svg",
    SHOT_PICTURE_OPPONENT = "assets/img/shot2.svg",
    SHOT_WIDTH = 1.5,
    FACTOR=100,
    ESCALA=2;


// Selectores DOM y estado del juego
const GAME_UI = {
    app: document.querySelector('#app'),
    gameBoard: document.querySelector('.game'),
    pages: {
        splash: document.querySelector('#splash_page'),
        swiperContainer: document.querySelector('#swiper_page'),
        main: document.querySelector('#main_page'),
        menu: document.querySelector('#menu_page'),
        settings: document.querySelector('#settings_page'),
        leaderboard: document.querySelector('#leaderboard_page')
    },
    modalWindows: {
        pause: document.querySelector('#modal_pause_window'),
        confirm: document.querySelector('#modal_confirm'),
        spinner: document.querySelector('#modal_loading_spinner')
    },
    state: {
        navigationStage: '',
        playing: false,
        paused: false,
        spinning: false
    },
    ///hecho por lo de vidas y puntos
    marcador: {
        score: document.querySelector('#scoreli'),
        lifes: document.querySelector('#livesli'),
        update: (marcador,valor)=>{
            if(marcador.id==='scoreli') marcador.innerHTML='Score: '+valor;
            else if(marcador.id==='livesli') marcador.innerHTML='Lives: '+valor;
        }
    },
    ///tabla de puntuaciones y funciones para su manejo
    leaderboard: {
        tabla: JSON.parse(localStorage.leaderboard),
        //añadir una nueva entrada tras la partida 
        add: (nombre)=>{
            let tTabla=5
            let nItems=GAME_UI.leaderboard.tabla.length;
            if(nItems<tTabla || GAME_UI.leaderboard.tabla[tTabla-1].score<game.score){
                let nombre=prompt('Introduce el nombre','');
                if (nombre.length>20)nombre=nombre.substring(0,20);
                let item={name:nombre, score: game.score}         
                GAME_UI.leaderboard.tabla.push(item);
                GAME_UI.leaderboard.tabla.sort((a,b)=>{return b.score-a.score});
                if(GAME_UI.leaderboard.tabla.length>tTabla) GAME_UI.leaderboard.tabla.pop();//retiramos el 6º
                localStorage.leaderboard=JSON.stringify(GAME_UI.leaderboard.tabla);
            }
            
            GAME_UI.leaderboard.carga();
        },
        //presentar en la tabla leaderboard la tabla generada
        carga:()=>{
            document.querySelector('#leaderboard_fecha').innerHTML=(new Date()).getFullYear();
            GAME_UI.leaderboard.tabla=JSON.parse(localStorage.leaderboard);
            let bestPlayers = Array.from(document.querySelectorAll('.lboard_item_name'));
            //alert(JSON.stringify( bestPlayers));
            let bestScores = Array.from(document.querySelectorAll('.lboard_item_p'));
            GAME_UI.leaderboard.tabla.forEach((item,i)=>{
                bestPlayers[i].innerHTML=item.name;
                bestScores[i].innerHTML=item.score;
            });
        },
        //borrar la tabla actual y crear una vacía
        remove:()=>{
            if(confirm('¿Seguro que quieres borrar leaderboard?')){
                let bestPlayers = Array.from(document.querySelectorAll('.lboard_item_name'));
                let bestScores = Array.from(document.querySelectorAll('.lboard_item_p'));
                bestPlayers.forEach((player,i)=>{
                    player.innerHTML='--';
                    bestScores[i].innerHTML='-';
                });
                localStorage.leaderboard = JSON.stringify([]);
            }
        }
    }
};
//cargamos la tabla de mejores puntuaciones activa en localstorage
GAME_UI.leaderboard.carga();
//activamos el boton de borrado
document.querySelector('#borrarleaderboard').addEventListener('click', () => {
    GAME_UI.leaderboard.remove();
});

/**
 * loading scripts
 */
window.addEventListener('load', () => {
    initNavigation();
    initUI();
    navigationTo('#splash_page', 'fade_in');
});

/**
 * Selector de temas
 */

let themes=Array.from(document.getElementsByClassName('theme_option'));
//alert(themes.length+': '+JSON.stringify(themes));
let paginaP=document.getElementById('app');
themes.forEach((theme) => {
    //alert('aa');
    theme.addEventListener('click',ev  => {
        //alert('sinnn '+JSON.stringify(themes));
        let nTema='';
        let aTema='';
        themes.forEach((tema, i)=>{
            if(paginaP.classList.contains('theme_0'+(i+1))) nTema=''+(i+1);
            if(tema.classList.contains('selected')) tema.classList.remove('selected');
            if(ev.currentTarget===tema){
                tema.classList.add('selected');
                aTema=''+(i+1);
            };
            //alert(JSON.stringify(tema.classList));
            //tema.classList.add('selected');
        });
        paginaP.classList.remove('theme_0'+ nTema);
        paginaP.classList.add('theme_0'+ aTema);
        //alert(JSON.stringify(ev.getSource()))
        //ev.getSource().classList.addClass('selected');
    })

});

