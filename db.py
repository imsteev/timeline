import sqlite3

CREATE_QUERY = """
    CREATE TABLE expeiences
        (
            id int PRIMARY KEY,
            title text NOT NULL,
            description text
            start int NOT NULL,
            end int
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

def create_experience(experiences):
    q = ','.join(['(' ])

if __name__ == "__main__":
    conn = sqlite3.connect('timeline.db')
    c = conn.cursor()
    c.execute(CREATE_QUERY)
    conn.commit()
    conn.close()