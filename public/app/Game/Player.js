/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el personaje
     */
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / FACTOR*ESCALA,
            width = PLAYER_WIDTH * game.width / FACTOR*ESCALA,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.myImageLive = PLAYER_PICTURE,
        ///
        this.lives = 3;//numero de vidas iniciales
        ///
        this.updatesPerShot = 10;
        this.updatesPerShotCount = 0;
        this.dragging = false;
        this.initDraggingAbility();
    }

    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update() {
        if (!this.dead && !this.dragging) {
            /*switch (this.game.keyPressed) {
                case KEY_LEFT:
                    if (this.x > this.speed) {
                        this.x -= this.speed;
                    }
                    break;
                case KEY_RIGHT:
                    if (this.x < this.game.width - this.width - this.speed) {
                        this.x += this.speed;
                    }
                    break;
                case KEY_SHOOT:
                    this.game.shoot(this);
                    break;
            }*/
        }


        /**
         * In case game is touchable...
         */
        if (!this.dead) {
            this.updatesPerShotCount++;
            if (this.updatesPerShotCount % this.updatesPerShot == 0) {
                this.game.shoot(this);
            }
        }
    }


    /**
     * In case game is touchable...
     */
    initDraggingAbility() {
        let interactable = interact(this.myImageContainer);
        //almacenamos la posición x inicial para usar drag
        let dPos = { x:this.x, y: 0 };

        interactable.draggable({
            listeners: {
                start: ev => {
                    console.log(ev)
                }, 
                move: ev => {
                    console.log(ev);
                    dPos.x += ev.delta.x;
                    //actualizamos la posición x con el arrastre
                    game.player.x=dPos.x;
                }, 
                end: ev => {
                    console.log(ev)
                }
            }
        })
    }



    /**
     * Mata al jugador
     */
    
    die() {
        if (!this.dead) {
            /*//
            //alert(this.lives+': '+this.suspendido);
            if(!this.game.suspendido) document.getElementById('livesli').innerHTML='Lives: '+(--this.lives);//se decrementan las vidas
            if(this.lives > 0){// si quedan
                this.game.suspendido=true;
                setTimeout(() => {//en 2 s se renace
                    this.image.src=this.myImage;
                    this.dead=false;
                    this.suspendido=false;      
                }, 2000);
            } else { //se le acaban las vidas se muere
                setTimeout(() => {
                    this.game.endGame();
                }, 2000);
                super.die();
             }
            *///
            setTimeout(() => {
                this.game.endGame();
            }, 2000);
            super.die();
            //let nombre=prompt("Introduce el nombre");
            GAME_UI.leaderboard.add(/*nombre*/);
        }
    }
}