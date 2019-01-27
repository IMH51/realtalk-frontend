# Realtalk - A web-based chat app built with Rails API and Vanilla JS!

RealTalk was built as a Module 3 Project at Flatiron School in collaboration with [Lingy94](http://github.com/Lingy94). The brief was to build an app with a Rails API backend and a Javscript based frontend without using any libraries. The backend Rails API is hosted [here](https://github.com/Lingy94/realtalk-server)

Users can create a basic account with a profile picture, search for other existing RealTalk users and start chats with them. If two users run this frontend on two separate browsers and both connect to the same instance of realtalk-server they will be able to talk to each other in real time.

Strech goals that we were planning to add before running out of time included:

  - Ability to receive notifications if someone sends you a message and you aren't currently chatting to them
  - Ability to delete conversations and messages within them
  - Add time/date stamps to individual messages
  - Add an emoji selector box to the message input text area

Whilst there are technologies out there that we could have used to build this app to a professional level, learning to build this level of functionality with vanilla JS was a great learning exercise and really helped solidify the fundamentals of Javascript.

** PLEASE NOTE **
-----------------

- For people wishing to test the realtime functionality of RealTalk, if you aren't running the frontend of the server on your machine, you will need to replace the baseUrl constant link at top of the 'script.js' file with the IP address of the machine the server is running on, plus the Rails port (normally :3000)

Example of RealTalk frontend in the browser:

![RealTalk Chat App Example Screnshot](images/realtalk-screenshot.png)
