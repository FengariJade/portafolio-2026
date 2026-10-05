interface TypeSatColors {
  principal: string;
  principalHover: string;
  text: string;
  white: string;
  error: string;
  textInteractive: string;
  contentCard: string;
  background: string;
  contentInfo: string;
  background2: string;

  Primario:string;
  Secundario: string;
  Terciario: string;
  Cuaternario: string;
  Accent: string;
  Accent2: string;
  Accent3: string;
  Accent4: string;
  Accent5: string;
  Accent6: string;
  Accent7: string;
}

export const satColors: TypeSatColors = {
  principal: '#F7F6FB',
  principalHover: '#0f2d51',
  text: '#000000',
  white: '#000000',
  error: '#eb4038',
  textInteractive: '#303880',
  contentCard: '#c0f0fe',
  background: '#E6EAF3',
  contentInfo: '#f3fffd',
  background2: '#F7F6FB',

  
  Primario:'#F7F6FB',
  Secundario: '#E6EAF3',
  Terciario: '#FFFFFF',
  Cuaternario: '#ECEBF0',
  Accent: '#9993F5',
  Accent2: '#EDFC93',
  Accent3: '#96D6D5',
  Accent4: '#CBE1D5',
  Accent5: '#2A57E6',
  Accent6: '#EBD3D1',
  Accent7: '#000000',
};

export function applySatColors(): void {
  const root = document.documentElement;
  Object.entries(satColors).forEach(([key, value]) => {
    root.style.setProperty(`--sat-${key}`, value);
  });
}
