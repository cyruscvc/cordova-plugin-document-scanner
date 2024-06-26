const fs = require('fs');
const path = require('path');

module.exports = function(context) {
    const manifestPath = path.join(context.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
        let manifest = fs.readFileSync(manifestPath).toString();

        // Adding xmlns:tools
        if (manifest.indexOf('xmlns:tools') === -1) {
            manifest = manifest.replace('<manifest', '<manifest xmlns:tools="http://schemas.android.com/tools"');
            fs.writeFileSync(manifestPath, manifest);

            console.log("✅ >>>  Success to change the MANIFEST TOOLS file: "+manifest);
        } else {
            console.log("❌ >>>  Error to find the manifest file xmlns:tools: "+manifest);
        }
    } else {
        console.log("❌ >>>  Error to find the manifest file: "+manifestPath);
    }
};
