# Flask Entry Point for EPITRACK
# This is a minimal Flask app for template rendering only

from flask import Flask, render_template

app = Flask(__name__)

# Routes
@app.route('/')
def dashboard():
    return render_template('dashboard.html')

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
    return render_template('dashboard.html')  # Placeholder

@app.route('/operations')
@app.route('/operations/requests')
def operations():
    return render_template('dashboard.html')  # Placeholder

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
