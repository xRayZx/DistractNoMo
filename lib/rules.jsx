const React = require('react');

const Rules = React.createClass({
	getInitialState() {
		// this.rules = [];
		// chrome.storage.local.get(null, (storage) => {
		//   this.rules = storage['rules'];
		// })
		return(
			{rules: []}
		);
	},
	componentDidMount () {
		// chrome.storage.onChanged.addListener(this.handleChange, "local");
		chrome.storage.local.get(null, (storage) => {
			this.setState({rules: storage['rules']});
		})
	},
	handleChange () {
		this.rules = [];
		chrome.storage.local.get(null, (storage) => {
			this.rules = storage['rules'];
		})
		this.setState({rules: this.rules})
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
