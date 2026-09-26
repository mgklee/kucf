// Pin the same release used to verify the original diagrams. Update deliberately.
export const GOJS_VERSION = "4.0.4";
const GOJS_URL = `https://cdn.jsdelivr.net/npm/gojs@${GOJS_VERSION}/release/go.js`;

let loading;

export function loadGoJS() {
    if (!loading) {
        loading = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = GOJS_URL;
            script.onload = () => {
                if (window.go?.version === GOJS_VERSION) {
                    resolve(window.go);
                } else {
                    reject(new Error(`Expected GoJS ${GOJS_VERSION}`));
                }
            };
            script.onerror = () => reject(new Error("Could not load GoJS"));
            document.head.append(script);
        });
    }
    return loading;
}
