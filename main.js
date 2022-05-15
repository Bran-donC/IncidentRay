"use strict"
var frontCanvas = document.getElementById('rayCanvas');
//var res = LensCanvas.width = LensCanvas.height = screen.width;
frontCanvas.width = document.body.clientWidth;

frontCanvas.height = document.body.clientWidth/3;

const frontctx = frontCanvas.getContext('2d', {alpha: false, desynchronized: true})

function fireRay() {
    let incRayAngle = 90-document.getElementById("angleSlider").value;
    document.getElementById("angleText").innerHTML = incRayAngle+"°";

    // Create temporary canvas
    let backCanvas = document.createElement('canvas');
    backCanvas.width = frontCanvas.width;
    backCanvas.height = frontCanvas.height;
    let ctx = backCanvas.getContext("2d", {alpha: false, desynchronized: true});
    // Paint over canvas for fresh canvas every time
    ctx.fillStyle = '#4b687e';
    ctx.fillRect(0, 0, backCanvas.width, backCanvas.height);
    
    //Initiate ctx properties for painting lines
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#FF0000';
    // Paint normal
    ctx.lineWidth = backCanvas.width/400;
    ctx.fillRect(backCanvas.width/2-backCanvas.width/800, 0, ctx.lineWidth, backCanvas.height);

    //Find coord of incidence ray source

    // This works ig
    let incRayX = backCanvas.height*Math.tan(incRayAngle*Math.PI / 180)
    //Paint incidence ray
    ctx.moveTo(backCanvas.width/2, backCanvas.height);
    ctx.lineTo(backCanvas.width/2-incRayX,0);
    //Paint reflection ray
    ctx.moveTo(backCanvas.width/2, backCanvas.height);
    ctx.lineTo(backCanvas.width/2+incRayX,0);
    
    ctx.stroke();


    //Paint final back canvas to front canvas
    frontctx.drawImage(backCanvas, 0, 0);
}

window.onload = function() {
    fireRay();
}