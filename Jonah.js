var Jonah =Class({
    constructor: function(height, width,mazedata,pref,source,mazeMV)
    {
        this.state = 0;
        this.x = 0;
        this.y = 0;
        this.height = height;
        this.width1 = width;
         this.edge = false;
        this.mazedata = mazedata;
        this.pref = pref;
        this.currentplace = [source];
        this.boundries = [[],[],[[]]];
        this.width = mazedata.width;
        this.adjlist = mazedata.adjlist;
        this.mazeMV = mazeMV;
        this.stageWidth = document.body.scrollWidth;
	    this.stageHeight = document.body.scrollHeight;
        this.makeboundries(this.currentplace);
    },
    move: function(direction)
    {
        console.log(this.currentplace);
        
        if (direction==0)
        {
            
             if(this.x-(this.width1/2) > this.boundries[0][0])
             {
                 if (this.x-(this.width1/2)-5<=400)
                 {
                     this.mazeMV.move(direction);
                     console.log(this.boundries);
                     for (var i =0; i<4;i+=2)
                     {
                         
                        this.boundries[i][0]+=5;
                     }
                      console.log(this.boundries);
                 }
                    
                    else this.x-=5;
                
             }
                else if (this.boundries[0][1])
                {
                    this.currentplace =this.boundries [0][2];
                    this.edge = !this.edge;
                    this.makeboundries(this.currentplace);
                }
        }
        else if (direction == 3)
        {
            if(this.y+(this.height/2) <= this.boundries[3][0])
            {
                if (this.y+(this.height/2) +5>=this.stageHeight-200)
                {
                    this.mazeMV.move(direction);
                     console.log(this.boundries);
                    for (var i =1; i<4;i+=2)
                     {
                        this.boundries[i][0]-=5;
                     }
                     console.log(this.boundries);
                }  
                else this.y+=5;
            }
                else if (this.boundries[3][1])
                {
                     this.currentplace =this.boundries [3][2];
                    this.edge = !this.edge;
                     this.makeboundries(this.currentplace);
                }
        }
        else if (direction==1)
        {
            if(this.y-(this.height/2) >=this.boundries[1][0] )
            {
                 if (this.y-(this.height/2)-5<=600)
                 {
                     this.mazeMV.move(direction);
                      console.log(this.boundries);
                    for (var i =1; i<4;i+=2)
                     {
                        this.boundries[i][0]+=5;
                     }
                      console.log(this.boundries);
                 }  
                else this.y-=5;
            }
                else if (this.boundries[1][1])
                {
                     this.currentplace =this.boundries [1][2];
                    this.edge = !this.edge;
                     this.makeboundries(this.currentplace);
                }
        }
        else if (direction == 2)
        {
            if(this.x+(this.width1/2) <= this.boundries[2][0])
            {
                if (this.x+(this.width1/2) +5>=this.stageWidth-400)
                {
                     this.mazeMV.move(direction);
                     console.log(this.boundries);
                     for (var i =0; i<4;i+=2)
                     {
                        this.boundries[i][0]-=5;
                     }
                     console.log(this.boundries);
                }   
                else this.x+=5;
            }
                else if (this.boundries[2][1])
                {
                     this.currentplace =this.boundries[2][2];
                     this.edge = !this.edge;
                     this.makeboundries(this.currentplace);
                }
        }
    },
      makeboundries:function(i)
    {
       if (!this.edge) 
       {
             var cases = [this.contains(this.adjlist[i[0]],i[0]-1),this.contains(this.adjlist[i[0]],i[0]-this.width),this.contains(this.adjlist[i[0]],i[0]+1),this.contains(this.adjlist[i[0]],i[0]+this.width)];
              if (cases[0])
              {
                this.boundries[0] = [this.mazedata.realVertex[i[0]].x-this.pref.Vwidth/2,true,[true,i[0],i[0]-1]];
              }
              else
              {
                this.boundries[0] = [this.mazedata.realVertex[i[0]].x-this.pref.Vwidth/2,false,[]];
              }
              if (cases [1])
              {
                this.boundries[1] = [this.mazedata.realVertex[i[0]].y-this.pref.Vheight/2,true,[false,i[0],i[0]-this.width]];
              }
              else
              {
                this.boundries[1] = [this.mazedata.realVertex[i[0]].y-this.pref.Vheight/2,false,[]];
              }
              if (cases[2])
              {
                this.boundries[2] = [this.mazedata.realVertex[i[0]].x+this.pref.Vwidth/2,true,[true,i[0],i[0]+1]];
              }
              else
              {
                this.boundries[2] = [this.mazedata.realVertex[i[0]].x+this.pref.Vwidth/2,false,[]]; 
              }
              if (cases[3])
              {
                this.boundries[3] = [this.mazedata.realVertex[i[0]].y+this.pref.Vheight/2,true,[false,i[0],i[0]+this.width]];
              }
              else
              {
                this.boundries[3]= [this.mazedata.realVertex[i[0]].y+this.pref.Vheight/2,false,[]]; 
              }
       }
        else
        {
             nxt = i[1]<i[2]?i[1]:i[2];
            pst = i[1]>i[2]?i[1]:i[2];
            if (this.currentplace[0])
            {
                x = Math.abs(this.mazedata.realVertex[i[1]].x-this.mazedata.realVertex[i[2]].x)/2+((this.mazedata.realVertex[i[1]].x<this.mazedata.realVertex[i[2]].x)?this.mazedata.realVertex[i[1]].x:this.mazedata.realVertex[i[2]].x);
                y = this.mazedata.realVertex[i[1]].y;
                this.boundries[0] = [x-this.pref.Ewidth/2,true,[nxt]];
                 this.boundries[1] = [y-this.pref.Eheight/2,false,[]];
                 this.boundries[2] = [x+this.pref.Ewidth/2,true,[pst]];
                this.boundries[3] = [y+this.pref.Eheight/2,false,[]];
            }
            else 
            {
                x=this.mazedata.realVertex[i[1]].x;
                y= Math.abs(this.mazedata.realVertex[i[1]].y-this.mazedata.realVertex[i[2]].y)/2+((this.mazedata.realVertex[i[1]].y<this.mazedata.realVertex[i[2]].y)?this.mazedata.realVertex[i[1]].y:this.mazedata.realVertex[i[2]].y)
                this.boundries[0] = [x-this.pref.Eheight/2,false,[]];
                 this.boundries[1] = [y-this.pref.Ewidth/2,true,[nxt]];
                 this.boundries[2] = [x+this.pref.Eheight/2,false,[]];
                this.boundries[3] = [y+this.pref.Ewidth/2,true,[pst]];
            }
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
    }
    

});