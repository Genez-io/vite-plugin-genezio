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

      watcher.on("change", (filePath: string) => {
        const filePathComponents = filePath.split(path.sep);
        if (
          filePathComponents[filePathComponents.length - 1] == "package.json"
        ) {
          server.restart(true);
        }
      });
    },
  };
}
