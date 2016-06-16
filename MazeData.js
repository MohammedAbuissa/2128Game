var mazedata = Class({
constructor: function(adjlist,realEdge, realVertex, width)
    {
        this.adjlist = adjlist;
        this.realEdge = realEdge;
        this.realVertex = realVertex;
        this.width = width;
        this.MazeElement = [];
        this.constructedge();
        this.constructVertexElement();
       
    },
    constructVertexElement:function()
    {
        for (var i=0;i<this.adjlist.length;i++)
        {
            var type, orientation,location;
            var cases = [this.contains(this.adjlist[i],i-1),this.contains(this.adjlist[i],i-this.width),this.contains(this.adjlist[i],i+1),this.contains(this.adjlist[i],i+this.width)];
            switch (this.adjlist[i].length)
            {
                case 1:
                    type = 0;
                    if (cases[0])
                    orientation =0;
                    else if (cases[1])
                    orientation = 1;
                    else if (cases[2])
                        orientation = 2;
                    else if (cases[3])
                        orientation = 3;
                    break;
                case 2:
                    if (cases[1]&&cases[3])
                    {
                        type = 1;
                        orientation = 1;
                    }
                    else if (cases[0]&&cases[2])
                    {
                        type = 1;
                        orientation = 0;
                    }
                    else if (cases[0]&&cases[1])
                    {
                        type = 2;
                        orientation = 0;
                    }
                    else if (cases[2]&&cases[1])
                    {
                        type = 2;
                        orientation = 1;
                    }
                    else if (cases[2]&&cases[3])
                    {
                        type = 2;
                        orientation = 2;
                    }
                    else if (cases[0]&&cases[3])
                    {
                        type = 2;
                        orientation = 3;
                    }
                    break;
                case 3:
                    type = 3;
                    if (cases[0]&&cases[1]&&cases[2])
                        orientation = 0;
                    else if (cases[1]&&cases[2]&&cases[3])
                        orientation = 1;
                    else if (cases[2]&&cases[3]&&cases[0])
                        orientation = 2;
                    else if (cases[3]&&cases[0]&&cases[1])
                        orientation = 3;
                    break;
                case 4:
                    type = 4;
                    orientation = 0;
                    break;
            }
            location = this.realVertex[i];
            this.MazeElement.push(new VertexElement(i,type,orientation,location,cases));
        }
        
    },
     contains:function(array, element)
    {
        for (var i=0;i<array.length;i++)
        {
            if (array[i]== element)
                return true;
        }
        return false;
    },
    constructedge:function()
    {
           var type, orientation,location;
        for (var i =0;i<this.realEdge.length;i++)
        {
            type =5;
            if (this.realEdge[i][0].x == this.realEdge[i][1].x)
            {
                orientation = 1;
                location = new Edge(this.realEdge[i][0].x,Math.abs(this.realEdge[i][0].y-this.realEdge[i][1].y)/2+((this.realEdge[i][0].y<this.realEdge[i][1].y)?this.realEdge[i][0].y:this.realEdge[i][1].y));
            }
            else
            {
                 orientation = 0;
                location = new Edge(Math.abs(this.realEdge[i][0].x-this.realEdge[i][1].x)/2+((this.realEdge[i][0].x<this.realEdge[i][1].x)?this.realEdge[i][0].x:this.realEdge[i][1].x),this.realEdge[i][0].y);
            }
            console.log(i+" "+location.x + " "+ location.y);
            this.MazeElement.push(new EdgeElement(type,orientation,location));
               
            
        }
            
    }

});