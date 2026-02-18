# Husky Integration

This directory contains Git hooks managed by [Husky](https://typicode.github.io/husky/).

## Pre-commit Hook

The `pre-commit` hook runs before each commit and:
- Lints staged TypeScript and HTML files
- Formats code with Prettier
- Ensures code quality standards

## Setup

Husky is automatically installed when you run:
```bash
npm install
```

The `prepare` script in `package.json` sets up the hooks.

## Bypassing Hooks (Use Sparingly!)

If you need to bypass the pre-commit hook for a specific commit:
```bash
git commit --no-verify -m "your message"
```

**Note**: Only use `--no-verify` when absolutely necessary, as it skips quality checks.
