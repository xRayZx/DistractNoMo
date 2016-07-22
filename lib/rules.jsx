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
		rules[idx] = e.target.value;
		this.setState({rules: rules});
	},
	handleSave (e) {
		chrome.storage.local.set({'rules': this.state.rules});
	},
	onOff () {
		this.setState({on: !this.state.on})
		chrome.storage.local.set({'on': this.state.on});
	},
	render () {
		let distractions = [];
		this.state.rules.forEach((rule, idx) => {
			distractions.push(
				<input type="text" className="distract-entries" key={idx} value={rule} data-idx={idx} onChange={this.updateField}/>
			)
		});
		distractions.push(
			<input type="text" className="distract-entries" key={this.state.rules.length} data-idx={this.state.rules.length} onChange={this.updateField}/>
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
