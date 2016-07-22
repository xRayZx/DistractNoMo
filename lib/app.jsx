const React = require('react');
const ReactDOM = require('react-dom');

const Rules = require('./rules.jsx');
const DistractCat = require('./distraction.jsx');

document.addEventListener("DOMContentLoaded", function () {
	const root = document.getElementById("root");
	if (root) {
		ReactDOM.render(
			<Rules />,
			root
		)
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const distractRoot = document.getElementById("distraction");
	if (distractRoot) {
		ReactDOM.render(
			<DistractCat />,
			distractRoot
		)
	}
})
