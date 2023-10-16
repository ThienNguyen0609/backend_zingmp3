import path from 'path';
import express from 'express'

const confidViewEngine = (app) => {
    app.set('views', path.join('./src', 'views')) // specify the views directory
    app.set('view engine', 'ejs')

    // Parse URL-encoded bodies (as sent by HTML forms)
    app.use(express.urlencoded());

    // Parse JSON bodies (as sent by API clients)
    app.use(express.json());

    // set up static file: image, css
    app.use(express.static(path.join('./src', 'public')))
}

export default confidViewEngine
