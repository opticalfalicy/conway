import React, { Component } from "react";
// import Sidebar from "./Sidebar";
import Life from "./life.js";
import Vert from "./vert.js";
import Box from "./box.js";

import "./App.css";

const canvasWidth = window.innerWidth - 90;
const canvasHeight = window.innerHeight;

const COLORS = [
  [0, 0, 0],
  [0xff, 0, 0xff],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f]
];

/**
 * Life canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    if (this.props.lifeSelect === "life") {
      this.life = new Life(canvasWidth, canvasHeight);
    }
    if (this.props.lifeSelect === "vert") {
      this.life = new Vert(canvasWidth, canvasHeight);
    }
    // this.life.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => this.animFrame());
    // console.log("test", this.props.test);
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    // let width = this.props.width;
    // let height = this.props.height;

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    // let fillStyle = 'white';
    // ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();

    // Here is the screen buffer array we can manipulate:

    let screenBuffer = imageData.data;

    // for(let i = 0; i < 1000; i += 4){
    //   screenBuffer[i + 0] = 0; //R
    //   screenBuffer[i + 1] = 0; //G
    //   screenBuffer[i + 2] = 0; //B
    //   screenBuffer[i + 3] = 255; //A
    // }

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        //convert xy to index

        let index = (height * canvasWidth + width) * 4;

        let ccaStatus = cells[height][width];

        // change pixels at index to match status

        screenBuffer[index + 0] = COLORS[ccaStatus][0];
        screenBuffer[index + 1] = COLORS[ccaStatus][1];
        screenBuffer[index + 2] = COLORS[ccaStatus][2];
        screenBuffer[index + 3] = 255;
      }
    }

    // console.log('screenBuffer in animFrame: ', screenBuffer);

    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />;
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div className="canvas">
        <LifeCanvas
          width={canvasWidth}
          height={canvasHeight}
          lifeSelect={this.props.lifeSelect}
        />
      </div>
    );
  }
}

// class Sidebar extends Component {
//   render() {
//     let sideHeight = window.innerHeight;
//     return (
//       <div className="sb-main" style={{ height: sideHeight }}>
//         <button className="sb-b sb-bOne">One</button>
//         <button className="sb-b sb-bTwo">Two</button>
//         <button className="sb-b sb-bOne">Three</button>
//       </div>
//     );
//   }
// }

/**
 * Outer App component
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lifeSelect: "life"
    };
  }

  onSelect = e => {
    console.log(e.target.lifeval);
    if (e.target.val === "1") {
      this.setState = {
        lifeSelect: "life"
      };
      console.log("sel 1");
    }
    if (e.target.val === "2") {
      this.setState = {
        lifeSelect: "vert"
      };
      console.log("sel 2");
    }
  };

  /**
   * Render
   */
  render() {
    // let winWidth = canvasWidth;
    // let winHeight = canvasHeight;
    let sideHeight = window.innerHeight;
    return (
      <div className="App">
        {/* <Sidebar> */}
        <div className="sb-main" style={{ height: sideHeight }}>
          <button className="sb-b sb-bOne" onClick={this.onSelect} lifeval="1">
            One
          </button>
          <button className="sb-b sb-bTwo" val="2">
            Two
          </button>
          <button className="sb-b sb-bOne" val="3">
            Three
          </button>
        </div>
        {/* </Sidebar> */}
        <LifeApp lifeSelect={this.state.lifeSelect} />
      </div>
    );
  }
}

export default App;
