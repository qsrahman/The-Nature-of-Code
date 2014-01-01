function FlowField(width, height, r) {
	this.resolution = r;
	this.cols = ~~(width / r);
	this.rows = ~~(height / r);

	this.field = new Array(this.cols);
	var xoff = 0;
	for(var i = 0; i < this.cols; i++) {
		var yoff = 0;
		this.field[i] = new Array(this.rows);
		for(var j = 0; j < this.rows; j++) {
			var theta = core.map(core.noise(xoff, yoff, 0), 0, 1, 0, 2*Math.PI);
			this.field[i][j] = new Vector(Math.cos(theta), Math.sin(theta));
			yoff += 0.1;
		}
		xoff += 0.1;
	}
}

FlowField.prototype.lookup = function(v) {
	var col = ~~(core.clamp(v.x / this.resolution, 0, this.cols - 1));
	var row = ~~(core.clamp(v.y / this.resolution, 0, this.rows - 1));

	return this.field[col][row].get();
};

FlowField.prototype.draw = function(ctx) {
	for (var i = 0; i < this.cols; i++) {
		for (var j = 0; j < this.rows; j++) {
			this.drawVector(ctx, this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
		}
	}
};

FlowField.prototype.drawVector = function(ctx, v, x, y, scale) {
	var arrowsize = 4,
		len = scale * v.length();

	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(v.heading());

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(len, 0);
	// ctx.lineTo(len-arrowsize, arrowsize/2);
	// ctx.moveTo(len, 0);
	// ctx.lineTo(len-arrowsize, -arrowsize/2);
	ctx.strokeStyle = "lightgray";
	ctx.stroke();
	ctx.restore();
};
