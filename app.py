from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

# Secret key for session
app.secret_key = "studysense_secret_key"


# =========================
# HOME
# =========================

@app.route('/')
def home():
    return render_template('index.html')


# =========================
# COURSES
# =========================

@app.route('/courses')
def courses():

    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('courses.html')


# =========================
# DASHBOARD
# =========================

@app.route('/dashboard')
def dashboard():

    if not session.get('logged_in'):
        return redirect(url_for('login'))

    user = {
        "name": session.get('user_name', 'Username')
    }

    return render_template(
        "dashboard.html",
        user=user,
        overall_progress=0,
        total_courses=0,
        quizzes_completed=0
    )


# =========================
# PROJECTS
# =========================

@app.route('/projects')
def projects():

    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('projects.html')


# =========================
# PROFILE
# =========================

@app.route('/profile')
def profile():

    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('profile.html')


# =========================
# LOGIN
# =========================

@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        email = request.form.get('email')
        password = request.form.get('password')

        # Temporary login for testing
        # Change these later when you connect your database

        if email == "test@gmail.com" and password == "123456":

            session['logged_in'] = True
            session['user_name'] = "Test User"
            session['email'] = email

            return redirect(url_for('dashboard'))

        else:
            return render_template(
                'login.html',
                error="Invalid email or password"
            )

    return render_template('login.html')


# =========================
# LOGOUT
# =========================

@app.route('/logout')
def logout():

    session.clear()

    return redirect(url_for('home'))


# =========================
# SIGNUP
# =========================

@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/course/python')
def python_course():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('course_detail.html')


@app.route('/lesson/python/1')
def python_lesson_1():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('python/lesson.html')


@app.route('/lesson/python/2')
def python_lesson_2():
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('python/lesson2.html')

@app.route('/lesson/python/3')
def python_lesson_3():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('python/lesson3.html')

@app.route('/lesson/python/4')
def python_lesson_4():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('python/lesson4.html')

@app.route('/lesson/python/5')
def python_lesson_5():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('python/lesson5.html')

@app.route('/lesson/python/6')
def python_lesson_6():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('python/lesson6.html')

@app.route('/lesson/python/7')
def python_lesson_7():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('python/lesson7.html')



@app.route('/lesson/python/8')
def python_lesson_8():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('python/lesson8.html')


@app.route('/lesson/python/9')
def python_lesson_9():
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('python/lesson9.html')

@app.route('/lesson/python/10')
def python_lesson_10():
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('python/lesson10.html')

@app.route('/lesson/python/11')
def python_lesson_11():
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('python/lesson11.html')

@app.route('/lesson/python/12')
def python_lesson_12():
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('python/lesson12.html')

@app.route("/ai-tutor")
def ai_tutor():
    return render_template("ai_tutor.html")


@app.route('/quiz')
def quiz():
    return render_template('quiz.html')


# =========================
# SETTINGS
# =========================

@app.route('/settings')
def settings():

    if not session.get('logged_in'):
        return redirect(url_for('login'))

    return render_template('settings.html')

# =========================
# RUN APP
# =========================

if __name__ == '__main__':
    app.run(debug=True)