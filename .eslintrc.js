/* eslint-env node */
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'ignorePatterns': ['*.css', '*.jpg', '*.svg', '*.png', '*.ttf', '*.json', '*.ico', '*.txt', '*.md', '*.html', '_redirects'],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'ecmaFeatures': {
			'jsx': true
		}
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
	},
	'settings': {
		'react': {
			'version': 'detect'
		},
		'linkComponents': [
			'Hyperlink',
			{'name': 'NavLink', 'linkAttribute': 'to'}
		]
	}
};
