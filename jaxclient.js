import Net from 'net';

var client = new Net.Socket();
client.connect(2023, '127.0.0.1', function() {
    console.log('Connected');
    client.write('\\frac{1}{2}\0');
});

client.on('data', function(data) {
    console.log('Received: ' + data);
    client.destroy();
});