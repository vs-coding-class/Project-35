class Food{
    constructor(){
        this.foodStock=0;

        this.image=loadImage("Milk.png");
    }

    getFoodStock(){
        var foodStockRef=database.ref("food/food");
        foodStockRef.on("value",function(data){
            this.foodStock=data.val();
        })
    }

    updateFoodStock(){
        database.ref("food").update({
            food:this.foodStock
        });
    }

    deductFood(){
        this.foodStock=this.foodStock-1;
        if(this.foodStock<=0){
            this.foodStock=0;
        }
    }

    addFood(){
        this.foodStock=this.foodStock+1;
        if(this.foodStock>=20){
            this.foodStock=20;
        }
    }

    display(){
        var x=80,y=100;

        if(this.foodStock!==0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                imageMode(CENTER);
                image(this.image,x,y,50,50)
                x=x+30;
            }
        }
  }
}