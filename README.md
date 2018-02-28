# compose-react-context
Compose new react context, support both array and object.

## Install

```sh
npm install --save compose-react-context
```

## Usage

```jsx
import React, { Component, Children } from 'react';
import composeReactContext from 'compose-react-context';

const ContextOne = React.createContext(1);
const ContextTwo = React.createContext(2);
const ContextThree = React.createContext(3);

const ArrayContext = composeReactContext([
  ContextOne,
  ContextTwo
]);
const ObjectContext = composeReactContext({
  oneAndTwo: ArrayContext,
  three: ContextThree
});

class Container extends Component {

  state = {
    one: 1,
    two: 2,
    three: 3
  };

  render() {
    const { one, two, three } = this.state;

    return (
      <ObjectContext.Provider value={{
        oneAndTwo: [one, two],
        three
      }}>
        <button onClick={() => this.setState({ one: one + 1 })}>add one</button>
        <button onClick={() => this.setState({ two: two + 2 })}>add two</button>
        <button onClick={() => this.setState({ three: three + 3 })}>add three</button>
        <Child/>
      </ObjectContext.Provider>
    )
  }
}

class Child extends Component {
  render() {
    return (
      <ObjectContext.Consumer>
        {obj => (
          <div>
            <p>one is: {obj.oneAndTwo[0]}</p>
            <p>two is: {obj.oneAndTwo[1]}</p>
            <p>three is: {obj.three}</p>
          </div>
        )}
      </ObjectContext.Consumer>
    )
  }
}
```

