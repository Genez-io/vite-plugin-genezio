import { ViteDevServer } from "vite";
import chokidar from "chokidar";
import path from "path";

let watcher: chokidar.FSWatcher|undefined;
let viteServer: ViteDevServer|undefined;

function watchAndRestart(server: ViteDevServer) {
    viteServer = server;
    if (watcher) {
        return
    }
    const directoryToWatch = path.join(".", "node_modules", "@genezio-sdk");
    watcher = chokidar.watch(directoryToWatch, {
      persistent: true,
    });
    
    watcher.on("all", (event: string, filePath: string) => {
      const filePathComponents = filePath.split(path.sep);
      if (
        (event == "change" ||
        event == "add") &&
        filePathComponents[filePathComponents.length - 1] == "package.json"
      ) {
        viteServer?.restart(true);
      }
    });
}

export default function genezioLocalSDKReload() {
  return {
    name: "vite-plugin-genezio",
    configureServer: (server: ViteDevServer): void => {
      watchAndRestart(server);

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
