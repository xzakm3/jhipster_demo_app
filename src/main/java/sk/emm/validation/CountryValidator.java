package sk.emm.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import sk.emm.domain.Country;
import sk.emm.service.CountryService;


/**
 * Created by zak_m on 10. 7. 2017.
 */

@Component
public class CountryValidator implements Validator {
    private final Logger log = LoggerFactory.getLogger(CountryValidator.class);

    private final CountryService countryService;

    public CountryValidator(CountryService countryService){
        this.countryService = countryService;
    }

    @Override
    public boolean supports(Class appClass) {
        return Country.class.equals(appClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        log.debug("Request to validate Country: {}", object);

        Country cntFromRequest = (Country) object;
        if (!countryService.isUniqueCode(cntFromRequest.getCountryCode())) {
            errors.rejectValue("countryCode", "countryCodeexists");
        }
    }
}
