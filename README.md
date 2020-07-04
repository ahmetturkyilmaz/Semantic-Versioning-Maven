
<h1>Semantic Versioning For Maven Projects</h1>

<h4>This project uses Semantic Release and it's plugin for Gitlab integration. If you use Github you can simply delete the plugins variable in version.js.</h4>

<h3>What does it do?</h3>
<p> If you checkout the docs on Semantic Release which you can find here https://semantic-release.gitbook.io/ . It is a fully automated version management and package publishing tool.
It integrates with your Gitlab, reads all the commit messages you have made and determines the next semantic version number, generates a changelog and publishes the release.
It uses plugins to integrate with any package management system. </p>

<p> I made a script that takes the next semantic version number and adds it to your version in pom.xml file. </p>

<p>To use this you can just simply pull this repository in your Gitlab CI or Github CI yaml file. </p>
<code>git pull https://github.com/ahmetturkyilmaz/semantic-maven-versioning.git</code> 
</br>
<code>npm install --prefix Semantic-Versioning-Maven</code> 
</br>
<code>npm start --prefix Semantic-Versioning-Maven</code>
</br>
<code>rm -rf Semantic-Versioning-Maven</code>
