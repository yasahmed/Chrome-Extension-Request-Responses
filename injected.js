



const { fetch: origFetch } = window;
window.fetch = async (...args) => {

    const proxy = {...args}
    const url = proxy[0]!=undefined ? proxy[0].url:"";

    const response = await origFetch(...args);
    response
        .clone()
        .blob() // maybe json(), text(), blob()
        .then(data => {
            window.postMessage({ type: 'fetch', data: data,info:url}, '*'); // send to content script
            //window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
        })
        .catch(err => console.error(err));
    return response;
};