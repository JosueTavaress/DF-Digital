import { app } from './app';
import swaggerDocs from './swagger';

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    swaggerDocs(app);
    console.log(`App listening port:${port}`)
});

process.on('SIGINT', () => {
    server.close();
    console.log('App finally');
})