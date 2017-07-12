package sk.emm.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import sk.emm.domain.City;
import sk.emm.service.CityService;

/**
 * Created by zak_m on 11. 7. 2017.
 */

@Component
public class CityValidator implements Validator {
    private final Logger log = LoggerFactory.getLogger(CityValidator.class);

    private final CityService cityService;

    public CityValidator(CityService cityService){
        this.cityService = cityService;
    }

    @Override
    public boolean supports(Class appClass) {
        return City.class.equals(appClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        log.debug("Request to validate City: {}", object);

        City cityFromRequest = (City) object;

        if (!cityService.isUniqueName(cityFromRequest.getCityName())){
            errors.rejectValue("cityName", "cityName.exists");
        }
    }
}
