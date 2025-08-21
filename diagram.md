```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "", "date": "2025-08-20T19:49:17.003Z", ...}]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

    Note left of browser: Form is submited, /new_note post request triggers 'onreadystatechange()' event listener

    browser->> Sends a 302 PUT request (url redirect) which reloads the css js and json and then 'pushes' the additional data onto the end of the notes array
    activate server
    server-->>browser: [[Original css, js, josn} + {PUT request payload tacked onto the json}]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
