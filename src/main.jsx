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
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    let deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    let installDiv=document.getElementById('installAppDiv');
    let yesBtn=document.getElementById('yes');
    let noBtn=document.getElementById('no');
    // addBtn.style.display = "block";

    yesBtn.addEventListener("click", (e) => {
        // hide our user interface that shows our A2HS button
        installDiv.style.display = "none";
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            deferredPrompt = null;
        });
    });


    noBtn.addEventListener('click',(e)=>{
        installDiv.style.display = "none";
    })
});

//endregion




// registerServiceWorker();


