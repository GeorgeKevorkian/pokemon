import React, {Component} from 'react';
import {Card, Image} from 'semantic-ui-react';
import axios from 'axios';

class PokemonCard extends Component {
  state = {
    response: null,
  };
  async componentDidMount() {
    const res = await axios.get(`${this.props.url}`);
    await this.setState({response: res.data});
  }

  render() {
    const results = this.state.response;
    return (
      <div>
        {results && (
          <Card
            style={{
              background: 'black',
              'margin-bottom': '40px',
              color: ' white',
            }}
          >
            <Image src={results.sprites.front_default} size="small" centered />
            <Card.Header style={{'text-align': 'center'}}>
              {results.name.charAt(0).toUpperCase() + results.name.slice(1)}
            </Card.Header>
            <Card.Description style={{'text-align': 'center'}}>
              <hr />

              {results.stats.map((x, idx) => (
                <p>
                  {idx + 1} -{' '}
                  {x.stat.name.charAt(0).toUpperCase() + x.stat.name.slice(1)} :{' '}
                  {x.base_stat}
                </p>
              ))}
            </Card.Description>
          </Card>
        )}
      </div>
    );
  }
}

export default PokemonCard;
