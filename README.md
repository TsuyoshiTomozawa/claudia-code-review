# Claudia Code Review

<div align="center">
  <img src="https://github.com/user-attachments/assets/92fd93ed-e71b-4b94-b270-50684323dd00" alt="Claudia Logo" width="120" height="120">

  <h1>Claudia Code Review</h1>
  
  <p>
    <strong>Enhanced GUI app for Claude Code with Slack Integration</strong>
  </p>
  <p>
    <strong>Automate code review workflows from Slack to Claude Code with parallel execution</strong>
  </p>
</div>

## 🌟 Overview

**Claudia Code Review** is an enhanced fork of the original [Claudia](https://github.com/getAsterisk/claudia) application, specifically designed for programming education businesses and teams that need efficient code review workflows.

This application bridges the gap between Slack notifications and Claude Code execution, enabling seamless automation of code review processes with parallel execution capabilities.

## ✨ Enhanced Features

### 🔄 **Slack Integration**
- **Reminder Post Detection**: Automatically fetch Slack posts marked with reminder reactions (⏰, 📝, 👀)
- **GitHub PR URL Extraction**: Smart extraction of GitHub Pull Request URLs from Slack messages
- **Task Management**: Convert Slack posts into reviewable tasks with status tracking

### 🚀 **Automated Code Review**
- **One-Click Review**: Start code reviews directly from task list
- **Parallel Execution**: Run multiple Claude Code reviews simultaneously using tmux sessions
- **Custom Commands**: Seamless integration with custom Claude Code commands (e.g., `/pwe-review`)
- **Real-time Status**: Track review progress with live status updates

### 📊 **Task Management**
- **Smart Task Creation**: Automatically create tasks from Slack reminder posts
- **Status Tracking**: Monitor review progress (Pending → Running → Completed)
- **Result Management**: View and manage completed review results

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Rust + Tauri 2
- **Database**: SQLite with enhanced schema for code review tasks
- **Integrations**: Slack Web API + tmux for parallel execution
- **Package Manager**: Bun

## 📋 Prerequisites

- **Claude Code CLI**: Install from [Claude's official site](https://claude.ai/code)
- **tmux**: Terminal multiplexer for parallel session management
- **Slack App**: Bot token with appropriate permissions
- **System Requirements**: Windows 10/11, macOS 11+, or Linux (Ubuntu 20.04+)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/TsuyoshiTomozawa/claudia-code-review.git
cd claudia-code-review
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Setup Slack Integration
1. Create a Slack App in your workspace
2. Add required bot permissions:
   - `channels:read`
   - `channels:history`
   - `users:read`
   - `reactions:read`
3. Get your Bot User OAuth Token

### 4. Configure Settings
1. Launch the application
2. Navigate to Settings
3. Add your Slack Bot Token
4. Configure Claude Code path
5. Set reminder reaction emojis

### 5. Start Development
```bash
bun run tauri dev
```

## 📖 Usage Workflow

### 1. Slack Setup
- Add reminder reactions (⏰, 📝, 👀) to code review request posts
- Ensure posts contain GitHub PR URLs

### 2. Task Management
- Open Claudia Code Review application
- View automatically fetched reminder posts
- Select posts to convert into review tasks

### 3. Code Review Execution
- Navigate to Task List
- Click "Start Review" for any pending task
- Claude Code launches in background tmux session
- Monitor real-time status updates

### 4. Results
- Check completed reviews
- View Claude Code output
- Manage review results

## 🔧 Configuration

### Slack Settings
```json
{
  "slack_token": "xoxb-your-bot-token",
  "workspace_id": "your-workspace-id",
  "reminder_reactions": ["alarm_clock", "memo", "eyes"]
}
```

### Claude Code Settings
```json
{
  "claude_path": "/usr/local/bin/claude",
  "custom_command": "/pwe-review",
  "max_parallel_sessions": 5
}
```

## 🛠️ Development

### Project Structure
```
claudia-code-review/
├── src/                   # React frontend
│   ├── components/        # UI components
│   │   ├── slack/         # Slack integration components
│   │   ├── tasks/         # Task management components
│   │   └── review/        # Review execution components
│   ├── lib/               # API client & utilities
│   └── hooks/             # Custom React hooks
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── commands/      # Tauri command handlers
│   │   ├── slack/         # Slack API integration
│   │   ├── review/        # Code review management
│   │   └── tmux/          # tmux session management
│   └── migrations/        # Database migrations
└── docs/                  # Documentation
```

### Development Commands
```bash
# Start development server
bun run tauri dev

# Build application
bun run tauri build

# Run tests
cd src-tauri && cargo test

# Format code
cd src-tauri && cargo fmt
```

## 🔒 Security & Privacy

- **Local Data**: All data stored locally in SQLite
- **Token Security**: Slack tokens encrypted at rest
- **Process Isolation**: Each review runs in isolated tmux session
- **No Telemetry**: No data collection or external tracking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Areas for Contribution
- 🔌 Additional Slack workspace integrations
- 🚀 Performance optimizations for parallel execution
- 📊 Enhanced analytics and reporting
- 🎨 UI/UX improvements
- 🧪 Test coverage expansion

## 📄 License

This project is licensed under the AGPL License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on top of [Claudia](https://github.com/getAsterisk/claudia) by [Asterisk](https://asterisk.so/)
- [Claude](https://claude.ai) by Anthropic
- [Tauri](https://tauri.app/) framework

---

<div align="center">
  <p>
    <strong>Made with ❤️ for efficient code review workflows</strong>
  </p>
  <p>
    <a href="https://github.com/TsuyoshiTomozawa/claudia-code-review/issues">Report Bug</a>
    ·
    <a href="https://github.com/TsuyoshiTomozawa/claudia-code-review/issues">Request Feature</a>
  </p>
</div>
