export default {
    addCollider(otherGameobject, callback, context = this) {
        this.scene.physics.add.collider(this, otherGameobject, callback, null, context);
        return this;
    },

    addOverlap(otherGameobject, callback, context) {
        this.scene.physics.add.overlap(this, otherGameobject, callback, null, context);
        return this;
    },

    bodyPositionDifferenceX: 0,
    prevRay: null,
    prevHasHit: null,

    raycast(body, layer, raylength = 20, precision = 2) {
        const {x, y, width, halfHeight} = body;

        this.bodyPositionDifferenceX += body.x - body.prev.x;

        if ((Math.abs(this.bodyPositionDifferenceX) <= precision) && this.prevHasHit !== null) {
            return {
                ray: this.prevRay,
                hasHit: this.prevHasHit
            }
        }

        const line = new Phaser.Geom.Line();

        let hasHit = false;

        switch(Math.sign(body.velocity.x)) {
            case 1: {
                line.x1 = x + width;
                line.y1 = y + halfHeight*2;
                line.x2 = line.x1 + raylength;
                line.y2 = line.y1 + raylength;
                break;
            }

            case -1: {
                line.x1 = x+ width/2;
                line.y1 = y + halfHeight*2;
                line.x2 = line.x1 - raylength;
                line.y2 = line.y1 + raylength;
                break;
            }
        }
        const hits = layer.getTilesWithinShape(line);

        if (hits.length > 0) {
            hasHit = this.prevHasHit = hits.some(hit => hit.index !== -1);
        }
        this.prevRay = line;
        this.bodyPositionDifferenceX = 0;

        return {ray: line, hasHit};
    }
}
