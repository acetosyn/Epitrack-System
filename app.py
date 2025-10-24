# ==========================================================
# EPITRACK v4 — Unified Flask Entry Point (Auth + Dashboard)
# Combines V2 (routes, sessions) + V3 (dynamic JSON, APIs)
# ==========================================================

from flask import Flask, render_template, request, redirect, jsonify, session
from db import verify_user, init_db
import os, json

app = Flask(__name__)
app.secret_key = "epitrack_secret_key"

# ==========================================================
# DATABASE INITIALIZATION
# ==========================================================
if not os.path.exists("database.db"):
    init_db()

# ==========================================================
# JSON LOADER — for departments, stats, quick actions, users
# ==========================================================
def load_json(filename):
    path = os.path.join(app.static_folder, "data", filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

DEPARTMENTS = load_json("departments.json")
DASHBOARD_STATS = load_json("dashboard_stats.json")
QUICK_ACTIONS = load_json("quick_actions.json")
MOCK_USERS = load_json("users.json")

# ==========================================================
# ROUTES — AUTHENTICATION & SESSION
# ==========================================================
@app.route('/')
def root():
    if "user" not in session:
        return redirect('/login')
    return redirect('/dashboard')


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


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')


# ==========================================================
# DASHBOARD — Dynamic Rendering via JSON
# ==========================================================
@app.route('/dashboard')
def dashboard():
    if "user" not in session:
        return redirect('/login')
    return render_template(
        'dashboard.html',
        user=session["user"],
        departments=DEPARTMENTS,
        stats=DASHBOARD_STATS,
        quick_actions=QUICK_ACTIONS,
        mock_users=MOCK_USERS
    )


# ==========================================================
# DEPARTMENT & SUB-DEPARTMENT ROUTES
# ==========================================================
@app.route('/department/<dept_id>')
def department(dept_id):
    if "user" not in session:
        return redirect('/login')

    dept = DEPARTMENTS.get(dept_id)
    if not dept:
        return "Department not found", 404

    return render_template(
        'departments/department.html',
        user=session["user"],
        dept_id=dept_id,
        dept=dept,
        departments=DEPARTMENTS,
        mock_users=MOCK_USERS
    )


@app.route('/department/<dept_id>/<sub_dept>')
def sub_department(dept_id, sub_dept):
    if "user" not in session:
        return redirect('/login')

    dept = DEPARTMENTS.get(dept_id)
    if not dept or sub_dept not in dept.get("sub_depts", {}):
        return "Sub-department not found", 404

    return render_template(
        'departments/sub_department.html',
        user=session["user"],
        dept_id=dept_id,
        dept=dept,
        sub_dept=sub_dept,
        departments=DEPARTMENTS,
        mock_users=MOCK_USERS
    )

# ==========================================================
# STATIC DEPARTMENT ROUTES (Legacy Compatibility)
# ==========================================================
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


# ==========================================================
# API ENDPOINTS — JSON Data Access
# ==========================================================
@app.route('/api/departments')
def api_departments():
    return jsonify(DEPARTMENTS)

@app.route('/api/stats')
def api_stats():
    return jsonify(DASHBOARD_STATS)

@app.route('/api/actions')
def api_actions():
    return jsonify(QUICK_ACTIONS)

@app.route('/api/users')
def api_users():
    return jsonify(MOCK_USERS)


# ==========================================================
# APP ENTRY
# ==========================================================
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
