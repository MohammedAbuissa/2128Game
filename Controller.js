var Controller = Class({
    constructor: function(model)
    {
        this.model = model;
    },
    input :function(list, keydown, keyup)
    {
        
        if (keydown) {
            if (list[37]) {   
                this.model.move(0);
            }
            if (list[40]) {
                this.model.move(3);
 
            }
            if (list[38]) {
                this.model.move(1);
 
            }
            if (list[39]) {
                this.model.move(2);
            }
//            if (list[37])
//            {
//                for (var i =0;i<this.container.length;i++)
//                    this.container[i].position.x -= 5;
//            
//            }
//            if (list [38])
//            {
//                for (var i =0;i<this.container.length;i++)
//                    this.container[i].position.y -= 5;
//            }
//            if (list [39])
//            {
//                for (var i =0;i<this.container.length;i++)
//                    this.container[i].position.x += 5;
//            }
//            if (list [40])
//            {
//                for (var i =0;i<this.container.length;i++)
//                    this.container[i].position.y += 5;
//            }
            
//            if(list[32]) {
//            if (Math.floor(delay/10) == dd)
//            {
//                var newFire = new  PIXI.Sprite(PIXI.Texture.fromImage("this.model.png"));
//	    	stage.addChild(newFire);
//	    	newFire.anchor.x = 0.5;
//	    	newFire.anchor.y = 0.5;
//	    	newFire.position.x = this.model.position.x+30;
//	    	newFire.position.y = this.model.position.y;
//	    	fires.push(newFire);
//                dd++;
//                
//            }
//            delay++;
//            }
        }
    }

});