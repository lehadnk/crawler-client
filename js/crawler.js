var net = new WebTCP('127.0.0.1', 9999);

options = {
    encoding: "utf-8",
    timeout: 0,
    noDelay: true,
    keepAlive: true,
    initialDelay: 0
};

var socket = net.createSocket('localhost', 1488, options);

processPacket = function(data) {
    var delimiter = data.search(' ');

    if (delimiter == -1) {
        return;
    }

    var length = data.slice(0, delimiter);
    var contents = data.slice(delimiter+1);
    var html = contents.slice(0, length);

    // Check if this packet was combined
    var restPart = contents.slice(length);
    if (restPart.length > 0) {
        processPacket(restPart);
    }

    document.getElementById('main').innerHTML = "<pre>"+html+"</pre>";
}

socket.on('data', function(data) {
    processPacket(data);
});

socket.write("hello");

// Player controls
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