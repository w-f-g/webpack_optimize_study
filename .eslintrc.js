module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'parser': '@typescript-eslint/parser',
    'overrides': [
    ],
    'parserOptions': {
        'parser': '@typescript-eslint/parser',
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'settings': {
        'react': {
            'version': '999.999.999',
        },
    },
    'rules': {
        'quotes': [ 'error', 'single' ],
        'semi': ['error', 'never'],
    },
}
