var KB_UP = 38;
var KB_DOWN = 40;
var currentPlayer = null;

var Table = cc.Sprite.extend({
    ctor: function(){
        this._super(res.table_png);
        return true;
    }
});

var PointsLabel = cc.LabelTTF.extend({
    ctor: function(){
        this._super("0","Arial",24);
        return true;
    }
});

var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    currentPlayer: null,
    inicializar:function(){
        var size = cc.winSize;        
        var self = this;
        var color = cc.color(100,100,100);
        
        var table = new Table();
        table.attr({
            x: size.width/2,
            y: size.height/2,
        });
        this.addChild(table, 0);
                
        this.puntuacion1 = new PointsLabel();
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new PointsLabel();
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
        
        this.jugador1 = new Player("AI", table);
        this.jugador1.attr({
            x: size.width * 0.1,
            y: size.height / 2
        });
        this.addChild(this.jugador1, 1);
        
        this.jugador2 = new Player("Gamer", table);
        this.jugador2.attr({
            x: size.width -(size.width * 0.1),
            y: size.height / 2
        });
        this.addChild(this.jugador2, 1);
        this.currentPlayer = this.jugador2;
        currentPlayer = this.currentPlayer;
        
        this.pelota =  new Ball(table);
        this.pelota.onGoal = function(){
            self.jugador1.stopAllActions()
            self.jugador2.stopAllActions()
            self.jugador1.attr({
                x: size.width * 0.1,
                y: size.height / 2
            });
            self.jugador2.attr({
                x: size.width -(size.width * 0.1),
                y: size.height / 2
            });
            this.reset();
            currentPlayer = self.currentPlayer = self.jugador2;
        };
        this.pelota.nextPlayer = function(){
            console.log(self.currentPlayer);
            if(self.currentPlayer.name === "AI")
                currentPlayer = self.currentPlayer = self.jugador2;
            else
                currentPlayer = self.currentPlayer = self.jugador1;
        }
        this.addChild(this.pelota, 1);
        
        //add a keyboard event listener to statusLabel
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                if(!self.currentPlayer) return;
                
                if(keyCode === KB_UP){
                    self.currentPlayer.movement = UP;
                }
                else if(keyCode === KB_DOWN){
                    self.currentPlayer.movement = DOWN;
                }
            },
            onKeyReleased: function(keyCode, event){
                if(!self.currentPlayer) return;
                self.currentPlayer.movement = STOP;
            }
        }, this);    
    },
    ctor:function () {
        this._super();
        this.scheduleUpdate();
        this.inicializar();
        return true;
    },
    update: function(dt) {        
        
    },
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});