const onvif = require("node-onvif");

exports.returnCamerasList = async ()=>{
    console.log("Start the discovery process")
    try{
        const devicesList = await onvif.startProbe();
    }
    catch(e){
        throw new Error(" Error while searching for cameras ")
    }
}

exports.createDevice = async (xAddr,user,pass) => {

    let device = new onvif.OnvifDevice({
        xAddr,
        user,
        pass,
    })
    return device;
}

exports.returnUdpStreamUri = async (device)=>{
    return device.getUdpStreamUrl();
}


