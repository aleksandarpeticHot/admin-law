import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'react/prop-types': 'off',
      'object-curly-spacing': [
        'error',
        'always'
      ],
      '@typescript-eslint/no-var-requires': 'off',
      'space-infix-ops': [
        'error',
        {
          'int32Hint': false
        }
      ],
      'react/display-name': 'off',
      'no-console': 'off',
      'no-const-assign': 'warn',
      'no-this-before-super': 'warn',
      'no-undef': 'off',
      'no-unreachable': 'warn',
      'constructor-super': 'warn',
      'padding-line-between-statements': [
        'error',
        {
          'blankLine': 'always',
          'prev': 'function',
          'next': 'function'
        }
      ],
      'valid-typeof': 'warn',
      'no-multiple-empty-lines': [
        'error',
        {
          'max': 1
        }
      ],
      'lines-between-class-members': [
        'warn',
        'always',
        {
          'exceptAfterSingleLine': true
        }
      ],
      'no-trailing-spaces': [
        'error',
        {
          'skipBlankLines': true
        }
      ],
      'no-multi-spaces': 'error',
      'jsx-quotes': [
        'error',
        'prefer-single'
      ],
      'comma-dangle': [
        'error',
        'never'
      ],
      'comma-spacing': [
        'error',
        {
          'before': false,
          'after': true
        }
      ],
      'quotes': [
        'error',
        'single'
      ],
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1
        }
      ]
    }
  }
];

export default eslintConfig;
