type Direction = 'left' | 'right' | 'up' | 'down'
interface Point { x: number, y: number }

class Snake {
    #level: number
    #step: number
    #snake: Point[]
    #context: CanvasRenderingContext2D | null
    #canvasSize: number
    #timer: number | null
    #spead: number
    #currentDirection: Direction
    #target: Point | null

    constructor(step: number, canvasSize: number) {
        this.#step = step
        this.#context = null
        this.#snake = [{ x: 0, y: 0 }, { x: step, y: 0 }, { x: step * 2, y: 0 }]
        this.#canvasSize = canvasSize
        this.#timer = null
        this.#spead = 100
        this.#currentDirection = 'right'
        this.#level = 1
        this.#target = null
    }

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

        this.#snake.push(nextStep);
        this.#snake.shift();
    }

    changeDirection(newDirection: Direction) {
        const curDirection = this.#currentDirection;
        if(curDirection === 'right' && newDirection === 'left') return;
        if(curDirection === 'left' && newDirection === 'right') return;
        if(curDirection === 'up' && newDirection === 'down') return;
        if(curDirection === 'down' && newDirection === 'up') return;

        this.#currentDirection = newDirection;
    }

    start() {
        if(this.#timer !== null) return;
        this.#calcTarget();
        this.#paintTarget();
        this.#timer = setInterval(() => {
            this.#calcNextStep();
            this.#refreshCanvas();
            this.#paintTarget();
            this.#paintSnake();
        }, this.#spead);
    }

    stop() {
        if(!this.#timer) return;
        clearInterval(this.#timer);
        this.#timer = null;
    }

    get getLevel() {
        return this.#level;
    }
}

const snakeGame = new Snake(50, 2000);
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

////

const leftButton = document.getElementById('left');
leftButton?.addEventListener('click', () => {
    snakeGame.changeDirection('left');
});
const rightButton = document.getElementById('right');
rightButton?.addEventListener('click', () => {
    snakeGame.changeDirection('right');
});
const upButton = document.getElementById('up');
upButton?.addEventListener('click', () => {
    snakeGame.changeDirection('up');
});
const downButton = document.getElementById('down');
downButton?.addEventListener('click', () => {
    snakeGame.changeDirection('down');
});