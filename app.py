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

@app.route('/addevent')
def addevent():
	return render_template('addevent.html')


@app.route('/arabic')
def arabic():
	return render_template('indexarabic.html')

@app.route('/feedback', methods = ['GET', 'POST'])
def applo():
	if request.method == 'POST':
		apple ={"Full Name":request.form['full_name'],"Email":request.form['email'],"Phone_Number":request.form['Phone_Number'],"city":request.form['city']}
		db.child("apple").push(apple)
		return render_template('feedback.html')
	return render_template('feedback.html')



@app.route('/add_event', methods=['GET','POST'])
def add_event():
  error=""
  if request.method=='POST':
    print(request.form['Title'])
    event={"Title":request.form['Title'],"Date":request.form['Date'],"Time":request.form['Time'], "Location":request.form['Location'],"Details":request.form['Details']}
    db.child("event").push(event)
    return redirect('calender4admin')
  return render_template("addevent.html")


@app.route('/calender', methods=['GET','POST'])
def calender():
  events=db.child("event").get().val()
  error=""
  if request.method =='POST':
    admin={"Username":request.form['username'], "Password":request.form['password']}
    try:
      username=request.form['username']
      password=request.form['password']
      if username=="adminentrance":
        if password=="123456":
          return redirect('calender4admin')
    except:
      error="authentication failed"
  return render_template("cala.html", events=events, count=0)


@app.route('/calender4admin', methods=['GET','POST'])
def calender4admin():
  events=db.child("event").get().val()
  return render_template("calaadmin.html", events=events, count=0)



















@app.route('/feedbackhebrew')
def feedback2():
	return render_template('feedback2.html')

@app.route('/form2', methods = ['GET', 'POST'])
def lol():
	return render_template('form2.html')


@app.route('/form', methods = ['GET', 'POST'])
def feedback():
	if request.method == 'POST':
		text= request.form['text']
		feedback={"text":request.form['text']}
		db.child("feedback").push(feedback)
		return render_template('form.html')
	return render_template('form.html')


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