from flask import Flask, render_template
import sqlite3

connection = sqlite3.connect("user.db")
cursor = connection.cursor()
# Create a table with the name users
cursor.execute(
    "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, admin BOOLEAN NOT NULL DEFAULT FALSE)"
)
cursor.execute(
    "INSERT INTO user (username, email, password, admin) VALUES ('admin', 'admin@gmail.com', '123456789', TRUE)"
)
# creating bookings table
cursor.execute(
    "CREATE TABLE IF NOT EXISTS bookings (booking_id INTEGER PRIMARY KEY, assesor_id INTEGER, username TEXT, date TEXT, time TEXT, FOREIGN KEY(username) REFERENCES user(username))"
)

# creating articles table
cursor.execute(
    "create table if not exists articles (articles_id INTEGER PRIMARY KEY, articles text, writer text, date TEXT, time TEXT)"
)


# create assesor table
cursor.execute(
    "CREATE TABLE IF NOT EXISTS assesor (id INTEGER PRIMARY KEY, name TEXT NOT NULL, is_available BOOLEAN NOT NULL DEFAULT TRUE)"
)
cursor.execute(
    "INSERT INTO assesor (name) VALUES ('Toby mathews')"
    
)
connection.commit()

connection.close()
