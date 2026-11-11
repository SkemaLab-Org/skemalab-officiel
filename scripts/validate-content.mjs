import { readAllPosts } from "../src/lib/blog/core.js";

async function main() {
  const { posts, issues } = await readAllPosts();
  const errors = issues.filter((issue) => issue.level === "error");
  const warnings = issues.filter((issue) => issue.level === "warning");

  for (const warning of warnings) {
    console.warn(`⚠️  ${warning.where} — ${warning.message}`);
  }
  for (const error of errors) {
    console.error(`❌ ${error.where} — ${error.message}`);
  }

  console.log(
    `\n${posts.length} article(s) valide(s), ${warnings.length} warning(s), ${errors.length} erreur(s).`,
  );

  if (errors.length > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
