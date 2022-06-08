"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Snake_instances, _Snake_level, _Snake_step, _Snake_snake, _Snake_context, _Snake_canvasSize, _Snake_timer, _Snake_spead, _Snake_currentDirection, _Snake_target, _Snake_calcTarget, _Snake_paintTarget, _Snake_refreshCanvas, _Snake_paintSnake, _Snake_calcNextStep;
class Snake {
    constructor(step, canvasSize) {
        _Snake_instances.add(this);
        _Snake_level.set(this, void 0);
        _Snake_step.set(this, void 0);
        _Snake_snake.set(this, void 0);
        _Snake_context.set(this, void 0);
        _Snake_canvasSize.set(this, void 0);
        _Snake_timer.set(this, void 0);
        _Snake_spead.set(this, void 0);
        _Snake_currentDirection.set(this, void 0);
        _Snake_target.set(this, void 0);
        __classPrivateFieldSet(this, _Snake_step, step, "f");
        __classPrivateFieldSet(this, _Snake_context, null, "f");
        __classPrivateFieldSet(this, _Snake_snake, [{ x: 0, y: 0 }, { x: step, y: 0 }, { x: step * 2, y: 0 }], "f");
        __classPrivateFieldSet(this, _Snake_canvasSize, canvasSize, "f");
        __classPrivateFieldSet(this, _Snake_timer, null, "f");
        __classPrivateFieldSet(this, _Snake_spead, 100, "f");
        __classPrivateFieldSet(this, _Snake_currentDirection, 'right', "f");
        __classPrivateFieldSet(this, _Snake_level, 1, "f");
        __classPrivateFieldSet(this, _Snake_target, null, "f");
    }
    paintCanvas(width) {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', __classPrivateFieldGet(this, _Snake_canvasSize, "f").toString());
        canvas.setAttribute('height', __classPrivateFieldGet(this, _Snake_canvasSize, "f").toString());
        canvas.style.backgroundColor = 'lightblue';
        canvas.style.width = width;
        canvas.style.aspectRatio = '1 / 1';
        __classPrivateFieldSet(this, _Snake_context, canvas.getContext('2d'), "f");
        return canvas;
    }
    changeDirection(newDirection) {
        const curDirection = __classPrivateFieldGet(this, _Snake_currentDirection, "f");
        if (curDirection === 'right' && newDirection === 'left')
            return;
        if (curDirection === 'left' && newDirection === 'right')
            return;
        if (curDirection === 'up' && newDirection === 'down')
            return;
        if (curDirection === 'down' && newDirection === 'up')
            return;
        __classPrivateFieldSet(this, _Snake_currentDirection, newDirection, "f");
    }
    start() {
        if (__classPrivateFieldGet(this, _Snake_timer, "f") !== null)
            return;
        __classPrivateFieldGet(this, _Snake_instances, "m", _Snake_calcTarget).call(this);
        __classPrivateFieldGet(this, _Snake_instances, "m", _Snake_paintTarget).call(this);
        __classPrivateFieldSet(this, _Snake_timer, setInterval(() => {
            __classPrivateFieldGet(this, _Snake_instances, "m", _Snake_calcNextStep).call(this);
            __classPrivateFieldGet(this, _Snake_instances, "m", _Snake_refreshCanvas).call(this);
            __classPrivateFieldGet(this, _Snake_instances, "m", _Snake_paintTarget).call(this);
            __classPrivateFieldGet(this, _Snake_instances, "m", _Snake_paintSnake).call(this);
        }, __classPrivateFieldGet(this, _Snake_spead, "f")), "f");
    }
    stop() {
        if (!__classPrivateFieldGet(this, _Snake_timer, "f"))
            return;
        clearInterval(__classPrivateFieldGet(this, _Snake_timer, "f"));
        __classPrivateFieldSet(this, _Snake_timer, null, "f");
    }
    get getLevel() {
        return __classPrivateFieldGet(this, _Snake_level, "f");
    }
}
_Snake_level = new WeakMap(), _Snake_step = new WeakMap(), _Snake_snake = new WeakMap(), _Snake_context = new WeakMap(), _Snake_canvasSize = new WeakMap(), _Snake_timer = new WeakMap(), _Snake_spead = new WeakMap(), _Snake_currentDirection = new WeakMap(), _Snake_target = new WeakMap(), _Snake_instances = new WeakSet(), _Snake_calcTarget = function _Snake_calcTarget() {
    const random = () => Math.floor(Math.random() * (__classPrivateFieldGet(this, _Snake_canvasSize, "f") / __classPrivateFieldGet(this, _Snake_step, "f"))) * __classPrivateFieldGet(this, _Snake_step, "f");
    __classPrivateFieldSet(this, _Snake_target, { x: random(), y: random() }, "f");
}, _Snake_paintTarget = function _Snake_paintTarget() {
    var _a, _b;
    if (!__classPrivateFieldGet(this, _Snake_context, "f") || !__classPrivateFieldGet(this, _Snake_target, "f"))
        return;
    __classPrivateFieldGet(this, _Snake_context, "f").fillStyle = 'black';
    __classPrivateFieldGet(this, _Snake_context, "f").fillRect((_a = __classPrivateFieldGet(this, _Snake_target, "f")) === null || _a === void 0 ? void 0 : _a.x, (_b = __classPrivateFieldGet(this, _Snake_target, "f")) === null || _b === void 0 ? void 0 : _b.y, __classPrivateFieldGet(this, _Snake_step, "f"), __classPrivateFieldGet(this, _Snake_step, "f"));
}, _Snake_refreshCanvas = function _Snake_refreshCanvas() {
    if (!__classPrivateFieldGet(this, _Snake_context, "f"))
        return;
    __classPrivateFieldGet(this, _Snake_context, "f").fillStyle = 'lightblue';
    __classPrivateFieldGet(this, _Snake_context, "f").fillRect(0, 0, __classPrivateFieldGet(this, _Snake_canvasSize, "f"), __classPrivateFieldGet(this, _Snake_canvasSize, "f"));
}, _Snake_paintSnake = function _Snake_paintSnake() {
    __classPrivateFieldGet(this, _Snake_snake, "f").forEach((point, i) => {
        if (!__classPrivateFieldGet(this, _Snake_context, "f"))
            return;
        if (i === __classPrivateFieldGet(this, _Snake_snake, "f").length - 1) {
            //paint snake head
            __classPrivateFieldGet(this, _Snake_context, "f").fillStyle = 'red';
            __classPrivateFieldGet(this, _Snake_context, "f").fillRect(point.x, point.y, __classPrivateFieldGet(this, _Snake_step, "f"), __classPrivateFieldGet(this, _Snake_step, "f"));
        }
        else {
            //paint snake body
            __classPrivateFieldGet(this, _Snake_context, "f").fillStyle = 'blue';
            __classPrivateFieldGet(this, _Snake_context, "f").fillRect(point.x, point.y, __classPrivateFieldGet(this, _Snake_step, "f"), __classPrivateFieldGet(this, _Snake_step, "f"));
        }
    });
}, _Snake_calcNextStep = function _Snake_calcNextStep() {
    const canvasSize = __classPrivateFieldGet(this, _Snake_canvasSize, "f");
    const step = __classPrivateFieldGet(this, _Snake_step, "f");
    const point = __classPrivateFieldGet(this, _Snake_snake, "f")[__classPrivateFieldGet(this, _Snake_snake, "f").length - 1];
    let nextStep = { x: 0, y: 0 };
    switch (__classPrivateFieldGet(this, _Snake_currentDirection, "f")) {
        case 'left':
            nextStep = point.x === 0 ? Object.assign(Object.assign({}, point), { x: canvasSize - step }) : Object.assign(Object.assign({}, point), { x: point.x - step });
            break;
        case 'right':
            nextStep = point.x === canvasSize - step ? Object.assign(Object.assign({}, point), { x: 0 }) : Object.assign(Object.assign({}, point), { x: point.x + step });
            break;
        case 'up':
            nextStep = point.y === 0 ? Object.assign(Object.assign({}, point), { y: canvasSize - step }) : Object.assign(Object.assign({}, point), { y: point.y - step });
            break;
        case 'down':
            nextStep = point.y === canvasSize - step ? Object.assign(Object.assign({}, point), { y: 0 }) : Object.assign(Object.assign({}, point), { y: point.y + step });
            break;
    }
    ;
    __classPrivateFieldGet(this, _Snake_snake, "f").push(nextStep);
    __classPrivateFieldGet(this, _Snake_snake, "f").shift();
};
const snakeGame = new Snake(50, 2000);
const game = snakeGame.paintCanvas('25%');
const root = document.getElementById('root');
root === null || root === void 0 ? void 0 : root.appendChild(game);
const startButton = document.getElementById('start');
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', () => {
    snakeGame.start();
});
const stopButton = document.getElementById('stop');
stopButton === null || stopButton === void 0 ? void 0 : stopButton.addEventListener('click', () => {
    snakeGame.stop();
});
////
const leftButton = document.getElementById('left');
leftButton === null || leftButton === void 0 ? void 0 : leftButton.addEventListener('click', () => {
    snakeGame.changeDirection('left');
});
const rightButton = document.getElementById('right');
rightButton === null || rightButton === void 0 ? void 0 : rightButton.addEventListener('click', () => {
    snakeGame.changeDirection('right');
});
const upButton = document.getElementById('up');
upButton === null || upButton === void 0 ? void 0 : upButton.addEventListener('click', () => {
    snakeGame.changeDirection('up');
});
const downButton = document.getElementById('down');
downButton === null || downButton === void 0 ? void 0 : downButton.addEventListener('click', () => {
    snakeGame.changeDirection('down');
});
