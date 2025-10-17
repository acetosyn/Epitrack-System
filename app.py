# ===========================================
# EPITRACK — Flask Entry Point (Routes Only)
# ===========================================

from flask import Flask, render_template, request, redirect, jsonify, session
from db import verify_user, init_db
import os

app = Flask(__name__)
app.secret_key = "epitrack_secret_key"

# Initialize the database once when app starts
if not os.path.exists("database.db"):
    init_db()

# ----------------------------
# ROUTES
# ----------------------------

@app.route('/')
def root():
    # Redirect default entry to login page
    return redirect('/login')


@app.route('/login')
def login_page():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login_action():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    user = verify_user(username, password, role)

    if user:
        session["user"] = {"username": username, "role": role}
        return jsonify({"success": True, "message": f"Welcome {role}!"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})


@app.route('/dashboard')
def dashboard():
    if "user" not in session:
        return redirect('/login')
    return render_template('dashboard.html', user=session["user"])


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')


# ----------------------------
# DEPARTMENT ROUTES
# ----------------------------

@app.route('/pharmacy')
@app.route('/pharmacy/drugs')
def pharmacy():
    return render_template('department/pharmacy.html')


@app.route('/inventory')
@app.route('/inventory/store-items')
def inventory():
    return render_template('department/inventory.html')


@app.route('/admin')
@app.route('/admin/users')
def admin():
    return render_template('department/admin.html')


@app.route('/doctor')
def doctor():
    return render_template('department/doctor.html')


@app.route('/nursing')
def nursing():
    return render_template('department/nursing.html')


@app.route('/customer-care')
def customer_care():
    return render_template('department/customer_care.html')


@app.route('/operations')
@app.route('/operations/requests')
def operations():
    return render_template('department/operations.html')


# ----------------------------
# RUN APP
# ----------------------------
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
