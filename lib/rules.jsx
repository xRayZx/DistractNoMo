const React = require('react');

const Rules = React.createClass({
	getInitialState() {
		this.rules = [];
		chrome.storage.local.get(null, (storage) => {
			this.rules = storage['rules'];
		})
		debugger
		return(
			{rules: []}
		);
	},
	componentDidMount () {
		chrome.storage.onChanged.addListener(this.handleChange, "local");
	},
	handleChange () {
		this.rules = [];
		chrome.storage.local.get(null, (storage) => {
			this.rules = storage['rules'];
		})
		this.setState({rules: this.rules})
	},
	handleSave (e) {
		chrome.storage.local.set({'rules': this.state.rules});
	},
	render () {
		return (
			<div className="rules-container">
				Hello from Rules
			</div>
		)
	}
});

module.exports = Rules;
