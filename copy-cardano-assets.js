/**
 * Copy Cardano icon assets from @apex-fusion/cardano package to app assets
 */
const fs = require('fs')
const path = require('path')

const packageAssetsDir = path.join(__dirname, 'node_modules', '@apex-fusion', 'cardano', 'assets')
const appSymbolsDir = path.join(__dirname, 'src', 'assets', 'symbols')

// Check if the package assets directory exists
if (!fs.existsSync(packageAssetsDir)) {
  console.log('⚠️  @apex-fusion/cardano assets not found, skipping icon copy')
  process.exit(0)
}

// Create symbols directory if it doesn't exist
if (!fs.existsSync(appSymbolsDir)) {
  fs.mkdirSync(appSymbolsDir, { recursive: true })
  console.log('📁 Created src/assets/symbols/ directory')
}

// Copy all asset files
const files = fs.readdirSync(packageAssetsDir)
let copied = 0

for (const file of files) {
  const srcPath = path.join(packageAssetsDir, file)
  const destPath = path.join(appSymbolsDir, file)

  if (fs.statSync(srcPath).isFile()) {
    fs.copyFileSync(srcPath, destPath)
    copied++
  }
}

console.log(`🎨 Copied ${copied} Cardano icon assets to src/assets/symbols/`)
