import chokidar from "chokidar"
import webpack from "webpack"
import config from "../../webpack.config"
import { loadYaml, createSubfolders, loadPages, loadTemplate, replaceTemplate, createFileWithFolders, resolvePath } from "./utils";
import { resolve, join, sep } from "path"
import { copyFileSync } from "fs";
import {main as init} from "./index"
const themeExportPath = 'theme_export';
 

async function main(){
    console.log("=== Init Build ===")
    await init()

    const template = loadTemplate()

    console.log("=== Starting Watch Build ===")
    chokidar.watch('./src/pages/**/[a-z]*.tsx').on('all', async (event, path) => {
        console.log("UPDATING: ", path)
        const [_, { backend, metadata, header }] = await resolvePath(path)
        const outputPath = path.replace(join("src", "pages"), "").replace("tsx", "htm")
        const content = replaceTemplate(template, { oc_metadata: `url="${path.replace(/\/src\/pages|index|\.tsx$/g, '').replace(/\[\.{3}.+\]/, '*').replace(/\[(.+)\]/, ':$1').replace(join("src", "pages"), "")}"\n${metadata.trim()}`, oc_backend: backend, header_data: header, })
        createFileWithFolders(join(themeExportPath, "pages", outputPath.replace("[", 'PATHPARAM__').replace("]", '__')), content)
    });

    webpack({...config as any, ...{output: {path: join(resolve(themeExportPath), "assets"), chunkFilename: "js/[name].[chunkhash].js", filename: "js/[name].js", publicPath: "/themes/base/assets/"}}, mode: "production", plugins: [], watch: true}, (error, stats)=>{
        const message = `+++\nBuild successful!\nTime: ${stats.endTime - stats.startTime} ms\nHash: ${stats.hash}\nVersion: ${webpack.version}\n${stats.toString()}`;

        console.log(message);
    })
}

main()