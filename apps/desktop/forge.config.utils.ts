import { HookFunctionErrorCallback } from '@electron/packager';
import { copy, copyFile } from 'fs-extra';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Copies specified node modules from the project's node_modules folder to the build path.
 */
export async function copyModulesToAsarDirectory(
    modules: string[],
    buildPath: string,
    callback: HookFunctionErrorCallback
) {
    const tasks = modules.map(async moduleName => {
        const modulePath = path.resolve(__dirname, `../../node_modules/${moduleName}`);
        const destPath = path.join(buildPath, `node_modules/${moduleName}`);

        try {
            await copy(modulePath, destPath);
            return null;
        } catch (err) {
            return err;
        }
    });

    try {
        const results = await Promise.all(tasks);
        const errors = results.filter(result => result !== null);

        if (errors.length > 0) {
            const errorMessage = 'Failed to copy one or more modules:\n' + ' - ' + errors.map(err => err.message).join(';\n');
            callback(new Error(errorMessage));
        } else {
            callback();
        }
    } catch (error) {
        callback(error);
    }
}

/**
 * Packages plugins by copying their output files from the 'out' directory
 * to the specified build path under 'plugins/{plugin_name}'.
 */
export async function packagePlugins(
    buildPath: string,
    callback: HookFunctionErrorCallback
) {
    const pluginsPath = path.resolve(__dirname, '../../plugins');

    fs.readdir(pluginsPath, async (err, pluginNames) => {
        if (err) {
            callback(err);
            return;
        }

        const tasks = pluginNames.map(async (pluginName) => {
            const pluginBasePath = path.join(pluginsPath, pluginName);
            const destPluginPath = path.join(buildPath, `plugins/${pluginName}`);

            const outDir = path.join(pluginBasePath, 'out');
            const manifest = path.join(pluginBasePath, 'manifest.json');

            try {
                await fs.promises.mkdir(destPluginPath, { recursive: true });
                await copy(outDir, path.join(destPluginPath, 'out'));
                await copyFile(manifest, path.join(destPluginPath, 'manifest.json'));
                return null;
            } catch (err) {
                return err;
            }
        });

        try {
            const results = await Promise.all(tasks);
            const errors = results.filter(result => result !== null);

            if (errors.length > 0) {
                const errorMessage = 'Failed to package one or more plugins:\n' + ' - ' + errors.map(err => err.message).join(';\n');
                callback(new Error(errorMessage));
            } else {
                callback();
            }
        } catch (error) {
            callback(error);
        }
    });
}

/**
 * Copies files from specified paths within node_modules to the build path.
 * Optionally renames the files in the destination.
 */
export async function copyFilesFromNodeModules(
    buildPath: string,
    files: { sourcePath: string, destinationPath: string }[],
    callback: HookFunctionErrorCallback
) {
    const tasks = files.map(async ({ sourcePath, destinationPath }) => {
        const fullSourcePath = path.resolve(__dirname, `../../node_modules/${sourcePath}`);
        const fullDestinationPath = path.join(buildPath, destinationPath);

        try {
            await copy(fullSourcePath, fullDestinationPath);
            return null;
        } catch (err) {
            return err;
        }
    });

    try {
        const results = await Promise.all(tasks);
        const errors = results.filter(result => result !== null);

        if (errors.length > 0) {
            const errorMessage = 'Failed to copy one or more files:\n' + errors.map(err => err.message).join(';\n');
            callback(new Error(errorMessage));
        } else {
            callback();
        }
    } catch (error) {
        callback(error);
    }
}