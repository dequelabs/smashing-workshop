import React from 'react';
import { shallow } from 'enzyme';
import Stats from './';
import { axe } from 'jest-axe';

const statsStub = [
  {
    label: 'Eggs used',
    value: 3,
    icon: '/egg.svg'
  },
  {
    label: 'Recipes made',
    value: 18,
    icon: '/recipe.svg'
  },
  {
    label: 'Grease fires',
    value: 6,
    icon: '/fire.svg'
  },
  {
    label: 'Yumminess',
    value: '45.00',
    histogram: []
  }
];
let stats;

afterEach(async () => {
  expect(await axe(stats.html())).toHaveNoViolations();
});

test('marks each icon as decorative', () => {
  stats = shallow(<Stats stats={statsStub} />);

  stats.find('.Stat__value img').forEach(icon => {
    expect(icon.is('[role="presentation"]')).toBeTruthy();
    expect(icon.is('[alt=""]')).toBeTruthy();
  });
});

test('wraps each stat in a live region', () => {
  stats = shallow(<Stats stats={statsStub} />);

  expect(stats.find('[aria-live][aria-relevant][aria-atomic]').length).toBe(
    statsStub.length
  );
});

test('wraps each stat in a heading level 2', () => {
  stats = shallow(<Stats stats={statsStub} />);
  const h2s = stats.find('h2');
  h2s.forEach((h2, i) => {
    const text = h2.text();
    expect(text.includes(statsStub[i].value)).toBe(true);
    expect(text.includes(statsStub[i].label)).toBe(true);
  });
});
