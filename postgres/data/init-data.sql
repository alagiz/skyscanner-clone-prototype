DROP TABLE IF EXISTS flight;

CREATE TABLE flight (
  id          SERIAL           NOT NULL PRIMARY KEY,
  departure   TIMESTAMP        NOT NULL,
  arrival     TIMESTAMP        NOT NULL,
  origin      VARCHAR(255)     NOT NULL,
  destination VARCHAR(255)     NOT NULL,
  price       DOUBLE PRECISION NOT NULL
);

CREATE OR REPLACE FUNCTION random_between(low INT, high INT)
  RETURNS INT AS
$$
BEGIN
  RETURN floor(random() * (high - low + 1) + low);
END;
$$ LANGUAGE plpgsql STRICT;

CREATE OR REPLACE FUNCTION random_pick()
  RETURNS VARCHAR AS
$func$
DECLARE
  city VARCHAR [] := '{Amsterdam,Milan,London,Oslo,Vienna,Porto,Venice,Lyon,Edinburgh,Stockholm,Athens}';
BEGIN
  RETURN city [random_between(1, 10)];
END
$func$ LANGUAGE plpgsql VOLATILE;

DO $$
BEGIN
  FOR counter IN 1..100000 LOOP
    INSERT INTO flight (departure, arrival, origin, destination, price) VALUES
      (now() + (random() * (INTERVAL '30 days')),
       now() + '30 days' + (random() * (INTERVAL '30 days')),
       random_pick(),
       random_pick(),
       random_between(1, 100));
  END LOOP;
END; $$;