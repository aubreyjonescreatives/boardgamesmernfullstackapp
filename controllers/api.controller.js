export const api = ((req, res) => {

    res.json({
    status: 'awesome', 
    name: 'Aubrey', 
    strongestTrait: true, 
    likes: [
        'Web Development', 
        'Music'
    ]
})

})

export const status = ((req, res) => {
    res.json({
        status: 'ok',
        info: 'Aubrey was here.'
    })
})

