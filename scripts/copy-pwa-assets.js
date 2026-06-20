/**
 * Copies self-hosted PWA assets into public/ before web export.
 * Fonts are served from /fonts/* with absolute root paths.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const fontsSrc = path.join(
  root,
  "node_modules/@expo-google-fonts/plus-jakarta-sans"
);
const fontsDest = path.join(root, "public/fonts");
const publicDir = path.join(root, "public");
const iconSrc = path.join(root, "assets/images/icon.png");
const faviconSrc = path.join(root, "assets/images/favicon.png");

const fonts = [
  ["400Regular", "400Regular/PlusJakartaSans_400Regular.ttf"],
  ["500Medium", "500Medium/PlusJakartaSans_500Medium.ttf"],
  ["600SemiBold", "600SemiBold/PlusJakartaSans_600SemiBold.ttf"],
  ["700Bold", "700Bold/PlusJakartaSans_700Bold.ttf"],
  ["800ExtraBold", "800ExtraBold/PlusJakartaSans_800ExtraBold.ttf"],
];

fs.mkdirSync(fontsDest, { recursive: true });

for (const [name, relPath] of fonts) {
  const source = path.join(fontsSrc, relPath);
  const destination = path.join(fontsDest, `PlusJakartaSans_${name}.ttf`);
  fs.copyFileSync(source, destination);
}

const iconFontSrc = path.join(
  root,
  "node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"
);
const iconFontDest = path.join(fontsDest, "MaterialCommunityIcons.ttf");
fs.copyFileSync(iconFontSrc, iconFontDest);

const resizedIcons = [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
  ["avatar.png", 150],
  ["icon.png", 512],
];

for (const [fileName, size] of resizedIcons) {
  execSync(
    `sips -z ${size} ${size} "${iconSrc}" --out "${path.join(publicDir, fileName)}"`,
    { stdio: "inherit" }
  );
}

if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, path.join(publicDir, "favicon.png"));
}

console.log("PWA assets copied to public/");
