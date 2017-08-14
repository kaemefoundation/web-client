import React, {Component} from 'react';
import { navPart1,navPart2,navPart3,navPart4} from '../Routes';
import NavigationSection from './NavigationSection';

class Navigation extends Component {
  render() {
    return (  
     <div className="three wide column">
      <div id="sidebar" className="ui inverted vertical menu">
        <NavigationSection
          title="Part 1"
          routes={navPart1}
          part="part1"
          orphanId={this.props.id}
        />
        <NavigationSection
          title="Part 2"
          routes={navPart2}
          part="part2"
          orphanId={this.props.id}
        />
        <NavigationSection
          title="Part 3"
          routes={navPart3}
          part="part3"
          orphanId={this.props.id}
        />
        <NavigationSection
          title="Part 4"
          routes={navPart4}
          part="part4"
          orphanId={this.props.id}
        />
      </div>
      </div>
    );
  }
}
export default Navigation;