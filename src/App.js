import React from "react";
import "./styles.css";
import Axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      episodes: [],
      info: {},
      currentPage: 1
    };
  }

  componentDidMount() {
    Axios.get("https://rickandmortyapi.com/api/episode").then(res =>
      this.setState({ episodes: res.data.results, info: res.data.info })
    );
  }

  onPrev = () => {
    Axios.get(this.state.info.prev).then(res =>
      this.setState({
        currentPage: this.state.currentPage - 1,
        episodes: res.data.results,
        info: res.data.info
      })
    );
  };

  onNext = () => {
    Axios.get(this.state.info.next).then(res =>
      this.setState(
        {
          currentPage: this.state.currentPage + 1,
          episodes: res.data.results,
          info: res.data.info
        },
        () => console.log("updated", this.state)
      )
    );
  };
  render() {
    console.log("data", this.state.info);
    return (
      <div className="wrapper">
        <div className="App">
          {this.state.episodes &&
            this.state.episodes.map((r, index) => {
              return (
                <div className="neu">
                  <div className="left">
                    <h1>{r.name}</h1>
                    <h2>{r.episode}</h2>
                    <h3>{r.air_date}</h3>
                  </div>
                  <div className="right">
                    <img
                      src={`https://rickandmortyapi.com/api/character/avatar/${index +
                        1}.jpeg`}
                      alt="char"
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="pagination">
          <div className="control">
            <div
              id="prev"
              disabled={this.state.info.prev ? false : true}
              onClick={this.onPrev}
            >
              Prev
            </div>
            <span>
              Page {this.state.currentPage} of {this.state.info.pages}
            </span>
            <div
              id="next"
              disabled={this.state.info.next ? false : true}
              onClick={this.onNext}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
