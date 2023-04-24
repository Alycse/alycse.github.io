addScript(declareEffects, initEffects, updateEffects);

function declareEffects(){
    window.explosions = new Array();
    window.explosionCount = 0;

    window.rubbles = new Array();
    window.rubbleCount = 0;
}
function initEffects(){
    
}
function updateEffects(){
    for(var i in explosions){
        explosions[i].position.x += Math.sin(explosions[i].rotation * Math.PI / 180) * explosions[i].speed * deltaTime;
        explosions[i].position.y -= Math.cos(explosions[i].rotation * Math.PI  / 180) * explosions[i].speed * deltaTime;
        if(explosions[i].position.x > 1 || explosions[i].position.x < -1 || explosions[i].position.y > 1 || explosions[i].position.y < -1){
            despawnWorldObject(explosions[i]);
            explosions.splice(i, 1);
        }
    }

    for(var i in rubbles){
        if(rubbles[i].xDirection == -1){
            if(rubbles[i].sideSpeed < 0){
                rubbles[i].sideSpeed += 0.5 * deltaTime;
            }else{
                rubbles[i].sideSpeed = 0;
            }
        }else{
            if(rubbles[i].sideSpeed > 0){
                rubbles[i].sideSpeed -= 0.5 * deltaTime;
            }else{
                rubbles[i].sideSpeed = 0;
            }
        }
        rubbles[i].fallSpeed += 4 * deltaTime;
        rubbles[i].position.y += rubbles[i].fallSpeed * deltaTime;
        rubbles[i].position.x += rubbles[i].sideSpeed * deltaTime;
        if(rubbles[i].position.x > 1 || rubbles[i].position.x < -1 || rubbles[i].position.y > 1 || rubbles[i].position.y < -1){
            despawnWorldObject(rubbles[i]);
            rubbles.splice(i, 1);
        }
    }
}

function explode(position){
    var rotation = Math.random() * 90;

    var explosionA = createWorldObject("Explosion A " + (explosionCount++), {name: "image", images: {default: "/assets/img/shooter/explosion.png"}}, 
        position.x - Math.cos(40)/100, position.y - Math.sin(40)/100, rotation, 0.3, 1);
    var explosionB = createWorldObject("Explosion B " + (explosionCount++), {name: "image", images: {default: "/assets/img/shooter/explosion.png"}}, 
        position.x - Math.cos(40)/100, position.y - Math.sin(40)/100, rotation+90, 0.3, 1);
    var explosionC = createWorldObject("Explosion C " + (explosionCount++), {name: "image", images: {default: "/assets/img/shooter/explosion.png"}}, 
        position.x - Math.cos(40)/100, position.y - Math.sin(40)/100, rotation+180, 0.3, 1);
    var explosionD = createWorldObject("Explosion D " + (explosionCount++), {name: "image", images: {default: "/assets/img/shooter/explosion.png"}}, 
        position.x - Math.cos(40)/100, position.y - Math.sin(40)/100, rotation+270, 0.3, 1);
    explosionA.speed = 3.5;
    explosionB.speed = 3.5;
    explosionC.speed = 3.5;
    explosionD.speed = 3.5;

    if(explosionCount > 100){
        explosionCount = 0;
    }

    spawnWorldObject(explosionA);
    explosions.push(explosionA);
    
    spawnWorldObject(explosionB);
    explosions.push(explosionB);
    
    spawnWorldObject(explosionC);
    explosions.push(explosionC);
    
    spawnWorldObject(explosionD);
    explosions.push(explosionD);
}

