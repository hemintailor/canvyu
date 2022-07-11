class TailorDraw {
    #canvas;
    #ctx;
    #flag = false;
    #prevX = 0;
    #currX = 0;
    #prevY = 0;
    #currY = 0;
    #minusX = 0;
    #minusY = 0;
    #dot_flag = false;

    #canvasId = '';
    #imgPreviewId = '';
    #x = 'blue';
    #y = 2;
    #w;
    #h;

    #DEFAULT_COLORS = [
        'green',
        'blue',
        'red',
        'yellow',
        'orange',
        'black',
        'white',
    ]

    #movingFun = (e) => {
    }

    #upFun = (e) => {
    }

    #downFun = (e) => {
    }

    #befUpFun = (e) => {
    }

    #befDownFun = (e) => {
    }

    init = ({canvasId, penColor, imgPreviewId, minusX, minusY}) => {
        this.#minusX = minusX || 0;
        this.#minusY = minusY || 0;
        this.#canvasId = canvasId;
        this.#imgPreviewId = imgPreviewId;
        this.setColor(penColor);
        this.#canvas = document.getElementById(this.#canvasId);
        this.#ctx = this.#canvas.getContext("2d");
        this.#w = this.#canvas.width;
        this.#h = this.#canvas.height;

        this.#canvas.addEventListener("mousemove", (e) => {
            this.#findxy('move', e)
        }, false);
        this.#canvas.addEventListener("mousedown", (e) => {
            this.#befDownFun(e)
            this.#findxy('down', e)
        }, false);
        this.#canvas.addEventListener("mouseup", (e) => {
            this.#befUpFun(e);
            this.#findxy('up', e)
        }, false);
        this.#canvas.addEventListener("mouseout", (e) => {
            this.#findxy('out', e)
        }, false);
    }

    setColor = (colorName) => {
        if (this.#DEFAULT_COLORS.includes(colorName)) {
            this.#x = colorName
        } else {
            throw new Error('Invalid color name');
        }
        if (this.#x === "white") this.#y = 14;
        else this.#y = 2;
    }

    #draw = () => {
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.#prevX, this.#prevY);
        this.#ctx.lineTo(this.#currX, this.#currY);
        this.#ctx.strokeStyle = this.#x;
        this.#ctx.lineWidth = this.#y;
        this.#ctx.stroke();
        this.#ctx.closePath();
    }

    erase = (ask = true) => {
        if (!ask || confirm("Want to clear")) {
            this.#ctx.clearRect(0, 0, this.#w, this.#h);
            if (this.#imgPreviewId) {
                document.getElementById(this.#imgPreviewId).style.display = "none";
            }
        }
    }

    save = () => {
        if (this.#imgPreviewId) {
            document.getElementById(this.#imgPreviewId).style.border = "2px solid";
            document.getElementById(this.#imgPreviewId).src = this.#canvas.toDataURL();
            document.getElementById(this.#imgPreviewId).style.display = "inline";
        }
    }

    getImageData(convertToFile = false) {
        return this.#canvas.toDataURL()
    }

    #findxy = (res, e) => {
        if (res === 'down') {
            this.#prevX = this.#currX;
            this.#prevY = this.#currY;
            this.#currX = e.clientX - this.#canvas.offsetLeft - this.#minusX;
            this.#currY = e.clientY - this.#canvas.offsetTop - this.#minusY;

            this.#flag = true;
            this.#dot_flag = true;
            if (this.#dot_flag) {
                this.#ctx.beginPath();
                this.#ctx.fillStyle = this.#x;
                this.#ctx.fillRect(this.#currX, this.#currY, 2, 2);
                this.#ctx.closePath();
                this.#dot_flag = false;
                this.#downFun(e);
            }
        }
        if (res === 'up' || res === "out") {
            this.#flag = false;
            res === 'up' && this.#upFun(e);
        }
        if (res === 'move') {
            if (this.#flag) {
                this.#prevX = this.#currX;
                this.#prevY = this.#currY;
                this.#currX = e.clientX - this.#canvas.offsetLeft - this.#minusX;
                this.#currY = e.clientY - this.#canvas.offsetTop - this.#minusY;
                this.#draw();
                this.#movingFun(e);
            }
        }
    }

    onDrawing = (fun = (e) => {
    }) => {
        this.#movingFun = fun;
    }

    onFinishDraw = (fun = (e) => {
    }) => {
        this.#upFun = fun;
    }

    onStartDraw = (fun = (e) => {
    }) => {
        this.#downFun = fun;
    }

    onBeforeStartDraw = (fun = (e) => {
    }) => {
        this.#befDownFun = fun;
    }

    onBeforeFinishDraw = (fun = (e) => {
    }) => {
        this.#befUpFun = fun;
    }
}