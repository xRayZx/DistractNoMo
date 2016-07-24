const React = require('react');

const DistractCat = React.createClass({
  getInitialState() {
    return (
			{offRequests: 0,
				random: '',
			showForm: false}
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
	toggleForm () {
		if (this.state.showForm) {
			this.setState({showForm: false, random: ''});
		} else {
			let string = stringGen();
			this.setState({showForm: true, random: string});
		}
	},
  render () {
		let main = "main-container";
		if (this.state.offRequests >= 2) {
			main = "main-container weather rain";
		}
		let rightTear = (
			<img src="./assets/teardrop.png" className="right-tear"/>
		);
		let leftTear = (
			<img src="./assets/small_teardrop.png" className="left-tear"/>
		);
		let theForm = (
			<div>
				<div>Kitty will become very sad...</div>
				<div>If you are sure, please enter the unlock code below:</div>
				<div className="noSelect">{this.state.random}</div>
				<input type="text" className="unlock-input"/>
			</div>
		);
    return (
			<div className={main}>
				<div className="cat-container">
					<img src="./assets/sad_cat.jpg" alt="sad big eyed cat" className="cat-pic"/>
					<h2>Why You No Do Work?</h2>
					{this.state.offRequests >= 1 ? rightTear : null}
					{this.state.offRequests >= 1 ? leftTear : null}
					<div className="form-container">
						<label onClick={this.toggleForm}>Want to disable Distract No Mo?</label>
						{this.state.showForm ? theForm : null}
					</div>
				</div>
			</div>
    );
  }
});

module.exports = DistractCat;

const stringGen = function () {
	let text = "";
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

	for (let i = 0; i < 25; i++) {
		text += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	return text;
}
