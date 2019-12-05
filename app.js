function bindEvents(p){

  p.on('signal',function(data){
    document.querySelector("#offre").textContent = JSON.stringify(data)
  })

  p.on('error',function(err){
    console.log('error',err);
  })

  p.on('stream',function(stream){
    let emitterVideo = document.querySelector('#receiver-video')
    emitterVideo.srcObject = stream
    emitterVideo.play()
  })

  document.querySelector("#incoming").addEventListener('submit',function(e){
    e.preventDefault()
    p.signal(JSON.parse(e.target.querySelector("textarea").value))
  })
}


function startPeer(initiator){
  navigator.getUserMedia({
    video:true,audio:false
  },function(stream){
    let p = new SimplePeer({
      initiator:initiator,
      stream : stream,
      trickle : false
      //config : {iceServers : []}
    })
    bindEvents(p)
    let emitterVideo = document.querySelector('#emitter-video')
    emitterVideo.srcObject = stream
    emitterVideo.play()
  },function(){

  })
}

document.querySelector('#demarrer').addEventListener('click',function(e){
  startPeer(true);
})

document.querySelector('#recevoir').addEventListener('click',function(e){
  startPeer(false);
})
