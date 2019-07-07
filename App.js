import React from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import Button from './components/Button';
import isOperator from './utilities/isOperator';
import joinNumbers from './utilities/joinNumbers';
import baseToDec from './utilities/baseToDec';
import decToBase from './utilities/decToBase';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type State = {
  buttons: Array<string>
};

export default class App extends React.Component<State> {
  state = {
    buttons: [
      { operation: 'C' },
      { operation: '+' },
      { operation: '-' },
      { operation: '*' },
      { number: '0' },
      { number: '1' },
      { number: '2' },
      { operation: '/' },
      { number: '3' },
      { number: '4' },
      { number: '5' },
      { operation: '=' }
    ],
    base: 6,
    display: '0',
    evaluate: []
  };

  onPressButton = (button) => {
    const { evaluate, display } = this.state;
    const { number, operation } = button;

    if (operation === '=') {
      this.onPressEquals();
      return;
    }
    if (operation === 'C') {
      this.onPressClear();
      return;
    }
    if (!this.validInput(button)) {
      return;
    }

    const newEvaluate = JSON.parse(JSON.stringify(evaluate));
    let newDisplay = JSON.parse(JSON.stringify(display));
    if (newEvaluate[0] === '0') {
      newEvaluate.pop();
    }
    if (newDisplay.charAt(0) === '0') {
      newDisplay = '';
    }
    newEvaluate.push(number || operation);
    newDisplay = `${newDisplay}${number || operation}`;
    this.setState({ evaluate: newEvaluate, display: newDisplay });
  };

  onPressClear = () => {
    this.setState({ display: '0', evaluate: [] });
  };

  onPressEquals = () => {
    const { evaluate, base } = this.state;
    let evaluationString = '';
    let number = '';
    evaluate.forEach((str) => {
      if (!isOperator(str)) {
        number = joinNumbers(number, str);
      } else {
        evaluationString = `${evaluationString}${baseToDec(
          number,
          base
        )}${str}`;
        number = '';
      }
    });
    evaluationString = `${evaluationString}${Number.parseInt(number, base)}`;

    this.setState({
      display: decToBase(eval(evaluationString), base),
      evaluate: [decToBase(eval(evaluationString), base)]
    });
  };

  validInput = (button) => {
    const { display, evaluate } = this.state;
    const lastEntry = display.slice(-1)[0];
    const firstEntry = display.slice(0)[0];
    if (isOperator(lastEntry)) {
      this.setState({ display: display.replace(/.$/, `${button.operation}`) });
      this.setState({ evaluate: evaluate.splice(-1, button.operation) });
      if (button.operation) return false;
    }
    if (firstEntry === '0' && button.number && button.number === '0') {
      return false;
    }
    return true;
  };

  render() {
    const { display, buttons } = this.state;
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{display}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {buttons.map(button => (
              <Button
                key={`button_${button.number || button.operation}`}
                {...button}
                onPress={() => this.onPressButton(button)}
              />
            ))}
          </View>
          <View style={styles.historyContainer} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1, backgroundColor: 'darkgreen'
  },
  mainContainer: {
    flex: 1
  },
  resultContainer: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'green',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 0,
    paddingHorizontal: 10,
    backgroundColor: 'darkgreen'
  },
  resultText: {
    color: '#e0ffe2', fontSize: 30
  },
  buttonContainer: {
    flex: 5,
    borderWidth: 0,
    borderColor: 'green',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'stretch'
  },
  historyContainer: {
    flex: 3, backgroundColor: '#243c26'
  },
  phoneScale: {
    transform: [
      {
        scaleX: SCREEN_HEIGHT / 750
      },
      {
        scaleY: SCREEN_HEIGHT / 750
      }
    ]
  }
});
