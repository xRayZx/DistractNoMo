const React = require('react');
const ReactDOM = require('react-dom');

const Rules = require('./rules.jsx');

document.addEventListener("DOMContentLoaded", function () {
	const root = document.getElementById("root");
	ReactDOM.render(
		<Rules />,
		root
	)
});
