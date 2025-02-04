import sqlite3

def delete_users_table():
    try:
        # Connect to the database
        conn = sqlite3.connect("user.db")
        cursor = conn.cursor()

        # Drop the users table
        cursor.execute("DROP TABLE IF EXISTS courses")

        # Commit the changes
        conn.commit()
        print("courses table deleted successfully.")

    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    delete_users_table()
