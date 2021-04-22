/**
 * Monstruo al que tenemos que destruir
 */
class Boss extends Opponent /*Character*/ {
    /**
     * @param game {Game} La instancia del juego al que pertenece el oponente
     */
    
    constructor(game) {
        const height = OPPONENT_HEIGHT * game.width / FACTOR*ESCALA,
            width = OPPONENT_WIDTH * game.width / FACTOR*ESCALA,
            x = getRandomNumber(game.width - width / 2),
            y = 0,
            speed = BOSS_SPEED,
            myImage = BOSS_PICTURE,
            myImageDead = BOSS_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        
    }

    
    /**
     * Mata al Jefe
     */
     die() {

        if (!this.dead) {
            //
           //sumamos un punto extra pues luego llamamos a super.die() y suma el segundo punto
            GAME_UI.marcador.update( GAME_UI.marcador.score, ++this.game.score);
            super.die();
    
        }

    }
}