function demolish(position, mode = 0){
    var rubbleA = createWorldObject("Rubble A " + (rubbleCount++), {name: "image", images: {default: "/assets/img/shooter/rubble.png"}}, 
        position.x + getRandomInteger(0.0, 0.1), position.y + getRandomInteger(-0.1, 0.0), 0, getRandomInteger(0.2, 0.5), 1);
    rubbleA.sideSpeed = getRandomInteger(0.5, 2.0);
    rubbleA.fallSpeed = getRandomInteger(1.0, 2.5);
    rubbleA.xDirection = 1;

    var rubbleB = createWorldObject("Rubble B " + (rubbleCount++), {name: "image", images: {default: "/assets/img/shooter/rubble.png"}}, 
        position.x + getRandomInteger(0.0, 0.1), position.y + getRandomInteger(-0.25, -0.2), 0, getRandomInteger(0.2, 0.5), 1);
    rubbleB.sideSpeed = getRandomInteger(0.5, 2.0);
    rubbleB.fallSpeed = getRandomInteger(1.0, 2.5);
    rubbleB.xDirection = 1;

    var rubbleC = createWorldObject("Rubble C " + (rubbleCount++), {name: "image", images: {default: "/assets/img/shooter/rubble.png"}}, 
        position.x + getRandomInteger(-0.1, 0.0), position.y + getRandomInteger(-0.1, 0.0), 0, getRandomInteger(0.2, 0.5), 1);
    rubbleC.sideSpeed = getRandomInteger(-2.0, -0.5);
    rubbleC.fallSpeed = getRandomInteger(1.0, 2.5);
    rubbleC.xDirection = -1;

    var rubbleD = createWorldObject("Rubble D " + (rubbleCount++), {name: "image", images: {default: "/assets/img/shooter/rubble.png"}}, 
        position.x + getRandomInteger(-0.1, 0.0), position.y + getRandomInteger(-0.25, -0.2), 0, getRandomInteger(0.2, 0.5), 1);
    rubbleD.sideSpeed = getRandomInteger(-2.0, -0.5);
    rubbleD.fallSpeed = getRandomInteger(1.0, 2.5);
    rubbleD.xDirection = -1;

    spawnWorldObject(rubbleA);
    rubbles.push(rubbleA);
    spawnWorldObject(rubbleB);
    rubbles.push(rubbleB);
    spawnWorldObject(rubbleC);
    rubbles.push(rubbleC);
    spawnWorldObject(rubbleD);
    rubbles.push(rubbleD);

    if(mode > 1){
        var rubbleE = createWorldObject("Rubble E " + (rubbleCount++), {name: "image", images: {default: "/assets/img/shooter/rubble.png"}}, 
            position.x + getRandomInteger(0.0, 0.1), position.y + getRandomInteger(-0.165, -0.185), 0, getRandomInteger(0.4, 0.6), 1);
        rubbleE.sideSpeed = getRandomInteger(0.5, 2.0);
        rubbleE.fallSpeed = getRandomInteger(1.0, 2.5);
        rubbleE.xDirection = 1;

        var rubbleF = createWorldObject("Rubble F " + (rubbleCount++), {name: "image", images: {default: "/assets/img/shooter/rubble.png"}}, 
            position.x + getRandomInteger(-0.1, 0.0), position.y + getRandomInteger(-0.165, -0.185), 0, getRandomInteger(0.4, 0.6), 1);
        rubbleF.sideSpeed = getRandomInteger(-2.0, -0.5);
        rubbleF.fallSpeed = getRandomInteger(1.0, 2.5);
        rubbleF.xDirection = -1;

        spawnWorldObject(rubbleE);
        rubbles.push(rubbleE);
        spawnWorldObject(rubbleF);
        rubbles.push(rubbleF);

        if(mode == 2){
            var rubbleG = createWorldObject("Rubble G " + (rubbleCount++), {name: "image", images: {default: "/assets/img/shooter/rubble.png"}}, 
                position.x + getRandomInteger(-0.075, 0.0), position.y + getRandomInteger(-0.165, -0.185), 0, getRandomInteger(0.4, 0.6), 1);
            rubbleG.sideSpeed = getRandomInteger(-2.0, -0.5);
            rubbleG.fallSpeed = getRandomInteger(1.0, 2.5);
            rubbleG.xDirection = -1;

            var rubbleH = createWorldObject("Rubble H " + (rubbleCount++), {name: "image", images: {default: "/assets/img/shooter/rubble.png"}}, 
                position.x + getRandomInteger(-0.025, 0.0), position.y + getRandomInteger(-0.165, -0.185), 0, getRandomInteger(0.4, 0.6), 1);
            rubbleH.sideSpeed = getRandomInteger(0.5, 2.0);
            rubbleH.fallSpeed = getRandomInteger(1.0, 2.5);
            rubbleH.xDirection = 1;
            
            spawnWorldObject(rubbleG);
            rubbles.push(rubbleG);
            spawnWorldObject(rubbleH);
            rubbles.push(rubbleH);
        }
    }

    if(rubbleCount > 100){
        rubbleCount = 0;
    }
}