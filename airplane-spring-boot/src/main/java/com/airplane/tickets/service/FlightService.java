package com.airplane.tickets.service;

import com.airplane.tickets.model.Flight;
import com.airplane.tickets.repository.IFlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static java.sql.Timestamp.from;

@Service
public class FlightService {
    private final IFlightRepository iFlightRepository;
    private final List<String> cityList = Stream.of(
            "Amsterdam",
            "Milan",
            "London",
            "Oslo",
            "Vienna",
            "Porto",
            "Venice",
            "Lyon",
            "Edinburgh",
            "Stockholm",
            "Athens",
            "Eindhoven",
            "Moscow",
            "Dublin",
            "Utrecht",
            "Kiev")
            .collect(Collectors.toList());

    @Autowired
    public FlightService(IFlightRepository iFlightRepository) {
        this.iFlightRepository = iFlightRepository;
    }

    public List<Flight> getFlightsByOriginAndDestinationAndMinPriceMaxPriceAndDepartureDate(
            String origin,
            String destination,
            int minPrice,
            int maxPrice,
            Long departureDate,
            Long departureEndDate) {
        Timestamp departureDateStart = new Timestamp(departureDate);
        Timestamp departureDateEnd = new Timestamp(departureEndDate);

        return iFlightRepository.findByOriginAndDestinationAndPriceGreaterThanEqualAndPriceLessThanEqualAndDepartureGreaterThanEqualAndDepartureLessThanEqual(
                origin,
                destination,
                minPrice,
                maxPrice,
                departureDateStart,
                departureDateEnd
        );
    }

    public List<String> getAllOrigins() {
        return StreamSupport.stream(iFlightRepository.findAll().spliterator(), false)
                .map(Flight::getOrigin)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getAllDestinations() {
        return StreamSupport.stream(iFlightRepository.findAll().spliterator(), false)
                .map(Flight::getDestination)
                .distinct()
                .collect(Collectors.toList());
    }

    public void addFlights(int numberOfFlights) {
        IntStream.range(0, numberOfFlights)
                .forEach(index -> addFlight());
    }

    private void addFlight() {
        Flight flight = new Flight();

        int randomNumberOrigin = getRandomNumberNotEqualTo(0, cityList.size(), -1);
        int randomNumberDestination = getRandomNumberNotEqualTo(0, cityList.size(), randomNumberOrigin);
        Timestamp now = new Timestamp(System.currentTimeMillis());

        Double price = (double) getRandomNumberInRange(10, 200);
        String origin = cityList.get(randomNumberOrigin);
        String destination = cityList.get(randomNumberDestination);
        Timestamp departure = from(now.toInstant().plus(getRandomNumberInRange(1, 500), ChronoUnit.HOURS));
        Timestamp arrival = from(departure.toInstant().plus(getRandomNumberInRange(1, 1000), ChronoUnit.HOURS));

        System.out.println(arrival.toLocalDateTime());

        flight.setOrigin(origin);
        flight.setDestination(destination);
        flight.setArrival(arrival);
        flight.setDeparture(departure);
        flight.setPrice(price);

        iFlightRepository.save(flight);
    }

    private int getRandomNumberInRange(int minNumber, int maxNumber) {
        Random random = new Random();

        return random.nextInt(maxNumber - minNumber) + minNumber;
    }

    private int getRandomNumberNotEqualTo(int minNumber, int maxNumber, int notEqualToNumber) {
        int randomNumber = getRandomNumberInRange(minNumber, maxNumber);

        while (randomNumber == notEqualToNumber) {
            randomNumber = getRandomNumberInRange(minNumber, maxNumber);
        }

        return randomNumber;
    }
}