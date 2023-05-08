let duck; //image

let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  duck = loadImage("images/duck.png"); //defining the image
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    circles.push(new Circle(x, y));
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(64);
  for (let i = 0; i < circles.length; i++) {
    circles[i].flock(circles);
    circles[i].followMouse();
    circles[i].update();
    circles[i].display();
  }
}

class Circle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.size = 20;
    this.maxSpeed = 4;
    this.maxForce = 0.1;
    this.neighborhoodRadius = 100; // radius to look for other circles
  }

  display() {
    noStroke();
    fill(255, 0, 0);
    image(duck, this.position.x, this.position.y, 70, 91);
    // ellipse(this.position.x, this.position.y, this.size);
  }

  flock(circles) {
    let alignment = createVector();
    let cohesion = createVector();
    let separation = createVector();
    let total = 0;

    for (let other of circles) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < this.neighborhoodRadius) {
        alignment.add(other.velocity);
        cohesion.add(other.position);
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        separation.add(diff);
        total++;
      }
    }

    if (total > 0) {
      alignment.div(total);
      alignment.setMag(this.maxSpeed);
      alignment.sub(this.velocity);
      alignment.limit(this.maxForce);

      cohesion.div(total);
      cohesion.sub(this.position);
      cohesion.setMag(this.maxSpeed);
      cohesion.sub(this.velocity);
      cohesion.limit(this.maxForce);

      separation.div(total);
      separation.setMag(this.maxSpeed);
      separation.sub(this.velocity);
      separation.limit(this.maxForce);
    }

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  followMouse() {
    let target = createVector(mouseX, mouseY);
    let desired = p5.Vector.sub(target, this.position);
    let d = desired.mag();
    if (d < 100) {
      let m = map(d, 0, 100, 0, this.maxSpeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxSpeed);
    }
    let steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxForce);
    this.acceleration.add(steering);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}