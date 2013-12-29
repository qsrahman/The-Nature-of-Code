function Vehicle(loc, vel, mass, size) {
	this.location = (loc === undefined) ? new Vector() : loc.get();
	this.velocity = (vel === undefined) ? new Vector() : vel.get();
	this.force = new Vector();

	this.mass = mass || 1;
	this.size = size || 5.5;
	this.rotation = 0;
	this.maxspeed = 4;
	this.maxforce = 0.15;
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

Vehicle.prototype.boundries = function(circleLocation, circleRadius) {
	var desired = null;

	// Predict location 25 (arbitrary choice) frames ahead
	var predict = this.velocity.get();
	predict.multEquals(25);
	var futureLocation = Vector.add(this.location, predict);
	var distance = futureLocation.distance(circleLocation);

	if (distance > circleRadius) {
		var toCenter = Vector.sub(circleLocation, this.location);
		toCenter.normalize();
		toCenter.multEquals(this.velocity.length());
		desired = Vector.add(this.velocity, toCenter);
		desired.normalize();
		desired.multEquals(this.maxspeed);
	}

	if (desired != null) {
		var steer = Vector.sub(desired, this.velocity);
		steer.limit(this.maxforce);
		this.applyForce(steer);
	}
	return futureLocation;
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

