// Extending from sprite to clean up code
class Sprite {
    constructor({ position = { x: 0, y: 0 }, imageSrc, frames = { max: 1, hold: 0 }, offset = { x: 0, y: 0 },  }) {
        this.position = position
        // Connecting sprite to projectile
        this.image = new Image()
        // Reference file in relation to index.html
        this.image.src = imageSrc
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            hold: frames.hold
        }
        this.offset = offset
    }

    draw() {
        // Setting crop width so we can animate the frames
        const cropWidth = this.image.width / this.frames.max
        const crop = {
            position: {
                // Setting frame to begin at beginning
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: cropWidth,
            height: this.image.height
        }
        context.drawImage(
            this.image, 
            crop.position.x, 
            crop.position.y, 
            crop.width, 
            crop.height,
            // Can offset the image being place on either axis
            this.position.x + this.offset.x,
            this.position.y + this.offset.y,
            crop.width,
            crop.height
        )
    }

    update() {
        // Adding frame hold in animation
        this.frames.elapsed++
        if(this.frames.elapsed % this.frames.hold === 0) {
            this.frames.current++
            if(this.frames.current >= this.frames.max - 1) {
                this.frames.current = 0
            }
        }
    }
}