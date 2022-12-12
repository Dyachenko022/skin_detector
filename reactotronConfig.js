import Reactotron from "reactotron-react-native"
Reactotron
  .configure({host: '172.20.10.3'}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!