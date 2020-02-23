import React, { Component } from "react"

class App extends Component {
  state = {
    isWorking: true
  }

  handleClick = () => {
    console.log("click")
  }

  render() {
    return <div className="app name nice-name" onClick={this.handleClick}></div>
  }
}

export default App
