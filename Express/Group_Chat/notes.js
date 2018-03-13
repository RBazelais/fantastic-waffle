/* 
TODO:
    1. Have the NodeJS server render views/index.ejs that has the html content for the client whenver the client requests "/"

    2. In the client codes, have a function that asks the user for their name and store this user inout in a variable called 'name'.

    3. Have the client EMIT 'got_a_new_user' and pass 'name' to the server.

    4. Have the server LISTEN for and event called 'got_a_new_user
        - when that event gets triggered, have the server BROADCAST AN EVENT called "new_user" to the CLIENTS with the [name of the new user]
        attached to this event.

    5. Have the client LISTEN for and event called 'new_user'
        - when this event gets triggered have the CLIENT render this information in JQuery somewhere in the html.

    6. Have the server LISTEN for an event called 'disconenct'
        - When this occurs, BROADCAST to all the CLIENTS an event 'disconnect_user with some data( name of the disconnected user)
        NOTE: we'll probably need to pass sessionID or something to identify the user
    
    7. Have the client LISTEN for an event 'disconnect_user'
        - When this gets triggered, have the client remove the propper JQuery box/ID
    
*/