addScript(declareWorldObject, initWorldObject);

function declareWorldObject(){
    window.groundCollisionAllowance = 3;
}

function initWorldObject(){

}

function createWorldObject(name, component, x, y, rotation, size, layer = 0, tag = ""){
    var worldObject = {};
    worldObject.name = name;
    worldObject.component = component;
    
    worldObject.position = {};
    worldObject.position.x = x;
    worldObject.position.y = y;
    worldObject.rotation = rotation;
    worldObject.size = size / 1000;

    if(worldObject.component.name == "image"){
        worldObject.component.image = window.images[worldObject.component.images.default];
        worldObject.width = worldObject.component.image.naturalWidth * worldObject.size * browserScreen.height;
        worldObject.height = worldObject.component.image.naturalHeight * worldObject.size * browserScreen.height;
    }else{
        context.font = (worldObject.size * 100 * browserScreen.height) + "px " + worldObject.component.font;
        worldObject.width = context.measureText(worldObject.component.content).width;
        worldObject.height = (worldObject.size * 100 * browserScreen.height);
    }
    
    worldObject.layer = layer;
    worldObject.tag = tag;
    worldObject.children = new Array();
    worldObject.changeWorldObjectImage = function(newImageSrc){
        if(worldObject.component.assignedImageSrc != newImageSrc){
            worldObject.component.assignedImageSrc = newImageSrc;
            var newImage = new Image();
            newImage.src = newImageSrc;
            newImage.onload = function(){
                worldObject.component.image = newImage;
            }
        }
    }
    return worldObject;
}

function spawnWorldObject(worldObject){
    //Create a new layer for this world object in worldObjects if that layer hasn't been created before
    if(worldObjects[worldObject.layer] == null){
        worldObjects[worldObject.layer] = new Array();
    }
    worldObjects[worldObject.layer][worldObject.name] = worldObject;
    for(var i in worldObject.children){
        worldObject.children[i].layer = worldObject.layer + 1;
        spawnWorldObject(worldObject.children[i]);
    }
}
function despawnWorldObject(worldObject){
    for(var i in worldObject.children){
        despawnWorldObject(worldObject.children[i]);
    }
    delete worldObjects[worldObject.layer][worldObject.name];
}

function intersects(lineA, lineB) {
    var x1 = lineA[0].x;
    var y1 = lineA[0].y;
    var x2 = lineA[1].x;
    var y2 = lineA[1].y;

    var x3 = lineB[0].x;
    var y3 = lineB[0].y;
    var x4 = lineB[1].x;
    var y4 = lineB[1].y;

    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return null;
    }
  
    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
  
    if (denominator === 0) {
        return null;
    }
  
    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
  
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return null;
    }
  
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)
      
    return {x, y};
}

function getObjectLines(x, y, halfWidth, halfHeight, angle){
    var cos = Math.cos(angle * Math.PI / 180);
    var sin = Math.sin(angle * Math.PI / 180);

    var r1x = -halfWidth * cos - halfHeight * sin;
    var r2x =  halfWidth * cos - halfHeight * sin;
    var r1y = -halfWidth * sin + halfHeight * cos;
    var r2y =  halfWidth * sin + halfHeight * cos;

    var topLeft = {x: x - r2x, y: y - r2y};
    var topRight = {x: x - r1x, y: y - r1y};
    var bottomLeft = {x: x + r1x, y: y + r1y};
    var bottomRight = {x: x + r2x, y: y + r2y};

    return [ 
        [topLeft, topRight],
        [topRight, bottomRight],
        [bottomRight, bottomLeft],
        [bottomLeft, topLeft]
    ];
}

