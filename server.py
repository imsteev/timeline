from flask import Flask, jsonify, request, send_from_directory

import db
import sqlite3

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
            static_url_path='',
            static_folder='static/')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/timeline_events', methods=['GET'])
def get_timeline_events():
    with sqlite3.connect('timeline.db') as conn:
        events = db.get_all_timeline_events(conn)
        return jsonify(events)

@app.route('/api/timeline_events', methods=['POST'])
def create_timeline_event():
    data = request.json
    with sqlite3.connect('timeline.db') as conn:
        id = db.create_timeline_event(conn, data)
        conn.commit()
        return jsonify({'id': id})

@app.route('/api/timeline_events/<int:id>', methods=['PUT'])
def update_timeline_event(id):
    data = request.json
    with sqlite3.connect('timeline.db') as conn:
        id = db.update_timeline_event(conn, id, data)
        conn.commit()
        return jsonify({'id': id})

@app.route('/api/timeline_events/<int:id>', methods=['DELETE'])
def delete_timeline_event(id):
    with sqlite3.connect('timeline.db') as conn:
        id = db.delete_timeline_event(conn, id)
        conn.commit()
        return jsonify(True)

if __name__ == "__main__":
    app.run(debug=True)