import React from 'react';

export default function createContext(obj) {
  const Context = toContext(obj);

  function toContext(obj) {
    if (isContext(obj)) return obj;
    if (Array.isArray(obj)) return arrayToContext(obj);
    if (isObject(obj)) return objectToContext(obj);
    return React.createContext(obj);
  }

  function isContext(value) {
    return !!value.Provider && !! value.Consumer;
  }

  function arrayToContext(obj) {
    const contexts = obj.map(toContext);

    const Provider = ({ value, children }) => {
      return contexts.reduce((child, context, i) => (
        <context.Provider value={value[i]}>
          {child}
        </context.Provider>
      ), children);
    }

    const Consumer = ({ children }) => {
      const values = [];

      const curry = (i) => {
        const context = contexts[i];

        return (
          <context.Consumer>
            {value => {
              values.push(value);

              if (values.length === contexts.length) {
                return children(values);
              } else {
                return curry(i + 1);
              }
            }}
          </context.Consumer>
        );
      }

      return curry(0);
    }

    return { Provider, Consumer };
  }

  function objectToContext(obj) {
    const contexts = {};
    const keys = Object.keys(obj);

    keys.forEach(key => {
      contexts[key] = toContext(obj[key]);
    });

    const Provider = ({ value, children }) => {
      return keys.reduce((child, key) => {
        const context = contexts[key];
        return (
          <context.Provider value={value[key]}>
            {child}
          </context.Provider>
        );
      }, children);
    }

    const Consumer = ({ children }) => {
      const values = {};

      const curry = (i) => {
        const key = keys[i];
        const context = contexts[key];

        return (
          <context.Consumer>
            {value => {
              values[key] = value;

              if (keys.length === i + 1) {
                return children(values);
              } else {
                return curry(i + 1);
              }
            }}
          </context.Consumer>
        );
      }

      return curry(0);
    }

    return { Provider, Consumer };
  }

  function isObject(obj) {
    return Object === obj.constructor;
  }

  return Context;
}
