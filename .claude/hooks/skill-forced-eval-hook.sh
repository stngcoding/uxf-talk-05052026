#!/usr/bin/env bash
# skill-forced-eval-hook.sh
# UserPromptSubmit hook: forces explicit skill evaluation before every response.
# Inspired by: https://scottspence.com/posts/how-to-make-claude-code-skills-activate-reliably

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

GLOBAL_SKILLS_DIR="$HOME/.claude/skills"
LOCAL_SKILLS_DIR="$PROJECT_DIR/.claude/skills"

# Build skill list with descriptions from SKILL.md frontmatter
collect_skills() {
  local dir="$1"
  local label="$2"
  while IFS= read -r -d '' skill_file; do
    skill_name=$(basename "$(dirname "$skill_file")")
    description=$(grep -m1 '^description:' "$skill_file" | sed 's/^description:[[:space:]]*//' | tr -d '"')
    if [[ -n "$description" ]]; then
      echo "  - $skill_name ($label): $description"
    else
      echo "  - $skill_name ($label)"
    fi
  done < <(find -L "$dir" -name "SKILL.md" -not -path "*/learned/*" -print0 2>/dev/null)
}

skills_list=""
skills_list+=$(collect_skills "$GLOBAL_SKILLS_DIR" "global")$'\n'
if [[ -d "$LOCAL_SKILLS_DIR" ]]; then
  skills_list+=$(collect_skills "$LOCAL_SKILLS_DIR" "local")$'\n'
fi

if [[ -z "$skills_list" ]]; then
  exit 0
fi

cat <<EOF
<skill-eval-required>
BEFORE responding or taking ANY action, you MUST explicitly evaluate every skill below.

For EACH skill, output one line:
  [SKILL NAME]: YES — <why it matches> | or NO — <why it doesn't>

Then, for every skill you marked YES: immediately invoke it with the Skill() tool BEFORE proceeding.

CRITICAL: Marking YES without calling Skill() is worthless. Invoke first, then respond.

Available skills:
$skills_list
Evaluation is mandatory. Do not skip, abbreviate, or batch. One line per skill.
</skill-eval-required>
EOF
