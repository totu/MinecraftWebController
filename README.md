Minecraft Web Controller v.1.1

MWC is super simple Node.js based application that uses 
Socket.io and Express to launch and command your Minecraft servers.

Credit where credit is due: the idea for this project came from Joe Zim 
(https://github.com/joezimjs) he made a little video showcasing his version 
some time back, but he hasn't shared it for reason or another, so I decided 
to make my own and slap it up on GitHub. If it wasn't for Zim I may have
never tried doing something like this.

---------------------------------

Installation & configuration:

1. You need node.js (http://nodejs.org) for this, for node.js installation prefer
   to their own documentation.
   
2. You need to install socket.io and express via npm:
	`npm install socket.io express`
	
3. Then you need to copy `app.js`, `serverlist.js` and `index.html` to desired folder.

4. Then you need to configure everything. Change port numbers in `app.js` and `index.html`
   Also be sure to change IP address in `index.html` to your servers IP address.
   Then add your servers to `serverlist.js`.

5. Lastly just run `app.js` with `node.js` and direct your browser to your desired IP and port.

---------------------------------

Need to submit bugs? Feature requests? Just want to comment?
topi.tuulensuu@student.hamk.fi

You can also keep tabs on me through my website:
http://morphling.dotgeek.org/

This application is served 'AS-IS' without any warranties, I`m not responsible for your data if it gets corrupted nor responsible for any damages and by downloading this repo or using my code you understand this.
You can freely modify and redistribute this code