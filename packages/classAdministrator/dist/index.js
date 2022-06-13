var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "dotenv";
import { Octokit } from "octokit";
/**
 *
 * @param mode Which mode ro run
 */
function run(mode) {
    return __awaiter(this, void 0, void 0, function* () {
        init();
        switch (mode) {
            case "test":
                test();
                break;
            case "rooster":
                yield getRooster();
        }
    });
}
function getRooster() {
    return __awaiter(this, void 0, void 0, function* () {
        return true;
    });
}
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
        // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
        const { data: { login }, } = yield octokit.rest.users.getAuthenticated();
        console.log("Hello, %s", login);
    });
}
function init() {
    config();
}
run("test");
