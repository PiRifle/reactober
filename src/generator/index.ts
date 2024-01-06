import { glob } from "glob"
import { resolve, join, sep, dirname } from "path"
import { FC } from "react"
import { writeFileSync, readFileSync, existsSync, mkdirSync, copyFileSync } from "fs"
import * as yaml from 'js-yaml';
import webpack from "webpack"
import config from "../../webpack.config"

const themeExportPath = 'theme_export';
function createFolderIfNotExists(folderPath: string): void {
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
    }
}

function createFilesInFolder(folderPath: string, files: string[]): void {
    files.forEach((file: string) => {
        const filePath = `${folderPath}/${file}`;
        writeFileSync(filePath, ''); // Create an empty file
    });
}

function createSubfolders(topPath: string, tree): void {
    createFolderIfNotExists(topPath)
    for (const themeName in tree) {
        if (tree.hasOwnProperty(themeName)) {
            const themePath = `${topPath}/${themeName}`;
            createFolderIfNotExists(themePath);

            for (const subfolder in tree[themeName]) {
                if (tree[themeName].hasOwnProperty(subfolder)) {
                    const subfolderPath = `${themePath}/${subfolder}`;
                    createFolderIfNotExists(subfolderPath);

                    if (subfolder === 'assets' && tree[themeName].assets) {
                        for (const assetType in tree[themeName].assets) {
                            if (tree[themeName].assets.hasOwnProperty(assetType)) {
                                const assetPath = `${subfolderPath}/${assetType}`;
                                createFolderIfNotExists(assetPath);
                                createFilesInFolder(assetPath, tree[themeName].assets[assetType]);
                            }
                        }
                    } else {
                        createFilesInFolder(subfolderPath, tree[themeName][subfolder]);
                    }
                }
            }
        }
    }
}

function replaceTemplate(template: string, arg: { [key: string]: string }) {
    let buffer = template;
    Object.entries(arg).forEach(([key, value]) => { buffer = buffer.replaceAll(`&(__${key.toUpperCase()}__)`, value) })
    return buffer
}

function loadTemplate(templatePath = join(__dirname, "assets", "template.html")): string {
    return readFileSync(templatePath, { encoding: "utf-8" })
}

function loadYaml(yamlFilePath = join(__dirname, "assets", "dirStructure.yaml")) {
    const yamlContent = readFileSync(yamlFilePath, 'utf8');
    return yaml.load(yamlContent);
}

async function loadPages() {
    async function resolvePath(path) {
        const dataObject = {
            backend: "",
            metadata: "",
            header: "",
            ...await import(resolve(path))
        }

        return [path, dataObject]
    }

    const paths = await glob("./src/pages/**/[a-z[]*.tsx")
    return Object.fromEntries(await Promise.all(paths.map(resolvePath))) as {
        [key: string]: {
            default: FC
            header: string
            backend: string
            metadata: string
        }
    }
}

function createFileWithFolders(filePath, content) {
    const absolutePath = resolve(filePath);
    const directoryPath = dirname(absolutePath);
  
    // Create folders recursively if they don't exist
    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
    }
  
    // Create or overwrite the file with content
    writeFileSync(absolutePath, content);
  
    console.log(`File "${absolutePath}" created with content.`);
  }
  

async function main() {
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
    
    webpack({...config as any, ...{output: {path: join(resolve(themeExportPath), "assets"), chunkFilename: "js/[name].[hash].js", filename: "js/[name].js", publicPath: "/themes/base/assets/"}}, mode: "production"}, (error, stats)=>{
    const message = `+++\nBuild successful!\nTime: ${stats.endTime - stats.startTime} ms\nHash: ${stats.hash}\nVersion: ${webpack.version}\n${stats.toString()}`;

    console.log(message);
    })
}

main()