const fs = require('fs');

module.exports = {
    upload : (req,res) => {
        const images = fs.readdirSync('public/uploads')
        var sorted = []
        for (let item of images){
            if(item.split('.').pop() === 'png'
            || item.split('.').pop() === 'jpg'
            || item.split('.').pop() === 'jpeg'
            || item.split('.').pop() === 'svg'){
                var abc = {
                      "image" : "/uploads/"+item,
                      "folder" : '/'
                }
                sorted.push(abc)
            }
        }
        res.send(sorted);    
    },
}