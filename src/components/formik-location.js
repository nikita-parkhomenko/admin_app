
// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Field, useField } from 'formik';
import React, { memo, useCallback } from 'react';

// local dependencies
import { FormikSelect } from './formik-select';
import { useCitiesByCountry, useCountries } from '../modules/hooks';

// configure
const noOptionsMessage = () => 'No matches found';

export const FormikCity = memo(function FormikCity ({ name, countryFieldName, isSimple, ...props }) {
  const [{ value: country }] = useField(countryFieldName);
  const countryId = isSimple ? country : _.get(country, 'id');
  const [cities, getCities, isLoading] = useCitiesByCountry({ id: countryId });

  const handleCitiesInputChange = useCallback((text, action) => {
    if (_.get(action, 'action') !== 'input-change') return;
    getCities(text);
  }, [getCities]);

  return <Field
    {...props}
    name={name}
    options={cities}
    isSimple={isSimple}
    isLoading={isLoading}
    openMenuOnClick={false}
    component={FormikSelect}
    noOptionsMessage={noOptionsMessage}
    onInputChange={handleCitiesInputChange}
  />;
});

FormikCity.propTypes = {
  isSimple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  countryFieldName: PropTypes.string.isRequired,
};
FormikCity.defaultProps = {
  isSimple: false,
};

export const FormikCountry = memo(function FormikCity ({ name, cityFieldName, ...props }) {
  const [_fieldCity, _metaCity, { setValue: setCityValue }] = useField(cityFieldName);
  const countries = useCountries();

  // prepare actions
  const clearCityField = useCallback(() => setCityValue('', true), [setCityValue]);

  return <Field
    {...props}
    disabled  // NOTE should be France only for now
    name={name}
    options={countries}
    component={FormikSelect}
    onChangeHelper={clearCityField}
  />;
});

FormikCountry.propTypes = {
  name: PropTypes.string.isRequired,
  cityFieldName: PropTypes.string.isRequired,
};
