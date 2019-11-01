const SVG = require('svg.js');
const Honeycomb = require('honeycomb-grid');

const draw = SVG(document.body);

const Hex = Honeycomb.extendHex({
	size: 50,
	render(draw) {
		const { x, y } = this.toPoint();
		const corners = this.corners();

		this.draw = draw
			.polygon(corners.map(({ x, y }) => `${x},${y}`))
			.fill('none')
			.stroke({ width: 1, color: '#999' })
			.translate(x, y);
	},

	highlight() {
		this.draw
			// stop running animation
			.stop(true, true)
			.fill({ opacity: 1, color: 'aquamarine' })
			.animate(500)
			.fill({ opacity: 0, color: 'none' });
	},
});
const Grid = Honeycomb.defineGrid(Hex);

const grid = Grid.rectangle({
	width: 15,
	height: 15,
	onCreate(hex) {
		hex.render(draw);
	},
});

document.addEventListener('click', ({ offsetX, offsetY }) => {
	const hexCoordinates = Grid.pointToHex([offsetX, offsetY]);
	const hex = grid.get(hexCoordinates);

	if (hex) {
		hex.highlight();
	}
});
