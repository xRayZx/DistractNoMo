const React = require('react');

const Rules = React.createClass({
	getInitialState() {
		return(
			{urls: [],
				on: false,
				visitCat: false
			}
		);
	},
	componentWillMount () {
		chrome.storage.local.get(null, (storage) => {
			if (typeof storage['urls'] === 'undefined') {
				chrome.storage.local.set({'urls': ['facebook.com', 'reddit.com', 'imgur.com', '9gag.com', 'twitter.com']});
			} else if (typeof storage['on'] === 'undefined') {
				chrome.storage.local.set({'on': true});
			}
		});
	},
	componentDidMount () {
		this.updateState();
		chrome.storage.onChanged.addListener((changes, area) => {
			// changes is an object. access new value using --- changes.urls.newValue
			if (typeof changes.on === "boolean") {
				this.setState({on: changes.on.newValue});
			}
			if (changes.urls) {
				this.setState({urls: changes.urls.newValue});
			}
		})
	},
	updateState () {
		chrome.storage.local.get(null, (storage) => {
			this.setState({urls: storage['urls'], on: storage['on']})
		})
	},
	updateField (e) {
		if (this.state.on) {
			this.setState({urls: this.state.urls});
		} else {
			let urls = this.state.urls;
			let idx = e.target.getAttribute('data-idx');
			if (e.target.value === "") {
				urls.splice(idx, 1);
			} else {
				urls[idx] = e.target.value;
			}
			this.setState({urls: urls});
		}
	},
	handleSave (e) {
		if (this.state.urls[0] === "") {
			chrome.storage.local.set({'urls': []})
		} else {
			chrome.storage.local.set({'urls': this.state.urls});
		}
	},
	onOff () {
		if (this.state.on && this.state.urls.length > 0) {
			this.setState({visitCat: true});
		} else {
			chrome.storage.local.set({'on': !this.state.on});
			this.setState({on: !this.state.on});
		}
	},
	render () {
		let onOff = "off";
		let entries = "distract-entries";
		if (this.state.on) {
			onOff = "on"
			entries = "distract-entries-disabled";
		}

		let distractions = [];
		this.state.urls.forEach((rule, idx) => {
			distractions.push(
				<input type="text" className={entries} key={idx} value={rule} data-idx={idx} onChange={this.updateField}/>
			)
		});
		if (!this.state.on) {
			distractions.push(
					<input type="text" className="distract-entries" key={this.state.urls.length} value="" data-idx={this.state.urls.length} placeholder="URL here (ex. facebook.com)" onChange={this.updateField}/>
			)
		}

		return (
			<div className="rules-container">
				<header>
					<div>Focus Cat</div>
				</header>
				<div className={"toggle " + onOff}><i className="fa fa-power-off" aria-hidden="true" onClick={this.onOff}></i>
				</div>
				{this.state.visitCat ? <div className="goto-msg"> To turn off, <br/> Visit a distraction page</div> : null}
				<h3>{this.state.on ? "Distractions List" : "Edit Distractions"}</h3>
				<form className="input-form">
					{distractions}
					<span>{this.state.on ? "Disable to edit URLs" : null}</span>
					{this.state.on ? null : <button onClick={this.handleSave}>Save!</button>}
				</form>
			</div>
		)
	}
});

module.exports = Rules;
