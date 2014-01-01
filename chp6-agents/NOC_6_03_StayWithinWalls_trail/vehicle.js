function Vehicle(loc, vel, mass, size) {
	this.location = (loc === undefined) ? new Vector() : loc.get();
	this.velocity = (vel === undefined) ? new Vector() : vel.get();
	this.force = new Vector();

	this.mass = mass || 1;
	this.size = size || 5.5;
	this.rotation = 0;
	this.maxspeed = 4;
	this.maxforce = 0.15;

	this.trail = [];
}

Vehicle.prototype.applyForce = function(force) {
	this.force.addEquals(force);
};

Vehicle.prototype.update = function(dt) {
	var acceleration = this.force.div(this.mass);

	this.velocity.addEquals(acceleration.mult(dt));

	this.location.addEquals(this.velocity.mult(dt));

	this.rotation = this.velocity.heading();

	this.force.clear();

	this.trail.push(this.location.get());
	if(this.trail.length > 75) {
		this.trail.splice(0, 1);
	}

};

Vehicle.prototype.boundries = function(width, height, d) {
	var desired = null;

	if(this.location.x - this.size < d) {
		desired = new Vector(this.maxspeed, this.velocity.y);
	}
	else if(this.location.x + this.size > width - d) {
		desired = new Vector(-this.maxspeed, this.velocity.y);
	}

	if(this.location.y - this.size < d) {
		desired = new Vector(this.velocity.x, this.maxspeed);
	}
	else if(this.location.y + this.size > height - d) {
		desired = new Vector(this.velocity.x, -this.maxspeed);
	}

	if (desired != null) {
		desired.normalize();
		desired.multEquals(this.maxspeed);
		var steer = Vector.sub(desired, this.velocity);
		steer.limit(this.maxforce);
		this.applyForce(steer);
	}
};

Vehicle.prototype.draw = function(ctx) {
	ctx.save();

	this.trail.forEach(function(p) {
		ctx.fillRect(p.x, p.y, 1, 1);
	});

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

