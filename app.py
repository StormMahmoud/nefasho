from flask import Flask, render_template, request, redirect, url_for, flash
from flask import session as login_session
import pyrebase

app = Flask(__name__, template_folder='Green', static_folder='Green/assets')
app.config['SECRET_KEY'] = 'super-secret-key'

config = {
  "apiKey": "AIzaSyDqrCUZyCGyVdJR76JP9fvBNhR3jVdqudw",
  "authDomain": "nefashotfinalproject.firebaseapp.com",
  "projectId": "nefashotfinalproject",
  "storageBucket": "nefashotfinalproject.appspot.com",
  "messagingSenderId": "180211353490",
  "appId": "1:180211353490:web:10cd79faa0dac4bcc1634b",
  "measurementId": "G-S60KS1WT93",
  "databaseURL": "https://nefashotfinalproject-default-rtdb.europe-west1.firebasedatabase.app/"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/feedback', methods = ['GET', 'POST'])
def feedback():
	if request.method == 'POST':
		return render_template("feedback.html")
	return render_template('feedback.html')


@app.route('/team')
def about():
	return render_template('index2.html')

@app.route('/hebrew')
def hebrew():
	return render_template('indexhebrew.html')		

@app.route('/teamhebrew')
def hebrewteam():
	return render_template('hebrew2.html')	

if __name__ == '__main__':
    app.run(debug=True)