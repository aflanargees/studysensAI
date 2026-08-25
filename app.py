from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/dashboard')
def dashboard():

    user = {
        "name": "username"
    }

    return render_template(
        "dashboard.html",
        user=user,
        overall_progress=80,
        total_courses=12,
        quizzes_completed=46
    )

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)