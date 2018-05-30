import React, { Component } from 'react'
import './App.css'
import web3 from './web3'
import lottery from './lottery'

class App extends Component {
   state = {
     manager: '',
     players: [],
     balance: '',
     value: '',
     message: ''
  }
  async componentDidMount () {
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)
    this.setState({manager, players, balance})
  }
  onSubmit = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    this.setState({message: 'Chakai malko sega'})
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
    this.setState({message: 'gotovo...'})
  }
  onClick1 = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    this.setState({message: 'Chakai malko sega da vidq koi biiii'})
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    //  value: web3.utils.toWei(this.state.value, 'ether')
    })
    this.setState({message: 'gotovo imame pobeditel...'})
  }
  render () {
    return (
      <div>
        <h1>
        Manager - {this.state.manager},
        Players - {this.state.players.length},
        Balance - {web3.utils.fromWei(this.state.balance, 'ether')}
        </h1>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Our form</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h2>Искаш ли да си играем?</h2>
        <button onClick={this.onClick1} >Изтегли победител!</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>

    )
  }
}

export default App
