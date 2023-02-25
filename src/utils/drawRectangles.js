const drawRectangles = (imgRef, canvasRef, detectedObjects) => {
    // imgref.current is the same as get document.query....
    const cv = window.cv;
    const cvImage = cv.imread(imgRef.current);
    
    detectedObjects.forEach(detectedObject => {
        // it's necessary to normalize the points, so we need to multiply by width and height
        // to transform it to pixels, cols = width, rows = height
        const p1 = new cv.Point(
            detectedObject.boundingPoly.normalizedVertices[0].x * cvImage.cols,
            detectedObject.boundingPoly.normalizedVertices[0].y * cvImage.rows,);

        const p2 = new cv.Point(
            detectedObject.boundingPoly.normalizedVertices[2].x * cvImage.cols,
            detectedObject.boundingPoly.normalizedVertices[2].y * cvImage.rows,);

        const textPoint = new cv.Point(
            detectedObject.boundingPoly.normalizedVertices[0].x * cvImage.cols,
            detectedObject.boundingPoly.normalizedVertices[0].y * cvImage.rows - 10,
        ) 

        // rgb, the last one is opacity
        const colorRectangle = [0, 255, 0, 255];
        const colorText = [255, 212, 0, 255];
        const colorTextOutline = [0, 0, 0, 255];

        const textfont = cv.FONT_HERSHEY_SIMPLEX;
        const fontSize = 0.5;
        const thickness = 5;

        cv.putText(cvImage, detectedObject.name, textPoint, textfont, fontSize, colorTextOutline, thickness);
        cv.putText(cvImage, detectedObject.name, textPoint, textfont, fontSize, colorText, 2);

        cv.rectangle(cvImage, p1, p2, colorRectangle, 4);
        
        cv.imshow('canvasOutput', cvImage);

        // overwriting image 
        imgRef.current.src = canvasRef.current.toDataURL();
    });

    
}

export {
    drawRectangles,
}