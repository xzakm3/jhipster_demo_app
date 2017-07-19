package sk.emm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sk.emm.domain.City;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import sk.emm.domain.Country;


/**
 * Spring Data JPA repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepository extends JpaRepository<City,Long> {
    City findByCityName(String cityName);
    Page<City> findByCountry(Pageable pageable, Country country);
}
