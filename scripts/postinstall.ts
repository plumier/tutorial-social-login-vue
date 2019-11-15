import * as shell from "shelljs"
import { existsSync, readFileSync, writeFileSync, copyFileSync } from "fs";
import { join } from "path";
import * as del from "del"

if(!shell.which("npx")){
    console.log("npx not installed, process exited")
    process.exit(1)
}

if(!existsSync(join(__dirname, "../packages/ui"))){
    //create UI project by execute create-react-app
    const presetPath = join(__dirname, "../config/preset.json")
      
    shell.exec("cd packages && npx @vue/cli create ui -p " + presetPath )
    //modify project name into @project/ui
    const packageJsonPath = join(__dirname, "../packages/ui/package.json")
    const json = readFileSync(packageJsonPath).toString()
    const packageObj = JSON.parse(json)
    packageObj.name = "@project/ui"
    writeFileSync(packageJsonPath, JSON.stringify(packageObj, null, 4))
    //copy vue.config.js to ui
    const vueConfigSourcePath = join(__dirname, "../config/vue.config")
    const vueConfigTargetPath = join(__dirname, "../packages/ui/vue.config.js")
    copyFileSync(vueConfigSourcePath, vueConfigTargetPath)

    del.sync(join(__dirname, "../packages/ui/.git"))
    // del.sync(join(__dirname, "../config"))
}