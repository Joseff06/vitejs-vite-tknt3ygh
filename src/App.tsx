import { useState, useEffect, Fragment } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  LayoutDashboard,
  Building2,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Share2,
  LineChart,
  Trash2,
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const CHART_DATA = {
  Ingresos: [
    { mes: 'Ene', pres: 733, real: 718 },
    { mes: 'Feb', pres: 689, real: 702 },
    { mes: 'Mar', pres: 934, real: 951 },
    { mes: 'Abr', pres: 684, real: 671 },
    { mes: 'May', pres: 1060, real: 1058 },
    { mes: 'Jun', pres: 1160 },
    { mes: 'Jul', pres: 1080 },
    { mes: 'Ago', pres: 1140 },
    { mes: 'Sep', pres: 1090 },
    { mes: 'Oct', pres: 1150 },
    { mes: 'Nov', pres: 1180 },
    { mes: 'Dic', pres: 1100 },
  ],
  Costos: [
    { mes: 'Ene', pres: 306, real: 298 },
    { mes: 'Feb', pres: 364, real: 371 },
    { mes: 'Mar', pres: 438, real: 445 },
    { mes: 'Abr', pres: 369, real: 358 },
    { mes: 'May', pres: 515, real: 498 },
    { mes: 'Jun', pres: 599 },
    { mes: 'Jul', pres: 560 },
    { mes: 'Ago', pres: 580 },
    { mes: 'Sep', pres: 555 },
    { mes: 'Oct', pres: 575 },
    { mes: 'Nov', pres: 590 },
    { mes: 'Dic', pres: 570 },
  ],
  'Utilidad Bruta': [
    { mes: 'Ene', pres: 292, real: 285 },
    { mes: 'Feb', pres: 153, real: 148 },
    { mes: 'Mar', pres: 305, real: 318 },
    { mes: 'Abr', pres: 167, real: 162 },
    { mes: 'May', pres: 368, real: 354 },
    { mes: 'Jun', pres: 319 },
    { mes: 'Jul', pres: 340 },
    { mes: 'Ago', pres: 360 },
    { mes: 'Sep', pres: 345 },
    { mes: 'Oct', pres: 370 },
    { mes: 'Nov', pres: 390 },
    { mes: 'Dic', pres: 380 },
  ],
};

const KPI_DATA = {
  'Mayo 2026': [
    {
      label: 'INGRESOS DEL MES',
      real: '$1.058M',
      presup: '$1.060M',
      devPct: '-0,2%',
      favorable: false,
      tipo: 'ingreso',
    },
    {
      label: 'COSTO DE VENTAS',
      real: '$498M',
      presup: '$515M',
      devPct: '-3,3%',
      favorable: true,
      tipo: 'gasto',
    },
    {
      label: 'UTILIDAD BRUTA',
      real: '$354M',
      presup: '$368M',
      devPct: '-3,8%',
      favorable: false,
      tipo: 'ingreso',
      extra: '33,5% margen',
    },
    {
      label: 'UTILIDAD OPERACIONAL',
      real: '$138M',
      presup: '$146M',
      devPct: '-5,5%',
      favorable: false,
      tipo: 'ingreso',
      extra: '13,1% margen',
    },
  ],
  'Abril 2026': [
    {
      label: 'INGRESOS DEL MES',
      real: '$671M',
      presup: '$684M',
      devPct: '-1,9%',
      favorable: false,
      tipo: 'ingreso',
    },
    {
      label: 'COSTO DE VENTAS',
      real: '$358M',
      presup: '$369M',
      devPct: '-3,0%',
      favorable: true,
      tipo: 'gasto',
    },
    {
      label: 'UTILIDAD BRUTA',
      real: '$162M',
      presup: '$167M',
      devPct: '-3,0%',
      favorable: false,
      tipo: 'ingreso',
      extra: '24,1% margen',
    },
    {
      label: 'UTILIDAD OPERACIONAL',
      real: '$-28M',
      presup: '$-21M',
      devPct: '-33,3%',
      favorable: false,
      tipo: 'ingreso',
      extra: '-4,2% margen',
    },
  ],
  'Marzo 2026': [
    {
      label: 'INGRESOS DEL MES',
      real: '$951M',
      presup: '$934M',
      devPct: '+1,8%',
      favorable: true,
      tipo: 'ingreso',
    },
    {
      label: 'COSTO DE VENTAS',
      real: '$445M',
      presup: '$438M',
      devPct: '+1,6%',
      favorable: false,
      tipo: 'gasto',
    },
    {
      label: 'UTILIDAD BRUTA',
      real: '$318M',
      presup: '$305M',
      devPct: '+4,3%',
      favorable: true,
      tipo: 'ingreso',
      extra: '33,4% margen',
    },
    {
      label: 'UTILIDAD OPERACIONAL',
      real: '$118M',
      presup: '$110M',
      devPct: '+7,3%',
      favorable: true,
      tipo: 'ingreso',
      extra: '12,4% margen',
    },
  ],
};

const UEN_TABLE = [
  {
    uen: 'Ambiental',
    presup: '$760M',
    real: '$742M',
    devCop: '-$18M',
    devPct: '-2,4%',
    estado: 'En meta',
    devNum: -2.4,
  },
  {
    uen: 'Oil & Gas',
    presup: '$50M',
    real: '$58M',
    devCop: '+$8M',
    devPct: '+16,0%',
    estado: 'Atención',
    devNum: 16.0,
  },
  {
    uen: 'Geosintéticos',
    presup: '$186M',
    real: '$172M',
    devCop: '-$14M',
    devPct: '-7,5%',
    estado: 'Atención',
    devNum: -7.5,
  },
  {
    uen: 'Alquiler de Equipos',
    presup: '$40M',
    real: '$38M',
    devCop: '-$2M',
    devPct: '-5,0%',
    estado: 'Atención',
    devNum: -5.0,
  },
  {
    uen: 'Construcción',
    presup: '$24M',
    real: '$48M',
    devCop: '+$24M',
    devPct: '+100%',
    estado: 'Desfase',
    devNum: 100,
  },
];

const ALERTAS = [
  {
    rubro: 'Gastos Comerciales — UEN Ambiental',
    dev: '+12,4% sobre presupuesto',
    ctx: 'Comisiones por encima del proyectado en abril y mayo',
    desfav: true,
  },
  {
    rubro: 'Insumos y Materiales · Ambiental',
    dev: '+8,7% sobre presupuesto',
    ctx: 'Importaciones extraordinarias en abril',
    desfav: true,
  },
  {
    rubro: 'Mano de Obra Directa · Construcción',
    dev: '-15,2% bajo presupuesto',
    ctx: 'Bajo nivel de ejecución, revisar facturación pendiente',
    desfav: false,
  },
];

