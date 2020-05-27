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

FAKE_TIMELINE = [
    {
        'title': 'first job',
        'start': 0,
        'end': 1
    },
    {
        'title': 'second job',
        'start': 5,
        'end': 10
    }
]

def create_timeline_event(cur, event):
    title = event.get('title', '')
    description = event.get('description', '')
    start = event.get('start', '')
    end = event.get('end', '')
    query = "INSERT INTO timeline_events (title, description, start, end) VALUES (?, ?, ?, ?)"
    res = cur.execute(query, (title, description, start, end))
    return res.lastrowid


if __name__ == "__main__":
    conn = sqlite3.connect('timeline.db')

    cur = conn.cursor()
    cur.execute("DROP TABLE timeline_events")
    cur.execute(CREATE_QUERY)
    create_timeline_event(cur, FAKE_TIMELINE[0])
    conn.commit()
    conn.close()