package com.airplane.tickets.controller;

import com.airplane.tickets.model.Flight;
import com.airplane.tickets.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest controller, provides /flight endpoint
 */
@CrossOrigin()
@RestController
@RequestMapping("/flights")
public class EndpointController {
    private final FlightService flightService;

    @Autowired
    protected EndpointController(FlightService flightService) {
        this.flightService = flightService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Flight> getFlights(@RequestParam("dateFrom") final Long dateFrom,
                                   @RequestParam("dateTo") final Long dateTo) {
        return flightService.getFlightsBetweenDates(dateFrom, dateTo);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/byOriginAndDestination")
    @ResponseStatus(HttpStatus.OK)
    public List<Flight> getFlightsByOriginAndDestination(@RequestParam("origin") final String origin,
                                                         @RequestParam("destination") final String destination) {
        return flightService.getFlightsByOriginAndDestination(origin, destination);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/byOriginAndDestinationAndMinPriceMaxPriceAndDepartureDate")
    @ResponseStatus(HttpStatus.OK)
    public List<Flight> getFlightsByOriginAndDestinationAndMinPriceMaxPriceAndDepartureDate(
            @RequestParam("origin") final String origin,
            @RequestParam("destination") final String destination,
            @RequestParam("minPrice") final int minPrice,
            @RequestParam("maxPrice") final int maxPrice,
            @RequestParam("departureDate") final Long departureDate,
            @RequestParam("departureEndDate") final Long departureEndDate) {

        return flightService.getFlightsByOriginAndDestinationAndMinPriceMaxPriceAndDepartureDate(
                origin,
                destination,
                minPrice,
                maxPrice,
                departureDate,
                departureEndDate
        );

    }

    @RequestMapping(method = RequestMethod.GET, value = "/origins")
    public List<String> getOrigins() {
        return flightService.getAllOrigins();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/destinations")
    public List<String> getDestinations() {
        return flightService.getAllDestinations();
    }
}