class fileReader{
    constructor(){
        
    }

    readFile(path){
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if(err){
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    searchFile(dpi, record){
        path = `REC-${dpi}-${record}.txt`
        if(path.exists()){
            this.readFile(path).then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            });
        }
    }

}