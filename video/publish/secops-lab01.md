# AI SecOps Lab · Lab 01: "You deleted the API key. Git didn't."

**Format:** YouTube Short / Instagram Reel · 1080×1920 · 57.8 s
**File:** `out/secops-lab01-short.mp4` · cover: `out/secops-lab01-cover.png`

## Title (YouTube Shorts)
You Deleted the API Key. Git Didn't. 🔑 #shorts

Alternatives:
- I Recovered a "Deleted" AWS Key in 4 Milliseconds
- Deleting a Secret From Git Doesn't Delete It

## Description
I committed a (fake) AWS key, deleted it a few commits later, and pulled it straight back out of Git history in milliseconds, using nothing but built-in Git commands.

Real lab, real output. The key was generated for this demo and never existed in AWS.

🛠 The fix:
1. Revoke and rotate the key FIRST. Assume it's compromised.
2. Rewrite history (git filter-repo). Clones and forks can still keep copies.
3. Turn on push protection so secrets are blocked before they land.
4. On AWS, prefer short-lived credentials (IAM roles) over long-term access keys.

📚 Sources:
- GitHub Docs: Removing sensitive data from a repository. https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
- GitHub Docs: About push protection. https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection
- AWS IAM: Manage access keys for IAM users. https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html

Follow @aisecopslab for real security experiments.

## Hashtags (max 5)
#cybersecurity #devsecops #git #infosec #shorts
(Instagram: swap #shorts for #programming)

## Pinned comment
Commands from the lab 👇
git log --all --oneline -S AKIA   → finds the commit that added the key
git show HEAD~3:.env              → prints the "deleted" file
Rotate first. Rewrite history second. Push protection forever.

## Lab provenance
- Terminal output replayed from a real run: `src/secops/lab.json` (git only, fake credentials).
- Facts checked against official docs on 2026-11-22 (Playwright capture).
