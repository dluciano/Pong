var Ball = cc.Sprite.extend({
    table: null,
    ctor:function(table){
        this._super(res.pong_png);
        this.reset();
        this.table = table;
        this.scheduleUpdate();
        return true;
    },
    reset: function(){
        var size = cc.winSize;
        this.xVelocity= 100,
        this.yVelocity= 100,
        this.attr({
            x: size.width / 2,
            y: size.height / 2
        });
    },
    nextPlayer: function(){},
    update: function(dt){
        if(currentPlayer && cc.rectIntersectsRect(this.getBoundingBox(), currentPlayer.getBoundingBox())){
            this.xVelocity = -this.xVelocity;
            this.nextPlayer();
        }
        var newBallX = this.x + dt * this.xVelocity;
        var newBallY = this.y + dt * this.yVelocity;
       
        if((newBallY + this.height/2) >= (this.table.y + this.table.height/2)){
            this.yVelocity = -this.yVelocity;            
        }
        else if((newBallY - this.height/2) <= (this.table.y - this.table.height/2)){
            this.yVelocity = -this.yVelocity;            
        }
        
        if(newBallX >= (this.table.x + this.table.width/2)){
            this.onGoal();
            return;
        }
        else if(newBallX <= (this.table.x - this.table.width/2)){
            this.onGoal();
            return;
        }
        
        this.x = newBallX;
        this.y = newBallY;
    },
    xVelocity: 100,
    yVelocity: 100,
    onGoal: function(){}
});