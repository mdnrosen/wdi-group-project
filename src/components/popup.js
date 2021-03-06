import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'

import axios from 'axios'

class Popup extends React.Component {
  constructor() {
    super()

    this.state = {
      comments: 'test',
      ratings: [],
      redirect: false
    }
  }

  handleClick(item) {
    console.log('look here donut', item)
    axios.post('api/localgames', { gameId: item.id, name: item.name })
      .then((res)=> this.setState({...this.state, specificGame: res.data, game: item }, () => this.setState({...this.state, redirect: !this.state.redirect}, () => console.log(this.state.game, 'MILES'))))
      .catch((err) => console.log(err))
  }


  render() {
    if(!this.props.show) {
      return null
    }
    {this.props.games && console.log(this.props.games)}
    {this.state.game && console.log(this.state.game, 'its ya boit')}
    return (
      <div className="popup-backdrop">
        <div className="popup">
          <ul>
            {this.props.games.map((item) =>
              <li key={item.id} onClick={() => this.handleClick(item)}>
                {this.state.redirect && <Redirect
                  to={{
                    pathname: '/gameforum',
                    state: {
                      game: this.state.game,
                      specificGame: this.state.specificGame
                    }
                  }}></Redirect>}{item.name}
              </li>
            )}
          </ul>
          <button className="popup-close" onClick={this.props.onClose}>Cancel</button>
        </div>
      </div>

    )
  }
}

export default withRouter(Popup)
