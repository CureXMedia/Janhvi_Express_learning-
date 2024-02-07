import {Router} from 'express'

const router = Router();

// fetch('localhost:3000')
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => console.log(err))


router.get('/HomePage', (req,res) =>{
    res.send('Hello World')

}
)

router.get('/AboutPage', (req,res) =>{
    res.send('About Page')
})
 
export{router};
