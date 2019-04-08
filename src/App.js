import React, {Component} from 'react';
import axios from 'axios';
import PokemonCard from './Pokedex/PokemonCard';
import {Icon, Input} from 'semantic-ui-react';

class App extends Component {
  state = {
    response: [],
    search: '',
  };

  async componentDidMount() {
    const res = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50'
    );
    this.setState({response: res.data.results});
  }

  handleChange = name => e => {
    this.setState({[name]: e.target.value});
  };

  render() {
    let results = this.state.response;
    results = results
      .filter(result => {
        return result.name.includes(this.state.search);
      })
      .map(result => (
        <PokemonCard name={result.name} url={result.url} key={result.name} />
      ));
    return (
      <div>
        <div
          style={{
            textAlign: 'center',
            paddingBottom: '20px',
            background: 'red',
          }}
        >
          <Input
            onChange={this.handleChange('search')}
            placeholder="Search For Pokemon"
            value={this.state.search}
            icon={
              <Icon
                name="search"
                inverted
                circular
                style={{marginRight: '20px'}}
              />
            }
            style={{width: '100%', paddingLeft: '20px', paddingRight: '20px'}}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            background: 'red',
          }}
        >
          {results}
        </div>
      </div>
    );
  }
}

export default App;
