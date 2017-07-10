package sk.emm.repository;

import sk.emm.domain.Country;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Country entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CountryRepository extends JpaRepository<Country,Long> {
    // Unique code validation
    Long countByCountryCode(Integer code);
}
