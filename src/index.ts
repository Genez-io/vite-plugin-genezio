import { ViteDevServer } from "vite";
import chokidar from "chokidar";
import path from "path";
export default function genezioLocalSDKReload() {
  return {
    name: "vite-plugin-genezio",
    configureServer: (server: ViteDevServer): void => {
      const directoryToWatch = path.join(".", "node_modules", "@genezio-sdk");
      const watcher = chokidar.watch(directoryToWatch, {
        persistent: true,
      });

      // Watch for adding the package.json file to restart the server only once,
      // then only watch for changes to the package.json file.
      const addWatcher = watcher.on("add", (filePath: string) => {
        const filePathComponents = filePath.split(path.sep);
        if (
          filePathComponents[filePathComponents.length - 1] == "package.json"
        ) {
          addWatcher.close();
          server.restart(true);
        }
      });

      watcher.on("change", (filePath: string) => {
        const filePathComponents = filePath.split(path.sep);
        if (
          filePathComponents[filePathComponents.length - 1] == "package.json"
        ) {
          server.restart(true);
        }
      });

      // Exclude @genezio-sdk from optimization because it is usually
      // replaced by our watcher at runtime.
      if (server.config.optimizeDeps.exclude) {
        server.config.optimizeDeps.exclude.push("@genezio-sdk");
      } else {
        server.config.optimizeDeps.exclude = ["@genezio-sdk"];
      }
    },
  };
}
