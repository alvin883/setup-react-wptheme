import React, { Component } from "react"
import Axios from "axios"

class App extends Component {
  state = {
    isWorking: true
  }

  componentDidMount() {
    Axios.get("https://my-json-server.typicode.com/typicode/demo/posts")
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  handleClick = () => {
    console.log("click")
  }

  render() {
    return <div className="app name nice-name" onClick={this.handleClick}></div>
  }
}

export default App
