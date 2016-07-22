const React = require('react');

const Rules = React.createClass({
	getInitialState() {
		return(
			{rules: [],
				on: false}
		);
	},
	componentWillMount () {
		chrome.storage.local.get(null, (storage) => {
			if (typeof storage['rules'] === 'undefined') {
				chrome.storage.local.set({'rules': []});
			} else if (typeof storage['on'] === 'undefined') {
				chrome.storage.local.set({'on': false});
			}
		});
	},
	componentDidMount () {
		this.updateState();
		chrome.storage.onChanged.addListener((changes, area) => {
			if (typeof changes.on === "boolean") {
				this.setState({on: changes.on.newValue});
			}
			if (changes.rules) {
				this.setState({rules: changes.rules.newValue});
			}

			console.log(changes);
			// changes is an object. access new value using --- changes.rules.newValue
		})
	},
	updateState () {
		chrome.storage.local.get(null, (storage) => {
			this.setState({rules: storage['rules'], on: storage['on']})
		})
	},
	updateField (e) {
		let rules = this.state.rules;
		let idx = e.target.getAttribute('data-idx');
		if (e.target.value === "") {
			rules.splice(idx, 1);
		} else {
			rules[idx] = e.target.value;
		}
		this.setState({rules: rules});
	},
	handleSave (e) {
		if (this.state.rules[0] === "") {
			chrome.storage.local.set({'rules': []})
		} else {
			chrome.storage.local.set({'rules': this.state.rules});
		}
	},
	onOff () {
		chrome.storage.local.set({'on': !this.state.on});
	},
	render () {
		let distractions = [];
		this.state.rules.forEach((rule, idx) => {
			distractions.push(
				<input type="text" className="distract-entries" key={idx} value={rule} data-idx={idx} onChange={this.updateField}/>
			)
		});
		distractions.push(
			<input type="text" className="distract-entries" key={this.state.rules.length} value="" data-idx={this.state.rules.length} onChange={this.updateField}/>
		)
		return (
			<div className="rules-container">
				<button onClick={this.onOff} className="on-off">On Off</button>
				<h3>Add a Distraction</h3>
				<form className="input-form">
					{distractions}
					<button onClick={this.handleSave}>Save!</button>
				</form>
			</div>
		)
	}
});

module.exports = Rules;
