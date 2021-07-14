# HSAD internship project "BUY_FROM_HOME"

## Installation

Make sure your system has the following softwares installed for this app to work properly.

* `node` & `npm`
* `mongodb`

> To install node and mongodb please refer the almighty google :)

After installing the above softwares, do the following: 

* clone this repository or download zip file 
```
# To clone:
    git clone https://github.com/Nirbhay-Gaur/HSAD-buy_from_home.git
```
* Change directory to HSAD-buy_from_home/ and install node packages
```
cd HSAD-buy_from_home/ 
npm install
```
* Assuming that mongodb is configured to run on 27017 port, to start the node server: 
```
node index.js
```

* If everything went well, you will view the following in the logs:
```
Server has started...
Database connected successfully
```
> Note: Additionally, you can install pm2 package to monitor our node server, To install pm2 globally: `npm install -g pm2` and to start the server using pm2: `pm2 start index.js`. Also `pm2 monit` can be use to  monitor the server and get stats.

