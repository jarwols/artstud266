while true
do 
    nodemon app.js & PID=$!
    sleep 6
    kill $PID
done