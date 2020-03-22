export function calcAngleInRadians(p1X, p1Y, p2X, p2Y) {
    return Math.atan2(p2Y - p1Y, p2X - p1X);
}

export function getRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomFromRange(min, max) {
    return (Math.random() * (max - min)) + min;
}

export function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function clamp(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }

    return value;
}

export function getPointFromAngle(oX, oY, radianAngle, distance) {
    var prX = Math.cos(radianAngle) * distance;
    var prY = Math.sin(radianAngle) * distance;

    return {
        x: oX + prX,
        y: oY + prY
    };
}

export function convertFromDegreesToRadians(degree) {
    return degree * Math.PI / 180;
}

export function getDistanceBetweenPoints(p1X, p1Y, p2X, p2Y) {
    //√[(x2-x1)²+(y2-y1)²]
    return Math.sqrt(Math.pow(p2X - p1X, 2) + Math.pow(p2Y - p1Y, 2));
}

export function getCenteredPointInRect(boundingLeft, boundingTop, boundingRight, boundingBottom) {
    // TODO: assuming r > l, b > t.
    // TODO: assuming inner < bounding.
    let boundingWidth = boundingRight - boundingLeft;
    let boundingHeight = boundingBottom - boundingTop;

    let boundingCenterX = boundingWidth / 2 + boundingLeft;
    let boundingCenterY = boundingHeight / 2 + boundingTop;

    return { x: boundingCenterX, y: boundingCenterY };
}

export function getCenteredRectInRect(innerWidth, innerHeight, boundingLeft, boundingTop, boundingRight, boundingBottom) {
    // TODO: assuming r > l, b > t.
    // TODO: assuming inner < bounding.
    let boundingWidth = boundingRight - boundingLeft;
    let boundingHeight = boundingBottom - boundingTop;

    let boundingCenterX = boundingWidth / 2 + boundingLeft;
    let boundingCenterY = boundingHeight / 2 + boundingTop;

    let innerLeft = boundingCenterX - innerWidth / 2;
    let innerTop = boundingCenterY - innerHeight / 2;
    //let innerRight = boundingCenterX + innerWidth / 2;
    //let innerBottom = boundingCenterY + innerHeight / 2;

    return { innerLeft, innerTop };//, innerRight, innerBottom
}

export function checkIfPointIsInsideRect(x, y, boundingLeft, boundingTop, boundingRight, boundingBottom) {
    // TODO: assuming r > l, b > t.
    if (x === undefined ||
        x === null ||
        Number.isNaN(x) ||
        y === undefined ||
        y === null ||
        Number.isNaN(y) ||
        x < boundingLeft ||
        y < boundingTop ||
        x > boundingRight ||
        y > boundingBottom) {
        return false;
    }
    else {
        return true;
    }
}

export function checkIfRectOverlapsRect(r1Left, r1Top, r1Right, r1Bottom, r2Left, r2Top, r2Right, r2Bottom) {
    return !(r2Left > r1Right ||
        r2Right < r1Left ||
        r2Top > r1Bottom ||
        r2Bottom < r1Top);
}

export function calculateMidpointBetweenPoints(p1X, p1Y, p2X, p2Y) {
    let x = (p1X + p2X) / 2;
    let y = (p1Y + p2Y) / 2;
    return { x, y };
}