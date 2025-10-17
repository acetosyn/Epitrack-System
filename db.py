# ===========================================
# EPITRACK — Database Utility Module (v2)
# ===========================================

import sqlite3
import os
from dotenv import load_dotenv

load_dotenv()
DB_PATH = "database.db"


# ----------------------------
# INITIALIZE DATABASE
# ----------------------------
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    """)
    conn.commit()

    # Define roles
    roles = [
        ("Admin", "ADMIN"),
        ("HOP", "HOP"),
        ("Doctor", "DOCTOR"),
        ("Pharmacy", "PHARMACY"),
        ("Inventory", "INVENTORY"),
        ("Lab", "LAB"),
        ("Nursing Care", "NURSING"),
        ("Customer Care", "CUSTOMER"),
        ("Staff", "STAFF"),
    ]

    # Load users from environment
    users = []
    for role_name, key in roles:
        username = os.getenv(f"{key}_USER")
        password = os.getenv(f"{key}_PASS")
        if username and password:
            users.append((username, password, role_name))

    # Insert only if DB is empty
    cur.execute("SELECT COUNT(*) FROM users")
    count = cur.fetchone()[0]
    if count == 0:
        cur.executemany(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)", users
        )
        conn.commit()

    conn.close()
    print("✅ Database initialized successfully.")


# ----------------------------
# VERIFY LOGIN CREDENTIALS
# ----------------------------
def verify_user(username, password, role):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM users WHERE username=? AND password=? AND role=?",
        (username, password, role),
    )
    user = cur.fetchone()
    conn.close()
    return user
