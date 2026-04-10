
import React from 'react';
import { PanelProps } from '@grafana/data';

export const Panel: React.FC<PanelProps> = ({ data }) => {

  const series = data.series || [];

  const items = series.map(s => {
    const name = s.name || '';
    const alias = s.fields?.[0]?.config?.displayName || name;
    const value = s.fields?.[1]?.values?.get(0);

    const type = name.toLowerCase().includes('response code') ? 'web' : 'item';

    let status = 'unk';
    if (value === 0 || value >= 500) status = 'down';
    else if (value >= 300) status = 'deg';
    else if (value >= 200) status = 'up';

    return { name, alias, value, type, status };
  });

  return (
    <div style={{ padding: 10 }}>
      {items.map((i, idx) => (
        <div key={idx} style={{ marginBottom: 6 }}>
          <span>
            {i.type === 'web' ? '●' : '■'} 
          </span>
          <span style={{ marginLeft: 6 }}>{i.alias}</span>
          <span style={{ marginLeft: 6 }}>({i.status})</span>
        </div>
      ))}
    </div>
  );
};
