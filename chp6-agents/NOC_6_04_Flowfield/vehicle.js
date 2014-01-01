function Vehicle(loc, ms, mf, vel, mass, size) {
	this.location = (loc === undefined) ? new Vector() : loc.get();
	this.velocity = (vel === undefined) ? new Vector() : vel.get();
	this.force = new Vector();

	this.mass = mass || 1;
	this.size = size || 3;
	this.rotation = 0;
	this.maxspeed = ms || 4;
	this.maxforce = mf || 0.1;

	this.trail = [];
}

Vehicle.prototype.applyForce = function(force) {
	this.force.addEquals(force);
};

Vehicle.prototype.update = function() {
	this.location.addEquals(this.velocity);

	var acceleration = this.force.div(this.mass);

	this.velocity.addEquals(acceleration);
	// this.velocity.limit(this.maxspeed);

	this.rotation = this.velocity.heading();

	this.force.clear();

	this.trail.push(this.location.get());
	if(this.trail.length > 75) {
		this.trail.splice(0, 1);
	}
};

Vehicle.prototype.follow = function(flow) {
	// What is the vector at that spot in the flow field?
	var desired = flow.lookup(this.location);

	// Scale it up by maxspeed
	desired.multEquals(this.maxspeed);

	// Steering is desired minus velocity
	var steer = Vector.sub(desired, this.velocity);

	// Limit to maximum steering force
	steer.limit(this.maxforce);

	this.applyForce(steer);
};

Vehicle.prototype.checkEdges = function(width, height) {
	if (this.location.x > width + this.size) {
		this.location.x = -this.size;
	}
	else if (this.location.x < -this.size) {
		this.location.x = width + this.size;
	}

	if (this.location.y > height + this.size) {
		this.location.y = -this.size;
	}
	else if (this.location.y < -this.size) {
		this.location.y = height + this.size;
	}
};

Vehicle.prototype.draw = function(ctx) {
	// this.trail.forEach(function(p) {
	// 	ctx.fillRect(p.x, p.y, 1, 1);
	// });

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

