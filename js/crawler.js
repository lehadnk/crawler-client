var net = new WebTCP('127.0.0.1', 9999);

var socket = net.createSocket('localhost', 1488);

socket.on('data', function(data) {
    document.getElementById('main').innerHTML = "<pre>"+data+"</pre>";
});

socket.write("hello");

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up
        socket.write('move 3');
    }
    else if (e.keyCode == '40') {

        // right
        socket.write('move 4');
    }
    else if (e.keyCode == '37') {
        // left
        socket.write('move 1');
    }
    else if (e.keyCode == '39') {
        // down
        socket.write('move 2');
    }

}