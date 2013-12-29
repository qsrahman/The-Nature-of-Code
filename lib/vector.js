// Vector class
// Copyright (C) 2011 by Qazi Sami ur Rahman

"use strict";

function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;

	// this.__defineGetter__("x", this.getX);
	// this.__defineSetter__("x", this.setX);
	// this.__defineGetter__("y", this.getY);
	// this.__defineSetter__("y", this.setY);
}

Vector.prototype.setX = function(x) {
	this.x = x || 0;
	return this;
};

Vector.prototype.getX = function() {
	return this.x;
};

Vector.prototype.setY = function(y) {
	this.y = y || 0;
	return this;
};

Vector.prototype.getY = function() {
	return this.y;
};

Vector.prototype.setXY = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;

	return this;
};

Vector.prototype.set = function(vec) {
	this.x = vec.x;
	this.y = vec.y;

	return this;
};

Vector.prototype.get = function () {
	return new Vector(this.x, this.y);
};

Vector.prototype.clone = function () {
	return new Vector(this.x, this.y);
};

Vector.prototype.clear = function () {
    this.x = this.y = 0;

	return this;
};

Vector.prototype.isZero = function() {
	return (this.x === 0 && this.y === 0);
};

Vector.fromAngle = function(angle, len) {
	return new Vector((len || 1) * Math.cos(angle), (len || 1) * Math.sin(angle));
};

Vector.add = function(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
};

Vector.prototype.add = function(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
};

Vector.prototype.addEquals = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
	return this;
};

Vector.sub = function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
};

Vector.prototype.sub = function(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
};

Vector.prototype.subEquals = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
	return this;
};

Vector.mult = function(vec, scalar) {
	return new Vector(vec.x * scalar, vec.y * scalar);
};

// Vector.multVec = function(v1, v2) {
// 	return new Vector(v1.x * v2.x, v1.y * v2.y);
// };

Vector.prototype.mult = function(scalar) {
	return new Vector(this.x * scalar, this.y * scalar);
};

// Vector.prototype.mult = function(arg) {
// 	var result = new Vector();
// 	if(typeof arg === 'number') {
// 		result.setXY(this.x * arg, this.y * arg);
// 	}
// 	else {
// 		result.setXY(this.x * arg.x, this.y * arg.y);
// 	}
// 	return result;
// };

Vector.prototype.multEquals = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
};

// Vector.prototype.multEquals = function(arg) {
// 	if(typeof arg === 'number') {
// 	    this.x *= arg;
// 	    this.y *= arg;
// 	}
// 	else {
// 	    this.x *= arg.x;
// 	    this.y *= arg.y;
// 	}
// 	return this;
// };

Vector.div = function(vec, scalar) {
	var result = new Vector();
    if (scalar !== 0) {
        result.setXY(vec.x / scalar, vec.y / scalar);
    }
	return result;
};

Vector.prototype.div = function(scalar) {
	var result = new Vector();
    if (scalar != 0) {
        result.setXY(this.x / scalar, this.y / scalar);
    }
    return result;
};

Vector.prototype.divEquals = function(scalar) {
	if(scalar != 0) {
    	this.x /= scalar;
    	this.y /= scalar;
	}
	else {
		this.clear();
	}
	return this;
};

Vector.dot = function(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};

Vector.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y;
};

Vector.cross = function(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
};

Vector.prototype.cross = function(vec) {
    return this.x * vec.y - this.y * vec.x;
};

Vector.prototype.negate = function() {
    return new Vector(-1*this.x, -1*this.y);
};

Vector.prototype.equals = function(vec) {
	if (vec == null) return false; // Reject null and undefined
	if (vec.constructor !== Vector) return false; // Reject non-vectors
	return ((vec.x === this.x) && (vec.y === this.y));
};

Vector.prototype.normalize = function () {
	var len = this.length();
	if (len !== 0 && len !== 1)
    	this.divEquals(len);
    return this;
};

Vector.prototype.unit = function() {
	var len = this.length();
	if (len !== 0 && len !== 1)
    	this.divEquals(len);
    return this;
};

Vector.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.lengthSq = function() {
    return this.x * this.x + this.y * this.y;
};