const PROYECTOS = [
  { nombre: 'Biológicos', avance: 65, presup: '$180M', real: '$117M' },
  {
    nombre: 'Villastana-Serviciudad',
    avance: 80,
    presup: '$220M',
    real: '$176M',
  },
  { nombre: 'Torre 880', avance: 45, presup: '$150M', real: '$68M' },
  { nombre: 'Sierracol', avance: 30, presup: '$90M', real: '$27M' },
  { nombre: 'Comfama', avance: 90, presup: '$120M', real: '$108M' },
  { nombre: 'Brinsa-Rec H2O 3090', avance: 55, presup: '$200M', real: '$110M' },
  { nombre: 'EPM Aguas Claras', avance: 70, presup: '$250M', real: '$175M' },
];

const UEN_DETAILS = {
  Ambiental: {
    desc: 'Proyectos ambientales, consultoría y servicios de saneamiento',
    kpis: [
      {
        label: 'INGRESOS UEN',
        real: '$742M',
        presup: '$760M',
        devPct: '-2,4%',
        favorable: false,
      },
      {
        label: 'COSTO DE VENTAS',
        real: '$208M',
        presup: '$214M',
        devPct: '-2,8%',
        favorable: true,
      },
      {
        label: 'UTILIDAD BRUTA',
        real: '$279M',
        presup: '$291M',
        devPct: '-4,1%',
        favorable: false,
        extra: '37,6% margen',
      },
    ],
    rubros: [
      {
        id: 'ing',
        label: 'INGRESOS',
        presup: '$612M',
        real: '$606M',
        devCop: '-$6M',
        devPct: '-1,0%',
        tipo: 'ingreso',
        children: [
          {
            id: 'ing1',
            label: 'Servicio',
            presup: '$490M',
            real: '$478M',
            devCop: '-$12M',
            devPct: '-2,4%',
            tipo: 'ingreso',
          },
          {
            id: 'ing2',
            label: 'Suministro',
            presup: '$122M',
            real: '$128M',
            devCop: '+$6M',
            devPct: '+4,9%',
            tipo: 'ingreso',
          },
        ],
      },
      {
        id: 'cv',
        label: 'COSTO DE VENTAS',
        presup: '$214M',
        real: '$208M',
        devCop: '-$6M',
        devPct: '-2,8%',
        tipo: 'gasto',
        children: [
          {
            id: 'cv1',
            label: 'Mano de Obra Directa',
            presup: '$62M',
            real: '$61M',
            devCop: '-$1M',
            devPct: '-1,6%',
            tipo: 'gasto',
            children: [
              {
                id: 'cv1a',
                label: 'Nómina Directa',
                presup: '$38M',
                real: '$37M',
                devCop: '-$1M',
                devPct: '-2,6%',
                tipo: 'gasto',
              },
              {
                id: 'cv1b',
                label: 'Prestaciones Sociales',
                presup: '$13M',
                real: '$13M',
                devCop: '—',
                devPct: '0%',
                tipo: 'gasto',
              },
              {
                id: 'cv1c',
                label: 'Seguridad Social',
                presup: '$10M',
                real: '$11M',
                devCop: '+$1M',
                devPct: '+10,0%',
                tipo: 'gasto',
              },
            ],
          },
          {
            id: 'cv2',
            label: 'Insumos y Materiales',
            presup: '$127M',
            real: '$124M',
            devCop: '-$3M',
            devPct: '-2,4%',
            tipo: 'gasto',
            children: [
              {
                id: 'cv2a',
                label: 'Consumibles',
                presup: '$20M',
                real: '$19M',
                devCop: '-$1M',
                devPct: '-5,0%',
                tipo: 'gasto',
              },
              {
                id: 'cv2b',
                label: 'Materias Primas',
                presup: '$31M',
                real: '$30M',
                devCop: '-$1M',
                devPct: '-3,2%',
                tipo: 'gasto',
              },
              {
                id: 'cv2c',
                label: 'Importaciones',
                presup: '$75M',
                real: '$75M',
                devCop: '—',
                devPct: '0%',
                tipo: 'gasto',
              },
            ],
          },
          {
            id: 'cv3',
            label: 'Contratos Externos',
            presup: '$24M',
            real: '$23M',
            devCop: '-$1M',
            devPct: '-4,2%',
            tipo: 'gasto',
            children: [
              {
                id: 'cv3a',
                label: 'Transportes',
                presup: '$5M',
                real: '$5M',
                devCop: '—',
                devPct: '0%',
                tipo: 'gasto',
              },
              {
                id: 'cv3b',
                label: 'Mantenimiento Correctivo',
                presup: '$0,3M',
                real: '$0,4M',
                devCop: '+$0,1M',
                devPct: '+33,3%',
                tipo: 'gasto',
              },
              {
                id: 'cv3c',
                label: 'Alquileres',
                presup: '$4M',
                real: '$4M',
                devCop: '—',
                devPct: '0%',
                tipo: 'gasto',
              },
              {
                id: 'cv3d',
                label: 'Contratos Terceros',
                presup: '$13M',
                real: '$13M',
                devCop: '—',
                devPct: '0%',
                tipo: 'gasto',
              },
            ],
          },
        ],
      },
      {
        id: 'gd',
        label: 'GASTOS DIRECTOS DEL PROYECTO',
        presup: '$60M',
        real: '$59M',
        devCop: '-$1M',
        devPct: '-1,7%',
        tipo: 'gasto',
        children: [
          {
            id: 'gd1',
            label: 'Gastos Administrativos',
            presup: '$23M',
            real: '$23M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
          {
            id: 'gd2',
            label: 'Cajas Menores',
            presup: '$8M',
            real: '$8M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
          {
            id: 'gd3',
            label: 'Gastos de Viajes',
            presup: '$3M',
            real: '$3M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
          {
            id: 'gd4',
            label: "EPP's - SST",
            presup: '$2M',
            real: '$2M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
          {
            id: 'gd5',
            label: 'Pólizas',
            presup: '$0,8M',
            real: '$0,8M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
        ],
      },
    ],
    tieneProyectos: true,
  },
  'Oil & Gas': {
    desc: 'Venta de productos absorbentes y suministros para control de derrames',
    kpis: [
      {
        label: 'INGRESOS UEN',
        real: '$58M',
        presup: '$50M',
        devPct: '+16,0%',
        favorable: true,
      },
      {
        label: 'COSTO DE VENTAS',
        real: '$32M',
        presup: '$28M',
        devPct: '+14,3%',
        favorable: false,
      },
      {
        label: 'UTILIDAD BRUTA',
        real: '$26M',
        presup: '$22M',
        devPct: '+18,2%',
        favorable: true,
        extra: '44,8% margen',
      },
    ],
    rubros: [
      {
        id: 'ing',
        label: 'INGRESOS',
        presup: '$50M',
        real: '$58M',
        devCop: '+$8M',
        devPct: '+16,0%',
        tipo: 'ingreso',
        children: [
          {
            id: 'ing1',
            label: 'Venta de Productos',
            presup: '$42M',
            real: '$50M',
            devCop: '+$8M',
            devPct: '+19,0%',
            tipo: 'ingreso',
          },
          {
            id: 'ing2',
            label: 'Servicios Técnicos',
            presup: '$8M',
            real: '$8M',
            devCop: '—',
            devPct: '0%',
            tipo: 'ingreso',
          },
        ],
      },
      {
        id: 'cv',
        label: 'COSTO DE VENTAS',
        presup: '$28M',
        real: '$32M',
        devCop: '+$4M',
        devPct: '+14,3%',
        tipo: 'gasto',
        children: [
          {
            id: 'cv1',
            label: 'Costo de Mercancía',
            presup: '$22M',
            real: '$26M',
            devCop: '+$4M',
            devPct: '+18,2%',
            tipo: 'gasto',
          },
          {
            id: 'cv2',
            label: 'Logística y Fletes',
            presup: '$6M',
            real: '$6M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
        ],
      },
    ],
    tieneProyectos: false,
  },
  Geosintéticos: {
    desc: 'Venta e instalación de geosintéticos, consultoría y suministros',
    kpis: [
      {
        label: 'INGRESOS UEN',
        real: '$172M',
        presup: '$186M',
        devPct: '-7,5%',
        favorable: false,
      },
      {
        label: 'COSTO DE VENTAS',
        real: '$98M',
        presup: '$104M',
        devPct: '-5,8%',
        favorable: true,
      },
      {
        label: 'UTILIDAD BRUTA',
        real: '$74M',
        presup: '$82M',
        devPct: '-9,8%',
        favorable: false,
        extra: '43,0% margen',
      },
    ],
    rubros: [
      {
        id: 'ing',
        label: 'INGRESOS',
        presup: '$186M',
        real: '$172M',
        devCop: '-$14M',
        devPct: '-7,5%',
        tipo: 'ingreso',
        children: [
          {
            id: 'ing1',
            label: 'Venta de Geosintéticos',
            presup: '$140M',
            real: '$128M',
            devCop: '-$12M',
            devPct: '-8,6%',
            tipo: 'ingreso',
          },
          {
            id: 'ing2',
            label: 'Instalación',
            presup: '$30M',
            real: '$28M',
            devCop: '-$2M',
            devPct: '-6,7%',
            tipo: 'ingreso',
          },
          {
            id: 'ing3',
            label: 'Consultoría',
            presup: '$16M',
            real: '$16M',
            devCop: '—',
            devPct: '0%',
            tipo: 'ingreso',
          },
        ],
      },
      {
        id: 'cv',
        label: 'COSTO DE VENTAS',
        presup: '$104M',
        real: '$98M',
        devCop: '-$6M',
        devPct: '-5,8%',
        tipo: 'gasto',
        children: [
          {
            id: 'cv1',
            label: 'Insumos y Materiales',
            presup: '$78M',
            real: '$73M',
            devCop: '-$5M',
            devPct: '-6,4%',
            tipo: 'gasto',
          },
          {
            id: 'cv2',
            label: 'Mano de Obra Instalación',
            presup: '$20M',
            real: '$19M',
            devCop: '-$1M',
            devPct: '-5,0%',
            tipo: 'gasto',
          },
          {
            id: 'cv3',
            label: 'Subcontratos',
            presup: '$6M',
            real: '$6M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
        ],
      },
    ],
    tieneProyectos: false,
  },
  'Alquiler de Equipos': {
    desc: 'Renta de maquinaria y equipos especializados',
    kpis: [
      {
        label: 'INGRESOS UEN',
        real: '$38M',
        presup: '$40M',
        devPct: '-5,0%',
        favorable: false,
      },
      {
        label: 'COSTO DE VENTAS',
        real: '$18M',
        presup: '$19M',
        devPct: '-5,3%',
        favorable: true,
      },
      {
        label: 'UTILIDAD BRUTA',
        real: '$20M',
        presup: '$21M',
        devPct: '-4,8%',
        favorable: false,
        extra: '52,6% margen',
      },
    ],
    rubros: [
      {
        id: 'ing',
        label: 'INGRESOS',
        presup: '$40M',
        real: '$38M',
        devCop: '-$2M',
        devPct: '-5,0%',
        tipo: 'ingreso',
        children: [
          {
            id: 'ing1',
            label: 'Alquiler Equipos Pesados',
            presup: '$28M',
            real: '$26M',
            devCop: '-$2M',
            devPct: '-7,1%',
            tipo: 'ingreso',
          },
          {
            id: 'ing2',
            label: 'Alquiler Equipos Menores',
            presup: '$12M',
            real: '$12M',
            devCop: '—',
            devPct: '0%',
            tipo: 'ingreso',
          },
        ],
      },
      {
        id: 'cv',
        label: 'COSTO DE VENTAS',
        presup: '$19M',
        real: '$18M',
        devCop: '-$1M',
        devPct: '-5,3%',
        tipo: 'gasto',
        children: [
          {
            id: 'cv1',
            label: 'Mantenimiento',
            presup: '$10M',
            real: '$9M',
            devCop: '-$1M',
            devPct: '-10,0%',
            tipo: 'gasto',
          },
          {
            id: 'cv2',
            label: 'Operarios',
            presup: '$7M',
            real: '$7M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
          {
            id: 'cv3',
            label: 'Seguros Equipos',
            presup: '$2M',
            real: '$2M',
            devCop: '—',
            devPct: '0%',
            tipo: 'gasto',
          },
        ],
      },
    ],
    tieneProyectos: false,
  },
  Construcción: {
    desc: 'Servicios de construcción y obras civiles',
    kpis: [
      {
        label: 'INGRESOS UEN',
        real: '$48M',
        presup: '$24M',
        devPct: '+100%',
        favorable: true,
      },
      {
        label: 'COSTO DE VENTAS',
        real: '$36M',
        presup: '$18M',
        devPct: '+100%',
        favorable: false,
      },
      {
        label: 'UTILIDAD BRUTA',
        real: '$12M',
        presup: '$6M',
        devPct: '+100%',
        favorable: true,
        extra: '25,0% margen',
      },
    ],
    rubros: [
      {
        id: 'ing',
        label: 'INGRESOS',
        presup: '$24M',
        real: '$48M',
        devCop: '+$24M',
        devPct: '+100%',
        tipo: 'ingreso',
        children: [
          {
            id: 'ing1',
            label: 'Obra Civil',
            presup: '$18M',
            real: '$38M',
            devCop: '+$20M',
            devPct: '+111%',
            tipo: 'ingreso',
          },
          {
            id: 'ing2',
            label: 'Acabados',
            presup: '$6M',
            real: '$10M',
            devCop: '+$4M',
            devPct: '+67%',
            tipo: 'ingreso',
          },
        ],
      },
      {
        id: 'cv',
        label: 'COSTO DE VENTAS',
        presup: '$18M',
        real: '$36M',
        devCop: '+$18M',
        devPct: '+100%',
        tipo: 'gasto',
        children: [
          {
            id: 'cv1',
            label: 'Mano de Obra Directa',
            presup: '$10M',
            real: '$20M',
            devCop: '+$10M',
            devPct: '+100%',
            tipo: 'gasto',
          },
          {
            id: 'cv2',
            label: 'Materiales de Construcción',
            presup: '$6M',
            real: '$12M',
            devCop: '+$6M',
            devPct: '+100%',
            tipo: 'gasto',
          },
          {
            id: 'cv3',
            label: 'Subcontratos',
            presup: '$2M',
            real: '$4M',
            devCop: '+$2M',
            devPct: '+100%',
            tipo: 'gasto',
          },
        ],
      },
    ],
    tieneProyectos: false,
  },
};

const UEN_LIST = [
  'Ambiental',
  'Oil & Gas',
  'Geosintéticos',
  'Alquiler de Equipos',
  'Construcción',
];

// UEN piloto donde aplica el ICA y la Proyección 2027 (las que cubre el doc de la Dirección)
const PILOTO = ['Oil & Gas', 'Geosintéticos', 'Alquiler de Equipos'];

const MESES_CORTOS = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

// Estructura del Presupuesto Anual según el documento de la Dirección
const PROYECCION_TEMPLATE: Record<
  string,
  { ingresos: string[]; costos: Record<string, string[]> }
> = {
  'Oil & Gas': {
    ingresos: [
      'Suministro para la prevención y control de derrames',
      'Productos Absorbentes',
    ],
    costos: {
      'Insumos y Materiales': [
        'Suministro para la prevención y control de derrames',
        'Productos Absorbentes',
      ],
      Diversos: ['Transportes'],
    },
  },
  'Geosintéticos': {
    ingresos: [
      'Venta e instalación de geosintéticos',
      'Otros servicios – Consultoría',
      'Suministros',
    ],
    costos: {
      'Insumos y Materiales': [
        'Materias primas — Venta e instalación de geosintéticos',
        'Materias primas — Consultoría',
        'Suministros',
      ],
      Diversos: ['Transportes'],
    },
  },
  'Alquiler de Equipos': {
    ingresos: ['Contratos externos – servicios terceros'],
    costos: {
      Fijos: [
        'Transporte de equipos / traslado',
        'Renovación patente navegación',
        'GPS',
        'Parqueadero / bodegaje',
      ],
      Diversos: ['Transportes'],
    },
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function estadoBadge(estado) {
  if (estado === 'En meta') return 'bg-emerald-50 text-emerald-700';
  if (estado === 'Desfase') return 'bg-rose-50 text-rose-700';
  return 'bg-amber-50 text-amber-700';
}

function devColor(favorable) {
  return favorable
    ? 'bg-emerald-50 text-emerald-700'
    : 'bg-rose-50 text-rose-700';
}

function tableDevColor(pct, tipo) {
  const n = parseFloat(pct.replace(',', '.').replace('%', ''));
  if (tipo === 'ingreso') return n >= 0 ? 'text-emerald-600' : 'text-rose-600';
  return n <= 0 ? 'text-emerald-600' : 'text-rose-600';
}

function projectStatus(avance) {
  if (avance >= 80)
    return { label: 'Avanzado', cls: 'bg-blue-50 text-blue-700' };
  if (avance >= 50)
    return { label: 'En curso', cls: 'bg-emerald-50 text-emerald-700' };
  return { label: 'Inicio', cls: 'bg-amber-50 text-amber-700' };
}

// Parsea "$58M", "+$8M", "-$6M", "—" → número en millones
function parseM(s) {
  if (!s || s === '—') return 0;
  const cleaned = String(s).replace(/[$+M\s]/g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

// Formatea un número de millones → "$1,5M"
function fmtM(n) {
  return `$${Math.abs(n).toFixed(1).replace('.', ',')}M`;
}

// Formatea con signo: 0 → "—", positivo → "+$X,YM", negativo → "-$X,YM"
function fmtMSigned(n) {
  if (Math.abs(n) < 0.05) return '—';
  return (n >= 0 ? '+' : '-') + '$' + Math.abs(n).toFixed(1).replace('.', ',') + 'M';
}

// Formatea porcentaje con signo: "+1,5%" / "-2,4%"
function fmtPct(n) {
  return `${n >= 0 ? '+' : ''}${n.toFixed(1).replace('.', ',')}%`;
}

// Formato compacto para celdas de proyección (sin $ ni M, sólo número con coma decimal)
function fmtNum(n) {
  if (n === 0) return '0';
  return n.toFixed(0);
}

// Aplica el ICA a un detalle de UEN: agrega fila cv_ica y recalcula totales del padre cv,
// del KPI 'COSTO DE VENTAS' y del KPI 'UTILIDAD BRUTA'. NO muta el original.
function aplicarICA(dRaw, icaPct) {
  const ing = dRaw.rubros.find((r) => r.id === 'ing');
  const cv = dRaw.rubros.find((r) => r.id === 'cv');
  if (!ing || !cv) return dRaw;

  const ingPres = parseM(ing.presup);
  const ingReal = parseM(ing.real);
  const icaPres = (ingPres * icaPct) / 100;
  const icaReal = (ingReal * icaPct) / 100;

  const icaRow = {
    id: 'cv_ica',
    label: `Impuesto ICA (${String(icaPct).replace('.', ',')}% × Ingresos)`,
    presup: fmtM(icaPres),
    real: fmtM(icaReal),
    devCop: fmtMSigned(icaReal - icaPres),
    devPct: icaPres ? fmtPct(((icaReal - icaPres) / icaPres) * 100) : '0%',
    tipo: 'gasto',
  };

  // Recalcular padre cv
  const cvOrigPres = parseM(cv.presup);
  const cvOrigReal = parseM(cv.real);
  const cvNewPres = cvOrigPres + icaPres;
  const cvNewReal = cvOrigReal + icaReal;
  const cvNewDev = cvNewReal - cvNewPres;
  const cvNewDevPct = cvNewPres ? (cvNewDev / cvNewPres) * 100 : 0;
  const newCV = {
    ...cv,
    presup: fmtM(cvNewPres),
    real: fmtM(cvNewReal),
    devCop: fmtMSigned(cvNewDev),
    devPct: fmtPct(cvNewDevPct),
    children: [...(cv.children || []), icaRow],
  };

  // Recalcular KPI[1] (COSTO DE VENTAS) y KPI[2] (UTILIDAD BRUTA)
  const kpiCV = dRaw.kpis[1];
  const kpiCVPres = parseM(kpiCV.presup) + icaPres;
  const kpiCVReal = parseM(kpiCV.real) + icaReal;
  const kpiCVDevPct = kpiCVPres ? ((kpiCVReal - kpiCVPres) / kpiCVPres) * 100 : 0;

  const ubPres = ingPres - kpiCVPres;
  const ubReal = ingReal - kpiCVReal;
  const ubDevPct = ubPres ? ((ubReal - ubPres) / ubPres) * 100 : 0;
  const ubMargen = ingReal > 0 ? (ubReal / ingReal) * 100 : 0;

  const newKpis = [
    dRaw.kpis[0],
    {
      ...kpiCV,
      presup: fmtM(kpiCVPres),
      real: fmtM(kpiCVReal),
      devPct: fmtPct(kpiCVDevPct),
      favorable: kpiCVDevPct <= 0,
    },
    {
      ...dRaw.kpis[2],
      presup: fmtM(ubPres),
      real: fmtM(ubReal),
      devPct: fmtPct(ubDevPct),
      favorable: ubDevPct >= 0,
      extra: `${ubMargen.toFixed(1).replace('.', ',')}% margen`,
    },
  ];

  return {
    ...dRaw,
    kpis: newKpis,
    rubros: dRaw.rubros.map((r) => (r.id === 'cv' ? newCV : r)),
  };
}

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────

function CustomTooltip(props: any = {}) {
  const { active, payload, label } = props;
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="tabular-nums">
          {p.name}: ${p.value}M
        </p>
      ))}
    </div>
  );
}

// ─── RUBRO ROW (recursive) ────────────────────────────────────────────────────

function RubroRow({ row, depth = 0, expanded, toggleExpand }) {
  const hasChildren = row.children && row.children.length > 0;
  const isExpanded = expanded[row.id];
  const isGroup = hasChildren || depth === 0;
  const indent = depth * 20;

  const colored = tableDevColor(row.devPct, row.tipo);

  return (
    <>
      <tr
        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
          isGroup ? 'bg-slate-50/60' : ''
        }`}
        onClick={() => hasChildren && toggleExpand(row.id)}
        style={{ cursor: hasChildren ? 'pointer' : 'default' }}
      >
        <td className="py-2 px-4" style={{ paddingLeft: `${16 + indent}px` }}>
          <div className="flex items-center gap-1.5">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown
                  size={14}
                  className="text-slate-400 flex-shrink-0"
                />
              ) : (
                <ChevronRight
                  size={14}
                  className="text-slate-400 flex-shrink-0"
                />
              )
            ) : (
              <span className="w-3.5" />
            )}
            <span
              className={`text-sm ${
                isGroup ? 'font-semibold text-slate-800' : 'text-slate-600'
              }`}
            >
              {row.label}
            </span>
          </div>
        </td>
        <td className="py-2 px-4 text-right tabular-nums text-sm text-slate-500">
          {row.presup}
        </td>
        <td className="py-2 px-4 text-right tabular-nums text-sm text-slate-800">
          {row.real}
        </td>
        <td className={`py-2 px-4 text-right tabular-nums text-sm ${colored}`}>
          {row.devCop}
        </td>
        <td className={`py-2 px-4 text-right tabular-nums text-sm ${colored}`}>
          {row.devPct}
        </td>
      </tr>
      {hasChildren &&
        isExpanded &&
        row.children.map((child) => (
          <RubroRow
            key={child.id}
            row={child}
            depth={depth + 1}
            expanded={expanded}
            toggleExpand={toggleExpand}
          />
        ))}
    </>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function GSLPresupuesto() {
  const [view, setView] = useState('dashboard'); // "dashboard" | "uen" | "proyeccion"
  const [activeUEN, setActiveUEN] = useState('Ambiental');
  const [sidebarUENOpen, setSidebarUENOpen] = useState(true);
  const [mesIdx, setMesIdx] = useState(4); // Mayo
  const [mesDropdown, setMesDropdown] = useState(false);
  const [chartMetric, setChartMetric] = useState('Ingresos');
  const [expanded, setExpanded] = useState({ ing: true, cv: true, gd: false });

  // ICA % aplicado en costos (configurable por el analista financiero)
  const [icaPct, setIcaPct] = useState(1);

  // Proyección 2027: estado en parent para no perderlo al re-render
  const [proyUEN, setProyUEN] = useState('Oil & Gas');
  const [proy, setProy] = useState({}); // { uen: { seccion: { rubro: number[12] } } }

  // Cargar proyección desde localStorage al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem('gsl_proy_2027');
      if (raw) setProy(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Persistir en localStorage cada cambio
  useEffect(() => {
    try {
      localStorage.setItem('gsl_proy_2027', JSON.stringify(proy));
    } catch {
      /* ignore */
    }
  }, [proy]);

  const mesLabel = `${MONTHS[mesIdx]} 2026`;
  const kpis = KPI_DATA[mesLabel] || KPI_DATA['Mayo 2026'];

  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function goToUEN(uen) {
    setActiveUEN(uen);
    setView('uen');
    setExpanded({ ing: true, cv: true, gd: false });
  }

  // ── SIDEBAR ───────────────────────────────────────────────────────────────

  const Sidebar = () => (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col py-4 gap-1">
      <button
        onClick={() => setView('dashboard')}
        className={`flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg text-sm transition-colors ${
          view === 'dashboard'
            ? 'bg-slate-900 text-white'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <LayoutDashboard size={16} strokeWidth={1.75} />
        <span>Dashboard</span>
      </button>

      <button
        onClick={() => setSidebarUENOpen((o) => !o)}
        className="flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <Building2 size={16} strokeWidth={1.75} />
        <span className="flex-1 text-left">Unidades de Negocio</span>
        {sidebarUENOpen ? (
          <ChevronDown size={14} />
        ) : (
          <ChevronRight size={14} />
        )}
      </button>

      {sidebarUENOpen &&
        UEN_LIST.map((uen) => (
          <button
            key={uen}
            onClick={() => goToUEN(uen)}
            className={`flex items-center gap-2 ml-6 mr-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              view === 'uen' && activeUEN === uen
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <span>{uen}</span>
          </button>
        ))}

      <div className="my-2 border-t border-slate-100" />

      <button
        onClick={() => setView('proyeccion')}
        className={`flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg text-sm transition-colors ${
          view === 'proyeccion'
            ? 'bg-slate-900 text-white'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <LineChart size={16} strokeWidth={1.75} />
        <span>Proyección 2027</span>
      </button>
    </aside>
  );

  // ── TOPBAR ────────────────────────────────────────────────────────────────

  const Topbar = () => (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex items-center gap-2 font-semibold text-slate-900 text-base">
        <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
          G
        </div>
        Geosoluciones
      </div>

      <div className="flex-1" />

      {/* Live indicator */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Actualizado hace 3 minutos
      </div>

      {/* Month selector */}
      <div className="relative">
        <button
          onClick={() => setMesDropdown((o) => !o)}
          className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
        >
          <Calendar size={14} strokeWidth={1.75} />
          {mesLabel}
          <ChevronDown size={13} />
        </button>
        {mesDropdown && (
          <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-xl shadow-md z-50 py-1.5 w-44">
            {MONTHS.slice(0, 5).map((m, i) => (
              <button
                key={m}
                onClick={() => {
                  setMesIdx(i);
                  setMesDropdown(false);
                }}
                className={`w-full text-left px-4 py-1.5 text-sm hover:bg-slate-50 transition-colors ${
                  mesIdx === i ? 'text-blue-600 font-medium' : 'text-slate-700'
                }`}
              >
                {m} 2026
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
        MR
      </div>
    </header>
  );

  // ── VIEW 1: DASHBOARD ─────────────────────────────────────────────────────

  const Dashboard = () => (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Presupuesto General
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {mesLabel} · Ejecución vs. presupuesto
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
            <Download size={14} strokeWidth={1.75} /> Exportar
          </button>
          <button className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
            <Share2 size={14} strokeWidth={1.75} /> Compartir
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-5 relative"
          >
            <div
              className={`absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${devColor(
                k.favorable
              )}`}
            >
              {k.favorable ? (
                <TrendingDown size={11} />
              ) : (
                <TrendingUp size={11} />
              )}
              {k.devPct}
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 pr-16">
              {k.label}
            </p>
            <p className="text-2xl font-semibold tabular-nums text-slate-900 mt-2">
              {k.real}
            </p>
            <p className="text-xs text-slate-400 mt-1 tabular-nums">
              Presup. {k.presup}
            </p>
            {k.extra && (
              <p className="text-xs text-slate-500 mt-1">{k.extra}</p>
            )}
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Ejecución mensual del año
            </h2>
            <p className="text-sm text-slate-500">Presupuestado vs. Real</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {['Ingresos', 'Costos', 'Utilidad Bruta'].map((m) => (
              <button
                key={m}
                onClick={() => setChartMetric(m)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  chartMetric === m
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={CHART_DATA[chartMetric]} barSize={14} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="pres"
              name="Presupuestado"
              fill="#3b82f6"
              radius={[3, 3, 0, 0]}
              fillOpacity={0.7}
            />
            <Bar
              dataKey="real"
              name="Real"
              fill="#10b981"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* UEN Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-base font-semibold text-slate-900">
            Unidades de Negocio · {mesLabel}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Click en una UEN para ver el detalle
          </p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {[
                'UEN',
                'Presupuestado',
                'Real',
                'Desv. ($)',
                'Desv. (%)',
                'Estado',
              ].map((h, i) => (
                <th
                  key={h}
                  className={`py-3 px-4 text-xs font-medium uppercase tracking-wider text-slate-500 ${
                    i === 0 ? 'text-left' : 'text-right'
                  } ${i === 5 ? 'text-center' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {UEN_TABLE.map((row) => (
              <tr
                key={row.uen}
                onClick={() => goToUEN(row.uen)}
                className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 text-sm font-medium text-slate-800">
                  {row.uen}
                </td>
                <td className="py-3 px-4 text-right tabular-nums text-sm text-slate-500">
                  {row.presup}
                </td>
                <td className="py-3 px-4 text-right tabular-nums text-sm text-slate-800">
                  {row.real}
                </td>
                <td
                  className={`py-3 px-4 text-right tabular-nums text-sm ${
                    row.devNum >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {row.devCop}
                </td>
                <td
                  className={`py-3 px-4 text-right tabular-nums text-sm ${
                    row.devNum >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {row.devPct}
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${estadoBadge(
                      row.estado
                    )}`}
                  >
                    {row.estado}
                  </span>
                </td>
              </tr>
            ))}
            {/* Total */}
            <tr className="bg-slate-50/60 border-t-2 border-slate-200">
              <td className="py-3 px-4 text-sm font-bold text-slate-900">
                Total consolidado
              </td>
              <td className="py-3 px-4 text-right tabular-nums text-sm font-bold text-slate-900">
                $1.060M
              </td>
              <td className="py-3 px-4 text-right tabular-nums text-sm font-bold text-slate-900">
                $1.058M
              </td>
              <td className="py-3 px-4 text-right tabular-nums text-sm font-bold text-rose-600">
                -$2M
              </td>
              <td className="py-3 px-4 text-right tabular-nums text-sm font-bold text-rose-600">
                -0,2%
              </td>
              <td className="py-3 px-4 text-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                  En meta
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Alertas */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle
            size={18}
            strokeWidth={1.75}
            className="text-amber-500"
          />
          <h2 className="text-base font-semibold text-slate-900">
            Rubros que requieren atención
          </h2>
        </div>
        <div className="space-y-2">
          {ALERTAS.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <div
                className={`w-1.5 h-8 rounded-full flex-shrink-0 ${
                  a.desfav ? 'bg-rose-400' : 'bg-amber-400'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">{a.rubro}</p>
                <p
                  className={`text-xs font-medium ${
                    a.desfav ? 'text-rose-600' : 'text-amber-600'
                  }`}
                >
                  {a.dev}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{a.ctx}</p>
              </div>
              <ChevronRight
                size={16}
                className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── VIEW 2: UEN DETAIL ────────────────────────────────────────────────────

  const UENDetail = () => {
    const dRaw = UEN_DETAILS[activeUEN];
    if (!dRaw) return null;

    const isPiloto = PILOTO.includes(activeUEN);
    const d = isPiloto ? aplicarICA(dRaw, icaPct) : dRaw;

    return (
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <button
            onClick={() => setView('dashboard')}
            className="hover:text-slate-800 transition-colors"
          >
            Dashboard
          </button>
          <ChevronRight size={14} />
          <span>Unidades de Negocio</span>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">{activeUEN}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              U.E.N. {activeUEN}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{d.desc}</p>
          </div>
          {isPiloto && (
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  ICA aplicado
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Ajustable por jurisdicción del periodo
                </p>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={icaPct}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setIcaPct(isNaN(v) ? 0 : v);
                  }}
                  className="w-16 border border-slate-200 rounded-md px-2 py-1 text-sm tabular-nums text-right focus:outline-none focus:border-blue-500"
                />
                <span className="text-sm text-slate-600 font-medium">%</span>
              </div>
            </div>
          )}
        </div>

        {/* UEN Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
          {UEN_LIST.map((uen) => (
            <button
              key={uen}
              onClick={() => {
                setActiveUEN(uen);
                setExpanded({ ing: true, cv: true, gd: false });
              }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeUEN === uen
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {uen}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          {d.kpis.map((k, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-5 relative"
            >
              <div
                className={`absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${devColor(
                  k.favorable
                )}`}
              >
                {k.favorable ? (
                  <TrendingUp size={11} />
                ) : (
                  <TrendingDown size={11} />
                )}
                {k.devPct}
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 pr-16">
                {k.label}
              </p>
              <p className="text-2xl font-semibold tabular-nums text-slate-900 mt-2">
                {k.real}
              </p>
              <p className="text-xs text-slate-400 mt-1 tabular-nums">
                Presup. {k.presup}
              </p>
              {k.extra && (
                <p className="text-xs text-slate-500 mt-1">{k.extra}</p>
              )}
            </div>
          ))}
        </div>

        {/* Rubros Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 pb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Estado de Resultados · {mesLabel}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Click en un grupo para expandir o colapsar
            </p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {[
                  'Rubro',
                  'Presupuestado',
                  'Real',
                  'Desv. ($)',
                  'Desv. (%)',
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`py-3 px-4 text-xs font-medium uppercase tracking-wider text-slate-500 ${
                      i === 0 ? 'text-left' : 'text-right'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.rubros.map((row) => (
                <RubroRow
                  key={row.id}
                  row={row}
                  depth={0}
                  expanded={expanded}
                  toggleExpand={toggleExpand}
                />
              ))}
              {/* Utilidad Bruta footer */}
              <tr className="border-t-2 border-slate-300 bg-white">
                <td className="py-3 px-4 text-sm font-bold text-slate-900 pl-4">
                  UTILIDAD BRUTA
                </td>
                <td className="py-3 px-4 text-right tabular-nums text-sm font-bold text-slate-500">
                  {d.kpis[2]?.presup}
                </td>
                <td className="py-3 px-4 text-right tabular-nums text-sm font-bold text-slate-900">
                  {d.kpis[2]?.real}
                </td>
                <td
                  className={`py-3 px-4 text-right tabular-nums text-sm font-bold ${
                    d.kpis[2]?.favorable ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  —
                </td>
                <td
                  className={`py-3 px-4 text-right tabular-nums text-sm font-bold ${
                    d.kpis[2]?.favorable ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {d.kpis[2]?.devPct}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Projects (only Ambiental) */}
        {d.tieneProyectos && (
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-4">
              Proyectos activos
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {PROYECTOS.map((p, i) => {
                const st = projectStatus(p.avance);
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-semibold text-slate-800">
                        {p.nombre}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${st.cls}`}
                      >
                        {st.label}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">Avance</span>
                        <span className="text-xs font-semibold tabular-nums text-slate-700">
                          {p.avance}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full">
                        <div
                          className="h-1.5 bg-blue-500 rounded-full"
                          style={{ width: `${p.avance}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="text-slate-400">Presupuestado</p>
                        <p className="tabular-nums font-medium text-slate-600">
                          {p.presup}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400">Ejecutado</p>
                        <p className="tabular-nums font-medium text-emerald-600">
                          {p.real}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── VIEW 3: PROYECCIÓN 2027 ──────────────────────────────────────────────

  const Proyeccion2027 = () => {
    const tmpl = PROYECCION_TEMPLATE[proyUEN];

    const getValue = (seccion, rubro, mIdx) => {
      const v = proy[proyUEN]?.[seccion]?.[rubro]?.[mIdx];
      return typeof v === 'number' ? v : 0;
    };

    const setValue = (seccion, rubro, mIdx, val) => {
      setProy((prev) => {
        const uenData = prev[proyUEN] || {};
        const secData = uenData[seccion] || {};
        const arr = Array.isArray(secData[rubro])
          ? [...secData[rubro]]
          : Array(12).fill(0);
        arr[mIdx] = val;
        return {
          ...prev,
          [proyUEN]: {
            ...uenData,
            [seccion]: { ...secData, [rubro]: arr },
          },
        };
      });
    };

    const limpiarProyeccion = () => {
      if (
        confirm(
          'Esto borrará todos los valores digitados en las 3 UEN. ¿Continuar?'
        )
      ) {
        setProy({});
        try {
          localStorage.removeItem('gsl_proy_2027');
        } catch {
          /* ignore */
        }
      }
    };

    // Cálculos derivados — vector de 12 meses
    const ingresosMes = Array.from({ length: 12 }, (_, m) =>
      tmpl.ingresos.reduce((s, r) => s + getValue('ingresos', r, m), 0)
    );
    const icaMes = ingresosMes.map((v) => (v * icaPct) / 100);

    const costosBaseMes = Array.from({ length: 12 }, (_, m) => {
      let s = 0;
      Object.entries(tmpl.costos).forEach(([sec, items]) => {
        items.forEach((r) => {
          s += getValue(sec, r, m);
        });
      });
      return s;
    });
    const costosMes = costosBaseMes.map((v, m) => v + icaMes[m]);
    const utilidadMes = ingresosMes.map((v, m) => v - costosMes[m]);

    const sumArr = (arr) => arr.reduce((a, b) => a + b, 0);

    // Anchos de columna (uniformes)
    const monthColW = 'w-[68px] min-w-[68px]';
    const totalColW = 'w-[92px] min-w-[92px]';
    const rubroColW = 'min-w-[280px] w-[280px]';

    // Componente celda input
    const InputCell = ({ seccion, rubro, mIdx }) => (
      <td className={`${monthColW} px-1 py-0.5`}>
        <input
          type="number"
          step="1"
          min="0"
          value={getValue(seccion, rubro, mIdx) || ''}
          onChange={(e) => {
            const raw = e.target.value;
            const v = raw === '' ? 0 : parseFloat(raw);
            setValue(seccion, rubro, mIdx, isNaN(v) ? 0 : v);
          }}
          placeholder="0"
          className="w-full px-1.5 py-1 text-xs text-right tabular-nums border border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white rounded outline-none bg-transparent"
        />
      </td>
    );

    // Celda de sólo lectura (totales / ICA / utilidad)
    const ReadCell = ({ value, className = '' }) => (
      <td
        className={`${monthColW} px-2 py-1.5 text-right tabular-nums text-xs ${className}`}
      >
        {value === 0 ? '—' : fmtNum(value)}
      </td>
    );

    return (
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Proyección de Presupuesto 2027
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Ingreso manual de cifras mensuales por rubro · Estructura definida
              por la Dirección
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                ICA
              </span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={icaPct}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setIcaPct(isNaN(v) ? 0 : v);
                }}
                className="w-16 border border-slate-200 rounded-md px-2 py-1 text-sm tabular-nums text-right focus:outline-none focus:border-blue-500"
              />
              <span className="text-sm text-slate-600 font-medium">%</span>
            </div>
            <button
              onClick={limpiarProyeccion}
              className="border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Trash2 size={14} strokeWidth={1.75} /> Limpiar
            </button>
          </div>
        </div>

        {/* UEN switcher */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
          {PILOTO.map((uen) => (
            <button
              key={uen}
              onClick={() => setProyUEN(uen)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                proyUEN === uen
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {uen}
            </button>
          ))}
        </div>

        {/* Tabla de proyección */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 pb-3 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              {proyUEN} · Año 2027
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cifras en millones de pesos. Las celdas grises se calculan
              automáticamente.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th
                    className={`${rubroColW} text-left text-xs font-medium uppercase tracking-wider text-slate-500 py-2.5 px-4 sticky left-0 bg-slate-50 z-10`}
                  >
                    Rubro
                  </th>
                  {MESES_CORTOS.map((m) => (
                    <th
                      key={m}
                      className={`${monthColW} text-center text-xs font-medium uppercase tracking-wider text-slate-500 py-2.5 px-1`}
                    >
                      {m}
                    </th>
                  ))}
                  <th
                    className={`${totalColW} text-right text-xs font-medium uppercase tracking-wider text-slate-500 py-2.5 px-3`}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* ─── INGRESOS ─── */}
                <tr className="bg-blue-50/50 border-b border-slate-200">
                  <td
                    className={`${rubroColW} py-2 px-4 text-sm font-semibold text-slate-800 sticky left-0 bg-blue-50/50 z-10`}
                  >
                    INGRESOS
                  </td>
                  {ingresosMes.map((v, m) => (
                    <ReadCell
                      key={m}
                      value={v}
                      className="font-semibold text-slate-800"
                    />
                  ))}
                  <td
                    className={`${totalColW} px-3 py-2 text-right tabular-nums text-sm font-bold text-slate-900`}
                  >
                    {sumArr(ingresosMes) === 0
                      ? '—'
                      : fmtNum(sumArr(ingresosMes))}
                  </td>
                </tr>
                {tmpl.ingresos.map((rubro) => {
                  const rowVals = Array.from({ length: 12 }, (_, m) =>
                    getValue('ingresos', rubro, m)
                  );
                  return (
                    <tr
                      key={rubro}
                      className="border-b border-slate-100 hover:bg-slate-50/40"
                    >
                      <td
                        className={`${rubroColW} py-1 px-4 pl-8 text-sm text-slate-600 sticky left-0 bg-white z-10`}
                      >
                        {rubro}
                      </td>
                      {Array.from({ length: 12 }, (_, m) => (
                        <InputCell
                          key={m}
                          seccion="ingresos"
                          rubro={rubro}
                          mIdx={m}
                        />
                      ))}
                      <td
                        className={`${totalColW} px-3 py-1 text-right tabular-nums text-xs font-semibold text-slate-700`}
                      >
                        {sumArr(rowVals) === 0 ? '—' : fmtNum(sumArr(rowVals))}
                      </td>
                    </tr>
                  );
                })}

                {/* ─── COSTOS ─── */}
                <tr className="bg-rose-50/40 border-b border-slate-200 border-t-2 border-t-slate-200">
                  <td
                    className={`${rubroColW} py-2 px-4 text-sm font-semibold text-slate-800 sticky left-0 bg-rose-50/40 z-10`}
                  >
                    COSTOS
                  </td>
                  {costosMes.map((v, m) => (
                    <ReadCell
                      key={m}
                      value={v}
                      className="font-semibold text-slate-800"
                    />
                  ))}
                  <td
                    className={`${totalColW} px-3 py-2 text-right tabular-nums text-sm font-bold text-slate-900`}
                  >
                    {sumArr(costosMes) === 0
                      ? '—'
                      : fmtNum(sumArr(costosMes))}
                  </td>
                </tr>

                {/* Sub-secciones de costos */}
                {Object.entries(tmpl.costos).map(([seccion, items]) => {
                  const subMes = Array.from({ length: 12 }, (_, m) =>
                    items.reduce((s, r) => s + getValue(seccion, r, m), 0)
                  );
                  return (
                    <Fragment key={`sub-${seccion}`}>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <td
                          className={`${rubroColW} py-1.5 px-4 pl-6 text-xs font-semibold uppercase tracking-wider text-slate-600 sticky left-0 bg-slate-50 z-10`}
                        >
                          {seccion}
                        </td>
                        {subMes.map((v, m) => (
                          <ReadCell
                            key={m}
                            value={v}
                            className="text-slate-600 font-medium"
                          />
                        ))}
                        <td
                          className={`${totalColW} px-3 py-1.5 text-right tabular-nums text-xs font-semibold text-slate-700`}
                        >
                          {sumArr(subMes) === 0 ? '—' : fmtNum(sumArr(subMes))}
                        </td>
                      </tr>
                      {items.map((rubro) => {
                        const rowVals = Array.from({ length: 12 }, (_, m) =>
                          getValue(seccion, rubro, m)
                        );
                        return (
                          <tr
                            key={`${seccion}-${rubro}`}
                            className="border-b border-slate-100 hover:bg-slate-50/40"
                          >
                            <td
                              className={`${rubroColW} py-1 px-4 pl-10 text-sm text-slate-600 sticky left-0 bg-white z-10`}
                            >
                              {rubro}
                            </td>
                            {Array.from({ length: 12 }, (_, m) => (
                              <InputCell
                                key={m}
                                seccion={seccion}
                                rubro={rubro}
                                mIdx={m}
                              />
                            ))}
                            <td
                              className={`${totalColW} px-3 py-1 text-right tabular-nums text-xs font-semibold text-slate-700`}
                            >
                              {sumArr(rowVals) === 0
                                ? '—'
                                : fmtNum(sumArr(rowVals))}
                            </td>
                          </tr>
                        );
                      })}
                    </Fragment>
                  );
                })}

                {/* ICA — fila auto-calculada */}
                <tr className="bg-amber-50/40 border-b border-slate-200">
                  <td
                    className={`${rubroColW} py-1.5 px-4 pl-6 text-sm text-slate-700 italic sticky left-0 bg-amber-50/40 z-10`}
                  >
                    Impuesto ICA ({String(icaPct).replace('.', ',')}% × Ingresos)
                  </td>
                  {icaMes.map((v, m) => (
                    <ReadCell
                      key={m}
                      value={v}
                      className="text-amber-700 font-medium"
                    />
                  ))}
                  <td
                    className={`${totalColW} px-3 py-1.5 text-right tabular-nums text-xs font-semibold text-amber-700`}
                  >
                    {sumArr(icaMes) === 0 ? '—' : fmtNum(sumArr(icaMes))}
                  </td>
                </tr>

                {/* ─── UTILIDAD BRUTA ─── */}
                <tr className="bg-emerald-50/60 border-t-2 border-slate-300">
                  <td
                    className={`${rubroColW} py-2.5 px-4 text-sm font-bold text-slate-900 sticky left-0 bg-emerald-50/60 z-10`}
                  >
                    UTILIDAD BRUTA
                  </td>
                  {utilidadMes.map((v, m) => (
                    <td
                      key={m}
                      className={`${monthColW} px-2 py-2.5 text-right tabular-nums text-xs font-bold ${
                        v >= 0 ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {v === 0 ? '—' : fmtNum(v)}
                    </td>
                  ))}
                  <td
                    className={`${totalColW} px-3 py-2.5 text-right tabular-nums text-sm font-bold ${
                      sumArr(utilidadMes) >= 0
                        ? 'text-emerald-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {sumArr(utilidadMes) === 0
                      ? '—'
                      : fmtNum(sumArr(utilidadMes))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen anual */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Ingresos Anuales 2027
            </p>
            <p className="text-2xl font-semibold tabular-nums text-slate-900 mt-2">
              {sumArr(ingresosMes) === 0 ? '—' : `$${fmtNum(sumArr(ingresosMes))}M`}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Suma de los 12 meses · {proyUEN}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Costos Anuales 2027
            </p>
            <p className="text-2xl font-semibold tabular-nums text-slate-900 mt-2">
              {sumArr(costosMes) === 0 ? '—' : `$${fmtNum(sumArr(costosMes))}M`}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Incluye ICA del {String(icaPct).replace('.', ',')}%
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Utilidad Bruta Proyectada
            </p>
            <p
              className={`text-2xl font-semibold tabular-nums mt-2 ${
                sumArr(utilidadMes) >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {sumArr(utilidadMes) === 0
                ? '—'
                : `$${fmtNum(sumArr(utilidadMes))}M`}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {sumArr(ingresosMes) > 0
                ? `${(
                    (sumArr(utilidadMes) / sumArr(ingresosMes)) *
                    100
                  )
                    .toFixed(1)
                    .replace('.', ',')}% margen`
                : 'Sin datos digitados aún'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // ── SHELL ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {view === 'dashboard' && <Dashboard />}
          {view === 'uen' && <UENDetail />}
          {view === 'proyeccion' && <Proyeccion2027 />}
        </main>
      </div>
    </div>
  );
}
