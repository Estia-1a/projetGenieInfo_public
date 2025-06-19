import { config } from "dotenv";
import { Octokit } from "octokit";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
export function init() {
    config({ path: path.resolve(__dirname, "../.env") });
    console.log(process.env.OCTOKIT_ACCESS_TOKEN);
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    return octokit;
}
