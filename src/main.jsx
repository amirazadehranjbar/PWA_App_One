import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store/store.js"
import App from "./App.jsx";


createRoot(document.getElementById('root')).render(
      <Provider store={store}>
            <BrowserRouter>
                <StrictMode>
                    <App/>
                </StrictMode>
            </BrowserRouter>
        </Provider>

);

//region install app
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    let deferredPrompt = e;

    const installDiv = document.getElementById("installAppDiv");
    const yesBtn = document.getElementById("yes");
    const noBtn = document.getElementById("no");

    if (!installDiv || !yesBtn || !noBtn) return;

    yesBtn.addEventListener("click", () => {
        installDiv.style.display = "none";
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome === "accepted"
                ? "User accepted the A2HS prompt"
                : "User dismissed the A2HS prompt");
            deferredPrompt = null;
        });
    });

    noBtn.addEventListener("click", () => {
        installDiv.style.display = "none";
    });
});

//endregion

//region worker
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js", {
                scope: "/",
            });

            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

//endregion



registerServiceWorker();


