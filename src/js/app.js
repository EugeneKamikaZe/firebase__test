import {Question} from './components/question'
import {createModal, isValid} from './components/utils'
import {authWithEmailAndPass, getAuthForm} from './components/auth'
import '../scss/main.scss'

const form = document.getElementById('form')
const modalBtn = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true
        // Async request to server
        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
        })
    }
}

function openModal() {
    createModal('Auth', getAuthForm())
    document.getElementById('auth-form').addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('#enter-btn')
    const email = event.target.querySelector('#email').value
    const pass = event.target.querySelector('#pass').value

    btn.disabled = true
    authWithEmailAndPass(email, pass)
        .then(Question.fetch)
        // === .then(token => {
        //     return Question.fetch(token)
        // })
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Error!', content)
    } else {
        createModal('List of questions', Question.listToHTML(content))
    }
}