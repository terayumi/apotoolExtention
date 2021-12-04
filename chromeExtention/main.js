const serverIP = 'http://192.168.0.139:8000'
//const serverIP = 'http://localhost:8000'
console.log('extention main.js');
window.onload = function () {
  let body = document.getElementsByClassName('page-container');
  console.log(body);
  let recdialog = '<div class="chkbox" id="recDialog"><form action="' + serverIP + '" method="post"><input type="button" value="診察室1"><input type="button" value="診察室2"><input type="button" value="診察室3"><input type="button" value="診察室4"><input type="button" value="診察室5"><input type="button" value="診察室6"><input type="button" value="診察室7"><input type="button" value="診察室8"><input type="button" value="診察室9"><input type="button" value="診察室10"><input type="button" value="診察室11"><input type="button" value="診察室12"><input type="button" value="オペ室"><input type="checkbox" id="takuji" name="chkbox03" value="1" /><label for="takuji">託児あり</label><input type="submit"></form></div>';
  let style = '<style>button, .chkbox{margin:2px;} #recDialog{position: absolute; z-index:3000; bottom:2px; background-color: #C1E2FF; width: 250px;}</style>'
  body[0].insertAdjacentHTML('beforebegin', '<iframe id="rece"  src="' + serverIP + '/extention"></iframe>');
  body[0].insertAdjacentHTML('beforebegin','<div id="updown">受付操作を非表示</div>')
  iframeObj = document.getElementById('rece').contentWindow;
}

let updown=1;
document.addEventListener('click',function(e){
  console.log(e.target.id);
  if(e.target.id=='updown'){
    if(updown==1){
      e.target.innerText='受付操作を表示';
      e.target.style.bottom='0px';
      document.getElementById('rece').style.display='none';
      updown=0;
    }else{
      e.target.innerText='受付操作を非表示';
      e.target.style.bottom='200px';
      document.getElementById('rece').style.display='block';
      updown=1;
    }
  }
},false)


let iframeObj,bar;
window.onmessage = function (e) {
  let data = e.data;
  console.log(data);
  if (data == true) {
    console.log('true');
  } else {
    let name_id = findName();
    console.log(name_id);
    data.name = name_id[0];
    data.id=name_id[1];
    iframeObj.postMessage(data, serverIP + "/extention");

  }

}

function sousin(data) {
  fetch(serverIP + '/add',
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
}

function findName() {

  
  let name = document.getElementsByClassName('link')[0].innerText;
  let id=document.getElementById('registration_number').innerText;
  let name_id=[];
  console.log(name+id);
  if(name==undefined){
    return false;
  }else{
    name_id= [name,id]
  }
  console.log(name_id+'hai');
  return name_id;

  /*if (takuji.checked) {
    console.log('checked');
    socket.emit('add', { room: i, takuji: true })
  } else {
    socket.emit('add', { room: i, takuji: false })
  }*/
}

//let barFlag=1;function barOn(){console.log('barOn');if(barFlag==0){iframeObj.style.display='none';bar.style.bottom=0;}else{iframeObj.style.display='block';bar.style.bottom=300;}}
