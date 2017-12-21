window.addEventListener('load',function(){
	let canvas = document.querySelector('canvas');
	let shape = document.querySelectorAll('.shape>li');
	let tool = document.querySelectorAll('.tool>li');
	let style = document.querySelectorAll('.style>li');
	let input = document.querySelectorAll('input');
	let operate = document.querySelectorAll('.operate>li');
	// let palette = new Palette(canvas);
	let palette = new Palette(canvas);

	shape.forEach(e => {
		let type = e.id;
		e.onclick = function(){
			shape.forEach(obj => obj.classList.remove('active'));
			this.classList.add('active');
			if(type == 'poly' || type == 'polygon'){
				let ask = prompt('请输入边数或角数');
				palette[type](ask);
			}else{
				palette[type]();
			}	
		}
	})
	tool.forEach(e => {
		let type = e.id;
		e.onclick = function(){
			tool.forEach(obj => obj.classList.remove('active'));
			this.classList.add('active');
			palette[type]();
		}
	})
	style.forEach(e => {
		let type = e.id;
		e.onclick = function(){
			style.forEach(obj => obj.classList.remove('active'));
			this.classList.add('active');
			if(type == 'stroke') {
                palette.style = 'stroke';
            }else if(type == 'fill') {
                palette.style = 'fill';
            }
		}
	})
    input.forEach(e=>{
    	let type = e.id;
        e.onchange = function(){
            if(type == 'color1'){
                let color = e.value;
                palette.strokeStyle = color;
            }else if(type == 'color2'){
                let color = e.value;
                palette.fillStyle = color;
            }
        }
    })
	operate.forEach(e => {
		let type = e.id;
		e.onclick = function(){
			operate.forEach(obj => obj.classList.remove('active'));
			this.classList.add('active');
			palette[type]();
		}
	})
})
