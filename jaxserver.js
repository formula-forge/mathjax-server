import Net from 'net';
import tex2svg from './tex2svg';
 
async function main(){
    const port = 2023;
    const server = Net.createServer();
    await server.listen(port);
    console.log(`Server listening for connection requests on socket localhost:${port}`);

    server.on('connection', (socket) => {
        console.log('A new connection has been established.');
        socket.on('data', (chunk) => {
            try {
                const strs = chunk.toString().split('\0');
                console.log(`Data received from client: ${strs}`);
                strs.forEach(str => {
                    if(str.length > 0){
                        socket.write(tex2svg(str) + '\0');
                    }
                });
            } catch (e) {
                console.log(`Error: ${e}`);
            }
        });
        socket.on('end', () => {
            console.log('Closing connection with the client');
        });
        socket.on('error', (err) => {
            console.log(`Error: ${err}`);
        });
    })

    server.on('error', (err) => {
        console.log(`Error: ${err}`);
        server.close();
    });

    server.on('close', () => {
        console.log('Server closed, restarting');
        main();
    });
}

main();