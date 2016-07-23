const React = require('react');

const DistractCat = React.createClass({
  getInitialState() {
    return (
      {offRequests: 0}
    );
	},
	componentDidMount () {
		this.updateState();
	},
	updateState () {
		chrome.storage.local.get(null, (storage) => {
			this.setState({offRequests: storage['offRequests']});
		});
	},
  render () {
    return (
			<div>
				<div className="cat-container">
					<img src="./assets/sad_cat.jpg" alt="sad big eyed cat" className="cat-pic"/>
					<h2>Why You No Do Work?</h2>
					<img src="./assets/teardrop.png" className="big-tear"/>
          <img src="./assets/small_teardrop.png" className="left-tear"/>
				</div>
			</div>
    );
  }
});

module.exports = DistractCat;
