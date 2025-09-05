# Writer-Diary-App
Web applications that allows users to add diary-like entries for their writing projects

## Full Installation

1. Create new directory for installation
```sh
mkdir writer-diary-app
cd writer-diary-app
```

2. Clone the repository
```sh
git clone https://github.com/DylanKane17/Writer-Diary-App.git
```

3. Run the backend API (Flask)
```sh
python -m venv venv
source venv/bin/activate
pip install firebase_admin flask flask_cors python_dotenv
```

4. Run the frontend (React & Vite)
```sh
cd client
npm install
npm run dev
```
Frontend runs at http://localhost:5173 and connects to the backend API.

## Installation Access
1. Main Interface: http://localhost:5173
2. Server Access: http://localhost:5000

## License
[MIT](https://choosealicense.com/licenses/mit/)
