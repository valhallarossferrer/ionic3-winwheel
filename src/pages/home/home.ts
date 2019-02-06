import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  theWheel: any
  winWheel = (window as any).Winwheel
  segmentNo = 1
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('test');
    this.initWheel()
  }

  initWheel() {
    this.theWheel = new this.winWheel({
      'numSegments': 8,
      'outerRadius': 120,
      'segments':
        [
          { 'fillStyle': '#eae56f', 'text': 'Prize 1' },
          { 'fillStyle': '#89f26e', 'text': 'Prize 2' },
          { 'fillStyle': '#7de6ef', 'text': 'Prize 3' },
          { 'fillStyle': '#e7706f', 'text': 'Prize 4' },
          { 'fillStyle': '#eae56f', 'text': 'Prize 5' },
          { 'fillStyle': '#89f26e', 'text': 'Prize 6' },
          { 'fillStyle': '#7de6ef', 'text': 'Prize 7' },
          { 'fillStyle': '#e7706f', 'text': 'Prize 8' }
        ],
      'animation':
      {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8,
        'callbackAfter': this.drawTriangle
      }
    })

    this.drawTriangle()
  }

  // Function called on click of spin button.
  calculatePrize() {
    console.log('here');

    // This formula always makes the wheel stop somewhere inside prize 3 at least
    // 1 degree away from the start and end edges of the segment.
    if (this.segmentNo) {
      // Get random angle inside specified segment of the wheel.
      let stopAt = this.theWheel.getRandomForSegment(this.segmentNo);

      // Important thing is to set the stopAngle of the animation before stating the spin.
      this.theWheel.animation.stopAngle = stopAt;

      // Start the spin animation here.
      this.theWheel.startAnimation();
    }
  }


  drawTriangle = () => {
    // Get the canvas context the wheel uses.
    let ctx = this.theWheel.ctx;

    ctx.strokeStyle = 'navy';  // Set line colour.
    ctx.fillStyle = 'aqua';  // Set fill colour.
    ctx.lineWidth = 2;
    ctx.beginPath();           // Begin path.
    ctx.moveTo(120, 5);        // Move to initial position.
    ctx.lineTo(180, 5);        // Draw lines to make the shape.
    ctx.lineTo(150, 40);
    ctx.lineTo(121, 5);
    ctx.stroke();              // Complete the path by stroking (draw lines).
    ctx.fill();                // Then fill.
  }

  alertPrize(indicatedSegment) {
    // Do basic alert of the segment text.
    console.log("You have won " + indicatedSegment.text);
  }

}
