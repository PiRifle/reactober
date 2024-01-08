import { resolve, join, sep } from "path"
import { copyFileSync } from "fs"
import webpack from "webpack"
import config from "../../webpack.config"
import { loadYaml, createSubfolders, loadPages, loadTemplate, replaceTemplate, createFileWithFolders } from "./utils";

const themeExportPath = 'theme_export';
export async function main() {
    const directories = loadYaml()
    createSubfolders(themeExportPath, directories)
    
    copyFileSync(join(__dirname, "assets", "files", "theme.yaml"), join(themeExportPath, "theme.yaml"))

    const pages = await loadPages()
    const template = loadTemplate()
    const mapped = Object.fromEntries(Object.keys(pages).map(page => {
        const { backend, metadata, header } = pages[page]
        return [page.replace(join("src", "pages"), "").replace("tsx", "htm"), replaceTemplate(template, { oc_metadata: `url="${page.replace(/\/src\/pages|index|\.tsx$/g, '').replace(/\[\.{3}.+\]/, '*').replace(/\[(.+)\]/, ':$1').replace(join("src", "pages"), "")}"\n${metadata.trim()}`, oc_backend: backend, header_data: header, })]
    }))

    Object.entries(mapped).forEach(([relPath, data])=>createFileWithFolders(join(themeExportPath, "pages", relPath.replace("[", 'PATHPARAM__').replace("]", '__')), data));
    
    
    await new Promise((res, rej)=>webpack({...config as any, ...{output: {path: join(resolve(themeExportPath), "assets"), chunkFilename: "js/[name].[chunkhash].js", filename: "js/[name].js", publicPath: "/themes/base/assets/"}}, plugins: [], mode: "production"}, (error, stats)=>{
        const message = `+++\nBuild successful!\nTime: ${stats.endTime - stats.startTime} ms\nHash: ${stats.hash}\nVersion: ${webpack.version}\n${stats.toString()}`;
        console.log(message);
        res(true)
    }))
}


if (require.main === module) {
    main()
  }