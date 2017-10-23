import React from 'react';
import ReactDOM from 'react-dom';
import './_heroContainer.scss';
import {Button, Image} from 'react-bootstrap';
// import assetPicture from '../../assets/mountains.jpg';
import scrollToComponent from 'react-scroll-to-component';


class Hero extends React.Component {
  constructor(props){
    super(props);
    this.state = { 

    };
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this.refs.hello);
    if (elem) {
      elem.scrollIntoView(false);
    }
  }
 
  
  render() {
    return (
      <section>
        <div className='hero'>
          <h3>This will be the page everyone sees when they first navigate to kritter, once logged in, dashboard will render</h3>
          {/* <Image ref='hello' className='uploadedImages' src={assetPicture} responsive /> */}

        </div>
      </section>
    );
  }
}


export default Hero;