const fs = require('fs');
const path = require('path');

module.exports = function(context) {
    const manifestPath = path.join(context.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
        let manifest = fs.readFileSync(manifestPath, 'utf8');

        // Modify the android:authorities line
        manifest = manifest.replace(
            /android:authorities="\${applicationId}\.opener\.provider"/g,
            'android:authorities="${applicationId}.opener.provider;${applicationId}.com.scanlibrary.provider"'
        );

        // Add tools:replace="android:authorities" immediately after android:grantUriPermissions="true"
        manifest = manifest.replace(
            /(android:grantUriPermissions="true")/g,
            '$1\n            tools:replace="android:authorities"'
        );

        // Add tools:replace="android:resource" inside the <meta-data> tag
        manifest = manifest.replace(
            /(<meta-data\s+android:name="android.support.FILE_PROVIDER_PATHS")/g,
            '<meta-data\n            tools:replace="android:resource"\n            android:name="android.support.FILE_PROVIDER_PATHS"'
        );

        console.log("✅ >>>  Success to find the manifest file: "+manifest);

        fs.writeFileSync(manifestPath, manifest, 'utf8');
    } else {
        console.log("❌ >>>  Error to find the manifest file");
    }
};
