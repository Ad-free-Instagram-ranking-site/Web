# Web


WebPage For best instagram restaurants.

Technology used for webpage
Language : css, html, javascript(aws - sdk v2)
Framework : nodejs, express js (for web server side)

***** on server side *****
Install Libraries for javascripts on server side.

This guide is for ubuntu, debian OS using bash shell 

sudo apt-get update
sudo apt-get install npm

npm init -y

npm install aws-sdk@2.x.x
npm install  express
npm install  dotenv
npm install  cors

vi ~/.bash_profile or ~/.bashrc
export AWS_SECRET_ACCESS_KEY= ‘your AWS_SECRET_ACCESS_KEY’
export AWS_ACCESS_KEY_ID= ‘your AWS_ACCESS_KEY_ID’
source ~/.bash_profile or ~/.bashrc

Change in-bound-rule for EC2 
TCP - custom select port, external ip for 0.0.0.0

when every preparation is end. put this command

node “your_server.js”

****** on the WebPage******
open ‘index.html’ while running ‘your_server.js’

click nav-item from 연남 to 노원 -> brings 10 best restaruants defalut ‘weekly ranking’
click buttons from ‘Monday’ to ‘Weekly’ and click nav-bar again. The result will change if your selection is different from previous.

