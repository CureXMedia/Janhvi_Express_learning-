//not used 
import { Router } from 'express';
import { prepStream } from './utils.js';

function users() {
    const router = Router();

    
        // .get('/', (req, res, next) => {
        //     res.json({
        //         id: 1,
        //         firstname: 'Matt',
        //         lastname: 'Morgan',
        //     });
        // })
        router.get('/stats', (req, res, next) => {
            prepStream(res);

            const i = setInterval(() => {
                res.write('event: message\n');
                res.write(`data: { "value": "" }`);
                res.write('\n\n');
                res.flushHeaders();

                if (counter === 5) {
                    clearInterval(i);
                    res.write('event: close\n');
                    res.write(`data: { "time": ${Date.now()} }`);
                    res.write('\n\n');
                    res.flushHeaders();
                    res.end();
                }
            }, 2000);
        });

    return router;
}

export { users};
