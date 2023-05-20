import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function main() {
  const path = `./src/lib/typechain-types`;
  // Find all files in ./typechain-types/ that contain the specified import or export statement
  const { stdout } = await execAsync(
    `grep -rl -e 'import type \\* as interface from "./interface";' -e 'export \\* as interface' ${path}`
  );

  const files = stdout.split('\n').filter(Boolean);

  // Loop through each file found
  for (const file of files) {
    // Check if the file already has a @ts-nocheck comment at the top
    const hasTsNoCheck =
      exec(`head -n 1 "${file}" | grep -q '@ts-nocheck'`).toString().trim() ===
      '';

    if (!hasTsNoCheck) {
      // If not, add the comment to the top of the file
      exec(`sed -i '' '1i\\
// @ts-nocheck
    ' "${file}"`);
      console.log(`Added @ts-nocheck to ${JSON.stringify(file)}`);
    }
  }

  console.log('Done!');
}

main();
