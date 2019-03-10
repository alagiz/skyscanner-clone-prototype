CREATE TABLE flight (
  id INT NOT NULL PRIMARY KEY,
  departure TIMESTAMP,
  arrival TIMESTAMP,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  price DOUBLE PRECISION NOT NULL
 );

INSERT INTO flight (id,departure,arrival,origin,destination,price) VALUES
  (1,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (10,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (11,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (12,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (13,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (14,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (15,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (16,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (17,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (18,'2019-04-20T10:23:54','2019-04-20T12:23:54','Amsterdam','Milan',23.6),
  (2,'2019-04-21T10:23:54','2019-04-21T12:23:54','Amsterdam','Milan',25.6),
  (3,'2019-04-22T10:23:54','2019-04-22T12:23:54','Amsterdam','Milan',53.6),
  (4,'2019-04-23T10:23:54','2019-04-23T12:23:54','Amsterdam','Milan',63.6),
  (5,'2019-04-24T10:23:54','2019-04-24T12:23:54','Amsterdam','Milan',73.6),
  (6,'2019-04-25T10:23:54','2019-04-25T12:23:54','Amsterdam','Milan',13.6),
  (7,'2019-04-26T10:23:54','2019-04-26T12:23:54','Amsterdam','Milan',23.6),
  (8,'2019-04-22T10:00:01','2019-04-23T18:20:54','Eindhoven','London',56.8);