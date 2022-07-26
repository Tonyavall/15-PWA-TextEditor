const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event

    butInstall.classList.toggle('hidden', false)
});

// Handles click installation event
butInstall.addEventListener('click', async () => {
    try {
        const promptEvent = window.deferredPrompt
        if (!promptEvent) return

        promptEvent.prompt()

        window.deferredPrompt = null

        butInstall.classList.toggle('hidden', true)
    } catch (error) {
        console.log(error)
    }
});

// Clears prompt once app has been installed
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null
});
