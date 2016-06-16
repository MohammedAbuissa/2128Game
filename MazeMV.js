var MazeMV = Class({
    constructor:function(mazedata, stage)
    {
       this.MD = mazedata;
        this.stage = stage;
        this.sprites = mazedata.MazeElement;
        this.generateMaze();
    },
    generateMaze:function()
    {
         var texture = [PIXI.Texture.fromImage("vertex0.png"),PIXI.Texture.fromImage("vertex1.png"),PIXI.Texture.fromImage("vertex2.png"),PIXI.Texture.fromImage("vertex3.png"),PIXI.Texture.fromImage("vertex4.png"),PIXI.Texture.fromImage("edge.png")];
    var container = new PIXI.SpriteBatch();
    this.stage.addChild(container);
    for (var i=0;i<this.MD.MazeElement.length;i++)
    {
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture[this.MD.MazeElement[i].type]);
    this.MD.MazeElement[i].sprite = bunny;
    bunny.rotation += this.MD.MazeElement[i].orientation*(Math.PI/2);
    bunny.anchor.x = 0.5;
    bunny.anchor.y =0.5;
    bunny.scale.x = 1;
    bunny.scale.y = 1;
    bunny.position.x = this.MD.MazeElement[i].location.x;
    bunny.position.y = this.MD.MazeElement[i].location.y;
    container.addChild(bunny);
    }
    },
    move: function(direction)
    {
        if (direction==0)
        {
             for (var i =0;i<this.sprites.length;i++)
             {
                 if (this.sprites[i].type<5)
                    this.MD.realVertex[this.sprites[i].number].x += 5;
                 this.sprites[i].sprite.position.x+=5;
             }
        }
        else if (direction == 3)
        {
            for (var i =0;i<this.sprites.length;i++)
             {
                if (this.sprites[i].type<5)
                    this.MD.realVertex[this.sprites[i].number].y -= 5;
                 this.sprites[i].sprite.position.y-=5;
             }
        }
        else if (direction==1)
        {
            for (var i =0;i<this.sprites.length;i++)
             {
               if (this.sprites[i].type<5)
                    this.MD.realVertex[this.sprites[i].number].y += 5;
                 this.sprites[i].sprite.position.y+=5;
             }
        }
        else if (direction == 2)
        {
             for (var i =0;i<this.sprites.length;i++)
             {
                if (this.sprites[i].type<5)
                    this.MD.realVertex[this.sprites[i].number].x -= 5;
                 this.sprites[i].sprite.position.x-=5;
             }
        }
    }

});