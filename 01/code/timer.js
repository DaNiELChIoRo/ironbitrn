import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Hello from './hello';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 0,
      count: 0,
    }
  }

//   componentWillMount() {
//     console.log('will mount')
//       this.setState({
//           timer: this.state.timer + 1
//       })
//   }

  componentDidMount() {
    // console.log('did mount')
    setInterval(() => {
        this.setState({
            timer: this.state.timer + 1
        })
    }, 1000)
  }

  render() {
    return (
        <Hello number={this.state.timer} manzana={styles.container} />
    )
  }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 40,
    }
})

export default Timer
