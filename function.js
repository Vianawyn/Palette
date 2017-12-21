/*
Palette画板
属性
    canvas、ctx、线宽、描边样式、填充样式、端点样式、几角、几边
方法
    画线、圆、矩形、多边形、多角形
*/
class Palette{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.cw = this.canvas.width;
        this.ch = this.canvas.height;

        this.history = [];
        this.lineWidth = 1;

        this.style = 'stroke';
        this.fillStyle = '#000';
        this.strokeStyle = '#000';
    }
    revocation(){
        let that = this;
        document.onkeydown = function(e){
            if(e.ctrlKey && e.key == 'z'){
                if(that.history.length > 0){
                    let data = that.history.pop();
                    that.ctx.putImageData(data, 0, 0)
                }else{
                    that.ctx.clearRect(0, 0, that.cw, that.ch);
                }
            };
        };
    }
    pencil(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.ctx.beginPath();
            that.ctx.moveTo(ox, oy);
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.lineTo(mx, my);
                that.ctx.lineWidth = that.lineWidth;
                that.ctx.strokeStyle = that.strokeStyle;
                that.ctx.fillStyle = that.fillStyle;
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.revocation();
    }
    eraser(){
        let that = this;
        let era = document.querySelector('.mask');
        let opacity = document.querySelector('.opacity');
        era.style.display = 'block';
        opacity.style.display = 'block';
        opacity.onmousedown = function(e){
            let maxH = opacity.offsetHeight -era.offsetHeight;
            let maxW = opacity.offsetWidth - era.offsetWidth;
            opacity.onmousemove = function(e){
                let zw = era.offsetWidth;
                let zh = era.offsetHeight;
                let ex = e.offsetX - zw/2;
                let ey = e.offsetY - zh/2;
                if(ex >= maxW){
                    ex = maxW;
                }
                if(ey >= maxH){
                    ey = maxH;
                }
                if(ex <= 0){
                    ex = 0;
                }
                if(ey <= 0){
                    ey =0;
                }
                era.style.top = ey+ 'px';
                era.style.left = ex+ 'px';
                that.ctx.clearRect(ex,ey,zw,zh);
            }
        }
            
        // that.canvas.onmousedown = function(e){
        //     let ox = e.offsetX,oy = e.offsetY;
        //     that.canvas.onmousemove = function(e){
        //         // if(ox >= cw){
        //         //     ox = cw;
        //         // }
        //         // if(ox <= 0){
        //         //     ox = 0;
        //         // }
        //         // if(oy >= ch){
        //         //     oy = ch;
        //         // }
        //         // if(oy <= 0){
        //         //     oy = 0;
        //         // }
        //         let lefts = e.offsetX - 10;
        //         let tops = e.offsetX - 10;
        //         era.style.left = lefts + 'px';
        //         era.style.top = tops + 'px';
        //     }
        //     that.canvas.onmouseup = function(){
        //         that.canvas.onmousemove = null;
        //         that.canvas.onmouseup = null;
        //     }
        // }
        that.revocation();
    }
    line(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox, oy);
                that.ctx.lineTo(mx, my);
                that.ctx.lineWidth = that.lineWidth;
                that.ctx.strokeStyle = that.strokeStyle;
                that.ctx.fillStyle = that.fillStyle;
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.revocation();
    }
    dotted(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.setLineDash([5,18]);
                that.ctx.beginPath();
                that.ctx.moveTo(ox, oy);
                that.ctx.lineTo(mx, my);
                that.ctx.lineWidth = that.lineWidth;
                that.ctx.strokeStyle = that.strokeStyle;
                that.ctx.fillStyle = that.fillStyle;
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.revocation();
    }
    rect(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                that.ctx.clearRect(0,0,that.cw,that.ch);
                that.ctx.beginPath();
                let mx = e.offsetX, my = e.offsetY;
                that.ctx.rect(ox,oy,mx-ox,my-oy);
                that.ctx.strokeStyle = that.strokeStyle;
                that.ctx.fillStyle = that.fillStyle;
                that.ctx[that.style]();
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.revocation();
    }
    circle(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let radius = Math.sqrt(Math.pow(ox-mx,2)+Math.pow(oy-my,2));
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.arc(ox, oy, radius, 0, Math.PI*2);
                that.ctx.strokeStyle = that.strokeStyle;
                that.ctx.fillStyle = that.fillStyle;
                that.ctx[that.style]();
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.revocation();
    }
    poly(ask){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let radius = Math.sqrt(Math.pow(ox-mx,2) + Math.pow(oy-my,2));
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                let deg = 2 * Math.PI / ask;
                that.ctx.beginPath();
                that.ctx.moveTo(ox + radius, oy);
                for(let i = 0;i < ask;i++){
                    let x = ox + radius*Math.cos(deg*i);
                    let y = oy + radius*Math.sin(deg*i);
                    that.ctx.lineTo(x,y);
                }
                that.ctx.closePath();
                that.ctx.strokeStyle = that.strokeStyle;
                that.ctx.fillStyle = that.fillStyle;
                that.ctx[that.style]();
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.revocation();
    }
    polygon(ask){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let radius = Math.sqrt(Math.pow(ox-mx,2) + Math.pow(oy-my,2));
                let radius1 = radius/3;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                let deg = Math.PI / ask;
                that.ctx.beginPath();
                that.ctx.moveTo(ox + radius, oy);
                for(let i = 0;i < ask * 2;i++){
                    let x,y;
                    if(i % 2 == 0){
                        x = ox + radius * Math.cos(deg*i);
                        y = oy + radius * Math.sin(deg*i);
                    }else{
                        x = ox + radius1 * Math.cos(deg*i);
                        y = oy + radius1 * Math.sin(deg*i);
                    }
                    that.ctx.lineTo(x,y);
                }
                that.ctx.closePath();
                that.ctx.strokeStyle = that.strokeStyle;
                that.ctx.fillStyle = that.fillStyle;
                that.ctx[that.style]();
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.revocation();
    }
}