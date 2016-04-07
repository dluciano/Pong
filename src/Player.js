var STOP = 0;
var UP = 1;
var DOWN = -1;

var Player = cc.Sprite.extend({
    name: "",
    table: null,
    ctor:function(name, table){
        this._super(res.bar_blue_png);
        this.scheduleUpdate();
        this.name = name;
        this.table = table;
        return true;
    },
    update: function(dt){
        if(this.movement === STOP){
            this.stopAllActions();
        }
        if(((this.movement === UP) && ((this.y + this.height/2 + 8) >= (this.table.y + this.table.height/2)))){
            this.stopAllActions();
            return;
        }
        else if(((this.movement === DOWN) && ((this.y - this.height/2 - 8) <= (this.table.y - this.table.height/2)))){
            this.stopAllActions();
            return;
        }
        this.runAction(cc.moveBy(0.1, cc.p(0, this.movement*this.speed)));
    },
    movement: STOP,
    speed: 10
});