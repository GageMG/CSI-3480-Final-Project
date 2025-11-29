import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';

// Next
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  // Next
  // ...nextVitals,
  // ESLint JS
  {
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      // Possible Problems
      'array-callback-return': ['error'],
      'no-await-in-loop': ['error'],
      'no-constructor-return': ['error'],
      'no-duplicate-imports': ['error'],
      'no-inner-declarations': ['error'],
      'no-promise-executor-return': ['error'],
      'no-self-compare': ['error'],
      'no-template-curly-in-string': ['error'],
      'no-unassigned-vars': ['error'],
      'no-unmodified-loop-condition': ['error'],
      'no-unreachable-loop': ['error'],
      'no-use-before-define': ['error'],
      'no-useless-assignment': ['error'],
      'require-atomic-updates': ['error'],
      // Suggestions
      'arrow-body-style': ['error', 'always'],
      'block-scoped-var': ['error'],
      'camelcase': ['error', { properties: 'always' }],
      'complexity': ['warn', { max: 10 }],
      'consistent-return': ['error'],
      'consistent-this': ['error'],
      'curly': ['error'],
      'default-case': ['error'],
      'default-case-last': ['error'],
      'default-param-last': ['error'],
      'dot-notation': ['error'],
      'eqeqeq': ['error'],
      'func-name-matching': ['error'],
      'func-style': ['error', 'declaration'],
      // 'new-cap': ['error'],
      'no-alert': ['warn'],
      'no-array-constructor': ['error'],
      'no-bitwise': ['error'],
      'no-caller': ['error'],
      'no-console': ['warn'],
      'no-div-regex': ['error'],
      'no-else-return': ['error'],
      'no-eq-null': ['error'],
      'no-eval': ['error'],
      'no-extend-native': ['error'],
      'no-extra-bind': ['error'],
      'no-extra-label': ['error'],
      'no-implicit-coercion': ['error'],
      'no-implied-eval': ['error'],
      'no-inline-comments': ['error'],
      'no-invalid-this': ['error'],
      'no-iterator': ['error'],
      'no-label-var': ['error'],
      'no-labels': ['error'],
      'no-lone-blocks': ['error'],
      'no-lonely-if': ['error'],
      'no-loop-func': ['error'],
      'no-multi-assign': ['error'],
      'no-nested-ternary': ['warn'],
      'no-new': ['error'],
      'no-new-func': ['error'],
      'no-object-constructor': ['error'],
      'no-octal-escape': ['error'],
      'no-param-reassign': ['error'],
      'no-proto': ['error'],
      'no-return-assign': ['error'],
      'no-script-url': ['error'],
      'no-sequences': ['error'],
      'no-shadow': ['error'],
      'no-throw-literal': ['error'],
      'no-undef-init': ['error'],
      'no-undefined': ['error'],
      'no-underscore-dangle': ['error'],
      'no-unneeded-ternary': ['error'],
      'no-unused-expressions': ['error'],
      'no-useless-call': ['error'],
      'no-useless-computed-key': ['error'],
      'no-useless-concat': ['error'],
      'no-useless-constructor': ['error'],
      'no-useless-rename': ['error'],
      'no-useless-return': ['error'],
      'no-var': ['error'],
      'no-void': ['error'],
      'prefer-const': ['error'],
      'prefer-object-spread': ['error'],
      'prefer-regex-literals': ['error'],
      'prefer-rest-params': ['error'],
      'prefer-spread': ['error'],
      'prefer-template': ['error'],
      'yoda': ['error']
    }
  },
  // TypeScript ESLint
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': typescriptEslintEslintPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    extends: [
      '@typescript-eslint/strict-type-checked',
      '@typescript-eslint/stylistic-type-checked'
    ],
    rules: {
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }]
    }
  },
  // ESLint Stylistic
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/array-bracket-newline': ['error', { multiline: true }],
      '@stylistic/array-bracket-spacing': ['error'],
      '@stylistic/array-element-newline': ['error', { consistent: true }],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/arrow-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],
      '@stylistic/block-spacing': ['error'],
      '@stylistic/brace-style': ['error'],
      '@stylistic/comma-dangle': ['error'],
      '@stylistic/comma-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      '@stylistic/comma-style': ['error'],
      '@stylistic/computed-property-spacing': ['error'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': ['error'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-paren-newline': ['error', 'multiline'],
      '@stylistic/generator-star-spacing': ['error', 'after'],
      '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/jsx-child-element-spacing': ['error'],
      '@stylistic/jsx-closing-bracket-location': ['error'],
      '@stylistic/jsx-closing-tag-location': ['error'],
      '@stylistic/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
          propElementValues: 'always'
        }
      ],
      '@stylistic/jsx-curly-newline': [
        'error', {
          multiline: 'consistent',
          singleline: 'consistent'
        }
      ],
      '@stylistic/jsx-curly-spacing': [
        'error',
        {
          when: 'never',
          children: true
        }
      ],
      '@stylistic/jsx-equals-spacing': ['error', 'never'],
      '@stylistic/jsx-first-prop-new-line': ['error'],
      '@stylistic/jsx-function-call-newline': ['error'],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/jsx-max-props-per-line': [
        'error',
        {
          maximum: 1,
          when: 'multiline'
        }
      ],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
      '@stylistic/jsx-pascal-case': ['error', { allowNamespace: true }],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-self-closing-comp': ['error'],
      '@stylistic/jsx-tag-spacing': ['error', { beforeClosing: 'proportional-always' }],
      '@stylistic/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
          propertyValue: 'parens'
        }
      ],
      '@stylistic/key-spacing': ['error'],
      '@stylistic/keyword-spacing': ['error'],
      '@stylistic/line-comment-position': ['error'],
      '@stylistic/lines-between-class-members': ['error'],
      '@stylistic/max-len': [
        'warn',
        {
          code: 100,
          ignorePattern: '^import'
        }
      ],
      '@stylistic/max-statements-per-line': ['error'],
      '@stylistic/member-delimiter-style': ['error'],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/new-parens': ['error'],
      '@stylistic/no-confusing-arrow': ['error'],
      '@stylistic/no-extra-parens': [
        'error', 'all', {
          ignoreJSX: 'multi-line',
          nestedBinaryExpressions: false
        }
      ],
      '@stylistic/no-extra-semi': ['error'],
      '@stylistic/no-floating-decimal': ['error'],
      '@stylistic/no-mixed-operators': ['error'],
      '@stylistic/no-mixed-spaces-and-tabs': ['error'],
      '@stylistic/no-multi-spaces': ['error'],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0
        }
      ],
      '@stylistic/no-tabs': ['error'],
      '@stylistic/no-trailing-spaces': ['error'],
      '@stylistic/no-whitespace-before-property': ['error'],
      '@stylistic/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': ['error'],
      '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/quote-props': ['error', 'consistent'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/rest-spread-spacing': ['error'],
      '@stylistic/semi': ['error'],
      '@stylistic/semi-spacing': ['error'],
      '@stylistic/semi-style': ['error'],
      '@stylistic/space-before-blocks': ['error'],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/space-in-parens': ['error'],
      '@stylistic/space-infix-ops': ['error'],
      '@stylistic/space-unary-ops': ['error'],
      '@stylistic/spaced-comment': ['error'],
      '@stylistic/switch-colon-spacing': ['error'],
      '@stylistic/template-curly-spacing': ['error'],
      '@stylistic/template-tag-spacing': ['error'],
      '@stylistic/type-annotation-spacing': ['error'],
      '@stylistic/type-generic-spacing': ['error'],
      '@stylistic/type-named-tuple-spacing': ['error'],
      '@stylistic/wrap-iife': ['error', 'inside'],
      '@stylistic/wrap-regex': ['error'],
      '@stylistic/yield-star-spacing': ['error']
    }
  }
]);

export default eslintConfig;
