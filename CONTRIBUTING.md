# Contributing

Follow this guide so Cursor/GitHub automated edits and humans operate safely.

## 🔄 Branching & PRs

- **Create feature branches**: `feature/your-change` or `cursor/automated-change`
- **Open a PR against `main`**: CI runs lint, typecheck, tests, and secret-scan
- **Protect main branch**: Require PRs and passing CI before merging

## 🛠️ Local Development

1. **Setup**:
   ```bash
   npm install
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

2. **Start development**:
   ```bash
   npm run dev
   ```

3. **Run checks**:
   ```bash
   npm run lint
   npm run typecheck
   npm run test
   npm run audit
   ```

## 🔒 Secret Handling

- **Never put real keys directly in code or in PRs**
- **Use `.env.local` for local secrets**
- **All secrets must be in Vercel environment variables for production**
- **If you discover an exposed secret**:
  1. Rotate the secret at the provider immediately
  2. Rewrite Git history to remove the secret
  3. Invalidate old tokens and confirm new tokens are in Vercel env vars

## 🚨 Security Checklist

Before submitting a PR, ensure:

- [ ] No `.env` files are committed
- [ ] No API keys or secrets in code
- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Security audit passes
- [ ] Secret scanning passes

## 🤖 Cursor Integration

- **Use dedicated branch**: `cursor/dev` for Cursor automated changes
- **Protect main**: Require human review before merging to main
- **Least privilege**: Give Cursor/GitHub app limited write access to working branch only

## 📝 PR Template

When creating a PR, include:

- [ ] Description of changes
- [ ] Security impact assessment
- [ ] Testing performed
- [ ] Checklist items completed
- [ ] Any breaking changes noted
