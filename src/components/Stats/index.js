import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Stats = ({ stats }) => {
  return (
    <div className="Stats">
      <div className="confined">
        {stats.map(({ label, value, icon }) => (
          <div className="Stat" key={`${label}-${value}`}>
            <h2>
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
};

Stats.displayName = 'Stats';
Stats.propTypes = {
  stats: PropTypes.array.isRequired
};
export default Stats;