function isCollided(worldObjectA, worldObjectB, deltaY = 0){
    var worldObjectARealPosition = {x: browserScreen.width * worldObjectA.position.x, y: browserScreen.height * (worldObjectA.position.y + deltaY)};

    worldObjectATopEdge = worldObjectARealPosition.y - (worldObjectA.height/2);
    worldObjectABottomEdge = worldObjectARealPosition.y + (worldObjectA.height/2);
    worldObjectALeftEdge = worldObjectARealPosition.x - (worldObjectA.width/2);
    worldObjectARightEdge = worldObjectARealPosition.x + (worldObjectA.width/2);

    var worldObjectBRealPosition = {x: browserScreen.width * worldObjectB.position.x, y: browserScreen.height * worldObjectB.position.y};

    worldObjectBTopEdge = worldObjectBRealPosition.y - (worldObjectB.height/2);
    worldObjectBBottomEdge = worldObjectBRealPosition.y + (worldObjectB.height/2);
    worldObjectBLeftEdge = worldObjectBRealPosition.x - (worldObjectB.width/2);
    worldObjectBRightEdge = worldObjectBRealPosition.x + (worldObjectB.width/2);

    return !(worldObjectARightEdge < worldObjectBLeftEdge || worldObjectALeftEdge > worldObjectBRightEdge ||
        worldObjectATopEdge > worldObjectBBottomEdge || worldObjectABottomEdge < worldObjectBTopEdge);
}
function isCollidedComplex(worldObjectA, worldObjectB, deltaY = 0){
    var worldObjectARealPosition = {x: browserScreen.width * worldObjectA.position.x, y: browserScreen.height * (worldObjectA.position.y + deltaY)};

    var worldObjectALines = getObjectLines(worldObjectARealPosition.x, worldObjectARealPosition.y, 
        worldObjectA.width/2, worldObjectA.height/2, worldObjectA.rotation);
    
    var worldObjectBRealPosition = {x: browserScreen.width * worldObjectB.position.x, y: browserScreen.height * worldObjectB.position.y};

    var worldObjectBLines = getObjectLines(worldObjectBRealPosition.x, worldObjectBRealPosition.y, 
        worldObjectB.width/2, worldObjectB.height/2, worldObjectB.rotation);

    for(var j in worldObjectALines){
        for(var k in worldObjectBLines){
            var intersection = intersects(worldObjectALines[j], worldObjectBLines[k]);
            if(intersection != null){
                worldObjectB.lineAIntersection = worldObjectALines[j];
                worldObjectB.lineBIntersection = worldObjectBLines[k];
                worldObjectB.pointIntersection = intersection;
                return true;
            }
        }
    }

    return false;
}

function isCollidedGround(worldObjectA, worldObjectB, deltaY = 0){
    var worldObjectARealPosition = {x: browserScreen.width * worldObjectA.position.x, y: browserScreen.height * (worldObjectA.position.y + deltaY)};

    worldObjectATopEdge = worldObjectARealPosition.y - (worldObjectA.height/2);
    worldObjectABottomEdge = worldObjectARealPosition.y + (worldObjectA.height/2);
    worldObjectALeftEdge = worldObjectARealPosition.x - (worldObjectA.width/2);
    worldObjectARightEdge = worldObjectARealPosition.x + (worldObjectA.width/2);

    var worldObjectBRealPosition = {x: browserScreen.width * worldObjectB.position.x, y: browserScreen.height * worldObjectB.position.y};

    worldObjectBTopEdge = worldObjectBRealPosition.y - (worldObjectB.height/2);
    worldObjectBBottomEdge = worldObjectBRealPosition.y + (worldObjectB.height/2);
    worldObjectBLeftEdge = worldObjectBRealPosition.x - (worldObjectB.width/2);
    worldObjectBRightEdge = worldObjectBRealPosition.x + (worldObjectB.width/2);
    
    return !(worldObjectARightEdge < worldObjectBLeftEdge || worldObjectALeftEdge > worldObjectBRightEdge || 
        worldObjectABottomEdge - (deltaY*browserScreen.height)-groundCollisionAllowance > worldObjectBTopEdge || 
        worldObjectABottomEdge+groundCollisionAllowance < worldObjectBTopEdge);
}

function isCollidedTag(worldObjectA, worldObjectBTag, deltaY = 0){
    for(var i = 0; i < worldObjects.length; i++){
        for(var name in worldObjects[i]){
            if(worldObjects[i][name].tag == worldObjectBTag){
                var worldObjectB = worldObjects[i][name];
                if(isCollided(worldObjectA, worldObjectB, deltaY)){
                    return worldObjectB;
                }
            }
        }
    }
    return null;
}
function isCollidedComplexTag(worldObjectA, worldObjectBTag, deltaY = 0){
    for(var i = 0; i < worldObjects.length; i++){
        for(var name in worldObjects[i]){
            if(worldObjects[i][name].tag == worldObjectBTag){
                var worldObjectB = worldObjects[i][name];
                if(isCollidedComplex(worldObjectA, worldObjectB, deltaY)){
                    return worldObjectB;
                }
            }
        }
    }
    return null;
}
function isCollidedGroundTag(worldObjectA, worldObjectBTag, deltaY = 0){
    for(var i = 0; i < worldObjects.length; i++){
        for(var name in worldObjects[i]){
            if(worldObjects[i][name].tag == worldObjectBTag){
                var worldObjectB = worldObjects[i][name];
                if(isCollidedGround(worldObjectA, worldObjectB, deltaY)){
                    return worldObjectB;
                }
            }
        }
    }
    return null;
}