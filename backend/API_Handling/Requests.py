from flask import request

@app.rout('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username']
                       request.form['password']):
        return log_the_user_in(request.form['username'])
    else:
        error = 'Invalid username/password'

        #below is used if the request was GET
        return render_template('login.html', error=error)