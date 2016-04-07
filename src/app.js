var space = new cp.Space();

var Player = cc.PhysicsSprite.extend({
    ctor:function(){
        this._super(res.bar_blue_png);        
        this.body = new cp.Body(1, cp.momentForBox(1, this.width, this.height));
        this.body.setPos(cp.v(this.x, this.y));
        space.addBody(this.body);
        var shape = new cp.BoxShape(this.body, this.width, this.height);
        shape.setElasticity(0.5);
        shape.setFriction(0.5);
        space.addShape(shape);
        this.setBody(this.body);
        
        return true;
    },
    body: null
});

var Ball = cc.PhysicsSprite.extend({
    ctor:function(){
        this._super(res.pong_png);
        this.attr({
            scale: 0.1
        });
        this.body = new cp.Body(1, cp.momentForBox(1, this.width, this.height));
        this.body.setPos(cp.v(this.x, this.y));
        space.addBody(this.body);
        var shape = new cp.BoxShape(this.body, this.width, this.height);
        shape.setElasticity(0.5);
        shape.setFriction(0.5);
        space.addShape(shape);
        this.setBody(this.body);
        return true;
    },
    body: null
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
    _debugNode:null,
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);
        space.gravity = cp.v(-100, 0);
        
        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.puntuacion1 = new PointsLabel();
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new PointsLabel();
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
        
        this.jugador1 = new Player();
        this.jugador1.attr({
            x: size.width * 0.1,
            y: size.height / 2
        });
        this.addChild(this.jugador1, 1);

        this.jugador2 = new Player();
        this.jugador2.attr({
            x: size.width -(size.width * 0.1),
            y: size.height / 2
        });
        this.addChild(this.jugador2, 1);

        this.pelota =  new Ball();
        this.pelota.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.pelota, 1);
                
        this.setupDebugNode();
    },
    ctor:function () {
        this._super();
        this.scheduleUpdate();
        this.inicializar();
        return true;
    },
    update: function(dt) {        
        space.step(dt);
    },
    setupDebugNode : function() {
        this._debugNode = new cc.PhysicsDebugNode(space);
        this._debugNode.visible = false ;
        this.addChild( this._debugNode );
    },
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});