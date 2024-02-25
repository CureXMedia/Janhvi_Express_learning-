import { Router } from 'express';
import { replyStream } from './demo.js';
import { prepStream } from './utils.js';

// import {users} from './user.js';

function api() {
    const router = Router();
    router.get('/reply', (req, res, next) => {
        prepStream(res);
        replyStream(req.query.question, res);
    })

    return router
}
    

export{api};
