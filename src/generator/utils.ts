import { glob } from "glob";
import { resolve, join, dirname } from "path";
import { FC } from "react";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import * as yaml from 'js-yaml';

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
export function createSubfolders(topPath: string, tree): void {
    createFolderIfNotExists(topPath);
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
export function replaceTemplate(template: string, arg: { [key: string]: string; }) {
    let buffer = template;
    Object.entries(arg).forEach(([key, value]) => { buffer = buffer.replaceAll(`&(__${key.toUpperCase()}__)`, value); });
    return buffer;
}
export function loadTemplate(templatePath = join(__dirname, "assets", "template.html")): string {
    return readFileSync(templatePath, { encoding: "utf-8" });
}
export function loadYaml(yamlFilePath = join(__dirname, "assets", "dirStructure.yaml")) {
    const yamlContent = readFileSync(yamlFilePath, 'utf8');
    return yaml.load(yamlContent);
}
export async function resolvePath(path: string): Promise<[string, {
    default: FC;
    header: string;
    backend: string;
    metadata: string;
}]> {
    const dataObject = {
        backend: "",
        metadata: "",
        header: "",
        ...await import(resolve(path))
    };

    return [path, dataObject];
}
export async function loadPages() {

    const paths = await glob("./src/pages/**/[a-z[]*.tsx");
    return Object.fromEntries(await Promise.all(paths.map(resolvePath))) as {
        [key: string]: {
            default: FC;
            header: string;
            backend: string;
            metadata: string;
        };
    };
}
export function createFileWithFolders(filePath, content) {
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
