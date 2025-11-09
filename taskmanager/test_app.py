import unittest
import json
from app import app, db
from models import User, Task


class TaskManagerTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        self.app = app.test_client()

        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.drop_all()

    def test_user_registration(self):
        response = self.app.post('/api/register',
                                 json={'username': 'testuser', 'email': 'test@test.com', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data)
        self.assertEqual(data['user']['username'], 'testuser')

    def test_duplicate_username(self):
        self.app.post('/api/register',
                      json={'username': 'testuser', 'email': 'test1@test.com', 'password': 'testpass'})
        response = self.app.post('/api/register',
                                 json={'username': 'testuser', 'email': 'test2@test.com', 'password': 'testpass'})
        self.assertEqual(response.status_code, 400)


if __name__ == '__main__':
    unittest.main()
