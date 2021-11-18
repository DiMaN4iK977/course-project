let timeProcess;
let time = 1;
let Dtemp ;


let Dtemp900 = 8 * Math.pow(10, -15);
let Dtemp1000 = 6 * Math.pow(10, -14);
let Dtemp1100 = 7 * Math.pow(10, -13);

let N0 = 5 * Math.pow(10, 20);

let C;
let C900 = Math.pow(10, 20);
let C1000 = 2 * Math.pow(10, 20);
let C1100 = 3 * Math.pow(10, 20);

//
let dialog = document.querySelector('.dialog');
let tmpInput = document.querySelector('#tempInput');
let btn = document.querySelector('#btn');
let canvas = document.querySelector('#chart');
let timeInput = document.querySelector('#timeInput');

btn.addEventListener('click', ()=>{
    dialog.style.display = 'none';
    canvas.style.display = 'flex';
})

timeInput.addEventListener('input', ()=>{
    timeProcess = timeInput.value * 60;
})

console.log(timeProcess)

tmpInput.addEventListener('input', ()=> {
    if(tmpInput.value === '900') {
        Dtemp = Dtemp900
        C = C900;
    }
    if(tmpInput.value === '1000') {
        Dtemp = Dtemp1000;
        C = C1000;
    }
    if(tmpInput.value === '1100') {
        Dtemp = Dtemp1100
        C = C1100;
    }
    arrayResult()
})


arrayResult()



function arrayResult() {
    let result = [];
    for (let i = 0; i < timeProcess; i++) {
        let Xj = 2 * Math.pow(Dtemp*i, 0.5 ) * (Math.pow(Math.log(N0/C), 0.5) - 0.3)* Math.pow(10, 5);
        result.push({i, Xj})
    }
    console.log(result)
    let k = 100;

//
    const WIDTH = timeProcess;
    const HEIGHT = Math.ceil(result[result.length - 1].Xj) * k;
    const numberAdd = 30;

    const DPI_WIDTH = WIDTH + numberAdd + 5;
    const DPI_HEIGHT = HEIGHT + numberAdd;

    let rowsY = HEIGHT / 100;
    let rowsX = WIDTH / 100;



    function chart(canvas, data) {
        const ctx = canvas.getContext('2d')
        canvas.style.width = WIDTH + 'px';
        canvas.style.height = HEIGHT + 'px';
        canvas.width = DPI_WIDTH;
        canvas.height = DPI_HEIGHT;
        canvas.style.padding = 30 + 'px';

        ctx.beginPath();
        ctx.lineWidth = 4
        for (let j = 0; j < data.length; j++) {
            let x = data[j].i;
            let y = data[j].Xj*k;
            ctx.lineTo(x,DPI_HEIGHT - y)
        }
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.font = 'bold 20px serif';
        for (let i = 1; i <= rowsY; i++) {
            const y = 100*i;
            ctx.moveTo(0, DPI_HEIGHT - y );
            // ctx.lineTo(10, DPI_HEIGHT - y) ;
            ctx.fillText(`${i}`,5, DPI_HEIGHT - y);
        }
        ctx.stroke()
        ctx.closePath();

        ctx.beginPath();
        ctx.font = 'bold 20px serif';
        for (let i = 0; i <= rowsX + 1; i++) {
            const x = 100*i;
            ctx.moveTo(x, DPI_HEIGHT);
            // ctx.lineTo(x,  DPI_HEIGHT - 10);
            ctx.fillText(`${x}`, x + 5,  DPI_HEIGHT - 5);
        }
        ctx.stroke()
        ctx.closePath();

        ctx.beginPath()
        // ctx.lineWidth = 4;
        ctx.moveTo(0,DPI_HEIGHT);
        ctx.lineTo(0, 0)

        ctx.moveTo(0, DPI_HEIGHT);
        ctx.lineTo(DPI_WIDTH,DPI_HEIGHT)
        ctx.stroke()
        ctx.closePath()


        ctx.beginPath();
        ctx.font = 'bold 20px serif';
        ctx.fillText('Xj(T)', DPI_WIDTH / 2,20);
        ctx.closePath();


        ctx.beginPath()
        // ctx.moveTo(0,0);
        ctx.fillText(`Xj, мкм`,0,15)
        ctx.closePath()

        ctx.beginPath()
        ctx.fillText(`T, °С`,DPI_WIDTH - 50, DPI_HEIGHT - 20)
        ctx.closePath()
    }

    chart(document.getElementById('chart'), result)
}




