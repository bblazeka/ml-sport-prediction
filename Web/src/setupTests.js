// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';

const fakerSeed = 123;

// eslint-disable-next-line no-undef
global.beforeEach(() => {
  faker.seed(fakerSeed);
});

// eslint-disable-next-line react/react-in-jsx-scope, no-undef
jest.mock('./components/Map.jsx', () => { return function DummyMap(props) { return (<div data-testid="map">{props.center.lat}:{props.center.long}</div>); }; });