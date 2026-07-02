# SCOMC - Smart Municipal e-Governance & Citizen Service Management Platform

SCOMC is a comprehensive web-based e-Governance platform that enables citizens to report civic issues, track complaints, and access municipal services digitally. The system includes complaint management, department-wise ticket assignment, asset monitoring, and analytics dashboards to improve service delivery, transparency, and municipal administration efficiency.

## 🌿 Git Branching Strategy & Workflow

To maintain code stability and ensure a smooth collaboration process, our team follows a strict Git workflow. **Please read this carefully before contributing.**

### 🌳 Branch Structure

- **`main`**: 🚀 **Production-Ready Code**. This branch ALWAYS contains stable, tested, and deployable code. **NEVER push directly to `main`.**
- **`develop`**: 🛠️ **Integration & Testing**. This is the default branch for active development. All feature branches merge here first for testing before a release to `main`.
- **Developer Branches**: Each developer has their own dedicated branch for their ongoing work:
  - `prasanth-dev`
  - `bharath-dev`
  - `ramcharan-dev`
  - `kumarbabu-dev`

### 🔄 The Workflow

1. **Work on Your Branch**: Checkout your specific developer branch (e.g., `git checkout prasanth-dev`). All your commits should go here.
2. **Pull from Develop**: Regularly pull changes from `develop` into your branch to stay up to date and avoid massive merge conflicts (`git pull origin develop`).
3. **Merge to Develop**: Once your feature/fix is complete, open a **Pull Request (PR)** from your developer branch to `develop`.
4. **Merge to Main**: Once features in `develop` are tested and stable, a release Pull Request will be made from `develop` to `main`.

**Workflow Path:** `Developer Branch` → `develop` → `main`

### 🛡️ Branch Protection Rules (Recommended Setup)

To enforce this workflow, the repository should have branch protection rules configured for both `main` and `develop`:
- **Require Pull Request reviews before merging**: Ensures code is reviewed by at least one other team member.
- **Do not allow bypassing the above settings**: Prevents anyone (including admins) from pushing directly to `main`.
- **Require status checks to pass**: Ensures CI/CD pipelines (builds/tests) pass before merging.

---
*Built with React, Node.js, and Python.*
