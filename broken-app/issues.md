# Broken App Issues

(1) The Axios call to the Github API is a mapped -async- function. Even though there is a -wait- inside the mapped function, the result is still going to be a list of promises. Better to just expect the Axios calls to explicitly return list of promises and then resolve them (in parallel) with -Promise.all-.

(2) Then, the route function needs to be -async- since we need to "await Promise.all" to wait for all the promises to be resolved.

(3) 'catch' needs an error argument - should be 'catch (err)'.

(4) Need "app.use(express.json())" in order to get results from Github API in JSON format.

(5) The variable names 'd', 'r', and 'out' could use some help. I've substituted 'devID', 'results', and 'data'.

(6) Nice to have app be explicit about which port to listen on, using variable 'portNum' and stating explicitly that app is listening on that port, otherwise it's hard for the user to know if the app is actually listening or just stuck somewhere.