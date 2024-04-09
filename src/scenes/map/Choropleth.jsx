import { ResponsiveChoropleth } from '@nivo/geo'
import { regions } from './misc/data/Morocco'


const props = {
    borderWidth: 0.5,
    width:650,
    domain: [0, 1000000],
    features: regions.features,
    unknownColor: '#666666',
    label: 'properties.region', 
    margin: { top:380, right: 0, left: 0 },
    projectionScale: 2000, 
    projectionTranslation: [0.5, 1], 
    projectionRotation: [10, -10, 0], 
    enableGraticule: true,
    projectionType:"mercator",
    graticuleLineColor: '#dddddd',
    defs: [
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
      {
        id: 'gradient',
        type: 'linearGradient',
        colors: [
          { offset: 0, color: '#000' },
          { offset: 100, color: 'inherit' },
        ],
      },
    ],
    fill: [
      { match: { id: '2' }, id: 'dots' },
      { match: { id: '7' }, id: 'lines' },
      { match: { id: '9' }, id: 'gradient' },
    ],
 
  };

  


export function Choropleth({setRegion, setRegionId,data,dataColors , maxData}) {

  const handleClick = (node, event) => {
    setRegion(node.label)
    setRegionId(node.id)
  }

  
  
  return (
              
        <ResponsiveChoropleth
          data={data}
          {...props}
          onClick={handleClick}
          colors={dataColors}
          domain={[0, maxData]}//for Legends  
        />
    
  );
}

