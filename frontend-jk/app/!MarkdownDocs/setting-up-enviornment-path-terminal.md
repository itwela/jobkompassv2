Here's a simple guide for setting environment variables on MacOS:

```markdown:/Users/itwelaibomu/Documents/Github/jobkompassv2/docs/setting-env-variables.md
# Setting Environment Variables on MacOS

A quick guide to properly set environment variables on MacOS.

## Steps

1. Open Terminal

2. Edit your shell profile file:
   ```bash
   nano ~/.zshrc
   ```
   Note: If using bash, use `~/.bash_profile` instead

3. Add your environment variable:
   ```bash
   export PATH="/your/path/here:$PATH"
   ```
   Example:
   ```bash
   export PATH="/usr/local/texlive/2024/bin/universal-darwin:$PATH"
   ```

4. Save the file:
   - Press `Control + X`
   - Press `Y` to save
   - Press `Enter` to confirm

5. Apply changes:
   ```bash
   source ~/.zshrc
   ```

6. Verify your path:
   ```bash
   echo $PATH
   ```

## Important Notes

- Restart your terminal or applications after making changes
- Use colons `:` to separate multiple paths
- The `$PATH` at the end keeps existing path entries

## Common Issues

- If changes don't take effect, try restarting your terminal
- Make sure you're editing the correct shell profile file
- Check for typos in the path
```