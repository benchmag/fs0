'''mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /exampleapp/notes
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET /exampleapp/main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET /exampleapp/main.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Note right of Browser: Browser starts executing JavaScript<br>and fetches JSON data from the server

    Browser->>Server: GET /exampleapp/data.json
    activate Server
    Server-->>Browser: JSON data<br>[{"content": "...", "date": "2025-08-20T19:49:17.003Z"}, ...]
    deactivate Server

    Note right of Browser: JavaScript callback renders the notes on the page

    Note left of Browser: User submits the form

    Browser->>Server: POST /exampleapp/new_note<br>with form data
    activate Server
    Server-->>Browser: 302 Redirect
    deactivate Server

    Note right of Browser: Browser follows redirect<br>and reloads the page

    Browser->>Server: GET /exampleapp/notes
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET /exampleapp/main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET /exampleapp/main.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Browser->>Server: GET /exampleapp/data.json
    activate Server
    Server-->>Browser: Updated JSON data<br>(includes new note)
    deactivate Server

    Note right of Browser: JavaScript callback renders updated notes
'''
