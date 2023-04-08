// Variables of App
let tasks = []
let time = 0
let timer = null
let current = 0
let timerBreak = null
//References of Document
const bAdd = document.querySelector('#bAdd')
const itTask = document.querySelector('#itTask')
const form = document.querySelector('#form')
const formDiv = document.querySelector('#form-div')
const taskName = document.querySelector('#time #taskName')
//Events to init app
renderTime()
renderTask()
//Events Form
form.addEventListener('submit', event => {
    event.preventDefault()
    if (itTask.value !== '') {
        createTask(itTask.value)
        itTask.value = ''
        renderTask()
    }
})
//functions
function createTask(value) {
    console.log(tasks, value)
    if (tasks.length === 0) {
        const newTask = {
            id: (Math.random() * 100).toString(36).slice(2),
            title: value,
            completed: false
        }
        tasks.unshift(newTask)
    }
    else if (tasks.length == 1 && (timer != null || timerBreak != null)) {
        alert('Ey!!! You have a current task, please finish it and then create a new activity')
    }


    console.log(tasks, value)
}
function renderTask() {
    const html = tasks.map(task => {
        return `
                <div class="task">
                    <div class="completed"> 
                    ${task.completed ? '' : `<button class="start-button" data-id="${task.id}">Start</button>`} 
                    ${(task.completed && timerBreak == null) ? `<button class="done-button" data-id="${task.id}"> Complete !</button>` : ''} 
                    </div>
                    <div class="title">${task.title}</div>  
                </div > `
    })
    const taskContainer = document.querySelector('#tasks')
    taskContainer.innerHTML = html.join('')
    const startButtons = document.querySelectorAll('.task .start-button')
    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!timer) {
                const id = button.getAttribute('data-id')
                startButtonHandler(id)
                button.textContent = 'In progress...'
            }
        })
    })
}

function startButtonHandler(id) {
    time = (0.25) * 60
    current = id
    const taskIndex = tasks.findIndex(task => task.id = id)
    const taskName = document.querySelector('#time #taskName')
    taskName.innerHTML = `<h2 style="margin: 10px;color:#003366;"> ${tasks[taskIndex].title}</h2>`
    renderTime()
    timer = setInterval(() => {
        timerHandler(id)
        enableOrDisableAddTask(false)
    }, 1000)
}
function enableOrDisableAddTask(enable) {
    if (!enable) formDiv.style.display = 'none'
    else formDiv.style.display = 'flex'
}

function timerHandler(id = null) {
    time--
    renderTime()
    if (time == 0) {
        markcompleted(id)
        clearInterval(timer)
        renderTask()
        startBreak()
        timer = null
    }
}

function startBreak() {
    time = (0.25) * 60
    taskName.innerHTML   = `<h2> Break !! </h2>`
    renderTime()
    timerBreak = setInterval(timerBreakHandler, 1000)
}

function timerBreakHandler() {
    time--
    renderTime()
    if (time == 0) {
        clearInterval(timerBreak)
        current = null
        taskName.textContent = ''
        renderTime()
        timer = null
        cleanArrayTasks()
        timerBreak = null
        enableOrDisableAddTask(true)
    }
}

function cleanArrayTasks() {
    tasks = []
    renderTask()
    renderTime()
}

function markcompleted(id) {
    const taskIndex = tasks.findIndex(task => task.id = id)
    tasks[taskIndex].completed = true
}

function renderTime() {
    const timeDiv = document.querySelector('#time #value')
    const minutes = parseInt(time / 60)
    const seconds = parseInt(time % 60)

    timeDiv.textContent = `
        ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} `
}
