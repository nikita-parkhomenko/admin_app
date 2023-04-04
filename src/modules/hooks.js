
// outsource dependencies
import _ from 'lodash';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useControllerData, useControllerActions } from 'redux-saga-controller';

// local dependencies
import { API } from '../services';
import { history } from '../constants';
import { appRootCtrl } from './controller';

/**
 * logged user or null is user is unauthorized
 */
export const useSelf = () => {
  const { user } = useControllerData(appRootCtrl);
  return user;
};
export const useSelfId = () => _.get(useControllerData(appRootCtrl), 'user.userId');
export const useSelfRole = () => _.get(useControllerData(appRootCtrl), 'user.accountType');
export const useSelfAvatar = () => _.get(useControllerData(appRootCtrl), 'user.imageUrl');

/**
 * common detection of authorization
 */
export const useIsAuthorized = () => {
  const selfId = useSelfId();
  return useMemo(() => Boolean(selfId), [selfId]);
};

/**
 * common way to navigate
 */
export const usePath = path => useCallback(() => history.push(path), [path]);

/**
 * correct extract ref to provide ability use ref with "useEffect" hook
 */
export const useRefCallback = () => {
  const [stored, set] = useState(null);
  // NOTE prevent update "reference" within render
  const ref = useCallback(api => api && set(api), []);
  return [stored, ref];
};

/**
 * simple prepared boolean and toggle fn
 */
export const useToggle = initial => {
  const [value, set] = useState(Boolean(initial));
  return [value, useCallback(() => set(current => !current), [])];
};

/**
 * provide functionality for aside within app
 */
export const useToggleAside = () => {
  const { updateCtrl } = useControllerActions(appRootCtrl);
  const { aside } = useControllerData(appRootCtrl);
  const handleToggle = useCallback(
    value => updateCtrl({ aside: _.isBoolean(value) ? value : !aside }),
    [updateCtrl, aside]
  );
  return [aside, handleToggle];
};

/**
 * common list of countries
 */
export const useCountries = () => {
  const { getCountries } = useControllerActions(appRootCtrl);
  useEffect(() => { getCountries({}); }, [getCountries]);
  return useControllerData(appRootCtrl).countries;
};

/**
 * common mechanism to get cities by country
 * @see { @link https://dmitripavlutin.com/react-throttle-debounce/ | debounced/throttle functions }
 */
export const useCitiesByCountry = options => {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const countryId = _.get(options, 'id');
  const cityId = _.get(options, 'cityId');
  const handleGetCity = useMemo(() => _.debounce(name => {
    if (!countryId || _.size(name) < 1) {
      setCities([]);
      return;
    }
    setLoading(true);
    // setCities([]);
    API({
      method: 'POST',
      url: '/location/city',
      params: { page: 0, size: 24 },
      data: { countryId, name, includeIds: cityId ? [cityId] : void(0) },
    })
      .then(success => setCities(success.content))
      .catch(() => setCities([]))
      .finally(() => setLoading(false));
  }, 3e2), [cityId, countryId]);
  useEffect(() => () => handleGetCity && handleGetCity.cancel(), [handleGetCity]);

  useEffect(() => {
    if (!countryId) { return; }
    handleGetCity('');
  }, [countryId, handleGetCity]);
  return [cities, handleGetCity, isLoading];
};
