# AI/main.py

from app.streamlit_app import main as streamlit_main
from app.flask_app import app as flask_app

if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "streamlit":
        streamlit_main()
    else:
        flask_app.run(host='0.0.0.0', port=8000, debug=True)
