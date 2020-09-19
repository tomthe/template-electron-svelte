const { app, BrowserWindow } = require('electron');
const path = require('path')

const { ipcMain } = require('electron');
const sharp = require('sharp')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    
    const mode = process.env.NODE_ENV;
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        }
    });

    let watcher;
    if (process.env.NODE_ENV === 'development') {
        watcher = require('chokidar').watch(path.join(__dirname, '../public/build'), { ignoreInitial: true });
        watcher.on('change', () => {
            mainWindow.reload();
        });
    }

    mainWindow.loadURL(`file://${path.join(__dirname, '../public/index.html')}`);
    mainWindow.on('closed', () => {
        if (watcher) {
            watcher.close();
        }
        mainWindow = null;
    });

    
    mainWindow.webContents.openDevTools();
    /*
    ipcMain.on('trigger-jimp', (event, arg) => {
        for(let i=0;i<files.length;i+=1){
            //let thumbname = 'C:\\dev\\svelte\\test\\o' + i.toString() +(((1+Math.random())*0x10000)|0).toString(16).substring(1) + 'g3.jpg';
            let thumbname = 'C:\\dev\\svelte\\test\\o' + i.toString() +(((1+Math.random())*0x10000)|0).toString(16).substring(1) + 'g3.jpg'
            sharp(files[i].path)
              .resize(300)
              .toFile(thumbname)
              .then(()=> {
                console.log("then...");
                newimageentry = {fnorig:files[i],fnsmall:thumbname}
                allImages.update(arr=>{
                  return [...arr,newimageentry]
                })
              });
        }
         //jimp.read(filepaths[0]).then(image => {
          // sends back the image to renderer
          event.sender.send('triggered-jimp', image);
    });*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});