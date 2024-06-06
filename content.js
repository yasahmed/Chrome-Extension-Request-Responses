console.log('content script start');

function downloadJSON(data, filename) {
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
  

// inject injected script
var s = document.createElement('script');
s.src = chrome.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
 
// receive message from injected script
window.addEventListener('message', function (e) {
  if(e.data.info=="https://github.com/notifications/indicator")
    {
        e.data.type, e.data.data.text().then(res=>{
            downloadJSON(res, 'my_data.json');
           }).catch(err=>console.log(err));     
    }
    
});


