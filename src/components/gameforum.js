import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Browser } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class GameForum extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  getComments(){
    axios.post('/api/comments')
      .then((res => this.setState({...this.state, comments: res.data })))
  }

  getCoverPhoto() {
    axios.post('api/game-covers', {game: this.state.game.id})
      .then(games => {
        this.setState({...this.state, results: games.data})
      })
      .catch(err => console.log(err))
  }

  getGenres() {
    axios.post('api/game-genres', {genreId: this.state.game.genres})
      .then(genres => {
        this.setState({...this.state, genres: genres.name})
      })
      .catch(err => console.log(err))
  }


  componentDidMount() {
    this.setState({...this.state, game: this.props.location.state.game}, () => {
      this.getCoverPhoto()
      this.getComments()
      this.getGenres()
    })
    console.log('state')
    console.log(this.state)
  }

  render() {
    const game = this.props.location.state.game
    const releaseDate = new Date(this.props.location.state.game.first_release_date * 1000)

    return(
      <main>
        <div className="contains-gameForum">
          <div className="gameForum-left">
            <div className="contains-gameInfo">
              <div className="gameCover">
                <img src= {this.state.results ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${this.state.results[0].image_id}.jpg` : ''} alt="game cover" />
              </div>
              <div className="gameDetails">
                <h2>{game.name}</h2>
                <h5>Released: &nbsp;
                  {releaseDate.getDate().toString()}/
                  {(releaseDate.getMonth() + 1).toString()}/
                  {releaseDate.getFullYear().toString()}
                </h5>
                <h5>genres</h5>
                <p>{game.summary}</p>
              </div>
            </div>
            <div className="contains-ratings">
              <div className="ourRating">
                <h1>{game.rating}</h1>
              </div>
              <div className="yourRating">
                <h1>

                </h1>
              </div>
              <select className="rateGame">
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
              </select>
            </div>
            <div className="contains-screenshots">
              {game.screenshots}
            </div>
          </div>
          <div className="gameForum-right">
            <form className="addcomment">
              <input
                placeholder="what do you think?..."
              />
              <button> Post comment </button>
            </form>
            <div className="commentsfeed">

            </div>
          </div>
        </div>
      </main>
    )
  }
}


export default withRouter(GameForum)
