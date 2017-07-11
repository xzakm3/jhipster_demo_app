package sk.emm.repository;

import sk.emm.domain.City;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepository extends JpaRepository<City,Long> {
    City findByCityName(String cityName);
}
