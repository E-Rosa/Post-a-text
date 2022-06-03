//JWT Testing--------------------------------------------------------------------------------------------------------------------------------------
const fakePosts = [
    {
        username:'elias',
        title:'post 1'
    },
    {
        username:'rosa',
        title:'post 2'
    }
]

app.post('/login', (req, res)=>{
    const username = req.body.username //gets the request from the body
    const user = {name: username} //our payload (data in JWT token)

    const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)//serializes user
    res.json({acessToken: acessToken}) //sends the acess token in json format
})

app.get('/posts', authenticateToken, (req, res)=>{
    res.json(fakePosts.filter(post => post.username === req.user.name)); //looks for the post that has she same username as the request
})

function authenticateToken(req, res, next){
    //get token
    const authHeader =req.headers['authorization']; //returns Bearer TOKEN
    const token = authHeader & authHeader.split(' ')[1]; //returns the TOKEN bit only if there is an authHeader
    //verify user
    if (token === null) return res.sendStatus(401); //if there is no token, send 401
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{ //takes token, secret key and returns err (erorr) and user (payload)
        if (err) return res.sendStatus(403)
        req.user = user //take the user from request (serialized) and assign to it the new user returned by the jwt.verify function
        next() //move on from middleware
    }) 
    //return user
    //header looks like: Bearer TOKEN

}