import React from 'react';
import PropTypes from 'prop-types';
import Histogram from '../Histogram';
import './index.css';

/* eslint-disable jsx-a11y/alt-text */
const Stats = ({ stats }) => (
  <div className="Stats">
    <div className="confined">
      {stats.map(({ label, value, icon, histogram }) => (
        <div
          className={`Stat ${histogram ? 'with-chart' : ''}`}
          key={`${label}-${value}`}
        >
          <h2>
            <div className="Stat__value">
              {icon && <img className="Stat__value-icon" src={icon} />}
              {histogram ? (
                <Histogram data={histogram} />
              ) : (
                <span>{value}</span>
              )}
            </div>
            <div>
              <div className="Stat__label">{label}</div>
              {histogram && (
                <div className="Histogram__value-wrap">
                  <span className="Histogram__value">{value} </span>
                  <span>avg</span>
                </div>
              )}
            </div>
          </h2>
        </div>
      ))}
    </div>
  </div>
);
/* eslint-enable jsx-a11y/alt-text */
Stats.displayName = 'Stats';
Stats.propTypes = {
  stats: PropTypes.array.isRequired
};
export default Stats;
