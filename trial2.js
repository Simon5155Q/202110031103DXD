var nt1, nt2;
var plr, plrType;
var entityGroup;
var eProjectile, eProjectileGroup, projectileX, projectileY;
var mousePosX, mousePosY;
var entity1PosX, entity1PosY, entity2PosX, entity2PosY;
var spawns = 0;
var spawnLimit = 15;
var randomAngle;
var vlcX, vlcY;

function preload(){
    {
        char1 = {
            class:"gunner",
            level:1,
            weapon:"gun",
            health:100,
            shields:100,
            damage:10,
            width:30,
            height:30,
            color:"red"
        },
    

    char2 = {
            class:"wizard",
            level:1,
            weapon:"staff",
            health:100,
            shields:100,
            damage:20,
            width:30,
            height:30,
            color:"green"
        },
        
        entity1 = {
            class:"miniDragons",
            level:1,
            weapon:"fire",
            health:100,
            damage:20,
            width:15,
            height:15,
            color:"grey",  
        },
        entity2 = {
            class:"iceMiniDragons",
            level:1,
            weapon:"ice",
            health:100,
            damage:20,
            width:20,
            height:20,
            color:"blue",     
        }
    }
}

function setup(){
    var canvas = createCanvas(500,500);  
     mousePosX = mouseX;
     mousePosX = mouseY;

     entityGroup = createGroup();
     eProjectileGroup = createGroup();

     var plrTypeArray = [char1.class,char2.class];
     plrType = random(plrTypeArray);  // change random() to selection by the player
     if(plrType === char1.class){  
         plr = createSprite(250,250,char1.width,char1.height);   
         plr.shapeColor = char1.color;
     }
     else{
         plr = createSprite(250,250,char2.width,char2.height);
         plr.shapeColor = char2.color;
     }
}

function draw(){
    background("black");

    plr.x = mouseX;
    plr.y = mouseY;

    entity1PosX = Math.round(random(40,490));
    entity1PosY = Math.round(random(40,490));
    entity2PosX = Math.round(random(50,480));
    entity2PosY = Math.round(random(50,480));

    randomAngle = Math.round(random(0,360));

    vlcX = Math.cos(randomAngle/180 * Math.PI) * 5;
    vlcY = Math.sin(randomAngle/180 * Math.PI) * 5;

    eProjectilePos();
    spawnRngEntities();
    entityProjectiles();
    drawSprites();
}




function spawnRngEntities(){
    if(spawns < spawnLimit){
        var type = [entity1.class, entity2.class];
        if(frameCount % 10 === 0){
            if(random(type) === entity1.class){
                nt1 = createSprite(entity1PosX,entity1PosY,20,20);
                nt1.shapeColor = entity1.color;
                spawns++
                entityGroup.add(nt1);
                // console.log("nt1.props "+nt1.x,nt1.y,nt1.width,nt1.height);
            }
           else{
               nt2 = createSprite(entity2PosX,entity2PosY,30,30);
               nt2.shapeColor = entity2.color;
               spawns++
               entityGroup.add(nt2);
            // console.log("nt2.props "+nt2.x,nt2.y,nt2.width,nt2.height); 
           }
        }
    }
    
    
    for(var i = 0; i < entityGroup.length; i++){
        entityGroup[i].attractionPoint(0.2,plr.x,plr.y);
        entityGroup[i].friction = 0.09; 
        entityGroup[i].debug = true;
        entityGroup[i].collide(entityGroup);
        // entityGroup[i].setCollider("circle",0,0,30);
    }
}

function entityProjectiles(){
    // if(entityGroup.length < 0){
        if(frameCount % 24 === 0){
            for(var i = 0; i < eProjectileGroup.length; i++){
                    eProjectile = createSprite(projectileX,projectileY,12,12);
                    eProjectile.shapeColor = "red"
                    eProjectileGroup.add(eProjectile);
                    eProjectileGroup.velocityEachX = vlcX;
                    eProjectileGroup.velocityEachY = vlcY;
            }
        }
    // }
}

function eProjectilePos(){
    for(var j = 0; j < entityGroup.length; j++){
        projectileX = entityGroup[j].x;
        projectileY = entityGroup[j].y;
    }
}

function checkKey(){
    if(keyDown("W")){
        //scrollscreen
    }
    if(keyDown("A")){
        
    }
    if(keyDown("S")){
        
    }
    if(keyDown("D")){
        
    }
}



/*function mousePressed(){
    if(plrType === char1.class){
        projectile = createSprite(mousePosX, mousePosY, 10,10);
        // projectile.depth = plr.depth - 1;
        projectile.shapeColor = "white";
      console.log("projectile "+ projectile.x,projectile.y);
    }
    else{
        console.log("el");
    }

}*/


/*function plrProjectiles(){
    mousePressed(plr);
}*/
