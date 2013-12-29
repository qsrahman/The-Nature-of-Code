function Vehicle(loc, vel, mass, size) {
	this.location = (loc === undefined) ? new Vector() : loc.get();
	this.velocity = (vel === undefined) ? new Vector() : vel.get();
	this.force = new Vector();

	this.mass = mass || 1;
	this.size = size || 5.5;
	this.rotation = 0;
	this.maxspeed = 4;
	this.maxforce = 0.1;
}

Vehicle.prototype.applyForce = function(force) {
	this.force.addEquals(force);
};

Vehicle.prototype.update = function() {
	var acceleration = this.force.div(this.mass);

	this.velocity.addEquals(acceleration);

	this.location.addEquals(this.velocity);

	this.rotation = this.velocity.heading();

	this.force.clear();
};

Vehicle.prototype.seek = function(target) {
	var desired = target.sub(this.location);
	desired.normalize();
	desired.multEquals(this.maxspeed);
	desired.subEquals(this.velocity); 	// Reynolds’s formula for steering force
	desired.limit(this.maxforce);
	this.applyForce(desired);
};

Vehicle.prototype.arrive = function(target) {
	var desired = target.sub(this.location),
		distance = desired.length();

	desired.normalize();

	if(distance < 100) {
		var m = core.map(distance, 0, 100, 0, this.maxspeed);
		desired.multEquals(m);
	}
	else {
		desired.multEquals(this.maxspeed);
	}
	desired.subEquals(this.velocity); 	// Reynolds’s formula for steering force
	desired.limit(this.maxforce);
	this.applyForce(desired);
}

Vehicle.prototype.checkEdges = function(width, height) {
	if (this.location.x > width) {
		this.location.x = 0;
	}
	else if (this.location.x < 0) {
		this.location.x = width;
	}

	if (this.location.y > height) {
		this.location.y = 0;
	}
	else if (this.location.y < 0) {
		this.location.y = height;
	}
};

Vehicle.prototype.draw = function(ctx) {
	ctx.save();
	ctx.translate(this.location.x, this.location.y);
	ctx.rotate(this.rotation);
	ctx.beginPath();
    ctx.moveTo(2*this.size, 0);
    ctx.lineTo(-2*this.size, this.size);
    ctx.lineTo(-2*this.size, -this.size);
    ctx.fillStyle = "#dc143c"; //"#e81e1e";
    ctx.fill();
    // ctx.strokeStyle = "#2f4f4f";
    // ctx.stroke();
 	ctx.restore();
};

