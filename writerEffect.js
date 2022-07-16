export default function writerEffect(ground, txt='insert your text here', loop=true){
    
    ground.style.fontSize = '5rem';
    ground.style.textTransform = 'uppercase';
    ground.style.textAlign = 'center';
    ground.style.padding = '10%';
    ground.style.width = '100%';
    ground.style.heigth = '100%';
    ground.style.display = 'flex';
    ground.style.alignItems = 'center';
    ground.style.justifyContent = 'center';

    (async () => { 
        do {await timer(txt.split(''), ground )} while (loop);
    })();
}

const timer = (text, ground) =>{
    return new Promise((resolve,reject)=>{
        let count = 0;
        const pluss = setInterval(()=>{
            ground.innerHTML += text[count]
            count++
            if(text.length <= count){
                clearTimeout(pluss)
                setTimeout(() => {
                    timerLess(text, ground)
                }, 1200);
            }
        },200)  
        
        const timerLess = (text, ground) => {
            let count = text.length;
            const less = setInterval(()=>{
            if( count >= 0){
                text.splice(count,1)
                ground.innerHTML = text.join('')
            }else {
                clearInterval(less)
                resolve('time over')
            }
            count--
        },200)
        }
    })
};
