const React = require('react');

const DistractCat = React.createClass({
  getInitialState() {
    return (
			{offRequests: 0,
				random: '',
				showForm: false,
				error: false
			}
    );
	},
	toggleForm () {
		if (this.state.showForm) {
			this.setState({showForm: false, random: '', error: false});
		} else {
			let string = stringGen();
			this.setState({showForm: true, random: string});
		}
	},
	handleSubmit (e) {
		if (e.key === 'Enter') {
			if (e.target.value === this.state.random) {
				this.setState({error: false});
				let numRequests = this.state.offRequests + 1;
				if (numRequests > 2) {
					chrome.storage.local.set({'on': false});
					chrome.storage.local.get(null, function (result) {
						window.location.assign(result.urlAttempted);
					});
				} else {
					this.setState({offRequests: numRequests, random: stringGen()});
				}
			} else {
				this.setState({error: true, random: stringGen()});
			}
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

		let sadText = "Kitty will become very sad...";
		let confirm = "If you are sure, enter the unlock code:";

		if (this.state.offRequests === 1) {
			sadText = "You made the cat cry!";
			confirm = "Do you want to make it worse? If so, enter the unlock code once more:";
		} else if (this.state.offRequests === 2) {
			sadText = "Kitty's sadness has became unbearable...";
			confirm = "You will take full responsibility for such sadness! Enter the unlock code one last time:"
		}
		let theForm = (
			<div className="unlock-form">
				<div className="sad-text">{sadText}</div>
				<div className="sad-confirm">{confirm}</div>
				<div className="noSelect">{this.state.random}</div>
				<input type="text" className="unlock-input" onKeyPress={this.handleSubmit} placeholder="Enter Code Here"/>
				<div className="errors">
					{this.state.error ? "Unlock Code was entered wrong. Try again if you wish to make kitty sad." : null}
				</div>
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
					<div onClick={this.toggleForm} className="form-toggle">
						disable <br/><strong>Cat No Distract</strong> 
						<br/>
						and continue to your distraction
					</div>
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

	for (let i = 0; i < 5; i++) {
		text += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	return text;
}
