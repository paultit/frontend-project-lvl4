import React from 'react';

class App extends React.Component {
  render() {
    const { gon } = this.props;
    console.log(gon);
    return (<div>
            {gon.channels.map((item) => <div key={ item.id }>{ item.name }</div>)}</div>
    );
  }
}
export default App;
