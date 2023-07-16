# Order Management System

This project is a monorepo consisting of a Vue frontend and a Django backend.

## Frontend Setup

1. Navigate to the `frontend` folder:

- cd frontend

2. Install the required dependencies:

- npm install

3. Start the development server:

- npm run dev

The Vue frontend should now be running at [http://localhost:5173](http://localhost:5173).

## Backend Setup

1. Open a new terminal and navigate to the `api` folder in the project root directory.

2. Create a virtual environment (recommended):

- python3 -m venv apienv

3. Activate the virtual environment:

- For Unix/Linux/macOS:

  ```
  source apienv/bin/activate
  ```

- For Windows:
  ```
  apienv\Scripts\activate
  ```

4. Install the required Python packages:

- pip install -r requirements.txt

5. Start the Django development server:

- python manage.py runserver

The Django backend should now be running at [http://127.0.0.1:8000](http://127.0.0.1:8000).

Remember to keep the frontend and backend servers running for the full functionality of the application.

## Additional Notes

- Ensure that you have Node.js and Python installed on your machine.