Vector.prototype.distance = function(vec) {
	var dx = this.x - vec.x,
		dy = this.y - vec.y;

	return Math.sqrt(dx * dx + dy * dy);
};

Vector.prototype.distanceSq = function(vec) {
	var dx = this.x - vec.x,
		dy = this.y - vec.y;

	return (dx * dx + dy * dy);
};

Vector.prototype.heading = function() {
    // return Math.atan2(-this.y, this.x);
    return -1 * Math.atan2(-this.y, this.x);
};

Vector.angleBetween = function(v1, v2) {
	return Math.acos(v1.dot(v2) / (v1.length() * v2.length()));
};

Vector.prototype.angleBetween = function(vec) {
	return Math.acos(this.dot(vec) / (this.length() * vec.length()));
};

Vector.prototype.angleTo = function(v) {
	// The nearest angle between two vectors
	// (origin of 0,0 for both vectors)
	var cos = this.x * v.x + this.y * v.y,
		sin = this.y * v.x - this.x * v.y;

	return Math.atan2(sin, cos);
};

Vector.prototype.angle2 = function(vLeft, vRight) {
	return vLeft.sub(this).angleTo(vRight.sub(this));
};

// Returns the vector rotated 90 degrees right.
// Useful for computing normals.
// (Assumes that y axis points down, otherwise this is turnLeft)
Vector.prototype.turnRight = function() {
	return new Vector(-this.y, this.x);
};

// Returns the vector rotated 90 degrees left.
// Useful for computing normals.
// (Assumes that y axis points down, otherwise this is turnRight)
Vector.prototype.turnLeft = function() {
	return new Vector(this.y, -this.x);
};

Vector.prototype.perp = function() {
	return new Vector(-this.y, this.x);
};

Vector.prototype.rotate = function(angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    this.x = this.x * cos - this.y * sin;
    this.y = this.x * sin + this.y * cos;

    return this;
};

// Determines if a given vector is to the right or left of this vector
// returns -1 if to the left and 1 if to the right
Vector.prototype.sign = function(v) {
	return this.prep().dot(v) < 0 ? -1 : 1;
};

Vector.prototype.limit = function(max) {
	if(this.lengthSq() > max*max) {
		this.normalize();
		this.multEquals(max);
	}

	return this;
};

Vector.prototype.lerp = function (vec, alpha) {
	this.x += (vec.x - this.x) * alpha;
	this.y += (vec.y - this.y) * alpha;

	return this;
};

Vector.prototype.min = function (vec) {
	if (this.x > vec.x) {
		this.x = vec.x;
	}
	if(this.y > vec.y) {
		this.y = vec.y;
	}
	return this;
};

Vector.prototype.max = function (vec) {
	if(this.x < vec.x) {
		this.x = vec.x;
	}
	if(this.y < vec.y) {
		this.y = vec.y;
	}
	return this;
};

// This function assumes min < max,
// if this assumption isn't true it will not operate correctly
Vector.prototype.clamp = function (min, max) {
	if(this.x < min.x) {
		this.x = min.x;
	}
	else if(this.x > max.x) {
		this.x = max.x;
	}

	if(this.y < min.y) {
		this.y = min.y;
	}
	else if(this.y > max.y) {
		this.y = max.y;
	}
	return this;
},

// Vector.prototype.draw = function(ctx, pos, scale, color) {
// 	var arrowsize = 4,
// 		len = scale * this.length();

// 	ctx.save();
// 	ctx.translate(pos.x, pos.y);
// 	ctx.rotate(this.heading());

// 	ctx.beginPath();
// 	ctx.moveTo(0, 0);
// 	ctx.lineTo(len, 0);
// 	ctx.lineTo(len-arrowsize, arrowsize/2);
// 	ctx.moveTo(len, 0);
// 	ctx.lineTo(len-arrowsize, -arrowsize/2);
// 	// ctx.closePath();
// 	ctx.strokeStyle = color || "#ff0000";
// 	ctx.stroke();
// 	ctx.restore();
// };

Vector.prototype.toArray = function () {
	return [this.x, this.y];
};

Vector.prototype.toString = function() {
    return "(" + this.x.toFixed(3).replace(/\.?0+$/,'') +","+ this.y.toFixed(3).replace(/\.?0+$/,'') + ")";

};
