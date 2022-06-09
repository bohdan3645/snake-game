type Direction = 'left' | 'right' | 'up' | 'down'
type Status = 'idle' | 'continuing' | 'pause'
type CanvasSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
interface Point { x: number, y: number }
interface KeyboardCommands { 
    goLeft: string
    goRight: string
    goUp: string
    goDown: string
    stop: string
    start: string
}

class Snake {
    //public values
    status: Status
    score: number
    keyboardCommands: KeyboardCommands 

    //privat values
    #step: number
    #snake: Point[]
    #nextStep: Point | null
    #context: CanvasRenderingContext2D | null
    #canvasSize: number
    #timer: number | null
    #spead: number
    #currentDirection: Direction
    #target: Point | null
    #trottle: boolean

    constructor(canvasSize: CanvasSize) {
        this.status = 'idle'
        this.score = 0
        this.keyboardCommands = {
            goLeft: 'KeyA',
            goRight: 'KeyD',
            goUp: 'KeyW',
            goDown: 'KeyS',
            stop: 'Space',
            start: 'Enter',
        }
        this.#step = 50
        this.#context = null
        this.#snake = [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 100, y: 0 }]
        this.#nextStep = null
        this.#canvasSize = (() => {
            switch(canvasSize) {
                case 'xs':
                    return 500;
                case 'sm':
                    return 750;
                case 'md':
                    return 1000;
                case 'lg':
                    return 1500;
                case 'xl': 
                    return 2000;
            }
        })()
        this.#timer = null
        this.#spead = 100
        this.#currentDirection = 'right'
        this.#target = null
        this.#trottle = false
    }

    //puclic methods
    paintCanvas(width: string) {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', this.#canvasSize.toString());
        canvas.setAttribute('height', this.#canvasSize.toString());
        canvas.style.backgroundColor = 'lightblue';
        canvas.style.width = width;
        canvas.style.aspectRatio = '1 / 1';

        this.#context = canvas.getContext('2d');
        return canvas;
    }

    changeDirection(newDirection: Direction) {
        const curDirection = this.#currentDirection;
        if(curDirection === 'right' && newDirection === 'left') return;
        if(curDirection === 'left' && newDirection === 'right') return;
        if(curDirection === 'up' && newDirection === 'down') return;
        if(curDirection === 'down' && newDirection === 'up') return;

        if(this.#trottle) return; 
        this.#trottle = true;
        setTimeout(() => this.#trottle = false, this.#spead);
        this.#currentDirection = newDirection;
    }

    start() {
        if(this.#timer !== null) return;
        this.#keyboardNav();
        this.#calcTarget();
        this.#timer = setInterval(() => {
            this.#targetHit();
            this.#calcNextStep();
            this.#hitItself();
            this.#makeMove();
            this.#refreshCanvas();
            this.#paintTarget();
            this.#paintSnake();
            
        }, this.#spead);

        this.#setStatus('continuing');
    }

    stop() {
        if(!this.#timer) return;
        clearInterval(this.#timer);
        this.#timer = null;

        this.#setStatus('pause');
    }

    //privat methods
    #calcTarget() {
        const random = () => Math.floor(Math.random() * (this.#canvasSize / this.#step)) * this.#step;
        this.#target = { x: random(), y: random() }
    }

    #paintTarget() {
        if(!this.#context || !this.#target) return;
        this.#context.fillStyle = 'black';
        this.#context.fillRect(this.#target?.x, this.#target?.y, this.#step, this.#step)
    }

    #refreshCanvas() {
        if(!this.#context) return;
        this.#context.fillStyle = 'lightblue';
        this.#context.fillRect(0, 0, this.#canvasSize, this.#canvasSize );
    }

    #paintSnake() {
        this.#snake.forEach((point, i) => {
            if(!this.#context) return;
            if(i === this.#snake.length - 1) {
                //paint snake head
                this.#context.fillStyle = 'red';
                this.#context.fillRect(point.x, point.y, this.#step, this.#step);
            } else {
                //paint snake body
                this.#context.fillStyle = 'blue';
                this.#context.fillRect(point.x, point.y, this.#step, this.#step);
            }
        })
    }

    #calcNextStep() {
        const canvasSize = this.#canvasSize;
        const step = this.#step;
        const point = this.#snake[this.#snake.length - 1];
        let nextStep: Point = { x: 0 , y: 0 };

        switch(this.#currentDirection) {
            case 'left': 
                nextStep = point.x === 0 ? { ...point, x: canvasSize - step } : { ...point, x: point.x - step };
                break;
            case 'right': 
                nextStep = point.x === canvasSize - step ? { ...point, x: 0 } : { ...point, x: point.x + step };
                break;
            case 'up': 
                nextStep = point.y === 0 ? { ...point , y: canvasSize - step } : { ...point, y: point.y - step };
                break;
            case 'down': 
                nextStep = point.y === canvasSize - step ? { ...point , y: 0 } : { ...point, y: point.y + step };
                break;
        };

        this.#nextStep = nextStep;
    }

    #makeMove() {
        if(!this.#nextStep) return;
        this.#snake.push(this.#nextStep);
        this.#snake.shift();
    }

    #keyboardNav() {
        window.addEventListener('keypress', (e) => {
            switch(e.code) {
                case this.keyboardCommands.goLeft: 
                    this.changeDirection('left');
                    break;
                case this.keyboardCommands.goRight: 
                    this.changeDirection('right');
                    break;
                case this.keyboardCommands.goUp: 
                    this.changeDirection('up');
                    break;
                case this.keyboardCommands.goDown: 
                    this.changeDirection('down');
                    break;
                // case this.keyboardCommands.start: 
                //     console.log('enter')
                //     this.start();
                //     break;
                // case this.keyboardCommands.stop: 
                // console.log('space')
                //     this.stop();
                //     break;
            }
        })
    }

    #targetHit() {
        if(!this.#target) return;
        const snakeHead = this.#snake[this.#snake.length - 1];
        const target = this.#target;
        if(snakeHead.x === target.x && snakeHead.y === target.y) {
            this.#calcTarget();
            this.score ++;
            console.log(this.score);
            this.#snake.unshift({ x: this.#snake[0].x, y: this.#snake[0].y });
        }
    }
    
    #gameOver() {
        if(!this.#timer || !this.#context) return;
        clearInterval(this.#timer);
        this.#timer = null;
        this.#context.fillStyle = 'pink'
        this.#context.fillRect(0, 0, this.#canvasSize, this.#canvasSize);

        this.#setStatus('idle');
    }

    #hitItself() {
        const isHit = this.#snake.some(point => {
            if(!this.#nextStep) return;
            return point.x === this.#nextStep.x && point.y === this.#nextStep.y;
        });
        isHit && this.#gameOver();
    }

    #setStatus(newStatus: Status) {
        this.status = newStatus
    }
}

const snakeGame = new Snake('xl');
const game = snakeGame.paintCanvas('25%');

const root = document.getElementById('root');
root?.appendChild(game);

const startButton = document.getElementById('start');
startButton?.addEventListener('click', () => {
    snakeGame.start();
});

const stopButton = document.getElementById('stop');
stopButton?.addEventListener('click', () => {
    snakeGame.stop();
});