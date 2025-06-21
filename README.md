# event-management

event management app
USER TABLE
email, username, password, name, role

EVENT TABLE
event_name, event_date, location, description

EVENT SEATING
EVENT_ID, seat_type, seat_count

Missed
unit test

to run the project
npm install
npm start

#Sample .env
PORT=5000
env = dev
mongo_uri=
AccessKey=EventAcessKey
SecretKey=EventSecretkey  
JWT_SECRET=JWTSecret
JWT_EXPIRATION=1h
PASSWORD_SALT_ROUNDS=10
