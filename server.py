from flask import Flask, request, send_from_directory

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
            static_url_path='',
            static_folder='static/')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

if __name__ == "__main__":
    print('hello')
    app.run()
