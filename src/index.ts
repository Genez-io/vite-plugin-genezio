import { ViteDevServer } from 'vite';
export default function genezioLocalSDKReload() {
	let ignorePattern = `/node_modules\\/(?!@genezio-sdk/*).*/`;
	let pattern = `/node_modules\\/(@genezio-sdk/*).*/package.json`;
	return {
		name: 'vite-plugin-genezio',
		configureServer: (server: ViteDevServer) : void => {
            server.watcher.on('change', (path: string) => {
                const result = path.match(pattern);
                if (result) {
                    server.restart(true);
                }
            })
			server.watcher.options = {
				...server.watcher.options,
				ignored: [
					new RegExp(ignorePattern),
					'**/.git/**',
				]
			}
		}
	}
}
