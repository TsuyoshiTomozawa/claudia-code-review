# Contributing to Claudia Code Review

We love your input! We want to make contributing to Claudia Code Review as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Code Style

### Rust
- Use `cargo fmt` to format your code
- Follow Rust naming conventions
- Add documentation comments for public APIs
- Use `cargo clippy` to catch common mistakes

### TypeScript/React
- Use 2 spaces for indentation
- Use meaningful variable and function names
- Follow React hooks patterns
- Use TypeScript strictly (no `any` types unless absolutely necessary)

### Git Commit Messages
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Development Setup

### Prerequisites
- Rust (latest stable)
- Bun (latest)
- tmux
- Claude Code CLI

### Setup
1. Clone your fork:
   ```bash
   git clone https://github.com/YourUsername/claudia-code-review.git
   cd claudia-code-review
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start development:
   ```bash
   bun run tauri dev
   ```

### Testing

#### Rust Tests
```bash
cd src-tauri
cargo test
```

#### Integration Tests
```bash
# Test Slack API integration (requires test token)
cd src-tauri
cargo test slack_integration -- --ignored

# Test tmux functionality
cargo test tmux_session -- --ignored
```

## Project Structure

```
src/
├── components/
│   ├── slack/          # Slack integration components
│   ├── tasks/          # Task management UI
│   └── review/         # Code review components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions

src-tauri/src/
├── commands/           # Tauri command handlers
├── slack/              # Slack API integration
├── review/             # Code review logic
├── tmux/               # tmux session management
└── database/           # Database operations
```

## Feature Development Guidelines

### Adding New Slack Integrations
1. Add API methods in `src-tauri/src/slack/`
2. Create corresponding Tauri commands
3. Add React components in `src/components/slack/`
4. Update database schema if needed
5. Add comprehensive error handling

### Adding New Review Features
1. Implement Rust logic in `src-tauri/src/review/`
2. Add tmux session management if needed
3. Create UI components in `src/components/review/`
4. Ensure proper cleanup of resources
5. Add status tracking and progress indication

## Bug Reports

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/TsuyoshiTomozawa/claudia-code-review/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please provide:

- **Use case**: Describe the problem you're trying to solve
- **Proposed solution**: How you envision the feature working
- **Alternatives**: Other solutions you've considered
- **Additional context**: Screenshots, mockups, or examples

## Security

If you discover a security vulnerability, please send an email to [security@claudia-code-review.com] instead of using the issue tracker.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Focus on what is best for the community
- Show empathy towards other community members
- Be open to constructive criticism

## License

By contributing, you agree that your contributions will be licensed under the AGPL-3.0 License.

## Questions?

Feel free to open an issue with the "question" label, or reach out to the maintainers directly.

Thank you for contributing to Claudia Code Review! 🚀
