from collections import namedtuple
import sqlite3

TimelineEvent = namedtuple('TimelineEvent', ['title', 'description', 'start', 'end'])

CREATE_QUERY = """
    CREATE TABLE IF NOT EXISTS timeline_events
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            start TEXT NOT NULL,
            end TEXT
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

def update_timeline_event(conn, id, event):
    cur = conn.cursor()
    title = event.get('title', '')
    description = event.get('description', '')
    start = event.get('start', '')
    end = event.get('end', '')
    query = """UPDATE timeline_events
               SET title = ?,
                   description = ?,
                   start = ?,
                   end = ?
               WHERE ID = ?
            """
    cur.execute(query, (title, description, start, end, id))
    return event

def delete_timeline_event(conn, id):
    cur = conn.cursor()
    query = "DELETE FROM timeline_events WHERE ID = ?"
    cur.execute(query, (id, ))
    return True

def get_all_timeline_events(conn):
    res = execute_query(conn, "SELECT * FROM timeline_events")
    return [{
        'id': id,
        'title': title,
        'description': description,
        'start': start,
        'endDate': end
    } for (id, title, description, start, end) in res]

def drop_table(cur, table_name):
    query = "DROP TABLE {}".format(table_name)
    cur.execute(query)


if __name__ == "__main__":
    conn = sqlite3.connect('timeline.db')
    cur = conn.cursor()
    cur.execute(CREATE_QUERY)
    conn.commit()
    conn.close()