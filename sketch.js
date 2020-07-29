var database;
var dog,dogSprite,dogHappy,dogRegular;
var foodObject,lastFed,timeReader;
var feedDog,addFood;

function preload(){
  dogRegular=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1450,750);
  database=firebase.database();

  foodObject=new Food();
  foodObject.getFoodStock();

  feedDog=createButton("Feed the Dog");
  feedDog.position(700,95);
  feedDog.mousePressed(feedTheDog);

  addFood=createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addMoreFood);

  dog=createSprite(250,400,10,10);
  dog.addImage(dogRegular);
  dog.scale=0.25;
}

function draw(){
  background(46,139,87)

  foodObject.display();

  var timeReader = database.ref("feedTime/feedTime");
  timeReader.on("value",function(data){
    lastFed = data.val();
  });

  drawSprites();
  
  textSize(15);
  fill(255,255,254);

  if(lastFed>12){
    text("Last Fed: "+lastFed%12+" PM",350,30);
  }
  else if(lastFed===0){
    text("Last Fed: "+12+" AM");
  }
  else if(lastFed===12){
    text("Last Fed: "+12+" PM");
  }
  else{
    text("Last Fed: "+lastFed+" AM",350,30);
  }
}

function feedTheDog(){
  foodObject.deductFood();
  foodObject.updateFoodStock();
  database.ref("feedTime").update({
    feedTime:hour()
  });
  dog.addImage(dogHappy);
}

function addMoreFood(){
  foodObject.addFood();
  foodObject.updateFoodStock();
  dog.addImage(dogRegular);
}