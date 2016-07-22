const React = require('react');

const DistractCat = React.createClass({
  getInitialState() {
    return (
      {offRequests: 0}
    );
  },
  render () {
    return (
      <div className="cat-container">
        <img src="./assets/sad_cat.jpg" alt="sad big eyed cat" className="cat-pic"/>
        <h2>Why You No Do Work?</h2>
      </div>
    );
  }
});

module.exports = DistractCat;
