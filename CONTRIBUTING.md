# Contributing to VerityGuard

Thank you for your interest in contributing to VerityGuard! This document provides guidelines for contributions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, etc.)

### Suggesting Features

1. Check if the feature has been requested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test your changes**
   ```bash
   # Backend
   cd backend
   pytest
   
   # Frontend
   cd frontend
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add feature: description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Ensure CI checks pass

## Code Style

### Python (Backend)
- Follow PEP 8
- Use type hints
- Write docstrings for functions
- Keep functions focused and small

### TypeScript (Frontend)
- Use TypeScript strict mode
- Follow ESLint rules
- Use functional components with hooks
- Keep components focused and reusable

### Commits
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, etc.)
- Reference issue numbers when applicable

## Development Setup

See [README.md](README.md) for detailed setup instructions.

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage

## Documentation

- Update README if needed
- Add JSDoc/docstrings for new functions
- Update API documentation for endpoint changes

## Questions?

Feel free to ask questions in:
- GitHub Issues
- Pull Request discussions

Thank you for contributing! 🛡️
