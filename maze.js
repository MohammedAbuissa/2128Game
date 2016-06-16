var maze = Class({
constructor: function(height, width,l,offset)
    {
        this.edgelist = [];
        this.height = height;
        this.width = width;
        this.parent = [];
        this.choices = [];
        this.level = [];
        this.adjlist = [];
        this.MAX = 0;
        this.Q = [];
        this.visited = [];
        this.destination = 0;
        this.s = 0;
        this.realEdge = [];
        this.realVertex = [];
        this.getlines(l,offset);
    },
    find: function(i)
    {
        if (this.parent[i]==i)
        {
            return i;
        }
            
        else
        {
            var result = this.find(this.parent[i]);
            this.parent[i] = result;
            return result;
        }
    },
    union: function(i,j)
    {
        var ii = this.find(i);
        var jj = this.find(j);
        this.parent[ii] = jj;
    },
    choicescreator: function(i)
    {
        
           if (i - this.width > 0)
                    this.choices.push(i - this.width);
                if (i + this.width <= this.width * this.height)
                    this.choices.push(i + this.width);
                if (i - 1 > 0 && Math.ceil(i /  this.width) == Math.ceil((i - 1) /  this.width))
                    this.choices.push(i - 1);
                if (i + 1 <= this.width * this.height && Math.ceil(i /  this.width) == Math.ceil((i + 1) /  this.width))
                    this.choices.push(i + 1);
     
    },
    MazeCreator:function()
    {
         for (var i=0;i<this.height*this.width;i++)
        {
            this.parent.push(i);
            this.adjlist.push([]);
            this.level.push(0);
        }
        for (var i=0;i<this.height*this.width;i++)
        {
            this.choices = [];
            this.choicescreator(i+1);
            var ll = this.choices.length;
            while (this.choices.length>0&&ll>0)
            {
                 ll--;
                var index =((Math.ceil(Math.random()*10)-1)%(this.choices.length));
           var choice  = this.choices[index];
            if (this.find(i)==this.find(choice-1))
            {
                this.choices[index] = this.choices[this.choices.length-1];
                this.choices.pop();
                continue;
            }
            else
            {
                this.adjlist[i].push(choice-1);
                this.adjlist[choice-1].push(i);
                this.edgelist.push(new Edge(i,choice-1));
                this.union(i,choice-1);
                break;
            }
            }
          
        
        }
        var source = 0, des=0, max=0;
        for (var i =0;i<=this.width-1;i++)
        {
            this.bfs(this.adjlist,i);
            if (this.MAX> max)
            {
                max = this.MAX;
                des = this.destination;
                source = i;
            }
        }
        for (var i =this.width*(this.height-1)+1;i<=this.width*this.height-1;i++)
        {
            this.bfs(this.adjlist,i);
            if (this.MAX> max)
            {
                max = this.MAX;
                des = this.destination;
                source = i;
            }
        }  
        for (var i =this.width;i<=this.width*(this.height-1);i+=this.width)
        {
            this.bfs(this.adjlist,i);
            if (this.MAX> max)
            {
                max = this.MAX;
                des = this.destination;
                source = i;
            }
        }
        for (var i =2*this.width-1;i<=this.width*(this.height-1)-1;i+=this.width)
        {
            this.bfs(this.adjlist,i);
            if (this.MAX> max)
            {
                max = this.MAX;
                des = this.destination;
                source = i;
            }
        }
            this.MAX =  max;
            this.destination = des;
            this.s = source;
    },
    bfs:function(graph,source)
    {
        
        if (!this.contains(this.visited,source))
        {
            this.visited.push(source);
            //console.log(source);
            for (var i = 0;i<graph[source].length;i++)
            {
                if(!this.contains(this.visited,graph[source][i]))
                {
                    this.MAX = this.level[graph[source][i]] += this.level[source] +1;
                    this.destination = graph[source][i];
                    this.Q.unshift(graph[source][i]);
                }
            }
        }
        if (this.Q.length>0)
            this.bfs(graph,this.Q.pop());
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
    realize:function(Elength, offset)
    {
        
        for(var i=0;i<this.height*this.width;i++)
        {
            this.realVertex.push(new Edge((i%this.width)*Elength+offset,Math.floor(i/this.width)*Elength+offset));
        }
        return this.realVertex;
    },
    getlines: function(elength,offset)
    {
        this.MazeCreator();
        this.realize(elength,offset);
        for (var i =0;i<this.edgelist.length;i++)
        {
     this.realEdge.push([this.realVertex[this.edgelist[i].x],this.realVertex[this.edgelist[i].y]]);         }
        return this.realEdge;
    }
});