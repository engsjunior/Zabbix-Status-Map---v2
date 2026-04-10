
import React from 'react';
import { PanelPlugin } from '@grafana/data';

const Panel = ({ data }) => {
  const series = data.series || [];

  return React.createElement("div", { style: { padding: 10 } },
    series.map((s, i) => {
      const name = s.name || "";
      const alias = s.fields?.[0]?.config?.displayName || name;
      const value = s.fields?.[1]?.values?.get(0);

      let status = "unk";
      if (value === 0 || value >= 500) status = "down";
      else if (value >= 300) status = "deg";
      else if (value >= 200) status = "up";

      const isWeb = name.toLowerCase().includes("response code");

      return React.createElement("div", { key: i },
        (isWeb ? "●" : "■") + " " + alias + " (" + status + ")"
      );
    })
  );
};

export const plugin = new PanelPlugin(Panel);
