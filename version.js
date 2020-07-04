const semanticRelease = require('semantic-release');
const fs = require("fs");
parseString = require("xml2js").parseString;
xml2js = require("xml2js");
console.log(process.env);
console.log(process.env.CI_PROJECT_URL);
console.log(process.env.CI_PROJECT_DIR);

const mainFn = async () => {
    try {
        const result = await semanticRelease({

            // Core options
            plugins: [
                "@semantic-release/commit-analyzer",
                "@semantic-release/gitlab"
            ],
            branches: [
                '+([0-9])?(.{+([0-9]),x}).x',
                'version',
                'next',
                'next-major',
                {name: 'beta', prerelease: true},
                {name: 'alpha', prerelease: true}
            ],
            repositoryUrl: process.env.CI_PROJECT_URL,
            // Plugin options
            gitlabUrl: 'https://gitlab.com',
            gitlabApiPathPrefix: '/api/v4'
        },
            {
            // Run semantic-release from `/path/to/git/repo/root` without having to change local process `cwd` with `process.chdir()`
            cwd: process.env.CI_PROJECT_DIR /*'/builds/aangine/capacity-service-capacity'*/,
            // Pass the variable `MY_ENV_VAR` to semantic-release without having to modify the local `process.env`
            env: {...process.env, GITLAB_TOKEN: process.env.GITLAB_TOKEN},
        });
        if (result) {
            const {lastRelease, commits, nextRelease, releases} = result;

            console.log(`Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`);

            if (lastRelease.version) {
                console.log(`The last release was "${lastRelease.version}".`);
            }

            for (const release of releases) {
                console.log(`The release was published with plugin "${release.pluginName}".`);
            }
            //xml editor
            fs.readFile("../pom.xml", "utf-8", function (err, data) {
                if (err) console.log(err);
                console.log(data);
                parseString(data, function (err, result) {
                    if (err) console.log(err);
                    console.log(result);
                    const json = result;
                    json.project.version[0] = nextRelease.version.toString();
                    const builder = new xml2js.Builder();
                    const xml = builder.buildObject(json);
                    fs.writeFile("../pom.xml", xml, function (err, data) {
                        if (err) console.log(err);
                        console.log("successfully written our update xml to file");
                    });
                });
            });
        } else {
            console.log('No release published.');
        }

    } catch (err) {
        console.error('The automated release failed with %O', err)
    }
};

mainFn();
