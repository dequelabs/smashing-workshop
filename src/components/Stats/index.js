import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Stats = ({ stats }) => (
  <div className="Stats">
    <div className="confined">
      {stats.map(({ label, value, icon }) => (
        <div className="Stat" key={`${label}-${value}`}>
          <h2 aria-live="polite" aria-relevant="all" aria-atomic="true">
            <div className="Stat__value">
              {icon && (
                <img
                  className="Stat__value-icon"
                  src={icon}
                  alt=""
                  role="presentation"
                />
              )}
              <span>{value}</span>
            </div>
            <div className="Stat__label">{label}</div>
          </h2>
        </div>
      ))}
    </div>
  </div>
);

Stats.displayName = 'Stats';
Stats.propTypes = {
  stats: PropTypes.array.isRequired
};
export default Stats;
