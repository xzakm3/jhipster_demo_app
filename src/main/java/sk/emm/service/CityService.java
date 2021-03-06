package sk.emm.service;

import sk.emm.domain.City;
import sk.emm.domain.Country;
import sk.emm.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sk.emm.repository.CountryRepository;
import sk.emm.web.rest.CountryResource;


/**
 * Service Implementation for managing City.
 */
@Service
@Transactional
public class CityService{

    private final Logger log = LoggerFactory.getLogger(CityService.class);

    private final CityRepository cityRepository;

    private final CountryRepository countryRepository;

    public CityService(CityRepository cityRepository, CountryRepository countryRepository) {
        this.cityRepository = cityRepository;
        this.countryRepository = countryRepository;
    }

    /**
     * Save a city.
     *
     * @param city the entity to save
     * @return the persisted entity
     */

    public City save(City city) {
        log.debug("Request to save City : {}", city);
        return cityRepository.save(city);
    }

    /**
     *  Get all the cities.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */

    @Transactional(readOnly = true)
    public Page<City> findAll(Pageable pageable) {
        log.debug("Request to get all Cities");
        return cityRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<City> findByCountryName(Pageable pageable, String name){
        log.debug("Request to get all Cities for Specific country name");

        Country country = countryRepository.findByCountryName(name);
        return cityRepository.findByCountry(pageable, country);
    }

    /**
     *  Get one city by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */

    @Transactional(readOnly = true)
    public City findOne(Long id) {
        log.debug("Request to get City : {}", id);
        return cityRepository.findOne(id);
    }

    /**
     *  Delete the  city by id.
     *
     *  @param id the id of the entity
     */

    public void delete(Long id) {
        log.debug("Request to delete City : {}", id);
        cityRepository.delete(id);
    }

    public boolean isUniqueName(String cityName){
        return cityRepository.findByCityName(cityName) == null;
    }
}
