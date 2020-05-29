import sqlite3

CREATE_QUERY = """
    CREATE TABLE IF NOT EXISTS timeline_events
        (id int PRIMARY KEY,
            title text NOT NULL,
            description text,
            start text NOT NULL,
            end text
        )
"""

def execute_query(conn, query, params=None):
    cur = conn.cursor()
    result = cur.execute(query)
    conn.commit()
    return result


def create_timeline_event(conn, event):
    cur = conn.cursor()
    title = event.get('title', '')
    description = event.get('description', '')
    start = event.get('start', '')
    end = event.get('end', '')
    query = "INSERT INTO timeline_events (title, description, start, end) VALUES (?, ?, ?, ?)"
    res = cur.execute(query, (title, description, start, end))
    return res.lastrowid

def get_all_timeline_events(conn):
    res = execute_query(conn, "SELECT * FROM timeline_events")
    return [event for event in res]

def drop_table(cur, table_name):
    query = "DROP TABLE {}".format(table_name)
    cur.execute(query)


if __name__ == "__main__":
    conn = sqlite3.connect('timeline.db')
    cur = conn.cursor()
    cur.execute(CREATE_QUERY)
    conn.commit()
    conn.close()